import CreativeHeading from '@/components/CreativeHeading';
import { FadeUp } from '@/components/Reveal';
import Rich from '@/components/Rich';
import { Icon } from '@/components/icons';
import { CONTROL, PRIVACY } from '@/content/site';

/*
 * Two trust promises as full-width panels (homepage v2). Control: the copy beside a handoff mock where
 * the AI's work stops at a Send button only you can press. Privacy: what it uses, then a two-stop
 * lifecycle (while you use it, when you delete). Copy is word for word from the approved content and
 * policy; the mocks are decorative and hidden from assistive tech.
 */
const AI_DID = [
  { icon: 'search', title: 'Searched 3 job boards', meta: 'LinkedIn · Indeed · Dice' },
  { icon: 'target', title: 'Scored your resume', meta: '86 / 100 · 3 skills to add' },
  { icon: 'mail', title: 'Drafted the email', meta: 'Senior Frontend Engineer · Northwind Labs' },
];

const DATA_USED = [
  { icon: 'doc', label: 'Resume' },
  { icon: 'target', label: 'Job preferences' },
  { icon: 'mic', label: 'Interview audio' },
  { icon: 'list', label: 'Transcripts' },
];

const LIFECYCLE = ['While you use JobHunter', 'When you delete your account'];

const titleClass = 'font-display text-[clamp(1.9rem,1.3rem+2vw,3.2rem)] font-extrabold leading-[1.05] tracking-[-0.03em]';

