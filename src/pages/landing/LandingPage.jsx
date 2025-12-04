import { LandingLayout } from '@/shared/ui/layouts';
import { LandingHero } from '@/widgets/landing-hero';
import { LandingFeatures } from '@/widgets/landing-features';
import { LandingVision } from '@/widgets/landing-vision';
import { LandingGuide } from '@/widgets/landing-guide';

export const LandingPage = () => {
  return (
    <LandingLayout>
      <LandingHero />
      <LandingFeatures />
      <LandingVision />
      <LandingGuide />
    </LandingLayout>
  );
};