"use client";

import { useEffect, useRef, useState } from "react";
import type { PhotoItem, PhotoUploadMeta } from "../types";

type Status = "idle" | "uploading" | "uploaded" | "error";

const DELAYS = [2000, 5000]; // auto-retry delays before surfacing error

type Props = {
  photoId: string;
  sessionId: string;
  item: PhotoItem;
  onUploadComplete: (meta: PhotoUploadMeta) => void;
  onRemove: () => void;
};

export function PhotoCapture({ photoId, sessionId, item, onUploadComplete, onRemove }: Props) {
  const [status, setStatus]       = useState<Status>(() => item.upload ? "uploaded" : "idle");
  const [progress, setProgress]   = useState(0);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [errorMsg, setErrorMsg]   = useState("");
  const [retryFile, setRetryFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Clean up blob URL on unmount or when it changes
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  async function uploadWithRetry(file: File, attempt = 0): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("sessionId", sessionId);
      fd.append("photoId", photoId);

      const xhr = new XMLHttpRequest();
      xhr.timeout = 30_000;

      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) setProgress(Math.round((e.loaded / e.total) * 100));
      };

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          const json = JSON.parse(xhr.responseText) as { path: string; filename: string };
          resolve();
          onUploadComplete({
            path: json.path,
            filename: json.filename,
            uploadedAt: new Date().toISOString(),
          });
          setStatus("uploaded");
        } else {
          const json = JSON.parse(xhr.responseText || "{}") as { error?: string };
          reject(new Error(json.error ?? `Upload failed (${xhr.status})`));
        }
      };

      xhr.onerror   = () => reject(new Error("Network error"));
      xhr.ontimeout = () => reject(new Error("Upload timed out — check your connection"));

      xhr.open("POST", "/api/site-visit/upload");
      xhr.send(fd);
    }).catch(async (err: Error) => {
      if (attempt < DELAYS.length) {
        await new Promise<void>(r => setTimeout(r, DELAYS[attempt]));
        return uploadWithRetry(file, attempt + 1);
      }
      throw err;
    });
  }

  async function handleFile(file: File) {
    const preview = URL.createObjectURL(file);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(preview);
    setRetryFile(file);
    setStatus("uploading");
    setProgress(0);
    setErrorMsg("");

    try {
      await uploadWithRetry(file);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Upload failed. Check your connection and try again.");
    }
  }

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    // Reset the input so the same file can be re-selected after remove
    e.target.value = "";
    void handleFile(file);
  }

  async function handleRetry() {
    if (!retryFile) return;
    await handleFile(retryFile);
  }

  function handleRemove() {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    setRetryFile(null);
    setStatus("idle");
    setProgress(0);
    setErrorMsg("");
    onRemove();
  }

  // Hidden file input — always rendered so it can be triggered programmatically
  const fileInput = (
    <input
      ref={inputRef}
      type="file"
      accept="image/*"
      capture="environment"
      className="sr-only"
      onChange={onInputChange}
      aria-hidden="true"
      tabIndex={-1}
    />
  );

  // ── Idle ──────────────────────────────────────────────────────────────────
  if (status === "idle") {
    return (
      <div className="mt-2 ml-7">
        {fileInput}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex items-center gap-2 px-3 py-2 rounded-lg border border-dashed border-slate-300 text-covenant-muted hover:border-covenant-green hover:text-covenant-green transition-colors text-xs font-sans"
        >
          <CameraIcon />
          Take photo
        </button>
      </div>
    );
  }

  // ── Uploading ─────────────────────────────────────────────────────────────
  if (status === "uploading") {
    return (
      <div className="mt-2 ml-7 flex items-start gap-3">
        {fileInput}
        {previewUrl && (
          <img
            src={previewUrl}
            alt="Uploading preview"
            className="w-14 h-14 rounded-lg object-cover flex-shrink-0 border border-slate-200"
          />
        )}
        <div className="flex-1 min-w-0">
          <p className="font-sans text-xs text-covenant-muted mb-1.5">
            Uploading... {progress}%
          </p>
          <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-covenant-green rounded-full transition-all duration-150"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    );
  }

  // ── Uploaded with in-session preview ──────────────────────────────────────
  if (status === "uploaded" && previewUrl) {
    return (
      <div className="mt-2 ml-7 flex items-start gap-3">
        {fileInput}
        <div className="relative flex-shrink-0">
          <img
            src={previewUrl}
            alt="Captured photo"
            className="w-14 h-14 rounded-lg object-cover border border-slate-200"
          />
          <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-covenant-green rounded-full flex items-center justify-center">
            <CheckIcon />
          </span>
        </div>
        <button
          type="button"
          onClick={handleRemove}
          className="font-sans text-xs text-covenant-muted hover:text-red-500 transition-colors mt-1"
        >
          Remove
        </button>
      </div>
    );
  }

  // ── Uploaded after page reload (no blob URL available) ────────────────────
  if (status === "uploaded" && item.upload) {
    return (
      <div className="mt-2 ml-7 flex items-center gap-2">
        {fileInput}
        <span className="flex items-center gap-1.5 px-2.5 py-1.5 bg-covenant-green/10 border border-covenant-green/20 rounded-lg">
          <CheckIcon className="text-covenant-green" />
          <span className="font-sans text-xs text-covenant-green font-medium">Photo saved</span>
        </span>
        <button
          type="button"
          onClick={handleRemove}
          className="font-sans text-xs text-covenant-muted hover:text-red-500 transition-colors"
        >
          Remove
        </button>
      </div>
    );
  }

  // ── Error ─────────────────────────────────────────────────────────────────
  return (
    <div className="mt-2 ml-7">
      {fileInput}
      <div className="flex items-start gap-3">
        {previewUrl && (
          <img
            src={previewUrl}
            alt="Photo (upload failed)"
            className="w-14 h-14 rounded-lg object-cover flex-shrink-0 border border-red-200 opacity-70"
          />
        )}
        <div className="min-w-0">
          <p className="font-sans text-xs text-red-600 mb-2 leading-relaxed">{errorMsg}</p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleRetry}
              className="px-3 py-1.5 rounded-lg bg-covenant-green text-white font-sans text-xs font-medium hover:bg-green-600 transition-colors"
            >
              Retry
            </button>
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="px-3 py-1.5 rounded-lg border border-slate-300 text-covenant-dark font-sans text-xs hover:border-slate-400 transition-colors"
            >
              Re-take
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CameraIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
      <path
        d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      />
      <circle cx="12" cy="13" r="4" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function CheckIcon({ className = "text-white" }: { className?: string }) {
  return (
    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" className={className}>
      <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