export default function Trust() {
  const rest = PRIVACY.paras.slice(0, -1);
  const legal = PRIVACY.paras.at(-1);

  return (
    <section aria-label="Control and privacy" className="relative overflow-hidden bg-light-lavender py-[60px] sm:py-24">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(40%_40%_at_10%_20%,rgba(196,179,234,0.5),transparent),radial-gradient(35%_35%_at_95%_90%,rgba(252,211,77,0.16),transparent)]" />

      <div className="container-x relative space-y-5 lg:space-y-6">
        {/* Control */}
        <FadeUp as="article" y={50} className="grain relative overflow-hidden rounded-[32px] bg-brand-950 text-white shadow-[0_50px_100px_-45px_rgba(26,15,51,0.85)] lg:rounded-[40px]">
          <div aria-hidden="true" className="pointer-events-none absolute -left-24 -top-32 h-96 w-96 rounded-full bg-[radial-gradient(closest-side,rgba(124,92,214,0.35),transparent)]" />
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 right-[10%] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(closest-side,rgba(244,180,0,0.18),transparent)]" />

          <div className="relative z-[2] grid gap-10 p-7 sm:p-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-14 lg:p-14 xl:gap-20 xl:p-16">
            <div className="min-w-0">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/[0.07] py-1 pl-1 pr-3.5 text-xs font-bold uppercase tracking-[0.16em] text-gold-300 ring-1 ring-white/10">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gold-400 text-ink-950" aria-hidden="true">
                  <Icon name="shield" className="h-4 w-4" />
                </span>
                Your call, every time
              </span>
              <CreativeHeading
                lines={[
                  ['You Stay in ', { mark: 'Control' }],
                  ['of Every ', { grad: 'Application', swoosh: true }],
                ]}
                tone="dark"
                className={`mt-6 ${titleClass}`}
              />
              <p className="mt-5 max-w-[34rem] text-lead font-medium text-brand-100">{CONTROL.sub}</p>

              <ol className="mt-8 divide-y divide-white/10 border-y border-white/10">
                {CONTROL.points.map((p, i) => (
                  <li key={p} className="flex gap-5 py-4 text-[16px] font-medium leading-relaxed text-white/85 sm:py-5">
                    <span aria-hidden="true" className="w-7 shrink-0 pt-0.5 font-display text-[13px] font-bold tracking-[0.12em] text-gold-300">
                      0{i + 1}
                    </span>
                    {p}
                  </li>
                ))}
              </ol>
              <p className="mt-6 text-[14px] leading-relaxed text-white/55">{CONTROL.boards}</p>
            </div>

            {/* Handoff mock: the AI's steps end at a Send button that waits for you */}
            <div aria-hidden="true" className="relative min-w-0">
              <div className="rounded-[28px] bg-white/[0.04] p-4 ring-1 ring-white/10 backdrop-blur-sm sm:p-6">
                <div className="flex items-center justify-between px-1">
                  <span className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.16em] text-brand-200">
                    <Icon name="spark" className="h-4 w-4 text-brand-300" />
                    JobHunter did
                  </span>
                  <span className="text-[12px] font-semibold text-white/40">3 of 3</span>
                </div>

                <ul className="relative mt-4 space-y-2.5">
                  <span className="absolute bottom-6 left-[27px] top-6 w-px bg-gradient-to-b from-brand-400/60 to-gold-400/60 sm:left-[29px]" />
                  {AI_DID.map((s) => (
                    <li key={s.title} className="relative flex items-center gap-3.5 rounded-2xl bg-white/[0.05] p-3 ring-1 ring-white/[0.06] sm:p-3.5">
                      <span className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-brand-500/30 text-brand-100 ring-1 ring-brand-300/30">
                        <Icon name={s.icon} className="h-4 w-4" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[14.5px] font-semibold text-white">{s.title}</span>
                        <span className="block truncate text-[12.5px] text-white/50">{s.meta}</span>
                      </span>
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-300">
                        <Icon name="check" className="h-3.5 w-3.5" strokeWidth={3} />
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="my-5 flex items-center gap-3">
                  <span className="h-px flex-1 border-t border-dashed border-gold-400/40" />
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-400 px-3 py-1 text-[11.5px] font-bold uppercase tracking-[0.14em] text-ink-950">
                    <Icon name="user" className="h-3.5 w-3.5" strokeWidth={2.4} />
                    Your turn
                  </span>
                  <span className="h-px flex-1 border-t border-dashed border-gold-400/40" />
                </div>

                <div className="rounded-[20px] bg-white p-4 text-ink-950 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)] sm:p-5">
                  <div className="flex items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-light-lavender px-2.5 py-1 text-[11.5px] font-bold text-brand-700">
                      <Icon name="pen" className="h-3.5 w-3.5" />
                      Draft
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-ink-900/45">
                      <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
                      Not sent
                    </span>
                  </div>
                  <p className="mt-3.5 text-[13px] text-ink-900/50">
                    To: <span className="font-semibold text-ink-900/80">Hiring team, Northwind Labs</span>
                  </p>
                  <p className="mt-1 text-[14.5px] font-bold">Application: Senior Frontend Engineer</p>
                  <div className="mt-3.5 space-y-2">
                    <span className="block h-2 w-full rounded-full bg-ink-900/[0.07]" />
                    <span className="block h-2 w-[92%] rounded-full bg-ink-900/[0.07]" />
                    <span className="block h-2 w-[64%] rounded-full bg-ink-900/[0.07]" />
                  </div>
                  <div className="mt-5 flex items-center justify-between gap-3 border-t border-hairline pt-4">
                    <span className="text-[12px] font-medium text-ink-900/50">Waits here until you press Send</span>
                    <span className="flex items-center gap-2">
                      <span className="rounded-xl px-3.5 py-2 text-[13px] font-semibold text-ink-900/70 ring-1 ring-ink-900/10">Edit</span>
                      <span className="relative inline-flex items-center gap-1.5 rounded-xl bg-gold-400 px-4 py-2 text-[13px] font-bold text-ink-950">
                        <span className="absolute inset-0 animate-ping rounded-xl bg-gold-400/50 motion-reduce:hidden [animation-duration:2.4s]" />
                        <span className="relative">Send</span>
                        <Icon name="arrow" className="relative h-3.5 w-3.5" strokeWidth={2.4} />
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeUp>

        {/* Privacy */}
        <FadeUp as="article" y={50} delay={0.08} className="relative overflow-hidden rounded-[32px] border border-hairline bg-white shadow-[0_40px_80px_-50px_rgba(26,15,51,0.6)] lg:rounded-[40px]">
          <div className="grid gap-10 p-7 sm:p-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14 lg:p-14 xl:gap-20 xl:p-16">
            <div className="min-w-0">
              <span className="inline-flex items-center gap-2 rounded-full bg-light-lavender py-1 pl-1 pr-3.5 text-xs font-bold uppercase tracking-[0.16em] text-brand-600">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-950 text-gold-400" aria-hidden="true">
                  <Icon name="doc" className="h-4 w-4" />
                </span>
                Your data
              </span>
              <CreativeHeading
                lines={[
                  ['What Happens to ', { mark: 'Your Resume' }],
                  ['and ', { chip: 'mic' }, ' Recordings'],
                ]}
                className={`mt-6 text-ink-950 ${titleClass}`}
              />

              <p className="mt-8 text-[12px] font-bold uppercase tracking-[0.16em] text-ink-900/45">What it uses</p>
              <ul className="mt-3 grid grid-cols-2 gap-2.5">
                {DATA_USED.map((d) => (
                  <li key={d.label} className="flex items-center gap-2.5 rounded-2xl border border-hairline bg-[#faf9ff] p-2.5 text-[14.5px] font-semibold text-ink-950">
                    <span aria-hidden="true" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white text-brand-600 ring-1 ring-brand-100">
                      <Icon name={d.icon} className="h-4 w-4" />
                    </span>
                    {d.label}
                  </li>
                ))}
              </ul>
              <p className="mt-6 flex items-center gap-3 rounded-2xl border border-dashed border-brand-200 px-5 py-4 text-[15.5px] text-ink-900/75">
                <Icon name="book" className="h-5 w-5 shrink-0 text-brand-500" />
                <span>
                  <Rich text={legal} />
                </span>
              </p>
            </div>

            <div className="min-w-0 lg:pt-2">
              <ol className="relative space-y-4">
                {rest.map((p, i) => (
                  <li key={p} className="relative flex gap-5 rounded-[24px] bg-light-lavender/70 p-5 sm:p-6">
                    <span aria-hidden="true" className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-brand-700 shadow-[0_10px_24px_-14px_rgba(75,46,131,0.6)] ring-1 ring-brand-100 sm:-ml-1">
                      <Icon name={i === 0 ? 'refresh' : 'shield'} className="h-5 w-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-display text-[1.1rem] font-bold text-ink-950">{LIFECYCLE[i]}</span>
                      <span className="mt-1.5 block text-[16px] leading-relaxed text-ink-900/75">{p}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
