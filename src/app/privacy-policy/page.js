import LegalPage from '@/components/LegalPage';
import { PRIVACY, LEGAL_UPDATED } from '@/content/legal';

export const metadata = {
  title: 'Privacy Policy',
  description: 'How Job Hunter collects, uses and protects your personal information.',
  alternates: { canonical: '/privacy-policy' },
};

export default function PrivacyPolicyPage() {
  return <LegalPage {...PRIVACY} updated={LEGAL_UPDATED} other={{ href: '/terms-and-conditions', label: 'Terms & Conditions' }} />;
}
