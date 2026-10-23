'use client';

import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from '@/lib/gsap';
import Rich from '@/components/Rich';
import { Icon } from '@/components/icons';
import { Block } from '@/components/page/Blocks';
import { AppMark, BoardMark, Head, SampleTag, Tick, Who, pick } from './shared';

/*
 * Step 4, "Your match" (deep brand stage): the resume-vs-role match screen. The sample returner's resume
 * lines sit opposite what one Accounts Payable role asks for, row by row, each pair tagged: carries over,
 * older name, refresh soon, gap for now; the score is a big numeral with a 20-block strip. As the screen
 * scrolls in (desktop) a scan line runs down the rows and the gold links draw across, one scrubbed
 * timeline over a finished screen (dashed links are always there). Reading the check list lights the
 * part of the screen each item is about. Below, the callout sits beside the drafted application email,
 * which stops at a Send button only you press. Screens are decorative sample data (aria-hidden).
 */

const SCORE = 84;
const ROWS = [
  { have: 'Processed vendor invoices end to end, 2015 – 2022', need: 'Invoice processing', kind: 'ok', tag: 'Carries over', grp: 0 },
  { have: 'Monthly vendor reconciliations', need: 'Account reconciliation', kind: 'ok', tag: 'Carries over', grp: 0 },
  { have: 'Nonprofit bookkeeping, 2023 – 2025 (volunteer)', need: 'Recent hands-on work', kind: 'ok', tag: 'Carries over', grp: 0 },
  { have: 'PO matching', need: 'Three-way matching', kind: 'old', tag: 'Older name', grp: 1 },
  { have: 'Accounting software refresher course', need: 'NetSuite', kind: 'soon', tag: 'Refresh soon', grp: 1 },
  { have: null, need: 'Coupa', kind: 'gap', tag: 'Gap for now', grp: 1 },
];
const TAG = {
  ok: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  old: 'bg-brand-50 text-brand-700 ring-brand-200',
  soon: 'bg-gold-50 text-gold-800 ring-gold-300',
  gap: 'bg-rose-50 text-rose-700 ring-rose-200',
};
// Literal classes for "this part of the screen is what the list item you are reading is about"
const FOCUS = {
  0: 'group-data-[focus=0]/ms:opacity-100',
  1: 'group-data-[focus=1]/ms:opacity-100',
  2: 'group-data-[focus=2]/ms:opacity-100',
};
const Glow = ({ g, className = 'rounded-2xl' }) => <span className={`pointer-events-none absolute -inset-[3px] -z-[1] bg-gold-50 opacity-0 ring-2 ring-gold-400 transition-opacity duration-500 ${className} ${FOCUS[g]}`} />;

