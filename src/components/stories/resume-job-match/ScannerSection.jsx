"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from "@/lib/gsap";
import Rich from "@/components/Rich";
import { Icon } from "@/components/icons";
import { Header, Glyph } from "./shared";

/*
 * Chapter 1, "Start here": the scanner on a deep brand stage. A real-looking resume sheet sits beside
 * the job you picked. On desktop the scene pins and the four steps ride along: the resume is read, the
 * job is picked from the stack, a glowing beam sweeps the sheet while matched keywords are highlighted
 * in gold and connect to the job's requirements, the score counts up, then the top fix lands. The steps
 * and callout are real text; the scene is decorative sample data (aria-hidden). Every frame of the scene
 * is complete: nothing starts blank.
 */

const REQS = [
  { k: "React", ok: true },
  { k: "TypeScript", ok: true },
  { k: "Design systems", ok: true },
  { k: "Accessibility", ok: true },
  { k: "GraphQL", ok: false },
  { k: "Storybook", ok: false },
];
const SCORE = 86;
const REASONS = [
  ["React and TypeScript in your recent role", true],
  ["Your level fits what the job asks for", true],
  ["GraphQL is not on your resume yet", false],
];

/** A keyword on the resume; the gold highlighter swipes across it when the beam reaches it. */
function Kw({ i, children }) {
  return (
    <span
      data-kw={i}
      className="relative isolate inline-block whitespace-nowrap px-[0.15em] font-semibold text-ink-950"
    >
      <span
        data-kw-on
        className="absolute inset-x-0 bottom-[0.05em] top-[0.15em] -z-[1] origin-left -skew-x-6 rounded-[2px] bg-gold-300"
      />
      {children}
    </span>
  );
}

const sheetLabel =
  "mt-3 block border-b border-ink-900/10 pb-1 font-display text-[8.5px] font-bold uppercase tracking-[0.18em] text-brand-600 sm:mt-4 sm:text-[10px]";
const sheetText = "text-[9px] leading-[1.55] text-ink-900/70 sm:text-[11.5px]";

function Paper() {
  return (
    <div
      data-paper
      className="relative min-w-0 rounded-[6px] bg-white p-3 text-ink-950 shadow-[0_1px_0_#e9e4f5,0_24px_44px_-22px_rgba(0,0,0,0.75)] sm:p-6"
    >
      {/* Folded corner */}
      <span className="absolute right-0 top-0 h-5 w-5 rounded-bl-[6px] bg-[linear-gradient(225deg,#2a1650_50%,#ece8f6_50%)] sm:h-7 sm:w-7" />
      <span className="block font-display text-[12px] font-extrabold leading-tight tracking-[-0.02em] sm:text-[17px]">
        Jordan Lee
      </span>
      <span className="mt-0.5 block text-[8.5px] font-semibold text-ink-900/55 sm:text-[11px]">
        Frontend Engineer · Austin, TX
      </span>
      <span className="mt-2 hidden items-center gap-2 rounded-full bg-light-lavender px-2.5 py-1 text-[10px] font-bold text-brand-700 sm:inline-flex">
        <Icon name="doc" className="h-3 w-3" />
        resume_v3.pdf
        <span className="relative h-1 w-10 overflow-hidden rounded-full bg-brand-100">
          <span
            data-read
            className="absolute inset-0 origin-left rounded-full bg-brand-600"
          />
        </span>
      </span>

      <span className={sheetLabel}>Summary</span>
      <p className={`mt-1 ${sheetText}`}>
        Six years building <Kw i={0}>React</Kw> apps with product teams.
      </p>

      <span className={sheetLabel}>Experience</span>
      <p className="mt-1 text-[9px] font-bold text-ink-950 sm:text-[11.5px]">
        Brightpath Software
      </p>
      <ul className={`mt-0.5 space-y-0.5 ${sheetText}`}>
        <li>
          Rebuilt checkout in <Kw i={1}>TypeScript</Kw>
        </li>
        <li>
          Led the <Kw i={2}>Design systems</Kw> work
        </li>
        <li className="hidden sm:list-item">Mentored two junior engineers</li>
      </ul>

      <span className={sheetLabel}>Skills</span>
      <p className={`mt-1 ${sheetText}`}>
        Jest · CSS · <Kw i={3}>Accessibility</Kw>
      </p>

      {/* The top fix, dropped in during the last step */}
      <span
        data-insert
        className="mt-2.5 flex items-center gap-1.5 rounded-[4px] border border-dashed border-emerald-500 bg-emerald-50 px-1.5 py-1 sm:mt-3 sm:gap-2 sm:px-2 sm:py-1.5"
      >
        <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white sm:h-5 sm:w-5">
          <Glyph
            name="plus"
            className="h-2.5 w-2.5 sm:h-3 sm:w-3"
            strokeWidth={3.4}
          />
        </span>
        <span className="truncate text-[8.5px] font-bold text-emerald-800 sm:text-[11px]">
          GraphQL, with a line of proof
        </span>
      </span>

      {/* Scan beam */}
      <span
        data-beam
        className="pointer-events-none absolute inset-x-[-6px] top-0 z-[3] -mt-8 h-16 opacity-0"
      >
        <span className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(16,185,129,0.22)_45%,rgba(249,195,32,0.28)_55%,transparent)]" />
        <span className="absolute inset-x-0 top-1/2 h-[2px] bg-gradient-to-r from-emerald-400 via-gold-300 to-emerald-400 shadow-[0_0_14px_4px_rgba(249,195,32,0.6)]" />
      </span>
    </div>
  );
}

