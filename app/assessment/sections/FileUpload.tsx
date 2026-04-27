"use client";

import { useRef, useState } from "react";
import type { UploadMeta } from "../types";

type FileUploadProps = {
  label: string;
  value: UploadMeta | null;
  onChange: (meta: UploadMeta | null) => void;
  submissionId: string;
  accept?: string;
  maxMB?: number;
};

export function FileUpload({
  label, value, onChange, submissionId,
  accept = "application/pdf,image/jpeg,image/png",
  maxMB = 10,
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');

  async function handleFile(file: File) {
    setError('');
    if (file.size > maxMB * 1024 * 1024) {
      setError(`File must be under ${maxMB}MB`);
      return;
    }

    setUploading(true);
    setProgress(0);

    try {
      const form = new FormData();
      form.append('file', file);
      form.append('submissionId', submissionId);

      const xhr = new XMLHttpRequest();
      await new Promise<void>((resolve, reject) => {
        xhr.upload.onprogress = e => {
          if (e.lengthComputable) setProgress(Math.round((e.loaded / e.total) * 100));
        };
        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) resolve();
          else reject(new Error(`Upload failed: ${xhr.status}`));
        };
        xhr.onerror = () => reject(new Error('Network error'));
        xhr.open('POST', '/api/assessment/upload');
        xhr.send(form);
      });

      const result = JSON.parse(xhr.responseText) as { path: string; filename: string };
      onChange({ path: result.path, filename: result.filename, uploadedAt: new Date().toISOString() });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed. Please try again.');
    } finally {
      setUploading(false);
      setProgress(0);
    }
  }

  function handleRemove() {
    onChange(null);
    if (inputRef.current) inputRef.current.value = '';
  }

  return (
    <div className="flex flex-col gap-2">
      <p className="font-sans text-sm font-medium text-covenant-dark">{label}</p>

      {value ? (
        <div className="flex items-center gap-3 p-3 rounded-xl border-2 border-covenant-green bg-covenant-green/5">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#27AE60" strokeWidth="2" strokeLinecap="round" className="flex-shrink-0">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/>
          </svg>
          <span className="font-sans text-sm text-covenant-dark flex-1 truncate">{value.filename}</span>
          <button
            type="button"
            onClick={handleRemove}
            className="font-sans text-xs text-covenant-muted hover:text-red-500 transition-colors flex-shrink-0"
          >
            Remove
          </button>
        </div>
      ) : uploading ? (
        <div className="p-4 rounded-xl border-2 border-slate-200">
          <div className="flex justify-between items-center mb-2">
            <span className="font-sans text-sm text-covenant-muted">Uploading...</span>
            <span className="font-sans text-sm text-covenant-green font-semibold">{progress}%</span>
          </div>
          <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
            <div className="h-full bg-covenant-green rounded-full transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center gap-2 p-6 rounded-xl border-2 border-dashed border-slate-300 hover:border-covenant-green cursor-pointer transition-colors">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="1.75" strokeLinecap="round">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
          </svg>
          <span className="font-sans text-sm text-covenant-muted">
            Click to upload PDF, JPG, or PNG (max {maxMB}MB)
          </span>
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            className="sr-only"
            onChange={e => { if (e.target.files?.[0]) handleFile(e.target.files[0]); }}
          />
        </label>
      )}

      {error && <p className="font-sans text-xs text-red-500">{error}</p>}
    </div>
  );
}
