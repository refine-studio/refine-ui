import { Badge } from '../../components/badge/badge';
import { type Breakpoint, BREAKPOINTS, useBreakpoint } from '../../lib/use-breakpoint';
import { Specimen, Token } from './specimen';

const BREAKPOINT_NAMES = ['sm', 'md', 'lg', 'xl', '2xl'] as const satisfies readonly Breakpoint[];

/**
 * One row per breakpoint with the hook's live answer for this window.
 */
const BreakpointAnswersRow = ({ breakpoint }: { breakpoint: Breakpoint }) => {
  const matches = useBreakpoint(breakpoint);

  return (
    <li className="gap-4 py-3 flex items-center">
      <Token className="w-44 text-foreground">useBreakpoint('{breakpoint}')</Token>
      <span className="flex-1 text-body-sm text-muted-foreground">≥ {BREAKPOINTS[breakpoint]}</span>
      <Badge dot variant={matches ? 'success' : 'neutral'}>
        {matches ? 'true' : 'false'}
      </Badge>
    </li>
  );
};

/**
 * Lists every breakpoint and whether this window is at least that wide; resize the window to watch it change.
 */
export const BreakpointAnswers = () => {
  return (
    <Specimen caption="Resize the window to watch the answers change.">
      <ul className="divide-y divide-border">
        {BREAKPOINT_NAMES.map((breakpoint) => {
          return <BreakpointAnswersRow breakpoint={breakpoint} key={breakpoint} />;
        })}
      </ul>
    </Specimen>
  );
};
