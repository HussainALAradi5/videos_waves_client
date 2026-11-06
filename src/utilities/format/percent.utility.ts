const PERCENT = 100

/** Whole-number progress; 0 while the total is still unknown. */
export const toPercent = (loaded: number, total?: number): number =>
  total ? Math.min(PERCENT, Math.round((loaded * PERCENT) / total)) : 0
