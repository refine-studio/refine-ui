import { Specimen, Token } from './specimen';

interface SwatchProps {
  className: string;
  label: string;
}

/**
 * One colour chip with its utility class underneath.
 */
const Swatch = ({ className, label }: SwatchProps) => {
  return (
    <div className="flex min-w-0 flex-col gap-1.5">
      <div className={`h-14 rounded-control border ${className}`} />
      <Token className="truncate">{label}</Token>
    </div>
  );
};

const NEUTRALS = [
  ['bg-canvas', 'canvas'],
  ['bg-background', 'background'],
  ['bg-card', 'card'],
  ['bg-popover', 'popover'],
  ['bg-muted', 'muted'],
  ['bg-secondary', 'secondary'],
  ['bg-border', 'border'],
  ['bg-input', 'input'],
  ['bg-subtle', 'subtle'],
  ['bg-muted-foreground', 'muted-foreground'],
  ['bg-foreground', 'foreground'],
  ['bg-primary', 'primary'],
] as const;

/**
 * The zinc neutrals every surface is built from.
 */
export const NeutralSwatches = () => {
  return (
    <Specimen caption="Neutrals redefine themselves under .light and .dark — never reach for a raw zinc.">
      <div className="grid grid-cols-3 gap-4 sm:grid-cols-6">
        {NEUTRALS.map(([className, label]) => {
          return <Swatch className={className} key={label} label={label} />;
        })}
      </div>
    </Specimen>
  );
};

const GEM_RAMP = [
  ['bg-gem-50', '50'],
  ['bg-gem-100', '100'],
  ['bg-gem-200', '200'],
  ['bg-gem-300', '300'],
  ['bg-gem-400', '400'],
  ['bg-gem-500', '500'],
  ['bg-gem-600', '600'],
  ['bg-gem-700', '700'],
  ['bg-gem-800', '800'],
  ['bg-gem-900', '900'],
  ['bg-gem-950', '950'],
] as const;

/**
 * The 50–950 ramp of the refine teal accent.
 */
export const GemRamp = () => {
  return (
    <Specimen caption="bg-gem-50 … bg-gem-950, the refine teal from lightest to darkest.">
      <div className="grid grid-cols-11 gap-2">
        {GEM_RAMP.map(([className, label]) => {
          return <Swatch className={className} key={label} label={label} />;
        })}
      </div>
    </Specimen>
  );
};

const GEM_ROLES = [
  ['bg-gem', 'gem', 'Rings, selection, the accent itself'],
  ['bg-gem-gradient', 'gem-gradient', 'Brand moments, the gem button'],
  ['bg-gem-soft', 'gem-soft', 'Tinted backgrounds, selected rows'],
  ['bg-gem-ink', 'gem-ink', 'Accent text and links on any surface'],
  ['bg-gem-foreground', 'gem-foreground', 'Text on a gem fill'],
] as const;

/**
 * The semantic accent roles with their intended use.
 */
export const GemRoles = () => {
  return (
    <Specimen>
      <div className="grid gap-4 sm:grid-cols-5">
        {GEM_ROLES.map(([className, label, use]) => {
          return (
            <div className="flex flex-col gap-1.5" key={label}>
              <div className={`h-14 rounded-control border ${className}`} />
              <Token>{label}</Token>
              <span className="text-caption text-muted-foreground">{use}</span>
            </div>
          );
        })}
      </div>
    </Specimen>
  );
};

const STATUS = [
  {
    base: 'bg-success',
    ink: 'text-success-ink',
    name: 'success',
    soft: 'bg-success-soft',
  },
  {
    base: 'bg-warning',
    ink: 'text-warning-ink',
    name: 'warning',
    soft: 'bg-warning-soft',
  },
  {
    base: 'bg-danger',
    ink: 'text-danger-ink',
    name: 'danger',
    soft: 'bg-danger-soft',
  },
  {
    base: 'bg-info',
    ink: 'text-info-ink',
    name: 'info',
    soft: 'bg-info-soft',
  },
] as const;

/**
 * The four status families in base, soft and ink.
 */
export const StatusSwatches = () => {
  return (
    <Specimen caption="Status colours never follow the accent. Red means trouble in every mode.">
      <div className="grid gap-4 sm:grid-cols-4">
        {STATUS.map(({ base, ink, name, soft }) => {
          return (
            <div className="flex flex-col gap-2" key={name}>
              <div className={`h-10 rounded-control ${base}`} />
              <div className={`flex h-10 items-center rounded-control px-3 text-body-sm font-medium ${soft} ${ink}`}>
                {name} on soft
              </div>
              <Token>
                {name} · {name}-soft · {name}-ink
              </Token>
            </div>
          );
        })}
      </div>
    </Specimen>
  );
};

/**
 * Hover, pressed and scrim overlays shown on top of a card surface.
 */
export const OverlaySwatches = () => {
  return (
    <Specimen className="bg-card">
      <div className="grid gap-4 sm:grid-cols-3">
        <Swatch className="bg-hover" label="bg-hover" />
        <Swatch className="bg-pressed" label="bg-pressed" />
        <Swatch className="bg-scrim" label="bg-scrim" />
      </div>
    </Specimen>
  );
};
