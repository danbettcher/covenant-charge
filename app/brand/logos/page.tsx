// Aspect ratios for each mark family (height / width of viewBox)
// Used to compute exact rendered height from a given width
const ARCH_RATIO = 44 / 40;       // viewBox 0 0 40 44
const WIDE_ARCH_RATIO = 42 / 48;  // viewBox 0 0 48 42
const C_RATIO = 40 / 40;          // viewBox 0 0 40 40

function markHeight(width: number, ratio: number) {
  return Math.round(width * ratio);
}

// Wordmark that stretches to exactly match the mark's rendered height
function Wordmark({
  height,
  covenantColor = "#1B4F72",
  chargeColor = "#27AE60",
  covenantSize = "text-xl",
  chargeClass = "font-sans font-light text-sm tracking-[0.2em]",
}: {
  height: number;
  covenantColor?: string;
  chargeColor?: string;
  covenantSize?: string;
  chargeClass?: string;
}) {
  return (
    <div
      className="flex flex-col justify-between"
      style={{ height }}
    >
      <span
        className={`font-serif font-bold tracking-tight leading-none ${covenantSize}`}
        style={{ color: covenantColor }}
      >
        Covenant
      </span>
      <span
        className={`leading-none ${chargeClass}`}
        style={{ color: chargeColor }}
      >
        CHARGE
      </span>
    </div>
  );
}

const archVariations = [
  {
    id: "a1",
    name: "Bold — Standard",
    tag: "Current pick",
    ratio: ARCH_RATIO,
    description: "Original proportions with heavy stroke. Balanced and grounded.",
    light: (strokeColor = "#1B4F72", boltColor = "#27AE60") => (
      <svg viewBox="0 0 40 44" fill="none">
        <path d="M 4 44 L 4 20 A 16 16 0 0 1 36 20 L 36 44"
          stroke={strokeColor} strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 24 10 L 16 27 L 22 27 L 17 38 L 28 21 L 22 21 Z" fill={boltColor} />
      </svg>
    ),
  },
  {
    id: "a2",
    name: "Bold — Very Heavy",
    tag: "Heavier stroke",
    ratio: ARCH_RATIO,
    description: "Pushed further. Works exceptionally well at small sizes and on physical materials.",
    light: (strokeColor = "#1B4F72", boltColor = "#27AE60") => (
      <svg viewBox="0 0 40 44" fill="none">
        <path d="M 4 44 L 4 20 A 16 16 0 0 1 36 20 L 36 44"
          stroke={strokeColor} strokeWidth="7.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 24 10 L 16 27 L 22 27 L 17 38 L 28 21 L 22 21 Z" fill={boltColor} />
      </svg>
    ),
  },
  {
    id: "a3",
    name: "Bold — Compact Dome",
    tag: "Shorter pillars",
    ratio: ARCH_RATIO,
    description: "Shorter pillars, more dome-like than doorway. Compact and icon-friendly.",
    light: (strokeColor = "#1B4F72", boltColor = "#27AE60") => (
      <svg viewBox="0 0 40 44" fill="none">
        <path d="M 4 44 L 4 28 A 16 16 0 0 1 36 28 L 36 44"
          stroke={strokeColor} strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 24 12 L 16 28 L 22 28 L 18 38 L 28 24 L 22 24 Z" fill={boltColor} />
      </svg>
    ),
  },
  {
    id: "a4",
    name: "Bold — Wide Gateway",
    tag: "Your pick",
    ratio: WIDE_ARCH_RATIO,
    description: "Wide elliptical arc with bold stroke. More of a grand gate than a doorway.",
    light: (strokeColor = "#1B4F72", boltColor = "#27AE60") => (
      <svg viewBox="0 0 48 42" fill="none">
        <path d="M 4 42 L 4 26 A 20 16 0 0 1 44 26 L 44 42"
          stroke={strokeColor} strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 27 12 L 18 28 L 25 28 L 20 40 L 32 23 L 26 23 Z" fill={boltColor} />
      </svg>
    ),
  },
];

