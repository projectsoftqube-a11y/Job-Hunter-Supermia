'use client';

import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from '@/lib/gsap';
import Rich from '@/components/Rich';
import { Icon } from '@/components/icons';
import { Block } from '@/components/page/Blocks';
import { Head, SampleTag, pick } from './shared';

/*
 * Step 3, "Your gap": a live interview transcript in the JobHunter call screen, synced with the answer
 * list. The left column holds the three parts of a clear answer and the follow-up questions (real
 * cards); the right column holds the transcript, which is the page's example answer itself (label, meta
 * and its three lines, real text) under the gap question, with a follow-up slot below. On desktop the
 * transcript is sticky and, as you read down the left column, the part you are reading lights up in
 * the transcript and the follow-up slot moves to the question you have reached (one ScrollTrigger,
 * DOM attributes only, CSS transitions on opacity/transform). Every state is a complete transcript.
 */

const PARTS = ['What you did', 'What you kept up', 'Why now'];

// Literal classes per focus key, so Tailwind sees them
const RING = {
  q0: 'group-data-[focus=q0]/tr:opacity-100',
  a0: 'group-data-[focus=a0]/tr:opacity-100',
  a1: 'group-data-[focus=a1]/tr:opacity-100',
  a2: 'group-data-[focus=a2]/tr:opacity-100',
  f: 'group-data-[focus=f]/tr:opacity-100',
};
const FU = {
  1: 'group-data-[fu=1]/tr:opacity-100 group-data-[fu=1]/tr:translate-y-0',
  2: 'group-data-[fu=2]/tr:opacity-100 group-data-[fu=2]/tr:translate-y-0',
  3: 'group-data-[fu=3]/tr:opacity-100 group-data-[fu=3]/tr:translate-y-0',
};

function Lit({ k, className = 'rounded-2xl' }) {
  return <span aria-hidden="true" className={`pointer-events-none absolute inset-0 opacity-0 ring-2 ring-inset ring-gold-400 transition-opacity duration-500 ${className} ${RING[k]}`} />;
}

