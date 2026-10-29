import { Button } from '../../components/button/button';
import { DENSITIES } from '../../theme/theme';
import { Specimen, Token } from './specimen';

const RADIUS_TOKENS = [
  ['rounded-inner', 'Items inside a control: toggle segments, menu rows', '5px'],
  ['rounded-control', 'Buttons, inputs, chips', '8px'],
  ['rounded-card', 'Cards, popovers, menus', '12px'],
  ['rounded-panel', 'Dialogs, sheets, hero panels', '20px'],
] as const;

/**
 * The four fixed radius tokens on sample shapes.
 */
export const RadiusTokens = () => {
  return (
    <Specimen>
      <div className="gap-6 sm:grid-cols-4 grid">
        {RADIUS_TOKENS.map(([className, use, size]) => {
          return (
            <div className="gap-2 flex flex-col" key={className}>
              <div className={`h-20 border border-gem/40 bg-gem-soft ${className}`} />
              <Token className="text-foreground">
                {className} · {size}
              </Token>
              <span className="text-caption text-muted-foreground">{use}</span>
            </div>
          );
        })}
      </div>
    </Specimen>
  );
};

// Full class names, so Tailwind's scanner finds each one.
const CONTROL_HEIGHTS = [
  ['h-control-xs', 'xs'],
  ['h-control-sm', 'sm'],
  ['h-control-md', 'md'],
  ['h-control-lg', 'lg'],
  ['h-control-xl', 'xl'],
] as const;

/**
 * Control heights rendered once per density scope, so the scaling is visible side by side.
 */
export const ControlHeights = () => {
  return (
    <Specimen>
      <div className="gap-6 sm:grid-cols-3 grid">
        {DENSITIES.map((density) => {
          return (
            <div className="gap-3 flex flex-col" data-density={density} key={density}>
              <span className="eyebrow text-muted-foreground">data-density="{density}"</span>
              <div className="gap-2 flex items-end">
                {CONTROL_HEIGHTS.map(([className, size]) => {
                  return (
                    <div
                      className={`w-10 pb-1 flex items-end justify-center rounded-control bg-gem-soft font-mono text-caption text-gem-ink ${className}`}
                      key={size}
                    >
                      {size}
                    </div>
                  );
                })}
              </div>
              <Button size="sm">Save changes</Button>
            </div>
          );
        })}
      </div>
    </Specimen>
  );
};
