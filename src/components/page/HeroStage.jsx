import { Icon } from '@/components/icons';

/**
 * The inner-page hero frame: a dark rounded stage under the floating header, with soft brand glows, a
 * faint grid and, for centred heroes, glass icon tiles drifting at the edges. Every inner page (feature,
 * audience, FAQ, pricing, blog) opens on it, so they read as one family with the homepage.
 */
const TILES = [
  { icon: 'search', pos: 'left-[5%] top-[24%]', rot: '-rotate-6', delay: '0s' },
  { icon: 'target', pos: 'left-[9%] bottom-[16%]', rot: 'rotate-3', delay: '-2s' },
  { icon: 'mail', pos: 'right-[6%] top-[20%]', rot: 'rotate-6', delay: '-1s' },
  { icon: 'mic', pos: 'right-[9%] bottom-[18%]', rot: '-rotate-3', delay: '-3s' },
];

export default function HeroStage({ as: Tag = 'section', children, tiles = false, tileIcons, className = '' }) {
  const icons = tileIcons || TILES.map((t) => t.icon);
  return (
    <Tag className={`relative isolate bg-[#f4f1fc] pb-6 pt-[80px] sm:pb-10 sm:pt-[96px] ${className}`}>
      <div className="container-x">
        <div className="grain relative isolate overflow-hidden rounded-[28px] bg-brand-950 text-white shadow-[0_60px_120px_-60px_rgba(26,15,51,0.9)] sm:rounded-[40px]">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-[1]">
            <div className="absolute inset-0 bg-[radial-gradient(55%_60%_at_0%_0%,rgba(124,92,214,0.55),transparent),radial-gradient(45%_55%_at_100%_100%,rgba(244,180,0,0.2),transparent),radial-gradient(40%_40%_at_100%_0%,rgba(91,63,163,0.45),transparent)]" />
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
                backgroundSize: '64px 64px',
                maskImage: 'radial-gradient(ellipse 75% 70% at 50% 40%, black 20%, transparent 80%)',
              }}
            />
            <div className="absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full border border-white/[0.06]" />
            <div className="absolute -right-24 -top-24 h-[24rem] w-[24rem] rounded-full border border-white/[0.06]" />
          </div>

          {tiles &&
            TILES.map((t, i) => (
              <span
                key={t.pos}
                aria-hidden="true"
                className={`pointer-events-none absolute z-[1] hidden xl:block ${t.pos}`}
              >
                <span
                  className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-white/[0.06] text-gold-300 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.6)] ring-1 ring-white/10 motion-safe:animate-[floaty_7s_ease-in-out_infinite] ${t.rot}`}
                  style={{ animationDelay: t.delay }}
                >
                  <Icon name={icons[i] || t.icon} className="h-7 w-7" strokeWidth={1.8} />
                </span>
              </span>
            ))}

          <div className="relative z-[2] px-5 pb-10 pt-7 sm:px-10 sm:pb-14 sm:pt-9 lg:px-14 lg:pb-16 xl:px-16 xl:pb-20">{children}</div>
        </div>
      </div>
    </Tag>
  );
}
