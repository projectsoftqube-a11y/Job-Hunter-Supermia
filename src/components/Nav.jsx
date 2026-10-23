'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLenis } from 'lenis/react';
import { gsap, useGSAP, onIntroDone } from '@/lib/gsap';
import { Icon } from '@/components/icons';
import { MENU, APP_URL, OFFER, CHANNELS, PRICING } from '@/content/site';

/*
 * Sitewide header (Navigation and Menu Spec v2): a floating, rounded glass bar with the Features
 * mega-menu grouped by task (Find jobs, Apply, Practice), the Who It's For panel, Blog and FAQ links, Log in
 * and the primary button. Panels float just under the bar. Every link is in the server HTML on load
 * (panels are hidden with CSS, never mounted on hover) and the mobile menu carries the same links.
 * The bar slides away while scrolling down and returns on the way up.
 */

const ease = 'ease-[cubic-bezier(0.16,1,0.3,1)]';

const matches = (pathname, href) => {
  const path = href.split('#')[0];
  if (!path || path.startsWith('http')) return false;
  if (path === '/') return pathname === '/';
  return pathname === path || pathname.startsWith(`${path}/`);
};

function Chevron({ open, className = '' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={`h-3.5 w-3.5 transition-transform duration-300 ${open ? 'rotate-180' : ''} ${className}`}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

/** Menu entry: light icon tile, a title that never wraps, one or two grey lines. */
function MenuLink({ item, pathname, onPick }) {
  const current = matches(pathname, item.href) && !item.href.includes('#');
  return (
    <Link
      href={item.href}
      onClick={onPick}
      aria-current={current ? 'page' : undefined}
      className={`group/m -mx-2.5 flex items-start gap-3 rounded-xl px-2.5 py-2.5 transition-colors duration-150 hover:bg-[#f6f4fb] focus-visible:bg-[#f6f4fb] ${current ? 'bg-[#f6f4fb]' : ''}`}
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border border-brand-100 bg-brand-50/70 text-brand-600 transition-colors duration-150 group-hover/m:border-brand-200 group-hover/m:bg-white">
        <Icon name={item.icon} className="h-[17px] w-[17px]" strokeWidth={1.8} />
      </span>
      <span className="min-w-0 pt-px">
        <span className="block whitespace-nowrap text-[14px] font-semibold leading-tight text-ink-950">{item.label}</span>
        {item.desc && <span className="mt-1 block text-[12.5px] leading-snug text-ink-900/55">{item.desc}</span>}
      </span>
    </Link>
  );
}

const GroupLabel = ({ children }) => <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-900/40">{children}</p>;

const panelShell = `absolute left-1/2 top-full z-10 -translate-x-1/2 pt-3 transition-[opacity,visibility,translate] duration-200 ${ease}`;
const panelState = (open) => (open ? 'visible translate-y-0 opacity-100' : 'pointer-events-none invisible translate-y-1 opacity-0');
const panelCard = 'overflow-hidden rounded-[20px] border border-ink-900/[0.07] bg-white text-left shadow-[0_28px_70px_-30px_rgba(26,15,51,0.35),0_6px_16px_-8px_rgba(26,15,51,0.08)]';
// Where the mobile sheet's circle starts: the centre of the menu button
const ORIGIN = 'calc(100% - 44px) 42px';
const MOBILE_GROUPS = [
  { key: 'features', label: MENU.features.label, items: MENU.features.columns.flatMap((c) => c.items) },
  { key: 'audiences', label: MENU.audiences.label, items: MENU.audiences.items },
];
const MOBILE_LINKS = [
  { label: MENU.blog.label, href: '/blog' },
  { label: MENU.faq.label, href: MENU.faq.href },
  { label: 'Pricing', href: PRICING.path },
];
const footStrip = 'flex items-center justify-between gap-4 border-t border-ink-900/[0.06] bg-[#faf9fd] px-6 py-3.5';

export default function Nav() {
  const pathname = usePathname();
  const bar = useRef(null);
  const closeTimer = useRef(0);
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(null);
  const [mobile, setMobile] = useState(false);
  const [acc, setAcc] = useState(null);
  const sheet = useRef(null);
  const sheetTl = useRef(null);
  const lenis = useLenis();
  const lastY = useRef(0);
  const hidden = useRef(false);

  const close = useCallback(() => {
    setMenu(null);
    setMobile(false);
  }, []);

  // Close everything when the page changes
  const [seenPath, setSeenPath] = useState(pathname);
  if (seenPath !== pathname) {
    setSeenPath(pathname);
    setMenu(null);
    setMobile(false);
  }

  useLenis(({ scroll }) => {
    const isScrolled = scroll > 24;
    setScrolled((v) => (v === isScrolled ? v : isScrolled));
    if (!bar.current || mobile || menu) return;
    const delta = scroll - lastY.current;
    lastY.current = scroll;
    const shouldHide = delta > 2 && scroll > 600 ? true : delta < -2 ? false : hidden.current;
    if (shouldHide !== hidden.current) {
      hidden.current = shouldHide;
      gsap.to(bar.current, { yPercent: shouldHide ? -140 : 0, duration: 0.6, ease: 'expo.out', overwrite: 'auto' });
    }
  });

  // On the homepage the bar waits for the intro curtain; elsewhere it is there from the start
  useGSAP(() => {
    if (!document.querySelector('[data-preloader]')) return undefined;
    gsap.set(bar.current, { yPercent: -140 });
    return onIntroDone(() => gsap.to(bar.current, { yPercent: 0, duration: 1.2, delay: 0.4, ease: 'expo.out' }));
  });

  useEffect(() => {
    if (mobile) lenis?.stop();
    else lenis?.start();
  }, [mobile, lenis]);

  // Mobile sheet: circle reveal from the menu button, then the big links rise and the rest fades in.
  // Built once, paused; opening plays it and closing reverses it a little faster.
  useGSAP(
    () => {
      const q = gsap.utils.selector(sheet);
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const d = (v) => (reduce ? 0.01 : v);
      sheetTl.current = gsap
        .timeline({ paused: true, defaults: { ease: 'expo.out' } })
        .set(sheet.current, { visibility: 'visible' })
        .fromTo(sheet.current, { clipPath: `circle(0% at ${ORIGIN})` }, { clipPath: `circle(150% at ${ORIGIN})`, duration: d(0.85), ease: 'power3.inOut' })
        .fromTo(q('[data-m-line]'), { yPercent: 115 }, { yPercent: 0, duration: d(0.9), stagger: reduce ? 0 : 0.07 }, reduce ? 0 : 0.32)
        .fromTo(q('[data-m-fade]'), { y: 22, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: d(0.7), stagger: reduce ? 0 : 0.04 }, reduce ? 0 : 0.45);
    },
    { scope: sheet }
  );

  useEffect(() => {
    const tl = sheetTl.current;
    if (!tl) return;
    if (mobile) tl.timeScale(1).play();
    else if (tl.progress() > 0) tl.timeScale(1.7).reverse();
  }, [mobile]);

  useEffect(() => {
    if (!menu && !mobile) return undefined;
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      if (menu) document.getElementById(`nav-trigger-${menu}`)?.focus();
      close();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menu, mobile, close]);

  const openOn = (key) => () => {
    clearTimeout(closeTimer.current);
    setMenu(key);
  };
  const closeSoon = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMenu(null), 150);
  };

  const featureActive = MENU.features.columns.some((c) => c.items.some((i) => matches(pathname, i.href)));
  const audienceActive = MENU.audiences.items.some((i) => matches(pathname, i.href));
  const blogActive = pathname.startsWith('/blog') || pathname === '/interview-questions';

  const linkClass = (key, active) =>
    `flex h-10 items-center gap-1 rounded-full px-3.5 text-[14.5px] font-medium transition-colors duration-200 ${
      menu === key ? 'bg-ink-900/[0.05] text-ink-950' : active ? 'text-brand-700' : 'text-ink-900/75 hover:bg-ink-900/[0.04] hover:text-ink-950'
    }`;

  const trigger = (key, label, active) => (
    <button
      type="button"
      id={`nav-trigger-${key}`}
      aria-expanded={menu === key}
      aria-controls={`nav-panel-${key}`}
      onMouseEnter={openOn(key)}
      onFocus={openOn(key)}
      onClick={() => setMenu((m) => (m === key ? null : key))}
      className={linkClass(key, active)}
    >
      {label}
      <Chevron open={menu === key} className="text-ink-900/40" />
    </button>
  );

  const raised = scrolled || menu || mobile;
  const apply = MENU.features.columns.find((c) => c.title === 'Apply');
  const practice = MENU.features.columns.find((c) => c.title === 'Practice');
  const find = MENU.features.columns.find((c) => c.title === 'Find jobs');

  return (
    <>
      {/* Mobile menu: a full-screen sheet that opens in a circle from the menu button. Always in the
          HTML (hidden until opened) so every link is crawlable; outside the header so its transform
          cannot trap the fixed position. */}
      <div
        id="mobile-menu"
        ref={sheet}
        data-lenis-prevent
        className="invisible fixed inset-0 z-40 overflow-y-auto bg-brand-950 text-white lg:hidden"
        style={{ clipPath: `circle(0% at ${ORIGIN})` }}
      >
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 bg-[radial-gradient(70%_45%_at_100%_0%,rgba(109,76,176,0.55),transparent),radial-gradient(60%_40%_at_0%_100%,rgba(244,180,0,0.16),transparent)]" />
        <nav aria-label="Mobile" className="container-x relative flex min-h-full flex-col pb-8 pt-[96px] sm:pt-[108px]">
          <p data-m-fade className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">
            Menu
          </p>
          <ul className="mt-3 border-t border-white/10">
            {MOBILE_GROUPS.map((group, i) => (
              <li key={group.key} className="border-b border-white/10">
                <button
                  type="button"
                  aria-expanded={acc === group.key}
                  aria-controls={`mobile-acc-${group.key}`}
                  onClick={() => setAcc((v) => (v === group.key ? null : group.key))}
                  className="flex w-full items-center justify-between gap-4 py-4 text-left"
                >
                  <span className="block overflow-hidden pb-1">
                    <span data-m-line className="flex items-start gap-3 font-display text-[clamp(1.85rem,8vw,2.6rem)] font-bold leading-none tracking-[-0.03em]">
                      <span className="pt-1 font-sans text-[12px] font-bold tracking-normal text-gold-400">0{i + 1}</span>
                      {group.label}
                    </span>
                  </span>
                  <span
                    data-m-fade
                    aria-hidden="true"
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-[background-color,border-color,color,transform] duration-300 ${
                      acc === group.key ? 'rotate-45 border-gold-400 bg-gold-400 text-ink-950' : 'border-white/20 text-white'
                    }`}
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </button>
                <div id={`mobile-acc-${group.key}`} className={`grid transition-[grid-template-rows] duration-500 ${ease} ${acc === group.key ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                  <div className={`overflow-hidden ${acc === group.key ? 'visible' : 'invisible'}`}>
                    <ul className="grid gap-1 pb-5 sm:grid-cols-2">
                      {group.items.map((item) => {
                        const current = matches(pathname, item.href) && !item.href.includes('#');
                        return (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              onClick={close}
                              aria-current={current ? 'page' : undefined}
                              className={`group/mm flex items-start gap-3 rounded-2xl p-2.5 transition-colors hover:bg-white/[0.06] ${current ? 'bg-white/[0.06]' : ''}`}
                            >
                              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.06] text-gold-300 ring-1 ring-white/10 transition-colors group-hover/mm:bg-gold-400 group-hover/mm:text-ink-950">
                                <Icon name={item.icon} className="h-[18px] w-[18px]" strokeWidth={1.9} />
                              </span>
                              <span className="min-w-0 pt-0.5">
                                <span className="block text-[15px] font-semibold leading-tight text-white">{item.label}</span>
                                {item.desc && <span className="mt-1 block text-[13px] leading-snug text-white/50">{item.desc}</span>}
                              </span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </li>
            ))}
            {MOBILE_LINKS.map((l, i) => (
              <li key={l.href} className="border-b border-white/10">
                <Link href={l.href} onClick={close} className="flex items-center justify-between gap-4 py-4">
                  <span className="block overflow-hidden pb-1">
                    <span data-m-line className="flex items-start gap-3 font-display text-[clamp(1.85rem,8vw,2.6rem)] font-bold leading-none tracking-[-0.03em]">
                      <span className="pt-1 font-sans text-[12px] font-bold tracking-normal text-gold-400">0{MOBILE_GROUPS.length + i + 1}</span>
                      {l.label}
                    </span>
                  </span>
                  <span data-m-fade aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20">
                    <Icon name="arrow" className="h-4 w-4" strokeWidth={2.2} />
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div data-m-fade className="mt-6 flex flex-wrap gap-2">
            {MENU.features.footer.map((l) => (
              <Link key={l.href} href={l.href} onClick={close} className="inline-flex h-10 items-center gap-2 rounded-full bg-white/[0.06] px-4 text-[14px] font-semibold text-white/85 ring-1 ring-white/10 transition-colors hover:bg-white/10">
                <Icon name={l.href.includes('demo') ? 'play' : 'layers'} className="h-4 w-4 text-gold-300" />
                {l.label}
              </Link>
            ))}
            <a href={MENU.login.href} className="inline-flex h-10 items-center gap-2 rounded-full bg-white/[0.06] px-4 text-[14px] font-semibold text-white/85 ring-1 ring-white/10 transition-colors hover:bg-white/10">
              <Icon name="user" className="h-4 w-4 text-gold-300" />
              {MENU.login.label}
            </a>
          </div>

          <div className="mt-auto pt-10">
            <a data-m-fade href={APP_URL} className="group flex h-14 items-center justify-between rounded-full bg-gold-500 pl-6 pr-2 text-[16px] font-bold text-ink-950">
              {OFFER.ctaLong}
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink-950 text-gold-400 transition-transform duration-500 group-hover:-rotate-45" aria-hidden="true">
                <Icon name="arrow" className="h-4 w-4" strokeWidth={2.4} />
              </span>
            </a>
            <p data-m-fade className="mt-4 flex items-center justify-center gap-2 text-[13px] font-medium text-white/55">
              <Icon name="shield" className="h-4 w-4 text-gold-400" />
              {OFFER.control}
            </p>
          </div>
        </nav>
      </div>

    <header ref={bar} className="fixed inset-x-0 top-0 z-50">
      <div className="container-x pt-3 sm:pt-4">
        <nav
          aria-label="Main"
          className={`relative mx-auto flex h-[60px] max-w-[1200px] items-center justify-between gap-3 rounded-[20px] border pl-4 pr-2 transition-[background-color,border-color,box-shadow] duration-300 sm:h-16 sm:pl-5 ${
            mobile
              ? 'border-white bg-white shadow-[0_18px_44px_-20px_rgba(0,0,0,0.6)]'
              : raised
              ? 'border-ink-900/[0.08] bg-white/[0.88] shadow-[0_18px_44px_-24px_rgba(26,15,51,0.35)] backdrop-blur-xl'
              : 'border-white/70 bg-white/55 shadow-[0_10px_30px_-24px_rgba(26,15,51,0.3)] backdrop-blur-md'
          }`}
        >
          <Link href="/" aria-label="JobHunter by SuperMIA, home" className="flex shrink-0 items-center">
            <Image src="/brand/logo.png" alt="JobHunter by SuperMIA" width={2172} height={724} preload sizes="170px" className="h-9 w-auto sm:h-10 lg:h-11" />
          </Link>

          {/* Desktop menu; panels float under the bar */}
          <div className="pointer-events-none absolute inset-x-0 top-0 hidden h-full justify-center lg:flex" onMouseLeave={closeSoon}>
            <ul className="pointer-events-auto relative flex items-center gap-0.5">
              <li>{trigger('features', MENU.features.label, featureActive)}</li>
              <li>{trigger('audiences', MENU.audiences.label, audienceActive)}</li>
              <li onMouseEnter={closeSoon}>
                <Link href="/blog" aria-current={pathname === '/blog' ? 'page' : undefined} className={linkClass('blog', blogActive)}>
                  {MENU.blog.label}
                </Link>
              </li>
              <li onMouseEnter={closeSoon}>
                <Link href={MENU.faq.href} aria-current={pathname === MENU.faq.href ? 'page' : undefined} className={linkClass('faq', pathname === MENU.faq.href)}>
                  {MENU.faq.label}
                </Link>
              </li>
              <li onMouseEnter={closeSoon}>
                <Link href={PRICING.path} aria-current={pathname === PRICING.path ? 'page' : undefined} className={linkClass('pricing', pathname === PRICING.path)}>
                  Pricing
                </Link>
              </li>

              {/* Features: Find jobs · Apply · Practice */}
              <li id="nav-panel-features" className={`${panelShell} w-[780px] ${panelState(menu === 'features')}`} onMouseEnter={openOn('features')}>
                <div className={panelCard}>
                  <div className="grid grid-cols-3 divide-x divide-ink-900/[0.06]">
                    <div className="px-6 pb-5 pt-5">
                      <GroupLabel>{find.title}</GroupLabel>
                      {find.items.map((item) => (
                        <MenuLink key={item.href} item={item} pathname={pathname} onPick={close} />
                      ))}
                      <div className="mt-4 rounded-xl border border-ink-900/[0.06] bg-[#faf9fd] p-3">
                        <p className="text-[11.5px] font-medium text-ink-900/50">One search across</p>
                        <ul className="mt-2 flex flex-wrap gap-1.5">
                          {CHANNELS.map((c) => (
                            <li key={c.name} className="flex items-center gap-1.5 rounded-md bg-white px-2 py-1 text-[12px] font-semibold text-ink-950 shadow-[0_1px_2px_rgba(26,15,51,0.08)] ring-1 ring-ink-900/[0.06]">
                              <Image src={c.logo} alt="" width={12} height={12} className="h-3 w-3 object-contain" />
                              {c.name}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="px-6 pb-5 pt-5">
                      <GroupLabel>{apply.title}</GroupLabel>
                      <div className="space-y-1">
                        {apply.items.map((item) => (
                          <MenuLink key={item.href} item={item} pathname={pathname} onPick={close} />
                        ))}
                      </div>
                    </div>
                    <div className="px-6 pb-5 pt-5">
                      <GroupLabel>{practice.title}</GroupLabel>
                      <div className="space-y-1">
                        {practice.items.map((item) => (
                          <MenuLink key={item.href} item={item} pathname={pathname} onPick={close} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className={footStrip}>
                    <span className="flex items-center gap-2 text-[12.5px] text-ink-900/55">
                      <Icon name="shield" className="h-4 w-4 text-brand-500" strokeWidth={1.8} />
                      {OFFER.control}
                    </span>
                    <span className="flex items-center gap-5">
                      {MENU.features.footer.map((l) => (
                        <Link key={l.href} href={l.href} onClick={close} className="group/l inline-flex items-center gap-1.5 text-[13px] font-semibold text-ink-950 hover:text-brand-700">
                          {l.href.includes('demo') && (
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-950 text-gold-400">
                              <Icon name="play" className="ml-px h-2.5 w-2.5" />
                            </span>
                          )}
                          {l.label}
                          {!l.href.includes('demo') && <Icon name="arrow" className="h-3.5 w-3.5 transition-transform group-hover/l:translate-x-0.5" strokeWidth={2.2} />}
                        </Link>
                      ))}
                    </span>
                  </div>
                </div>
              </li>

              {/* Who It's For: the group photo with the promise, then the five audiences in two columns */}
              <li id="nav-panel-audiences" className={`${panelShell} w-[760px] ${panelState(menu === 'audiences')}`} onMouseEnter={openOn('audiences')}>
                <div className={`${panelCard} grid grid-cols-[220px_minmax(0,1fr)]`}>
                  <div className="relative m-2 overflow-hidden rounded-[14px] bg-brand-950">
                    <Image src="/images/community-group.jpg" alt="" fill sizes="220px" className="object-cover object-[50%_60%] opacity-80" />
                    <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/55 to-transparent" />
                    <span className="absolute inset-x-0 bottom-0 p-4">
                      <span className="block font-display text-[16px] font-bold leading-snug text-white">One plan for any role</span>
                      <span className="mt-1.5 block text-[12.5px] leading-snug text-white/70">Find the right jobs, apply with a resume that fits, practice until you are ready.</span>
                    </span>
                  </div>
                  <div className="px-5 pb-4 pt-5">
                    <GroupLabel>Built for</GroupLabel>
                    <div className="grid grid-cols-2 gap-x-3 gap-y-1">
                      {MENU.audiences.items.map((item) => (
                        <MenuLink key={item.href} item={item} pathname={pathname} onPick={close} />
                      ))}
                      <Link
                        href={MENU.audiences.aside.link.href}
                        onClick={close}
                        className="group/q -mx-0.5 flex items-center justify-between gap-3 rounded-xl bg-[#f6f4fb] px-3.5 py-3 transition-colors hover:bg-brand-950"
                      >
                        <span>
                          <span className="block text-[12.5px] text-ink-900/55 transition-colors group-hover/q:text-white/60">Not sure which fits?</span>
                          <span className="mt-0.5 block text-[14px] font-semibold text-ink-950 transition-colors group-hover/q:text-gold-300">{MENU.audiences.aside.link.label}</span>
                        </span>
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-ink-950 shadow-[0_1px_2px_rgba(26,15,51,0.1)] transition-colors group-hover/q:bg-gold-400">
                          <Icon name="arrow" className="h-3.5 w-3.5" strokeWidth={2.2} />
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <div className="relative flex items-center gap-1 sm:gap-1.5">
            <a href={MENU.login.href} className="hidden rounded-full px-3.5 py-2 text-[14.5px] font-medium text-ink-900/75 transition-colors hover:bg-ink-900/[0.04] hover:text-ink-950 lg:block">
              {MENU.login.label}
            </a>
            <a
              href={APP_URL}
              className="group hidden h-10 items-center gap-1.5 whitespace-nowrap rounded-[14px] sm:inline-flex bg-gold-500 px-3.5 text-[13px] font-semibold text-ink-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_6px_16px_-10px_rgba(180,120,0,0.9)] transition-colors duration-200 hover:bg-gold-400 sm:h-11 sm:px-5 sm:text-[14.5px]"
            >
              {OFFER.cta}
              <Icon name="arrow" className="hidden h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 sm:block" strokeWidth={2.2} />
            </a>
            <button
              type="button"
              onClick={() => setMobile((v) => !v)}
              aria-expanded={mobile}
              aria-controls="mobile-menu"
              aria-label={mobile ? 'Close menu' : 'Open menu'}
              className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-ink-950 transition-colors hover:bg-ink-900/5 lg:hidden"
            >
              <span className={`absolute h-[1.5px] w-5 rounded bg-current transition-transform duration-300 ${mobile ? 'rotate-45' : '-translate-y-[3.5px]'}`} />
              <span className={`absolute h-[1.5px] w-5 rounded bg-current transition-transform duration-300 ${mobile ? '-rotate-45' : 'translate-y-[3.5px]'}`} />
            </button>
          </div>
        </nav>

      </div>
    </header>
    </>
  );
}
