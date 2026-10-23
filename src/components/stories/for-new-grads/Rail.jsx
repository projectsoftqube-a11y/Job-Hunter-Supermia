import { MODS, mod } from './shared';

/*
 * The sticky syllabus rail (desktop only). Compact at lg (module numbers on a spine), full at xl (titles,
 * per-module progress bars, "now reading"). NewGradsStory drives it with one scrubbed trigger per
 * module: bars and spine segments scale, nodes switch data-state (todo / active / done) and the overall
 * percentage is written straight to the DOM.
 */
export default function Rail({ sections }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-30 hidden lg:block">
      <div className="container-x h-full">
        <div className="h-full w-[80px] py-16 xl:w-[196px] lg:py-24">
          <nav
            aria-label="Syllabus"
            data-rail
            className="grain pointer-events-auto sticky top-[96px] flex h-[calc(100svh-120px)] max-h-[720px] flex-col overflow-hidden rounded-[26px] bg-brand-950 px-3 py-5 text-white shadow-[0_40px_80px_-40px_rgba(26,15,51,0.85)] ring-1 ring-white/10 xl:px-4"
          >
            <div aria-hidden="true" className="pointer-events-none absolute -left-16 -top-20 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(109,76,176,0.55),transparent_65%)]" />
            <div className="relative z-[2] flex h-full flex-col">
              <div className="text-center xl:text-left">
                <p className="hidden text-[10.5px] font-extrabold uppercase tracking-[0.18em] text-gold-300 xl:block">Syllabus</p>
                <p className="hidden font-display text-[15px] font-bold leading-tight text-white xl:mt-1 xl:block">Your first-job course</p>
                <p aria-hidden="true" className="font-display text-[1.35rem] font-extrabold leading-none tabular-nums tracking-[-0.03em] xl:mt-4 xl:text-[2.1rem]">
                  <span data-rail-pct>0</span>
                  <span className="text-[0.55em] text-white/45">%</span>
                </p>
                <p aria-hidden="true" className="mt-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white/40 xl:text-[10.5px]">
                  read
                </p>
              </div>

              <ol className="mt-6 flex min-h-0 flex-1 flex-col">
                {sections.map((s, i) => {
                  const last = i === sections.length - 1;
                  const m = mod(i);
                  return (
                    <li key={s.id} className={`flex min-h-0 flex-col ${last ? '' : 'flex-1'}`}>
                      <a
                        href={`#${s.id}`}
                        data-rail-node
                        data-state="todo"
                        aria-label={`Module ${i + 1}: ${s.eyebrow}`}
                        className="group flex items-center justify-center gap-3 rounded-2xl xl:justify-start"
                      >
                        <span
                          className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-display text-[14px] font-extrabold text-white/60 ring-2 ring-white/15 transition-colors duration-300 group-hover:ring-white/40 group-data-[state=active]:ring-0 group-data-[state=done]:bg-white/10 group-data-[state=done]:ring-gold-400/50 ${m.railOn}`}
                        >
                          <span className="group-data-[state=done]:opacity-0">{i + 1}</span>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="absolute h-4 w-4 text-gold-400 opacity-0 group-data-[state=done]:opacity-100">
                            <path d="M5 12.5l4.5 4.5L19 7.5" />
                          </svg>
                        </span>
                        <span className="hidden min-w-0 flex-1 xl:block">
                          <span className="block text-[10px] font-bold uppercase tracking-[0.16em] text-white/45">Module {i + 1}</span>
                          <span className="block truncate font-display text-[14px] font-bold text-white/70 transition-colors group-hover:text-white group-data-[state=active]:text-white">{s.eyebrow}</span>
                          <span className="mt-1.5 block h-1 overflow-hidden rounded-full bg-white/10">
                            <span data-rail-bar className={`block h-full origin-left scale-x-0 rounded-full ${m.fill}`} />
                          </span>
                        </span>
                      </a>
                      {!last && (
                        <span aria-hidden="true" className="mx-auto my-2 block min-h-4 w-[2px] flex-1 overflow-hidden rounded-full bg-white/10 xl:ml-[19px]">
                          <span data-rail-seg className="block h-full w-full origin-top scale-y-0 bg-linear-to-b from-gold-400 to-brand-300" />
                        </span>
                      )}
                    </li>
                  );
                })}
              </ol>

              <div aria-hidden="true" className="mt-5 hidden rounded-2xl bg-white/[0.06] p-3 ring-1 ring-white/10 xl:block">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/45">Now reading</p>
                <p data-rail-now className="mt-0.5 truncate font-display text-[13.5px] font-bold text-white">
                  Module 1 · {sections[0]?.eyebrow}
                </p>
              </div>
              <div aria-hidden="true" className="mt-4 flex justify-center gap-1 xl:hidden">
                {MODS.slice(0, sections.length).map((x, i) => (
                  <span key={i} className={`h-1 w-2 rounded-full ${x.fill} opacity-60`} />
                ))}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
