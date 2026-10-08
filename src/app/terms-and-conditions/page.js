import LegalPage from '@/components/LegalPage';
import { TERMS, LEGAL_UPDATED } from '@/content/legal';

export const metadata = {
  title: 'Terms & Conditions | Job Hunter',
  description: 'The terms that apply when you use Job Hunter.',
  alternates: { canonical: '/terms-and-conditions' },
};

export default function TermsPage() {
  return <LegalPage {...TERMS} updated={LEGAL_UPDATED} other={{ href: '/privacy-policy', label: 'Privacy Policy' }} />;
}
