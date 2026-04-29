import type { SiteVisitSectionProps, PhotoChecklist, PhotoUploadMeta } from "../types";
import { PHOTO_SECTIONS, TOTAL_PHOTOS } from "../types";
import { Callout } from "./Helpers";
import { PhotoCapture } from "./PhotoCapture";

type Section3Props = SiteVisitSectionProps & { sessionId: string };

export function Section3({ data, onChange, sessionId }: Section3Props) {
  const checklist = data.photo_checklist;
  const checkedCount = Object.values(checklist).filter(v => v.checked).length;

  function updatePhotoItem(id: string, patch: Partial<PhotoChecklist[string]>) {
    const current = checklist[id] ?? { checked: false, notes: "" };
    onChange("photo_checklist", {
      ...checklist,
      [id]: { ...current, ...patch },
    });
  }

  return (
    <div className="space-y-6">
      <Callout>All photos must be geotagged. Upload to Google Drive immediately after the visit.</Callout>

      {/* Completion counter */}
      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
        <div className="flex items-center justify-between mb-2">
          <p className="font-sans text-sm font-semibold text-covenant-dark">
            Photos checked: {checkedCount} / {TOTAL_PHOTOS}
          </p>
          {checkedCount === TOTAL_PHOTOS && (
            <span className="font-sans text-xs font-semibold text-covenant-green">All done!</span>
          )}
        </div>
        <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-covenant-green rounded-full transition-all duration-300"
            style={{ width: `${(checkedCount / TOTAL_PHOTOS) * 100}%` }}
          />
        </div>
      </div>

      {PHOTO_SECTIONS.map(section => (
        <div key={section.id}>
          <h3 className="font-sans text-xs font-semibold text-covenant-blue uppercase tracking-widest mb-3">
            {section.label}
          </h3>
          <div className="space-y-2">
            {section.photos.map(photo => {
              const item = checklist[photo.id] ?? { checked: false, notes: "" };
              return (
                <div
                  key={photo.id}
                  className={`rounded-xl border-2 p-3 transition-colors ${
                    item.checked
                      ? "border-covenant-green bg-covenant-green/5"
                      : "border-slate-200"
                  }`}
                >
                  {/* Checkbox + label */}
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={item.checked}
                      onChange={() => updatePhotoItem(photo.id, { checked: !item.checked })}
                      className="mt-0.5 accent-covenant-green flex-shrink-0"
                    />
                    <span className="font-sans text-sm text-covenant-dark leading-snug">
                      {photo.label}
                    </span>
                  </label>

                  {/* Notes field */}
                  <div className="mt-2 ml-7">
                    <input
                      type="text"
                      value={item.notes}
                      onChange={e => updatePhotoItem(photo.id, { notes: e.target.value })}
                      placeholder="Notes (optional)"
                      className="w-full font-sans text-xs text-covenant-dark bg-white border border-slate-200 rounded-lg px-3 py-2 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-covenant-green focus:border-transparent"
                    />
                  </div>

                  {/* Photo capture */}
                  <PhotoCapture
                    photoId={photo.id}
                    sessionId={sessionId}
                    item={item}
                    onUploadComplete={(meta: PhotoUploadMeta) =>
                      updatePhotoItem(photo.id, { checked: true, upload: meta })
                    }
                    onRemove={() =>
                      updatePhotoItem(photo.id, { upload: undefined })
                    }
                  />
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