function MatchScreen() {
  return (
    <div data-ms data-focus="-1" aria-hidden="true" className="group/ms relative min-w-0 overflow-hidden rounded-[30px] bg-white text-ink-950 shadow-[0_70px_140px_-60px_rgba(0,0,0,0.85)] ring-1 ring-white/15">
      {/* Chrome with the two resume versions */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2.5 border-b border-hairline px-4 py-3 sm:px-5">
        <span className="flex items-center gap-2.5">
          <AppMark />
          <span className="font-display text-[14px] font-extrabold tracking-[-0.02em]">Resume match</span>
        </span>
        <span className="relative isolate flex items-center gap-1 rounded-full bg-light-lavender p-1 text-[11.5px] font-bold ring-1 ring-brand-100">
          <Glow g={2} className="rounded-full" />
          <span className="rounded-full bg-brand-950 px-2.5 py-1 text-gold-300">v1 · Accounts payable</span>
          <span className="px-2.5 py-1 text-ink-900/65">v2 · Bookkeeping</span>
        </span>
        <span className="ml-auto flex items-center gap-2.5">
          <SampleTag />
          <span className="hidden xl:inline-flex">
            <Who />
          </span>
        </span>
      </div>

      {/* The role and its score */}
      <div className="grid grid-cols-[minmax(0,1fr)] items-center gap-4 bg-[linear-gradient(180deg,#f7f4ff,#ffffff)] px-4 py-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:px-5">
        <span className="flex min-w-0 items-center gap-3">
          <BoardMark board="Indeed" className="h-11 w-11 text-[15px]" />
          <span className="min-w-0">
            <span className="block font-display text-[16px] font-bold leading-tight tracking-[-0.01em]">Accounts Payable Specialist</span>
            <span className="mt-0.5 block text-[12px] font-medium text-ink-900/60">Northwind Labs · Indeed · Hybrid</span>
          </span>
        </span>
        <span className="min-w-0 sm:w-[220px]">
          <span className="flex items-end justify-between gap-2">
            <span className="font-display leading-none">
              <span className="text-[2.9rem] font-extrabold tracking-[-0.05em]">{SCORE}</span>
              <span className="ml-0.5 text-[14px] font-bold text-ink-900/45">/100</span>
            </span>
            <span className="pb-1 text-right text-[11.5px] font-bold leading-tight text-brand-600">
              Match score
              <br />
              for this job
            </span>
          </span>
          <span className="mt-2 grid grid-cols-[repeat(20,minmax(0,1fr))] gap-[3px]">
            {Array.from({ length: 20 }, (_, i) => (
              <span key={i} className={`h-2.5 rounded-[2px] ${i < 17 ? (i < 12 ? 'bg-brand-500' : 'bg-gold-400') : 'bg-brand-100'}`} />
            ))}
          </span>
        </span>
      </div>

      {/* Your resume ↔ the job, row by row */}
      <div className="px-3 pb-3 sm:px-5 sm:pb-4">
        <div className="hidden grid-cols-[minmax(0,1fr)_44px_minmax(0,1fr)] px-1 pb-2 pt-1 text-[11px] font-bold uppercase tracking-[0.14em] text-brand-600 sm:grid">
          <span>On your resume</span>
          <span />
          <span>This job asks for</span>
        </div>
        <div data-rows className="relative">
          <span data-scan className="pointer-events-none absolute inset-x-0 top-0 z-[2] hidden h-10 -translate-y-full opacity-0 sm:block">
            <span className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(249,195,32,0.18))]" />
            <span className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-emerald-400 via-gold-400 to-emerald-400" />
          </span>
          <ul className="space-y-1.5">
            {ROWS.map((r) => (
              <li key={r.need} data-mrow className="relative isolate grid grid-cols-[minmax(0,1fr)] gap-1.5 rounded-2xl bg-light-lavender/70 p-2 ring-1 ring-brand-100 sm:grid-cols-[minmax(0,1fr)_44px_minmax(0,1fr)] sm:items-center sm:gap-0">
                <Glow g={r.grp} />
                {r.have ? (
                  <span className="rounded-xl bg-white px-3 py-2 text-[12.5px] font-semibold leading-snug text-ink-900/85 ring-1 ring-hairline">{r.have}</span>
                ) : (
                  <span className="rounded-xl border border-dashed border-rose-300 bg-rose-50/60 px-3 py-2 text-[12.5px] font-semibold leading-snug text-rose-700">Not on your resume yet</span>
                )}
                <svg viewBox="0 0 44 16" className="mx-auto hidden h-4 w-11 overflow-visible sm:block">
                  <path d="M4 8h36" fill="none" stroke="#c4b3ea" strokeWidth="1.6" strokeDasharray="2 4" strokeLinecap="round" />
                  <path data-link d="M4 8h36" pathLength="1" strokeDasharray="1 1" fill="none" stroke={r.kind === 'gap' ? '#f43f5e' : '#f4b400'} strokeWidth="2.6" strokeLinecap="round" />
                  <circle cx="4" cy="8" r="3" fill="#1a0f33" />
                  <circle cx="40" cy="8" r="3" fill={r.kind === 'gap' ? '#f43f5e' : '#f4b400'} />
                </svg>
                <span className="flex min-w-0 flex-wrap items-center justify-between gap-2 rounded-xl bg-white px-3 py-2 ring-1 ring-hairline">
                  <span className="min-w-0 text-[13px] font-bold leading-snug text-ink-950">{r.need}</span>
                  <span data-tag className={`inline-flex shrink-0 items-center gap-1.5 rounded-full py-0.5 pl-0.5 pr-2 text-[11px] font-bold ring-1 ${TAG[r.kind]}`}>
                    <Tick kind={r.kind} className="h-4 w-4" />
                    {r.tag}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Fix first, then the draft */}
      <div className="flex flex-wrap items-center gap-3 border-t border-hairline bg-brand-950 px-4 py-3 text-white sm:px-5">
        <span className="flex min-w-0 flex-1 items-center gap-2.5">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-gold-400 text-ink-950">
            <Icon name="spark" className="h-4 w-4" />
          </span>
          <span className="min-w-0 text-[12.5px] font-semibold leading-snug text-white/85">
            <span className="font-bold text-gold-300">Fix first: </span>
            write “three-way matching” next to PO matching
          </span>
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[12px] font-bold text-ink-950">
          <Icon name="mail" className="h-3.5 w-3.5" />
          Draft email
        </span>
      </div>
    </div>
  );
}

function EmailDraft() {
  return (
    <div data-email aria-hidden="true" className="relative min-w-0 overflow-hidden rounded-[28px] bg-white text-ink-950 shadow-[0_60px_120px_-60px_rgba(0,0,0,0.85)] ring-1 ring-white/15">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-hairline px-4 py-3 sm:px-5">
        <span className="flex items-center gap-2.5">
          <AppMark />
          <span className="font-display text-[14px] font-extrabold tracking-[-0.02em]">Application email</span>
        </span>
        <span className="rounded-full bg-gold-100 px-2.5 py-1 text-[11px] font-bold text-gold-800">Draft · yours to edit</span>
        <SampleTag className="ml-auto" />
      </div>
      <div className="space-y-2 px-4 pt-3 text-[12.5px] sm:px-5">
        <p className="flex gap-3 border-b border-hairline pb-2">
          <span className="w-14 shrink-0 font-semibold text-ink-900/55">To</span>
          <span className="font-semibold">Hiring team, Northwind Labs</span>
        </p>
        <p className="flex gap-3 border-b border-hairline pb-2">
          <span className="w-14 shrink-0 font-semibold text-ink-900/55">Subject</span>
          <span className="font-bold">Accounts Payable Specialist application</span>
        </p>
      </div>
      <div className="space-y-2.5 px-4 py-4 text-[13.5px] leading-relaxed text-ink-900/85 sm:px-5">
        <p data-line>Hello Northwind Labs team,</p>
        <p data-line>I am applying for the Accounts Payable Specialist role. I ran vendor invoices and monthly reconciliations for six years, and I have kept my bookkeeping current with a local nonprofit during a three-year career break.</p>
        <p data-line>My resume is attached. I would welcome a short call about the role.</p>
        <p data-line className="font-semibold">Elena</p>
      </div>
      <div className="flex flex-wrap items-center gap-2.5 border-t border-hairline bg-light-lavender px-4 py-3 sm:px-5">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-[12.5px] font-bold text-ink-950 ring-1 ring-brand-200">
          <Icon name="pen" className="h-3.5 w-3.5" />
          Edit
        </span>
        <span className="text-[12px] font-semibold text-ink-900/60">Nothing is sent until you press Send.</span>
        <span data-send className="relative ml-auto inline-flex items-center gap-2 rounded-full bg-brand-950 px-5 py-2.5 text-[13px] font-bold text-gold-300 shadow-[0_12px_24px_-12px_rgba(26,15,51,0.8)]">
          Send
          <Icon name="arrow" className="h-3.5 w-3.5" strokeWidth={2.6} />
          <span data-cursor className="absolute -bottom-4 right-3 text-ink-950">
            <svg viewBox="0 0 24 24" className="h-6 w-6 drop-shadow-[0_2px_2px_rgba(0,0,0,0.25)]">
              <path d="M5 3l14 8-6 1.5L10 19z" fill="#fff" stroke="#15121f" strokeWidth="1.6" strokeLinejoin="round" />
            </svg>
          </span>
        </span>
      </div>
    </div>
  );
}

export default function MatchSection({ s, n }) {
  const root = useRef(null);
  const lead = pick(s, 'p');
  const list = pick(s, 'list');
  const callout = pick(s, 'callout');
  const others = (s.blocks || []).filter((b) => ![lead, list, callout].includes(b));

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        gsap
          .timeline({ scrollTrigger: { trigger: root.current, start: 'top 70%', once: true } })
          .from(q('[data-intro]'), { y: 30, opacity: 0, duration: 1.1 }, 0.1)
          .from(q('[data-ms]'), { y: 80, scale: 0.95, opacity: 0, duration: 1.4 }, 0.2)
          .from(q('[data-lead]'), { y: 40, opacity: 0, duration: 1.1 }, 0.3);
        const items = q('[data-check]');
        gsap.set(items, { x: -40, opacity: 0 });
        ScrollTrigger.batch(items, { start: 'top 90%', once: true, onEnter: (els) => gsap.to(els, { x: 0, opacity: 1, stagger: 0.1, duration: 1, overwrite: true }) });

        gsap
          .timeline({ scrollTrigger: { trigger: q('[data-handoff]')[0], start: 'top 82%', once: true } })
          .from(q('[data-callout]'), { y: 50, opacity: 0, duration: 1.2 }, 0)
          .from(q('[data-email]'), { y: 60, rotation: 1.5, opacity: 0, duration: 1.3 }, 0.1)
          .from(q('[data-line]'), { y: 12, opacity: 0, stagger: 0.12, duration: 0.8 }, 0.5)
          .from(q('[data-cursor]'), { x: -140, y: -60, opacity: 0, duration: 1.2, ease: 'power3.inOut' }, 1.1)
          .to(q('[data-send]'), { scale: 0.94, duration: 0.15, ease: 'power2.in' }, 2.2)
          .to(q('[data-send]'), { scale: 1, duration: 0.6, ease: 'back.out(3)' }, 2.35);
      });

      // Desktop: one scrubbed timeline as the screen scrolls in: the scan runs down, the links draw, tags pop
      mm.add(`(min-width: 1024px) and ${MOTION_OK}`, () => {
        const rows = q('[data-mrow]');
        const box = q('[data-rows]')[0];
        const tl = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: q('[data-ms]')[0], start: 'top 75%', end: 'center 45%', scrub: 0.3 } });
        tl.set(q('[data-scan]'), { opacity: 1 }, 0)
          .fromTo(q('[data-scan]'), { y: 0 }, { y: () => box.offsetHeight + 40, duration: rows.length }, 0)
          .set(q('[data-scan]'), { opacity: 0 }, rows.length);
        rows.forEach((r, i) => {
          tl.fromTo(r.querySelector('[data-link]'), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.6 }, i + 0.2).from(r.querySelector('[data-tag]'), { scale: 0.6, duration: 0.4, ease: 'back.out(2.5)' }, i + 0.6);
        });

        // The check list item you are reading lights the part of the screen it is about
        const screen = q('[data-ms]')[0];
        const items = q('[data-check]');
        let cur = -2;
        const show = (i) => {
          if (i === cur) return;
          cur = i;
          screen.dataset.focus = String(i);
          items.forEach((el, k) => (el.dataset.on = k === i ? 'true' : 'false'));
        };
        const st = ScrollTrigger.create({
          trigger: q('[data-checks]')[0],
          start: 'top 60%',
          end: 'bottom 40%',
          onUpdate: (self) => show(Math.min(items.length - 1, Math.floor(self.progress * items.length))),
          onLeave: () => show(-1),
          onLeaveBack: () => show(-1),
        });
        return () => {
          st.kill();
          screen.dataset.focus = '-1';
          items.forEach((el) => delete el.dataset.on);
        };
      });
    },
    { scope: root }
  );

  return (
    <section id={s.id} ref={root} aria-labelledby={`${s.id}-title`} className="grain relative scroll-mt-24 overflow-hidden bg-brand-950 py-16 text-white sm:py-24 lg:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(45%_35%_at_15%_0%,rgba(109,76,176,0.5),transparent),radial-gradient(40%_40%_at_80%_45%,rgba(109,76,176,0.38),transparent),radial-gradient(30%_25%_at_10%_100%,rgba(244,180,0,0.13),transparent)]" />
      <div className="container-x relative z-[2]">
        <Head s={s} n={n} tone="dark" />

        <div className="mt-12 grid grid-cols-[minmax(0,1fr)] gap-10 sm:mt-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-start lg:gap-12 xl:gap-16">
          <div className="min-w-0">
            {lead && (
              <p data-lead className="text-[clamp(1.05rem,0.98rem+0.3vw,1.22rem)] font-medium leading-relaxed text-brand-100">
                <Rich text={lead.text} tone="dark" />
              </p>
            )}
            {list && (
              <ul data-checks className="mt-8 space-y-3">
                {list.items.map((t, i) => (
                  <li key={i} data-check className="group/chk relative isolate grid grid-cols-[auto_minmax(0,1fr)] items-start gap-4 rounded-[22px] bg-white/[0.05] p-4 ring-1 ring-white/10 transition-transform duration-500 data-[on=true]:translate-x-1.5 sm:p-5">
                    <span aria-hidden="true" className="pointer-events-none absolute inset-0 -z-[1] rounded-[22px] bg-white/[0.06] opacity-0 ring-2 ring-inset ring-gold-400/80 transition-opacity duration-500 group-data-[on=true]/chk:opacity-100" />
                    <span aria-hidden="true" className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gold-400 text-ink-950">
                      <Icon name={['check', 'question', 'layers'][i] || 'check'} className="h-5 w-5" strokeWidth={2.6} />
                    </span>
                    <p className="min-w-0 pt-1.5 text-[16px] leading-relaxed text-white/85 sm:text-[16.5px]">
                      <Rich text={t} tone="dark" />
                    </p>
                  </li>
                ))}
              </ul>
            )}
            <div aria-hidden="true" className="mt-6 grid grid-cols-2 gap-2 rounded-[22px] bg-white/[0.04] p-3 ring-1 ring-white/10 sm:grid-cols-4">
              {[
                ['ok', 'Carries over'],
                ['old', 'Older name'],
                ['soon', 'Refresh soon'],
                ['gap', 'Gap for now'],
              ].map(([k, t]) => (
                <span key={k} className="flex items-center gap-2 rounded-xl bg-white/[0.05] px-2.5 py-2 text-[12px] font-bold text-white/85">
                  <Tick kind={k} className="h-5 w-5" />
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="min-w-0 [@media(min-width:1024px)_and_(min-height:820px)]:sticky [@media(min-width:1024px)_and_(min-height:820px)]:top-28">
            <MatchScreen />
          </div>
        </div>

        {/* The score is a guide; the email is drafted, and you send it */}
        <div data-handoff className="mt-14 grid grid-cols-[minmax(0,1fr)] items-stretch gap-6 sm:mt-20 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-12 xl:gap-16">
          {callout && (
            <aside data-callout className="relative flex min-w-0 flex-col justify-between gap-6 overflow-hidden rounded-[30px] bg-gold-400 p-6 text-ink-950 sm:p-8">
              <span aria-hidden="true" className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.45),transparent)]" />
              <div className="relative">
                <div aria-hidden="true" className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-ink-950 px-3 py-1.5 text-[12px] font-bold text-gold-300">
                    <Icon name="compass" className="h-4 w-4" />A guide
                  </span>
                  <span className="relative inline-flex items-center rounded-full bg-white/60 px-3 py-1.5 text-[12px] font-bold text-ink-950/60">
                    A prediction
                    <span className="absolute inset-x-2 top-1/2 h-[2px] -rotate-6 rounded bg-ink-950/60" />
                  </span>
                </div>
                {callout.title && <p className="mt-5 font-display text-[clamp(1.5rem,1.2rem+1vw,2.2rem)] font-extrabold leading-tight tracking-[-0.025em]">{callout.title}</p>}
                <p className="mt-3 text-[16.5px] leading-relaxed text-ink-950/85 sm:text-[17px]">
                  <Rich text={callout.text} />
                </p>
              </div>
              <ol aria-hidden="true" className="relative flex flex-wrap items-center gap-2">
                {['JobHunter drafts', 'You edit', 'You send'].map((t, i) => (
                  <li key={t} className="flex items-center gap-2">
                    <span className={`inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-[13px] font-bold ${i === 2 ? 'bg-ink-950 text-gold-300' : 'bg-white/70 text-ink-950'}`}>
                      <Icon name={['mail', 'pen', 'user'][i]} className="h-4 w-4" />
                      {t}
                    </span>
                    {i < 2 && (
                      <svg viewBox="0 0 24 12" className="h-3 w-6 text-ink-950/60">
                        <path d="M1 6h18M15 2l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </li>
                ))}
              </ol>
            </aside>
          )}
          <EmailDraft />
        </div>

        {others.length > 0 && (
          <div className="mt-8 space-y-5">
            {others.map((b, i) => (
              <Block key={i} b={b} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
