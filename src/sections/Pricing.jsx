import Link from "next/link";
import CreativeHeading from "@/components/CreativeHeading";
import { FadeUp } from "@/components/Reveal";
import { Icon } from "@/components/icons";
import SlideCta from "@/components/SlideCta";
import { OFFER, PRICING } from "@/content/site";
import { limitsLabel, money, periodLabel } from "@/lib/pricing";

/*
 * Pricing: one card per plan with its limits, and a full comparison table used on /pricing. The plans
 * come from the billing API (getBillingPlans in lib/billing.js), passed in by the page, so the cards,
 * the table and the Offer schema never disagree.
 */

const fmt = (n) => n.toLocaleString("en-US");

// One gold arc that travels round the featured card's border
const GOLD_ARCS =
  "bg-[conic-gradient(from_0deg,transparent_0deg,transparent_250deg,#f4b400_300deg,#fde68a_330deg,#f9c320_345deg,transparent_360deg)]";

export function PricingPlans({ plans, headingLevel = 3 }) {
  const H = `h${headingLevel}`;
  return (
    <ul className="grid gap-5 lg:grid-cols-3 lg:items-stretch lg:gap-6">
      {plans.map((plan, i) => {
        const dark = plan.featured;
        return (
          <FadeUp
            as="li"
            key={plan.id}
            y={40}
            delay={i * 0.08}
            className="min-w-0"
          >
            {/* A gradient border that keeps travelling round the card: gold on the featured plan, a soft
                lavender on the others that shows on hover */}
            <div
              className={`group/card relative h-full ${dark ? "lg:-my-4" : ""}`}
            >
              <div
                className={`relative isolate h-full overflow-hidden rounded-[32px] ${
                  dark
                    ? "bg-brand-700/50 p-[2px] shadow-[0_50px_100px_-45px_rgba(26,15,51,0.9)]"
                    : "bg-hairline p-[2px] shadow-[0_30px_70px_-50px_rgba(26,15,51,0.55)]"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`pointer-events-none absolute left-1/2 top-1/2 -z-[1] aspect-square w-[240%] -translate-x-1/2 -translate-y-1/2 motion-safe:animate-[spin_4s_linear_infinite] ${
                    dark
                      ? GOLD_ARCS
                      : "bg-[conic-gradient(from_0deg,transparent_0deg,transparent_200deg,#c4b3ea_280deg,#7c5cd6_330deg,transparent_360deg)] opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
                  }`}
                />
                <article
                  className={`relative flex h-full flex-col overflow-hidden rounded-[30px] p-7 sm:p-8 ${dark ? "grain bg-brand-950 text-white lg:py-12" : "bg-white text-ink-950"}`}
                >
                  {dark && (
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,rgba(244,180,0,0.3),transparent)]"
                    />
                  )}
                  <div className="relative z-[2] flex h-full flex-col">
                    <div className="flex items-center justify-between gap-3">
                      <H className="font-display text-[1.45rem] font-bold tracking-[-0.02em]">
                        {plan.name}
                      </H>
                      {dark && (
                        <span className="rounded-full bg-gold-400 px-3 py-1 text-[11.5px] font-bold uppercase tracking-[0.12em] text-ink-950">
                          Most popular
                        </span>
                      )}
                    </div>
                    <p
                      className={`mt-2 min-h-[3em] text-[15px] leading-relaxed ${dark ? "text-white/70" : "text-ink-900/65"}`}
                    >
                      {plan.blurb}
                    </p>

                    <p className="mt-6 flex items-end gap-1.5">
                      <span className="font-display text-[clamp(3rem,2.4rem+2vw,4rem)] font-extrabold leading-none tracking-[-0.04em]">
                        {money(plan)}
                      </span>
                      <span
                        className={`pb-1.5 text-[15px] font-semibold ${dark ? "text-white/55" : "text-ink-900/50"}`}
                      >
                        {periodLabel(plan)}
                      </span>
                    </p>

                    <SlideCta
                      href={plan.href}
                      label={plan.cta}
                      tone={dark ? "dark" : "light"}
                      className="mt-7"
                    />

                    <p
                      className={`mt-8 text-[12px] font-bold uppercase tracking-[0.16em] ${dark ? "text-gold-300" : "text-ink-900/45"}`}
                    >
                      {limitsLabel(plan)}
                    </p>
                    <ul
                      className={`mt-3 divide-y ${dark ? "divide-white/10" : "divide-ink-900/[0.07]"}`}
                    >
                      {PRICING.rows.map((r) => (
                        <li
                          key={r.key}
                          className="flex items-center gap-3.5 py-3"
                        >
                          <span
                            aria-hidden="true"
                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${dark ? "bg-white/[0.07] text-gold-300 ring-1 ring-white/10" : "bg-light-lavender text-brand-600"}`}
                          >
                            <Icon name={r.icon} className="h-[17px] w-[17px]" />
                          </span>
                          <span className="flex min-w-0 flex-1 items-baseline gap-2 text-[15px] leading-snug">
                            <strong
                              className={`font-display text-[clamp(1.5rem,1.3rem+0.6vw,1.85rem)] font-extrabold leading-none tracking-[-0.03em] tabular-nums ${dark ? "text-gold-300" : "text-brand-700"}`}
                            >
                              {fmt(plan.limits[r.key])}
                            </strong>
                            <span>
                              {plan.limits[r.key] === 1 ? r.one : r.unit}
                            </span>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </div>
            </div>
          </FadeUp>
        );
      })}
    </ul>
  );
}

