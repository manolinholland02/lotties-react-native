import { ms } from "../utils/scale";

// Shared spacing scale (moderated for slight responsiveness).
export const spacing = {
  xs: ms(4, 0.2),
  s: ms(8, 0.2),
  m: ms(12, 0.2),
  l: ms(16, 0.2),
  xl: ms(20, 0.2),
} as const;

export type Spacing = typeof spacing;