function Jobs() {
  return (
    <div className="relative min-w-0 pt-4 sm:pt-6">
      {/* The other roles in the list, behind the one you pick */}
      {[
        [
          "B",
          "React Developer",
          "Brightpath Software",
          "translate-x-3 -translate-y-4 rotate-[4deg] sm:-translate-y-6",
        ],
        [
          "L",
          "UI Engineer",
          "Lumen Studio",
          "translate-x-1.5 -translate-y-2 rotate-[2deg] sm:-translate-y-3",
        ],
      ].map(([l, t, c, pos]) => (
        <div
          key={t}
          className={`absolute inset-x-0 top-4 h-28 sm:top-6 ${pos}`}
        >
          <div
            data-alt
            className="h-full rounded-[14px] bg-brand-800 p-2.5 ring-1 ring-white/10 sm:p-4"
          >
            <span className="flex items-center gap-2">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-white/10 font-display text-[10px] font-extrabold text-brand-200 sm:h-8 sm:w-8 sm:text-[12px]">
                {l}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-[9.5px] font-bold text-white/80 sm:text-[12.5px]">
                  {t}
                </span>
                <span className="block truncate text-[8px] text-white/50 sm:text-[10.5px]">
                  {c}
                </span>
              </span>
            </span>
          </div>
        </div>
      ))}

      <div
        data-job
        className="relative rounded-[14px] bg-brand-900 p-2.5 text-white shadow-[0_24px_44px_-24px_rgba(0,0,0,0.8)] ring-1 ring-white/15 sm:rounded-[18px] sm:p-5"
      >
        <span
          data-picked-ring
          className="pointer-events-none absolute -inset-px rounded-[14px] ring-2 ring-gold-400 sm:rounded-[18px]"
        />
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gold-400 font-display text-[12px] font-extrabold text-ink-950 sm:h-10 sm:w-10 sm:text-base">
            N
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-[10px] font-bold leading-tight sm:text-[14px]">
              Senior Frontend Engineer
            </span>
            <span className="block truncate text-[8.5px] font-medium text-white/55 sm:text-[11.5px]">
              Northwind Labs · Austin, TX
            </span>
          </span>
          <span
            data-picked
            className="hidden shrink-0 rounded-full bg-gold-400 px-2 py-0.5 text-[10px] font-bold text-ink-950 sm:inline"
          >
            Picked
          </span>
        </div>
        <span className="mt-3 block text-[8.5px] font-bold uppercase tracking-[0.16em] text-gold-300 sm:mt-4 sm:text-[10px]">
          The job asks for
        </span>
        <ul className="mt-1.5 space-y-1 sm:space-y-1.5">
          {REQS.map((r, i) => (
            <li
              key={r.k}
              data-req={i}
              className="flex items-center justify-between gap-1.5 rounded-md bg-white/[0.06] px-1.5 py-[5px] ring-1 ring-white/[0.06] sm:rounded-lg sm:px-2.5 sm:py-1.5"
            >
              <span className="truncate text-[9.5px] font-semibold text-white/90 sm:text-[12px]">
                {r.k}
              </span>
              {r.ok ? (
                <span
                  data-ok
                  className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-gold-400 text-ink-950 sm:h-[18px] sm:w-[18px]"
                >
                  <Glyph
                    name="check"
                    className="h-2 w-2 sm:h-2.5 sm:w-2.5"
                    strokeWidth={3.6}
                  />
                </span>
              ) : (
                <span
                  data-miss
                  className="shrink-0 rounded-full bg-rose-500/20 px-1.5 py-[2px] text-[7.5px] font-bold uppercase tracking-[0.06em] text-rose-200 ring-1 ring-rose-300/30 sm:text-[9.5px]"
                >
                  Missing
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Readout() {
  return (
    <div className="mt-4 grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-2.5 sm:mt-6 sm:grid-cols-[auto_minmax(0,1.2fr)_minmax(0,1fr)] sm:gap-3">
      <div className="flex items-center gap-3 rounded-[18px] bg-white/[0.06] p-3 ring-1 ring-white/10 sm:p-4">
        <span className="relative hidden h-14 w-14 shrink-0 sm:block">
          <svg viewBox="0 0 56 56" className="h-full w-full -rotate-90">
            <circle
              cx="28"
              cy="28"
              r="23"
              fill="none"
              stroke="rgba(255,255,255,0.12)"
              strokeWidth="6"
            />
            <circle
              data-ring
              cx="28"
              cy="28"
              r="23"
              fill="none"
              stroke="#f9c320"
              strokeWidth="6"
              strokeLinecap="round"
              pathLength="100"
              strokeDasharray="100 100"
              strokeDashoffset={100 - SCORE}
            />
          </svg>
        </span>
        <span>
          <span className="flex items-baseline font-display font-extrabold leading-none tracking-[-0.05em]">
            <span
              data-num
              className="bg-gradient-to-b from-gold-200 to-gold-500 bg-clip-text text-[clamp(2.4rem,1.6rem+2.4vw,3.6rem)] text-transparent"
            >
              {SCORE}
            </span>
            <span className="ml-1 text-[15px] tracking-normal text-white/45">
              /100
            </span>
          </span>
          <span className="mt-1 block text-[11px] font-semibold text-white/60">
            Match score · sample
          </span>
        </span>
      </div>
      <div
        data-fix
        className="flex flex-col justify-center rounded-[18px] bg-emerald-500 p-3 text-ink-950 sm:order-last sm:p-4"
      >
        <span className="flex items-center gap-1.5 text-[10.5px] font-bold uppercase tracking-[0.14em] text-ink-950/70">
          <Icon name="spark" className="h-3.5 w-3.5" />
          Top fix
        </span>
        <span className="mt-1 block font-display text-[13px] font-bold leading-snug sm:text-[15px]">
          Add GraphQL with a line of proof
        </span>
      </div>
      <div className="col-span-2 rounded-[18px] bg-white/[0.06] p-3 ring-1 ring-white/10 sm:col-span-1 sm:p-4">
        <span className="block text-[10.5px] font-bold uppercase tracking-[0.14em] text-gold-300">
          Why it landed there
        </span>
        <span className="mt-1.5 block space-y-1">
          {REASONS.map(([t, ok]) => (
            <span
              key={t}
              data-reason
              className="flex items-center gap-2 text-[12px] font-semibold text-white/85"
            >
              <span
                className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${ok ? "bg-gold-400 text-ink-950" : "bg-rose-400 text-ink-950"}`}
              >
                <Glyph
                  name={ok ? "check" : "dash"}
                  className="h-2.5 w-2.5"
                  strokeWidth={3.6}
                />
              </span>
              <span className="truncate">{t}</span>
            </span>
          ))}
        </span>
      </div>
    </div>
  );
}

function Scene() {
  return (
    <div aria-hidden="true" className="relative min-w-0">
      <div className="pointer-events-none absolute -inset-10 bg-[radial-gradient(50%_45%_at_45%_45%,rgba(249,195,32,0.16),transparent),radial-gradient(40%_40%_at_80%_30%,rgba(109,76,176,0.45),transparent)]" />
      <div
        data-body
        className="relative grid rotate-[-1.5deg] grid-cols-[minmax(0,1.08fr)_minmax(0,1fr)] items-start gap-6 sm:gap-16 xl:gap-20"
      >
        <Paper />
        <Jobs />
        <svg
          data-links
          className="pointer-events-none absolute inset-0 z-[2] h-full w-full overflow-visible"
          preserveAspectRatio="none"
        >
          {REQS.map((r, i) =>
            r.ok ? (
              <g key={r.k} data-link={i}>
                <path
                  data-glow
                  fill="none"
                  stroke="#f9c320"
                  strokeOpacity="0.28"
                  strokeWidth="7"
                  strokeLinecap="round"
                />
                <path
                  data-line
                  fill="none"
                  stroke="#fcd34d"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
                <circle data-dot r="3.5" fill="#f9c320" />
                <circle data-dot r="3.5" fill="#f9c320" />
              </g>
            ) : null,
          )}
        </svg>
      </div>
      <Readout />
    </div>
  );
}

export default function ScannerSection({ s }) {
  const root = useRef(null);
  const steps = s.blocks.find((b) => b.type === "steps")?.items || [];
  const callout = s.blocks.find((b) => b.type === "callout");

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const body = q("[data-body]")[0];
      const paper = q("[data-paper]")[0];
      const job = q("[data-job]")[0];
      const svg = q("[data-links]")[0];

      // Offsets ignore transforms, so the connector paths stay right while the scene animates
      const pos = (el) => {
        let x = 0;
        let y = 0;
        let n = el;
        while (n && n !== body) {
          x += n.offsetLeft;
          y += n.offsetTop;
          n = n.offsetParent;
        }
        return { x, y, w: el.offsetWidth, h: el.offsetHeight };
      };
      const build = () => {
        if (!body.offsetWidth) return;
        const pr = pos(paper);
        const jr = pos(job);
        svg.setAttribute(
          "viewBox",
          `0 0 ${body.offsetWidth} ${body.offsetHeight}`,
        );
        REQS.forEach((r, i) => {
          if (!r.ok) return;
          const g = q(`[data-link="${i}"]`)[0];
          const a = pos(q(`[data-kw="${i}"]`)[0]);
          const b = pos(q(`[data-req="${i}"]`)[0]);
          const sx = a.x + a.w + 2;
          const sy = a.y + a.h / 2;
          const m1 = pr.x + pr.w;
          const m2 = jr.x;
          const ex = b.x + 1;
          const ey = b.y + b.h / 2;
          const gap = m2 - m1;
          const d = `M${sx},${sy} L${m1},${sy} C${m1 + gap * 0.55},${sy} ${m2 - gap * 0.55},${ey} ${m2},${ey} L${ex},${ey}`;
          g.querySelectorAll("path").forEach((p) => {
            p.setAttribute("d", d);
            p.setAttribute("pathLength", "1");
          });
          const [d1, d2] = g.querySelectorAll("circle");
          d1.setAttribute("cx", m1);
          d1.setAttribute("cy", sy);
          d2.setAttribute("cx", m2);
          d2.setAttribute("cy", ey);
        });
      };
      build();
      window.addEventListener("resize", build);
      ScrollTrigger.addEventListener("refresh", build);
      document.fonts?.ready.then(build);

      const mm = gsap.matchMedia();

      // Desktop: pin the scene and scrub the four steps through it
      mm.add(`(min-width: 1024px) and ${MOTION_OK}`, () => {
        const items = q("[data-step]");
        const num = q("[data-num]")[0];
        let active = -1;
        const setActive = (i) => {
          if (i === active) return;
          active = i;
          items.forEach((el, k) =>
            k === i
              ? el.setAttribute("data-active", "")
              : el.removeAttribute("data-active"),
          );
        };
        setActive(0);

        gsap.set(q("[data-line], [data-glow]"), {
          strokeDasharray: "1 2",
          strokeDashoffset: 1.02,
        });
        gsap.set(
          q("[data-dot], [data-insert], [data-picked], [data-picked-ring]"),
          { opacity: 0 },
        );
        gsap.set(q("[data-kw-on]"), { scaleX: 0 });
        gsap.set(q("[data-ok], [data-miss]"), { opacity: 0, scale: 0.4 });
        gsap.set(q("[data-reason], [data-fix]"), { opacity: 0.35 });
        num.textContent = "0";

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: q("[data-pin]")[0],
            start: "center 54%",
            end: "+=260%",
            pin: true,
            scrub: 0.4,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) =>
              setActive(Math.min(3, Math.floor(self.progress * 4.4))),
          },
        });

        tl.fromTo(
          q("[data-rail]"),
          { scaleY: 0 },
          { scaleY: 1, duration: 4.4 },
          0,
        );

        // 1. The resume is read
        tl.fromTo(
          q("[data-read]"),
          { scaleX: 0 },
          { scaleX: 1, duration: 0.9 },
          0,
        ).from(
          paper,
          { y: 24, rotation: 1.5, duration: 0.9, ease: "power2.out" },
          0,
        );

        // 2. One job is picked from the list
        tl.to(
          q("[data-alt]"),
          {
            x: (i) => 26 + i * 8,
            y: (i) => -10 - i * 6,
            opacity: 0.3,
            duration: 0.6,
            ease: "power2.out",
          },
          1,
        )
          .fromTo(
            job,
            { y: 14 },
            { y: 0, duration: 0.5, ease: "power2.out" },
            1,
          )
          .to(
            q("[data-picked-ring], [data-picked]"),
            { opacity: 1, duration: 0.3 },
            1.3,
          );

        // 3. The beam sweeps the sheet; each keyword it crosses is highlighted and connects
        const pH = () => paper.offsetHeight;
        tl.to(q("[data-beam]"), { opacity: 1, duration: 0.1 }, 2)
          .fromTo(q("[data-beam]"), { y: 0 }, { y: pH, duration: 1.1 }, 2)
          .to(q("[data-beam]"), { opacity: 0, duration: 0.15 }, 3.05);
        const pTop = pos(paper).y;
        REQS.forEach((r, i) => {
          if (!r.ok) return;
          const kw = q(`[data-kw="${i}"]`)[0];
          const k = pos(kw);
          const at = 2 + ((k.y + k.h / 2 - pTop) / pH()) * 1.1;
          const link = q(`[data-link="${i}"]`)[0];
          tl.to(
            kw.querySelector("[data-kw-on]"),
            { scaleX: 1, duration: 0.14, ease: "power2.out" },
            at,
          )
            .to(
              link.querySelectorAll("[data-dot]"),
              { opacity: 1, duration: 0.08 },
              at,
            )
            .to(
              link.querySelectorAll("path"),
              { strokeDashoffset: 0, duration: 0.3, ease: "power1.inOut" },
              at,
            )
            .to(
              q(`[data-req="${i}"] [data-ok]`),
              { opacity: 1, scale: 1, duration: 0.15, ease: "back.out(2)" },
              at + 0.25,
            );
        });
        const counter = { v: 0 };
        tl.fromTo(
          q("[data-ring]"),
          { strokeDashoffset: 100 },
          { strokeDashoffset: 100 - SCORE, duration: 1.1, ease: "power1.out" },
          2,
        )
          .to(
            counter,
            {
              v: SCORE,
              duration: 1.1,
              ease: "power1.out",
              onUpdate: () => (num.textContent = Math.round(counter.v)),
            },
            2,
          )
          .to(
            q("[data-reason]"),
            { opacity: 1, stagger: 0.25, duration: 0.15 },
            2.3,
          )
          .to(
            q("[data-miss]"),
            {
              opacity: 1,
              scale: 1,
              stagger: 0.08,
              duration: 0.15,
              ease: "back.out(2)",
            },
            2.9,
          );

        // 4. The top fix lights up and lands in the resume
        tl.to(q("[data-fix]"), { opacity: 1, duration: 0.2 }, 3.3)
          .fromTo(
            q("[data-fix]"),
            { scale: 0.94 },
            { scale: 1, duration: 0.3, ease: "back.out(2)" },
            3.3,
          )
          .to(q("[data-insert]"), { opacity: 1, duration: 0.2 }, 3.45)
          .to({}, { duration: 0.6 });

        return () => {
          items.forEach((el) => el.removeAttribute("data-active"));
          num.textContent = String(SCORE);
        };
      });

      // Phones and tablets: simple reveals; the beam sweeps while the scene is on screen
      mm.add(`(max-width: 1023px) and ${MOTION_OK}`, () => {
        const stepEls = q("[data-step]");
        gsap.set(stepEls, { y: 30, opacity: 0 });
        ScrollTrigger.batch(stepEls, {
          start: "top 92%",
          once: true,
          onEnter: (els) =>
            gsap.to(els, {
              y: 0,
              opacity: 1,
              stagger: 0.08,
              duration: 1,
              overwrite: true,
            }),
        });
        gsap
          .timeline({
            scrollTrigger: { trigger: body, start: "top 85%", once: true },
          })
          .from([paper, job], {
            y: 40,
            opacity: 0,
            stagger: 0.12,
            duration: 1.1,
          })
          .fromTo(
            q("[data-line], [data-glow]"),
            { strokeDasharray: "1 2", strokeDashoffset: 1.02 },
            {
              strokeDashoffset: 0,
              stagger: 0.1,
              duration: 1.2,
              ease: "power2.inOut",
            },
            0.4,
          );
        gsap.set(q("[data-beam]"), { opacity: 1 });
        gsap.fromTo(
          q("[data-beam]"),
          { y: 0 },
          {
            y: () => paper.offsetHeight,
            duration: 2.6,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            scrollTrigger: {
              trigger: body,
              start: "top bottom",
              end: "bottom top",
              toggleActions: "play pause resume pause",
            },
          },
        );
      });

      mm.add(MOTION_OK, () => {
        gsap.from(q("[data-callout] > *"), {
          y: 30,
          opacity: 0,
          stagger: 0.08,
          duration: 1.1,
          scrollTrigger: {
            trigger: q("[data-callout]")[0],
            start: "top 88%",
            once: true,
          },
        });
      });

      return () => {
        window.removeEventListener("resize", build);
        ScrollTrigger.removeEventListener("refresh", build);
      };
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id={s.id}
      aria-labelledby={`${s.id}-title`}
      className="grain relative scroll-mt-24 overflow-hidden bg-brand-950 text-white"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(45%_35%_at_15%_0%,rgba(109,76,176,0.5),transparent),radial-gradient(40%_40%_at_75%_55%,rgba(109,76,176,0.35),transparent),radial-gradient(30%_25%_at_90%_100%,rgba(244,180,0,0.12),transparent)]"
      />

      <div className="container-x relative z-[2] pt-16 sm:pt-24 lg:pt-28">
        <Header s={s} n={1} tone="dark" />
      </div>

      <div data-pin className="relative z-[2]">
        <div className="container-x grid w-full grid-cols-[minmax(0,1fr)] gap-12 pt-12 sm:pt-16 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-center lg:gap-14 lg:pt-16 xl:gap-20">
          {/* The four steps, tracked by a rail that fills as the scan advances */}
          <div className="relative min-w-0">
            <span
              aria-hidden="true"
              className="absolute bottom-8 left-[39px] top-8 w-[2px] rounded-full bg-white/10 sm:left-[41px]"
            >
              <span
                data-rail
                className="absolute inset-0 origin-top rounded-full bg-gradient-to-b from-gold-400 to-emerald-400"
              />
            </span>
            <ol className="relative space-y-2">
              {steps.map((st, i) => (
                <li
                  key={st.title}
                  data-step
                  className="group/step relative grid grid-cols-[48px_minmax(0,1fr)] gap-4 rounded-[22px] p-4 ring-1 ring-transparent lg:transition-[background-color,box-shadow] lg:duration-500 data-active:bg-white/[0.08] data-active:ring-white/15"
                >
                  <span className="relative z-[1] flex h-12 w-12 items-center justify-center rounded-full bg-brand-800 font-display text-[15px] font-extrabold text-white shadow-[0_0_0_6px_var(--color-brand-950)] ring-1 ring-white/20 lg:transition-colors lg:duration-500 group-data-active/step:bg-gold-400 group-data-active/step:text-ink-950 group-data-active/step:ring-gold-300">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 pt-1">
                    <h3 className="font-display text-[1.2rem] font-bold leading-snug tracking-[-0.02em] text-white sm:text-[1.35rem]">
                      {st.title}
                    </h3>
                    <p className="mt-1.5 text-[15.5px] leading-relaxed text-white/75 sm:text-[16px] lg:transition-colors lg:duration-500 group-data-active/step:text-white/90">
                      <Rich text={st.text} tone="dark" />
                    </p>
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <Scene />
        </div>
      </div>

      {/* Callout: the rewrite problem, answered */}
      {callout && (
        <div className="container-x relative z-[2] pb-16 pt-14 sm:pb-24 sm:pt-16 lg:pb-28 lg:pt-20">
          <aside
            data-callout
            className="relative grid grid-cols-[minmax(0,1fr)] items-center gap-6 overflow-hidden rounded-[30px] bg-gold-400 p-7 text-ink-950 sm:p-10 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:gap-12 lg:p-12"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.45),transparent)]"
            />
            <span
              aria-hidden="true"
              className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-ink-950 text-gold-400"
            >
              <Icon name="refresh" className="h-7 w-7" />
            </span>
            <div className="relative min-w-0">
              <p className="font-display text-[clamp(1.35rem,1rem+1vw,2rem)] font-extrabold leading-tight tracking-[-0.025em]">
                {callout.title}
              </p>
              <p className="mt-3 max-w-[58rem] text-[16.5px] leading-relaxed text-ink-950/80 sm:text-[17.5px]">
                <Rich text={callout.text} />
              </p>
            </div>
            <div
              aria-hidden="true"
              className="relative flex flex-wrap items-center gap-2.5 lg:flex-col lg:items-stretch"
            >
              <span className="flex items-center gap-2 rounded-full bg-ink-950/10 px-4 py-2 text-[13px] font-bold text-ink-950/50 line-through decoration-ink-950/40">
                <Glyph name="x" className="h-3.5 w-3.5" />
                Rewrite it all
              </span>
              <span className="flex items-center gap-2 rounded-full bg-ink-950 px-4 py-2 text-[13px] font-bold text-gold-300">
                <Glyph name="check" className="h-3.5 w-3.5" strokeWidth={3.2} />
                Fix what matters
              </span>
            </div>
          </aside>
        </div>
      )}
    </section>
  );
}
