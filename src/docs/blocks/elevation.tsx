import { Specimen, Token } from './specimen';

const LEVELS = [
  ['shadow-soft', 'Resting cards and panels. The wide, faint shadow from refine.studio.'],
  ['shadow-float', 'Anything floating: menus, popovers, dialogs.'],
  ['shadow-glow', 'A teal halo for hover on brand moments.'],
] as const;

/**
 * The three shadow tokens on a canvas, plus the card-surface and glass utilities.
 */
export const ElevationLevels = () => {
  return (
    <Specimen className="bg-canvas p-10">
      <div className="grid gap-8 sm:grid-cols-3">
        {LEVELS.map(([className, use]) => {
          return (
            <div className={`flex flex-col gap-2 rounded-card border bg-card p-5 ${className}`} key={className}>
              <Token className="text-foreground">{className}</Token>
              <span className="text-body-sm text-muted-foreground">{use}</span>
            </div>
          );
        })}
      </div>
    </Specimen>
  );
};

/**
 * Shows card-surface and glass over a busy teal background so the blur is visible.
 */
export const SurfaceUtilities = () => {
  return (
    <Specimen className="relative overflow-hidden p-0">
      <div className="bg-gem-radiance absolute inset-0" />
      <div className="pattern-hex absolute inset-0 text-foreground/10" />
      <div className="relative grid gap-6 p-10 sm:grid-cols-2">
        <div className="card-surface flex flex-col gap-2 p-5">
          <Token className="text-foreground">card-surface</Token>
          <span className="text-body-sm text-muted-foreground">
            Border, card radius, card colour and shadow-soft in one class.
          </span>
        </div>
        <div className="glass flex flex-col gap-2 rounded-card border p-5">
          <Token className="text-foreground">glass</Token>
          <span className="text-body-sm text-muted-foreground">
            72% background with a 16px blur. Headers and toolbars over content.
          </span>
        </div>
      </div>
    </Specimen>
  );
};