function Transcript({ example, questions }) {
  const first = questions[0];
  const follow = questions.slice(1, 4);
  return (
    <div data-tr data-focus="q0" data-fu="1" className="group/tr relative overflow-hidden rounded-[30px] bg-brand-950 text-white shadow-[0_60px_120px_-60px_rgba(26,15,51,0.85)] ring-1 ring-brand-900">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_40%_at_85%_0%,rgba(109,76,176,0.6),transparent),radial-gradient(40%_30%_at_0%_100%,rgba(244,180,0,0.12),transparent)]" />

      {/* Call header with the example's label and meta */}
      <div className="relative flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-white/10 px-4 py-3.5 sm:px-5">
        <span aria-hidden="true" className="inline-flex items-center gap-2 rounded-full bg-rose-500 px-3 py-1 text-[12px] font-bold">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
          Live interview
        </span>
        {example?.label && <span className="rounded-full bg-gold-400 px-3 py-1 text-[12px] font-extrabold text-ink-950">{example.label}</span>}
        {example?.meta && <span className="min-w-0 text-[12.5px] font-semibold text-white/70">{example.meta}</span>}
        <SampleTag tone="dark" className="ml-auto" />
      </div>

      <div className="relative space-y-3.5 p-4 sm:p-6">
        {/* Interviewer strip */}
        <div aria-hidden="true" className="flex items-center gap-3 rounded-2xl bg-white/[0.05] p-3 ring-1 ring-white/10">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-700 font-display text-[13px] font-extrabold ring-4 ring-gold-400/25">AI</span>
          <span className="min-w-0">
            <span className="block text-[13.5px] font-bold">AI interviewer</span>
            <span className="block text-[12px] font-semibold text-white/60">HR &amp; Introduction · guided practice</span>
          </span>
          <span className="ml-auto hidden h-8 w-[38%] items-center gap-[3px] sm:flex">
            {[0.35, 0.6, 0.9, 0.55, 1, 0.7, 0.4, 0.8, 0.5, 0.95, 0.6, 0.3, 0.7, 0.45, 0.85, 0.5].map((h, i) => (
              <span key={i} className="flex-1 rounded-full bg-gradient-to-t from-brand-400 to-gold-300" style={{ height: `${h * 100}%` }} />
            ))}
          </span>
        </div>

        {/* The gap question */}
        {first && (
          <div aria-hidden="true" className="flex items-start gap-2.5">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-700 font-display text-[11px] font-extrabold">AI</span>
            <p className="relative max-w-[90%] rounded-2xl rounded-tl-md bg-white px-4 py-3 text-[15px] font-bold leading-snug text-ink-950 sm:text-[16px]">
              <Lit k="q0" />
              {first.q}
            </p>
          </div>
        )}

        {/* Your answer, in three parts: the example's own lines */}
        {example?.lines?.length > 0 && (
          <ol className="space-y-2 pl-6 sm:pl-10">
            {example.lines.map((l, i) => (
              <li key={i} className="relative rounded-2xl rounded-tr-md bg-gradient-to-br from-brand-500 to-brand-700 px-4 py-3 text-[14.5px] font-medium leading-relaxed text-white sm:text-[15.5px]">
                <Lit k={`a${i}`} />
                <span aria-hidden="true" className="mb-1 flex items-center gap-1.5 text-[11.5px] font-bold text-gold-300">
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-gold-400 font-display text-[9.5px] font-extrabold text-ink-950">{i + 1}</span>
                  {PARTS[i] || 'Your answer'}
                </span>
                <Rich text={l} tone="dark" />
              </li>
            ))}
          </ol>
        )}

        {/* The follow-up slot */}
        {follow.length > 0 && (
          <div aria-hidden="true" className="relative rounded-2xl bg-white/[0.06] p-3 ring-1 ring-white/10">
            <Lit k="f" />
            <p className="flex items-center gap-2 text-[11.5px] font-bold uppercase tracking-[0.14em] text-gold-300">
              <Icon name="question" className="h-3.5 w-3.5" />
              Follow-up
            </p>
            <div className="mt-2 grid">
              {follow.map((f, i) => (
                <div key={f.q} className={`col-start-1 row-start-1 flex items-start gap-2.5 opacity-0 translate-y-2 transition-[opacity,transform] duration-500 ${FU[i + 1]}`}>
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-700 font-display text-[10px] font-extrabold">AI</span>
                  <span className="min-w-0">
                    <span className="block rounded-2xl rounded-tl-md bg-white px-3.5 py-2.5 text-[14.5px] font-bold leading-snug text-ink-950">{f.q}</span>
                    <span className="mt-1.5 inline-flex rounded-full bg-gold-400/15 px-2.5 py-0.5 text-[11.5px] font-bold text-gold-200">{(f.hint || '').split('.')[0]}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Answer bar */}
        <div aria-hidden="true" className="flex items-center gap-3 rounded-2xl bg-white/[0.06] p-2 pr-3 ring-1 ring-white/10">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold-400 text-ink-950">
            <Icon name="mic" className="h-4 w-4" />
          </span>
          <span className="flex h-6 flex-1 items-center gap-[3px]">
            {[0.4, 0.7, 1, 0.6, 0.85, 0.45, 0.9, 0.55, 0.75, 0.35, 0.8, 0.5, 0.65, 0.4].map((h, i) => (
              <span key={i} className="flex-1 rounded-full bg-gradient-to-t from-brand-400 to-gold-300" style={{ height: `${h * 100}%` }} />
            ))}
          </span>
          <span className="text-[12px] font-bold text-white/75">Say it out loud</span>
        </div>
      </div>
    </div>
  );
}

export default function GapSection({ s, n }) {
  const root = useRef(null);
  const paras = (s.blocks || []).filter((b) => b.type === 'p');
  const list = pick(s, 'list');
  const example = pick(s, 'example');
  const questions = pick(s, 'questions');
  const lead = paras[0];
  const before = paras[1];
  const others = (s.blocks || []).filter((b) => ![lead, before, list, example, questions].includes(b));
  const qs = questions?.items || [];

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        gsap.from(q('[data-intro]'), { y: 30, opacity: 0, duration: 1.1, scrollTrigger: { trigger: root.current, start: 'top 72%', once: true } });
        gsap.from(q('[data-tr]'), { y: 70, opacity: 0, duration: 1.3, scrollTrigger: { trigger: q('[data-tr]')[0], start: 'top 88%', once: true } });
        const cards = q('[data-sync]');
        gsap.set(cards, { y: 40, opacity: 0 });
        ScrollTrigger.batch(cards, { start: 'top 90%', once: true, onEnter: (els) => gsap.to(els, { y: 0, opacity: 1, stagger: 0.1, duration: 1, overwrite: true }) });
      });

      // Wide, tall screens (where the transcript is sticky): the card you are reading drives it
      mm.add(`(min-width: 1280px) and (min-height: 860px) and ${MOTION_OK}`, () => {
        const tr = q('[data-tr]')[0];
        const cards = q('[data-sync]');
        let tops = [];
        let cur = '';
        const measure = () => {
          tops = cards.map((c) => c.getBoundingClientRect().top + window.scrollY + c.offsetHeight * 0.3);
        };
        const apply = (i) => {
          const key = i < 0 ? 'q0' : cards[i].dataset.sync;
          if (key === cur) return;
          cur = key;
          if (key.startsWith('f')) {
            tr.dataset.focus = 'f';
            tr.dataset.fu = key.slice(1);
          } else tr.dataset.focus = key;
          cards.forEach((c, k) => (c.dataset.on = k === i ? 'true' : 'false'));
        };
        measure();
        const st = ScrollTrigger.create({
          trigger: q('[data-cols]')[0],
          start: 'top 70%',
          end: 'bottom 40%',
          onRefresh: measure,
          onUpdate: (self) => {
            const line = self.scroll() + window.innerHeight * 0.62;
            let i = -1;
            for (let k = 0; k < tops.length; k += 1) if (tops[k] <= line) i = k;
            apply(i);
          },
          onLeaveBack: () => apply(-1),
        });
        return () => {
          st.kill();
          tr.dataset.focus = 'q0';
          tr.dataset.fu = '1';
          cards.forEach((c) => delete c.dataset.on);
        };
      });
    },
    { scope: root }
  );

  const card = 'group/card relative isolate overflow-hidden rounded-[24px] bg-white p-5 shadow-[0_24px_50px_-40px_rgba(26,15,51,0.55)] ring-1 ring-hairline transition-transform duration-500 data-[on=true]:translate-x-1.5 sm:p-6';
  const lit = 'pointer-events-none absolute inset-0 -z-[1] rounded-[24px] bg-gold-50 opacity-0 ring-2 ring-inset ring-gold-400 transition-opacity duration-500 group-data-[on=true]/card:opacity-100';

  return (
    <section id={s.id} ref={root} aria-labelledby={`${s.id}-title`} className="relative scroll-mt-24 overflow-clip bg-white py-16 sm:py-24 lg:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(35%_35%_at_100%_20%,rgba(196,179,234,0.35),transparent),radial-gradient(30%_30%_at_0%_90%,rgba(252,211,77,0.14),transparent)]" />
      <div className="container-x relative">
        <Head s={s} n={n} />

        <div data-cols className="mt-12 grid grid-cols-[minmax(0,1fr)] gap-x-12 gap-y-10 sm:mt-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] xl:gap-x-20">
          {/* The three parts */}
          <div className="min-w-0 lg:col-start-1 lg:row-start-1">
            {lead && (
              <p className="font-display text-[clamp(1.25rem,1.1rem+0.5vw,1.6rem)] font-bold tracking-[-0.02em] text-ink-950">
                <Rich text={lead.text} />
              </p>
            )}
            {list && (
              <ol className="mt-5 space-y-3">
                {list.items.map((t, i) => (
                  <li key={i} data-sync={`a${i}`} className={card}>
                    <span aria-hidden="true" className={lit} />
                    <div className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-4">
                      <span aria-hidden="true" className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-950 font-display text-[1.3rem] font-extrabold text-gold-400 transition-colors duration-500 group-data-[on=true]/card:bg-gold-400 group-data-[on=true]/card:text-ink-950">{i + 1}</span>
                      <div className="min-w-0">
                        <span aria-hidden="true" className="block text-[12px] font-bold uppercase tracking-[0.14em] text-brand-500">{PARTS[i] || 'Part'}</span>
                        <p className="mt-1 text-[16.5px] leading-relaxed text-ink-900/85 sm:text-[17px]">
                          <Rich text={t} />
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            )}
          </div>

          {/* The live transcript */}
          <div className="min-w-0 lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <div className="[@media(min-width:1280px)_and_(min-height:860px)]:sticky [@media(min-width:1280px)_and_(min-height:860px)]:top-[104px]">
              <Transcript example={example} questions={qs} />
            </div>
          </div>

          {/* The follow-ups */}
          <div className="min-w-0 lg:col-start-1 lg:row-start-2">
            {before && (
              <p className="text-[17px] leading-relaxed text-ink-900/80 sm:text-[18px]">
                <Rich text={before.text} />
              </p>
            )}
            {qs.length > 0 && (
              <ul className="mt-5 grid grid-cols-[minmax(0,1fr)] gap-3">
                {qs.map((it, i) => (
                  <li key={it.q} data-sync={i === 0 ? 'q0' : `f${i}`} className={card}>
                    <span aria-hidden="true" className={lit} />
                    <div className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-4">
                      <span aria-hidden="true" className="flex h-11 w-11 items-center justify-center rounded-full bg-light-lavender text-brand-600 ring-1 ring-brand-200 transition-colors duration-500 group-data-[on=true]/card:bg-brand-950 group-data-[on=true]/card:text-gold-300">
                        <Icon name={i === 0 ? 'clock' : 'question'} className="h-5 w-5" />
                      </span>
                      <div className="min-w-0">
                        <span aria-hidden="true" className="block text-[12px] font-bold uppercase tracking-[0.14em] text-brand-500">{i === 0 ? 'The gap question' : `Follow-up ${i}`}</span>
                        <h3 className="mt-1 font-display text-[1.15rem] font-bold leading-snug tracking-[-0.02em] text-ink-950 sm:text-[1.25rem]">{it.q}</h3>
                        {it.hint && (
                          <p className="mt-2 text-[15.5px] leading-relaxed text-ink-900/70">
                            <Rich text={it.hint} />
                          </p>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            {others.length > 0 && (
              <div className="mt-6 space-y-5">
                {others.map((b, i) => (
                  <Block key={i} b={b} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
