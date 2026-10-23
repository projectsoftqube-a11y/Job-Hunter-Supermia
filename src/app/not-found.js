import NotFoundSearch from "@/components/NotFoundSearch";

export const metadata = {
  title: { absolute: "Page Not Found | JobHunter by SuperMIA" },
  description:
    "This page is not here. Pick up your job hunt from the JobHunter home page, features, pricing, blog or FAQ.",
};

// Decorative sample matches floating around the 404 (desktop only)
const FLOATERS = [
  {
    title: "Frontend Engineer",
    place: "Northwind Labs",
    score: 95,
    pos: "left-0 top-0",
    rot: "-rotate-6",
    delay: "0s",
  },
  {
    title: "Product Analyst",
    place: "Brightpath Software",
    score: 88,
    pos: "right-0 top-[4%]",
    rot: "rotate-6",
    delay: "-2s",
  },
  {
    title: "UI Designer",
    place: "Lumen Studio",
    score: 91,
    pos: "left-[4%] bottom-[2%]",
    rot: "rotate-3",
    delay: "-4s",
  },
  {
    title: "Ops Coordinator",
    place: "Northwind Labs",
    score: 84,
    pos: "right-0 bottom-0",
    rot: "-rotate-3",
    delay: "-1s",
  },
];

/*
 * 404 in JobHunter's own language: the zero is a match ring reading "0% match", surrounded by sample
 * roles that do match. Below, the quick finder and the main pages. Next.js adds noindex for 404s.
 */
export default function NotFound() {
  return (
    <main
      id="main"
      className="relative isolate overflow-hidden bg-gradient-to-b from-white via-[#f8f6ff] to-light-lavender pb-40 pt-[120px] sm:pb-56 sm:pt-[150px]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-[1]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(40%_35%_at_50%_10%,rgba(196,179,234,0.55),transparent),radial-gradient(30%_30%_at_85%_60%,rgba(252,211,77,0.18),transparent)]" />
        <div
          className="absolute inset-0 opacity-70"
          style={{
            backgroundImage:
              "radial-gradient(rgba(75,46,131,0.12) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
            maskImage:
              "radial-gradient(ellipse 60% 55% at 50% 30%, black, transparent 75%)",
          }}
        />
      </div>

      <div className="container-x grid grid-cols-[minmax(0,1fr)] items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14">
        {/* Left: 4 [0% match ring] 4, with sample matches in the corners */}
        <div className="relative flex min-w-0 items-center justify-center lg:min-h-[500px]">
          {FLOATERS.map((f) => (
            <div
              key={f.title}
              aria-hidden="true"
              className={`absolute hidden lg:block ${f.pos}`}
            >
              <div
                className={`flex items-center gap-3 rounded-2xl bg-white p-3 pr-4 text-left shadow-[0_24px_50px_-26px_rgba(26,15,51,0.45)] ring-1 ring-ink-900/[0.06] motion-safe:animate-[floaty_7s_ease-in-out_infinite] ${f.rot}`}
                style={{ animationDelay: f.delay }}
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-light-lavender font-display text-[15px] font-extrabold text-brand-600">
                  {f.place[0]}
                </span>
                <span>
                  <span className="block text-[13px] font-bold text-ink-950">
                    {f.title}
                  </span>
                  <span className="block text-[11.5px] text-ink-900/50">
                    {f.place}
                  </span>
                </span>
                <span className="ml-1 rounded-full bg-emerald-50 px-2 py-1 text-[11.5px] font-bold text-emerald-600">
                  {f.score}%
                </span>
              </div>
            </div>
          ))}

          <p
            aria-hidden="true"
            className="relative flex items-center justify-center gap-[0.06em] font-display text-[clamp(6rem,3.5rem+9vw,9.5rem)] font-extrabold leading-none tracking-[-0.06em] text-brand-950"
          >
            <span>4</span>
            <span className="relative inline-flex h-[0.86em] w-[0.86em] items-center justify-center">
              <svg
                viewBox="0 0 100 100"
                className="absolute inset-0 h-full w-full"
              >
                <defs>
                  <linearGradient id="nf-ring" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#7c5cd6" />
                    <stop offset="100%" stopColor="#f9c320" />
                  </linearGradient>
                </defs>
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="#fff"
                  stroke="url(#nf-ring)"
                  strokeWidth="9"
                />
              </svg>
              <span className="absolute inset-0 motion-safe:animate-[spin_6s_linear_infinite]">
                <span className="absolute left-1/2 top-[1%] h-[0.11em] w-[0.11em] -translate-x-1/2 rounded-full bg-gold-400 shadow-[0_0_0_0.04em_rgba(249,195,32,0.3)]" />
              </span>
              <span className="relative flex flex-col items-center leading-none">
                <span className="font-display text-[0.32em] font-extrabold tracking-[-0.04em] text-brand-950">
                  0%
                </span>
                <span className="mt-[0.06em] text-[0.1em] font-bold uppercase tracking-[0.18em] text-brand-500">
                  match
                </span>
              </span>
            </span>
            <span>4</span>
          </p>
        </div>

        {/* Right: message, finder and pages */}
        <div className="min-w-0 text-center lg:text-left">
          <h1 className="mx-auto max-w-[40rem] lg:mx-0 font-display text-[clamp(1.9rem,1.3rem+2vw,3rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-ink-950">
            This page is a{" "}
            <span className="bg-gradient-to-r from-brand-600 to-gold-500 bg-clip-text text-transparent">
              0% match
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-[34rem] lg:mx-0 text-[clamp(1rem,0.95rem+0.25vw,1.15rem)] leading-relaxed text-ink-900/65">
            It may have moved, or the link may be mistyped. Search below or pick
            one of the pages that does fit.
          </p>
          <NotFoundSearch />
        </div>
      </div>
    </main>
  );
}
