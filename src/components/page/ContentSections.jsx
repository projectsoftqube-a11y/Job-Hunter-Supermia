import CreativeHeading from '@/components/CreativeHeading';
import { FadeUp } from '@/components/Reveal';
import Rich from '@/components/Rich';
import { Block } from '@/components/page/Blocks';
import MockFrame from '@/components/page/MockFrame';

/*
 * Default body for a content page: one section per H2 from the brief, backgrounds alternating. Pages
 * with a bespoke story (src/components/stories) replace this with their own design; this stays as the
 * fallback so a new page always renders.
 */

// Prose blocks keep a readable measure; grids and tables use the full width
const NARROW = new Set(['p', 'list', 'callout', 'example']);

function SectionBlocks({ blocks, wide }) {
  return (
    <div className="space-y-6">
      {blocks.map((b, i) => (
        <div key={i} className={NARROW.has(b.type) && !wide ? 'max-w-3xl' : ''}>
          <Block b={b} />
        </div>
      ))}
    </div>
  );
}

function Section({ s, index }) {
  const tint = index % 2 === 0 ? 'bg-white' : 'bg-light-lavender';
  return (
    <section id={s.id} aria-labelledby={`${s.id}-title`} className={`relative scroll-mt-24 overflow-hidden py-20 sm:py-28 ${tint}`}>
      <div className="container-x">
        <div className="max-w-4xl">
          {s.eyebrow && <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-brand-500">{s.eyebrow}</p>}
          <CreativeHeading id={`${s.id}-title`} lines={s.h2} className="font-display text-[clamp(1.85rem,1.2rem+2.2vw,3.4rem)] font-extrabold leading-[1.06] tracking-[-0.03em] text-ink-950" />
          {s.intro && (
            <FadeUp y={24}>
              <p className="mt-5 max-w-3xl text-lead font-medium text-ink-900/70">
                <Rich text={s.intro} />
              </p>
            </FadeUp>
          )}
        </div>

        {s.visual ? (
          <div className="mt-12 grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:gap-16">
            <FadeUp y={30} className="min-w-0">
              <SectionBlocks blocks={s.blocks || []} wide />
            </FadeUp>
            <div className="min-w-0 lg:sticky lg:top-28">
              <MockFrame name={s.visual} />
            </div>
          </div>
        ) : (
          (s.blocks?.length ?? 0) > 0 && (
            <FadeUp y={30} className="mt-12">
              <SectionBlocks blocks={s.blocks} />
            </FadeUp>
          )
        )}
      </div>
    </section>
  );
}

export default function ContentSections({ page }) {
  return (page.sections || []).map((s, i) => <Section key={s.id} s={s} index={i} />);
}