const cVariations = [
  {
    id: "c1",
    name: "Enclosed C — Standard",
    tag: "Current pick",
    ratio: C_RATIO,
    description: "270° arc, small gap on the right. Almost a full circle — contained and strong.",
    light: (strokeColor = "#1B4F72", boltColor = "#27AE60") => (
      <svg viewBox="0 0 40 40" fill="none">
        <path d="M 32 8 A 17 17 0 1 0 32 32"
          stroke={strokeColor} strokeWidth="5" strokeLinecap="round" />
        <path d="M 22 9 L 15 22 L 20 22 L 16 33 L 27 18 L 22 18 Z" fill={boltColor} />
      </svg>
    ),
  },
  {
    id: "c2",
    name: "Enclosed C — Heavy",
    tag: "Bolder stroke",
    ratio: C_RATIO,
    description: "Same 270° shape with a heavier stroke. Feels solid and badge-like.",
    light: (strokeColor = "#1B4F72", boltColor = "#27AE60") => (
      <svg viewBox="0 0 40 40" fill="none">
        <path d="M 32 8 A 17 17 0 1 0 32 32"
          stroke={strokeColor} strokeWidth="7" strokeLinecap="round" />
        <path d="M 22 9 L 15 22 L 20 22 L 16 33 L 27 18 L 22 18 Z" fill={boltColor} />
      </svg>
    ),
  },
  {
    id: "c3",
    name: "Enclosed C — Refined",
    tag: "Your pick",
    ratio: C_RATIO,
    description: "The 270° shape with a thinner stroke. More sophisticated, pairs naturally with Lora.",
    light: (strokeColor = "#1B4F72", boltColor = "#27AE60") => (
      <svg viewBox="0 0 40 40" fill="none">
        <path d="M 32 8 A 17 17 0 1 0 32 32"
          stroke={strokeColor} strokeWidth="3" strokeLinecap="round" />
        <path d="M 22 9 L 15 22 L 20 22 L 16 33 L 27 18 L 22 18 Z" fill={boltColor} />
      </svg>
    ),
  },
  {
    id: "c4",
    name: "Enclosed C — Gap Down",
    tag: "Rotated gap",
    ratio: C_RATIO,
    description: "Gap rotated to lower-right (~4 o'clock). More dynamic and directional.",
    light: (strokeColor = "#1B4F72", boltColor = "#27AE60") => (
      <svg viewBox="0 0 40 40" fill="none">
        <path d="M 36 14 A 17 17 0 1 0 25 36"
          stroke={strokeColor} strokeWidth="5" strokeLinecap="round" />
        <path d="M 22 9 L 15 22 L 20 22 L 16 33 L 27 18 L 22 18 Z" fill={boltColor} />
      </svg>
    ),
  },
];

const PREVIEW_SIZES = [20, 36, 56];
const WORDMARK_SIZE = 48; // the size at which wordmark alignment is shown

