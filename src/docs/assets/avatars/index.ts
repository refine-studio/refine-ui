import clara from './clara-weiss.jpg';
import daniel from './daniel-reyes.jpg';
import elena from './elena-vogt.jpg';
import mai from './mai-tanaka.jpg';
import marco from './marco-lind.jpg';
import peter from './peter-holm.jpg';
import sofia from './sofia-brandt.jpg';
import tomas from './tomas-berg.jpg';

/**
 * Fictional people for stories. Each name is invented, and each portrait is an Unsplash stock photo.
 */
export const PEOPLE = {
  clara: { fallback: 'CW', name: 'Clara Weiss', src: clara },
  daniel: { fallback: 'DR', name: 'Daniel Reyes', src: daniel },
  elena: { fallback: 'EV', name: 'Elena Vogt', src: elena },
  mai: { fallback: 'MT', name: 'Mai Tanaka', src: mai },
  marco: { fallback: 'ML', name: 'Marco Lind', src: marco },
  peter: { fallback: 'PH', name: 'Peter Holm', src: peter },
  sofia: { fallback: 'SB', name: 'Sofia Brandt', src: sofia },
  tomas: { fallback: 'TB', name: 'Tomas Berg', src: tomas },
} as const;