export function PricingTable({ plans }) {
  const max = Object.fromEntries(
    PRICING.rows.map((r) => [
      r.key,
      Math.max(1, ...plans.map((p) => p.limits[r.key])),
    ]),
  );
  const cell = (p) => (p.featured ? "bg-brand-950 text-white" : "");

  return (
    <div className="overflow-x-auto rounded-[30px] border border-hairline bg-white shadow-[0_40px_80px_-55px_rgba(26,15,51,0.6)]">
      <table className="w-full min-w-[720px] border-collapse text-left">
        <caption className="sr-only">
          JobHunter plans compared: price and limits
        </caption>
        <colgroup>
          <col className="w-[34%]" />
          {plans.map((p) => (
            <col key={p.id} className="w-[22%]" />
          ))}
        </colgroup>
        <thead>
          <tr>
            <th scope="col" className="px-7 pb-6 pt-8 align-bottom">
              <span className="block text-[12px] font-bold uppercase tracking-[0.16em] text-brand-600">
                Compare plans
              </span>
              <span className="mt-1.5 block font-display text-[1.35rem] font-bold leading-snug text-ink-950">
                What each plan includes
              </span>
            </th>
            {plans.map((p) => (
              <th
                key={p.id}
                scope="col"
                className={`relative px-6 pb-6 pt-8 text-center align-bottom ${cell(p)}`}
              >
                {p.featured && (
                  <span
                    className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-gold-500 via-gold-300 to-gold-500"
                    aria-hidden="true"
                  />
                )}
                {p.featured && (
                  <span className="mb-3 inline-block rounded-full bg-gold-400 px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-[0.12em] text-ink-950">
                    Most popular
                  </span>
                )}
                <span
                  className={`block font-display text-[1.2rem] font-bold ${p.featured ? "text-white" : "text-ink-950"}`}
                >
                  {p.name}
                </span>
                <span className="mt-2 flex items-baseline justify-center gap-1">
                  <span
                    className={`font-display text-[2.4rem] font-extrabold leading-none tracking-[-0.04em] ${p.featured ? "text-gold-300" : "text-ink-950"}`}
                  >
                    {money(p)}
                  </span>
                  <span
                    className={`text-[13px] font-semibold ${p.featured ? "text-white/55" : "text-ink-900/50"}`}
                  >
                    {periodLabel(p)}
                  </span>
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {PRICING.rows.map((r) => (
            <tr
              key={r.key}
              className="group/row border-t border-hairline transition-colors hover:bg-[#faf9ff]"
            >
              <th scope="row" className="px-7 py-5">
                <span className="flex items-center gap-3.5">
                  <span
                    aria-hidden="true"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-light-lavender text-brand-600 transition-colors group-hover/row:bg-brand-950 group-hover/row:text-gold-400"
                  >
                    <Icon name={r.icon} className="h-[18px] w-[18px]" />
                  </span>
                  <span>
                    <span className="block text-[15.5px] font-semibold text-ink-950">
                      {r.label}
                    </span>
                    <span className="block text-[13px] font-normal text-ink-900/55">
                      {r.hint}
                    </span>
                  </span>
                </span>
              </th>
              {plans.map((p) => {
                const v = p.limits[r.key];
                return (
                  <td
                    key={p.id}
                    className={`px-6 py-5 text-center ${p.featured ? "border-t border-white/10 bg-brand-950" : ""}`}
                  >
                    <span
                      className={`block font-display text-[1.65rem] font-extrabold leading-none tracking-[-0.03em] tabular-nums ${p.featured ? "text-gold-300" : "text-ink-950"}`}
                    >
                      {fmt(v)}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`mx-auto mt-2.5 block h-1.5 w-20 overflow-hidden rounded-full ${p.featured ? "bg-white/10" : "bg-brand-50"}`}
                    >
                      <span
                        className={`block h-full rounded-full ${p.featured ? "bg-gradient-to-r from-gold-500 to-gold-300" : "bg-gradient-to-r from-brand-300 to-brand-600"}`}
                        style={{
                          width: `${Math.max(8, (v / max[r.key]) * 100)}%`,
                        }}
                      />
                    </span>
                  </td>
                );
              })}
            </tr>
          ))}
          <tr className="border-t border-hairline">
            <td className="px-7 py-6 text-[13px] font-semibold text-ink-900/55">
              {OFFER.control}
            </td>
            {plans.map((p) => (
              <td
                key={p.id}
                className={`px-6 py-6 text-center ${p.featured ? "border-t border-white/10 bg-brand-950" : ""}`}
              >
                <a
                  href={p.href}
                  className={`group inline-flex h-11 items-center gap-2 rounded-full px-5 text-[14px] font-bold transition-colors ${
                    p.featured
                      ? "bg-gold-400 text-ink-950 hover:bg-gold-300"
                      : "bg-brand-950 text-white hover:bg-brand-800"
                  }`}
                >
                  {p.cta}
                  <Icon
                    name="arrow"
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    strokeWidth={2.4}
                  />
                </a>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

/** Homepage section */
export default function Pricing({ plans }) {
  return (
    <section
      id="pricing"
      aria-labelledby="pricing-title"
      className="relative overflow-hidden bg-white py-[60px] sm:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(40%_35%_at_50%_0%,rgba(196,179,234,0.45),transparent),radial-gradient(30%_30%_at_90%_80%,rgba(252,211,77,0.14),transparent)]"
      />
      <div className="container-x relative">
        <div className="mx-auto max-w-[60rem] text-center">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-brand-600">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
            Pricing
          </p>
          <CreativeHeading
            id="pricing-title"
            className="font-display text-display font-extrabold text-ink-950"
            lines={[
              ["Start Free, Then ", { mark: "Pick a Plan" }],
              ["That Fits ", { grad: "Your Search", swoosh: true }],
            ]}
          />
          <p className="mx-auto mt-6 max-w-[46rem] text-lead font-medium text-ink-900/65">
            Every plan has all four tools: job search, match score, email drafts
            and mock interviews. The plans differ in how much you can use.
          </p>
        </div>

        <div className="mt-12 sm:mt-20">
          <PricingPlans plans={plans} />
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 text-center sm:mt-14 sm:flex-row sm:gap-6">
          <p className="flex items-center gap-2 text-[14px] font-semibold text-ink-900/60">
            <Icon name="shield" className="h-4 w-4 text-brand-500" />
            {OFFER.control} Prices in US dollars.
          </p>
          <Link
            href={PRICING.path}
            className="inline-flex items-center gap-1.5 text-[14px] font-bold text-brand-700 underline decoration-brand-200 underline-offset-4 hover:decoration-brand-600"
          >
            Compare plans side by side
            <Icon name="arrow" className="h-4 w-4" strokeWidth={2.2} />
          </Link>
        </div>
      </div>
    </section>
  );
}