function VariationCard({
  name,
  tag,
  description,
  ratio,
  renderMark,
  index,
}: {
  name: string;
  tag: string;
  description: string;
  ratio: number;
  renderMark: (stroke?: string, bolt?: string) => React.ReactNode;
  index: number;
}) {
  const wm = WORDMARK_SIZE;
  const wmHeight = markHeight(wm, ratio);

  return (
    <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm">
      <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3">
        <span className="font-sans text-xs text-covenant-muted bg-slate-100 rounded-full px-3 py-1 tracking-widest uppercase">
          {index + 1}
        </span>
        <h3 className="font-serif text-lg font-semibold text-covenant-blue">{name}</h3>
        <span className="font-sans text-xs text-covenant-green italic font-medium">{tag}</span>
      </div>

      <div className="grid grid-cols-2">
        {/* Light */}
        <div className="p-8 flex flex-col gap-8">
          <p className="font-sans text-xs text-covenant-muted uppercase tracking-widest">Light bg</p>

          {/* Sizes row */}
          <div className="flex items-end gap-6">
            {PREVIEW_SIZES.map((size) => (
              <div key={size} className="flex flex-col items-center gap-1">
                <div style={{ width: size, height: markHeight(size, ratio) }}>
                  {renderMark()}
                </div>
                <span className="font-sans text-[10px] text-covenant-muted">{size}</span>
              </div>
            ))}
          </div>

          {/* Wordmark lockup — top and bottom aligned */}
          <div className="flex items-start gap-3">
            <div style={{ width: wm, height: wmHeight, flexShrink: 0 }}>
              {renderMark()}
            </div>
            <Wordmark height={wmHeight} />
          </div>
        </div>

        {/* Dark */}
        <div className="p-8 bg-covenant-blue flex flex-col gap-8">
          <p className="font-sans text-xs text-white/40 uppercase tracking-widest">Dark bg</p>

          {/* Sizes row */}
          <div className="flex items-end gap-6">
            {PREVIEW_SIZES.map((size) => (
              <div key={size} className="flex flex-col items-center gap-1">
                <div style={{ width: size, height: markHeight(size, ratio) }}>
                  {renderMark("white", "white")}
                </div>
                <span className="font-sans text-[10px] text-white/40">{size}</span>
              </div>
            ))}
          </div>

          {/* Wordmark lockup — top and bottom aligned */}
          <div className="flex items-start gap-3">
            <div style={{ width: wm, height: wmHeight, flexShrink: 0 }}>
              {renderMark("white", "white")}
            </div>
            <Wordmark height={wmHeight} covenantColor="white" chargeColor="rgba(255,255,255,0.7)" />
          </div>
        </div>
      </div>

      <div className="px-6 py-4 bg-covenant-light border-t border-slate-100">
        <p className="font-sans text-sm text-covenant-muted">{description}</p>
      </div>
    </div>
  );
}

// Wide Gateway mark for wordmark picker (user's preferred arch)
function WideGatewayMark({ width, stroke = "#1B4F72", bolt = "#27AE60" }: { width: number; stroke?: string; bolt?: string }) {
  const h = markHeight(width, WIDE_ARCH_RATIO);
  return (
    <svg width={width} height={h} viewBox="0 0 48 42" fill="none" style={{ flexShrink: 0 }}>
      <path d="M 4 42 L 4 26 A 20 16 0 0 1 44 26 L 44 42"
        stroke={stroke} strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 27 12 L 18 28 L 25 28 L 20 40 L 32 23 L 26 23 Z" fill={bolt} />
    </svg>
  );
}

const chargeOptions: { label: string; chargeClass: string }[] = [
  {
    label: "A — Inter light · tight tracking",
    chargeClass: "font-sans font-light text-sm tracking-[0.12em]",
  },
  {
    label: "B — Inter light · wide tracking",
    chargeClass: "font-sans font-light text-sm tracking-[0.35em]",
  },
  {
    label: "C — Inter regular · medium tracking",
    chargeClass: "font-sans font-normal text-sm tracking-[0.18em]",
  },
  {
    label: "D — Inter medium · confident, minimal tracking",
    chargeClass: "font-sans font-medium text-sm tracking-[0.08em]",
  },
  {
    label: "E — Inter light · large, matches Covenant scale",
    chargeClass: "font-sans font-light text-lg tracking-[0.2em]",
  },
  {
    label: "F — Inter semibold · compact, punchy",
    chargeClass: "font-sans font-semibold text-xs tracking-[0.25em]",
  },
];

