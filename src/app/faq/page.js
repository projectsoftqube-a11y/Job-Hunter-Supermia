import CreativeHeading from '@/components/CreativeHeading';
import { FadeUp } from '@/components/Reveal';
import Rich from '@/components/Rich';
import { Icon } from '@/components/icons';
import JsonLd from '@/components/JsonLd';
import PageHero from '@/components/page/PageHero';
import FaqList from '@/components/page/FaqList';
import CtaBand from '@/components/page/CtaBand';
import { FAQ_PAGE } from '@/content/faq';
import { graph, pageNode, breadcrumbNode, faqNode } from '@/lib/schema';

const { path, seo, groups } = FAQ_PAGE;
const TRAIL = [{ name: 'FAQ', path }];

export const metadata = {
  title: { absolute: seo.title },
  description: seo.description,
  alternates: { canonical: path },
  openGraph: { type: 'website', url: path, title: seo.title, description: seo.description },
  twitter: { card: 'summary_large_image', title: seo.title, description: seo.description },
};

/*
 * /faq: 25 questions in six groups, each group with a jump link. Every answer is in the server HTML
 * (details/summary), and the FAQPage JSON-LD is built from the same strings.
 */
export default function FaqPage() {
  const all = groups.flatMap((g) => g.items);
  const schema = graph(
    pageNode({ path, name: seo.title, description: seo.description }),
    breadcrumbNode(path, TRAIL),
    faqNode(
      path,
      all.map((f) => ({ q: f.q, text: f.a }))
    )
  );

  return (
    <>
      <main id="main">
        <PageHero trail={TRAIL} eyebrow={`${all.length} questions`} h1={FAQ_PAGE.h1} tagline={FAQ_PAGE.tagline} lead={FAQ_PAGE.lead} />

        <section aria-label="Frequently asked questions" className="relative bg-white py-16 sm:py-24">
          <div className="container-x grid grid-cols-[minmax(0,1fr)] gap-12 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-16 xl:grid-cols-[320px_minmax(0,1fr)]">
            {/* Jump list */}
            <nav aria-label="FAQ topics" className="min-w-0 lg:sticky lg:top-28 lg:h-fit">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-ink-900/45">Jump to a topic</p>
              <ul className="flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] lg:flex-col lg:overflow-visible lg:pb-0">
                {groups.map((g) => (
                  <li key={g.id} className="shrink-0">
                    <a href={`#${g.id}`} className="group flex items-center gap-3 rounded-2xl border border-hairline bg-light-lavender/60 px-3.5 py-2.5 text-[14px] font-bold text-ink-950 transition-colors hover:border-brand-200 hover:bg-white">
                      <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-950 text-gold-400">
                        <Icon name={g.icon} className="h-4 w-4" />
                      </span>
                      {g.title}
                      <span className="ml-auto hidden text-xs font-semibold text-ink-900/40 lg:inline">{g.items.length}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="min-w-0 space-y-20">
              {groups.map((g) => (
                <section key={g.id} id={g.id} aria-labelledby={`${g.id}-title`} className="scroll-mt-28">
                  <div className="flex items-center gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-600 to-brand-900 text-gold-300 shadow-[0_12px_24px_-12px_rgba(75,46,131,0.8)]">
                      <Icon name={g.icon} className="h-6 w-6" />
                    </span>
                    <CreativeHeading id={`${g.id}-title`} lines={[[g.title]]} className="font-display text-[clamp(1.7rem,1.2rem+1.6vw,2.6rem)] font-extrabold leading-tight tracking-[-0.03em] text-ink-950" />
                  </div>
                  <p className="mt-4 max-w-3xl text-[17px] leading-relaxed text-ink-900/70">
                    <Rich text={g.intro} />
                  </p>
                  <FadeUp y={30} className="mt-7">
                    <FaqList items={g.items} idPrefix={g.id} openFirst={g.id === 'about'} />
                  </FadeUp>
                </section>
              ))}
            </div>
          </div>
        </section>

        <CtaBand h2={FAQ_PAGE.cta.h2} text={FAQ_PAGE.cta.text} secondary={FAQ_PAGE.cta.secondary} />
      </main>
      <JsonLd data={schema} />
    </>
  );
}
