import { Button } from '../../components/button/button';
import { ThemeScope } from '../../theme/theme-scope';
import { Specimen, Token } from './specimen';

const MODE_SCOPES = [
  {
    mode: 'light',
    text: 'The default for tools used all day.',
  },
  {
    mode: 'dark',
    text: 'Sidebars, terminals, late nights.',
  },
  {
    mode: 'on-gem',
    text: 'White ink on the teal gradient.',
  },
] as const;

/**
 * One small card per mode, each rendered inside its own ThemeScope.
 */
export const ModeScopes = () => {
  return (
    <Specimen>
      <div className="gap-4 sm:grid-cols-3 grid">
        {MODE_SCOPES.map(({ mode, text }) => {
          return (
            <ThemeScope className="gap-3 p-5 flex flex-col rounded-card border" key={mode} mode={mode}>
              <Token className="text-foreground">mode="{mode}"</Token>
              <span className="text-body-sm text-muted-foreground">{text}</span>
              <div className="gap-2 flex">
                <Button size="sm">Primary</Button>
                <Button size="sm" variant="outline">
                  Outline
                </Button>
              </div>
            </ThemeScope>
          );
        })}
      </div>
    </Specimen>
  );
};

/**
 * A light page holding a dark sidebar scope and a compact table scope.
 */
export const NestedScopes = () => {
  return (
    <Specimen caption="One page, two scopes. Nothing here is a one-off override." className="light p-0">
      <div className="sm:grid-cols-[12rem_1fr] grid overflow-hidden rounded-card">
        <ThemeScope className="gap-2 p-4 flex flex-col" mode="dark">
          <Token>mode="dark"</Token>
          {['Dashboard', 'Projects', 'People'].map((item) => {
            return (
              <span className="px-2 py-1.5 rounded-control text-body-sm first:bg-hover" key={item}>
                {item}
              </span>
            );
          })}
        </ThemeScope>
        <ThemeScope className="gap-3 p-5 flex flex-col bg-background text-foreground" density="compact">
          <Token>density="compact"</Token>
          <span className="text-body-sm">Every control in this pane is 15% shorter.</span>
          <div className="gap-2 flex">
            <Button size="sm" variant="gem">
              Save
            </Button>
            <Button size="sm" variant="outline">
              Cancel
            </Button>
          </div>
        </ThemeScope>
      </div>
    </Specimen>
  );
};
