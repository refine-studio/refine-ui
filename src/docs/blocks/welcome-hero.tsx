import { Logo } from '../../components/logo/logo';
import { HexRipple } from './hex-ripple';
import { Specimen } from './specimen';

/**
 * The welcome banner: logo and display headline over refine.studio's rippling 3D hexagons, in neutral tones only.
 */
export const WelcomeHero = () => {
  return (
    <Specimen className="p-0 relative overflow-hidden rounded-panel">
      <HexRipple className="inset-0 absolute" />
      <div className="inset-0 absolute bg-linear-to-r from-background via-background/70 to-transparent" />
      <div className="gap-6 px-8 py-14 sm:px-12 relative flex flex-col">
        <Logo className="h-9 self-start" plate />
        <span className="eyebrow text-muted-foreground">Refine UI · v0.1</span>
        <h1 className="max-w-3xl text-display-lg">Where Diamonds craft Diamonds.</h1>
        <p className="max-w-[60ch] text-body-lg text-muted-foreground">
          The design system for everything we build for ourselves. Tools, dashboards, experiments. Same craft as
          refine.studio, none of the guard rails a customer product needs.
        </p>
      </div>
    </Specimen>
  );
};
