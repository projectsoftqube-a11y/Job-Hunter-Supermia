import LegalPage from '@/components/LegalPage';
import JsonLd from '@/components/JsonLd';
import { TERMS, LEGAL_UPDATED, LEGAL_SEO } from '@/content/legal';
import { graph, pageNode, breadcrumbNode } from '@/lib/schema';

const { title: TITLE, description: DESCRIPTION, path: PATH } = LEGAL_SEO.terms;

export const metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { type: 'website', url: PATH, title: TITLE, description: DESCRIPTION },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
};

export default function TermsPage() {
  return (
    <>
      <LegalPage {...TERMS} h1="Terms and Conditions" path={PATH} updated={LEGAL_UPDATED} other={{ href: '/privacy-policy', label: 'Privacy Policy' }} />
      <JsonLd data={graph(pageNode({ path: PATH, name: TITLE, description: DESCRIPTION, updated: '2026-10-08' }), breadcrumbNode(PATH, [{ name: 'Terms and Conditions', path: PATH }]))} />
    </>
  );
}