export default function LogoVariationsPage() {
  return (
    <div className="min-h-screen bg-covenant-light">
      <div className="bg-covenant-blue text-white px-8 py-10">
        <p className="font-sans text-sm tracking-widest uppercase text-white/50 mb-2">
          Covenant Charge · Brand
        </p>
        <h1 className="font-serif text-4xl font-bold">Logo Variations</h1>
        <p className="mt-2 font-sans text-white/70 max-w-xl">
          Mark variations and CHARGE treatment options. Top and bottom of wordmark now align exactly with the mark.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-8 py-16 space-y-20">

        {/* Arch family */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <h2 className="font-serif text-3xl font-bold text-covenant-blue">Open Arch — Bold</h2>
            <span className="font-sans text-sm text-covenant-muted border border-slate-200 rounded-full px-4 py-1">4 variations</span>
          </div>
          <div className="space-y-6">
            {archVariations.map((v, i) => (
              <VariationCard
                key={v.id}
                index={i}
                name={v.name}
                tag={v.tag}
                description={v.description}
                ratio={v.ratio}
                renderMark={v.light}
              />
            ))}
          </div>
        </section>

        {/* C family */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <h2 className="font-serif text-3xl font-bold text-covenant-blue">Enclosed C</h2>
            <span className="font-sans text-sm text-covenant-muted border border-slate-200 rounded-full px-4 py-1">4 variations</span>
          </div>
          <div className="space-y-6">
            {cVariations.map((v, i) => (
              <VariationCard
                key={v.id}
                index={i}
                name={v.name}
                tag={v.tag}
                description={v.description}
                ratio={v.ratio}
                renderMark={v.light}
              />
            ))}
          </div>
        </section>

        {/* CHARGE treatment picker */}
        <section>
          <div className="mb-2">
            <h2 className="font-serif text-3xl font-bold text-covenant-blue">CHARGE — Treatment Options</h2>
          </div>
          <p className="font-sans text-covenant-muted mb-8">
            All shown with the Wide Gateway mark. Top aligns to top of mark, CHARGE aligns to bottom of mark.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {chargeOptions.map((opt, i) => {
              const sizes = [36, 52] as const;
              return (
                <div key={i} className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
                  <div className="px-5 py-3 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
                    <span className="font-sans text-xs font-semibold text-covenant-blue bg-covenant-blue/10 rounded-full px-2.5 py-0.5">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <p className="font-sans text-xs text-covenant-muted">{opt.label.split("·")[1]?.trim()}</p>
                  </div>
                  {/* Light */}
                  <div className="p-6 flex flex-col gap-6">
                    {sizes.map((w) => {
                      const h = markHeight(w, WIDE_ARCH_RATIO);
                      return (
                        <div key={w} className="flex items-start gap-3">
                          <WideGatewayMark width={w} />
                          <div className="flex flex-col justify-between" style={{ height: h }}>
                            <span className="font-serif font-bold text-xl text-covenant-blue tracking-tight leading-none">
                              Covenant
                            </span>
                            <span className={`${opt.chargeClass} text-covenant-green leading-none`}>
                              CHARGE
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {/* Dark */}
                  <div className="p-6 bg-covenant-blue flex flex-col gap-6">
                    {sizes.map((w) => {
                      const h = markHeight(w, WIDE_ARCH_RATIO);
                      return (
                        <div key={w} className="flex items-start gap-3">
                          <WideGatewayMark width={w} stroke="white" bolt="white" />
                          <div className="flex flex-col justify-between" style={{ height: h }}>
                            <span className="font-serif font-bold text-xl text-white tracking-tight leading-none">
                              Covenant
                            </span>
                            <span className={`${opt.chargeClass} text-white/70 leading-none`}>
                              CHARGE
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <div className="rounded-xl bg-covenant-cream border border-covenant-gold/30 p-8">
          <h3 className="font-serif text-xl font-semibold text-covenant-blue mb-3">Next steps</h3>
          <p className="font-sans text-sm text-covenant-muted leading-relaxed">
            Pick your mark (Arch 1–4 or C 1–4) and your CHARGE treatment (A–F). I will lock both in, update all logo files and the LogoMark component, and we move on to the landing page.
          </p>
        </div>

      </div>
    </div>
  );
}
