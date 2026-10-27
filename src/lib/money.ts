export const parseAmountToCents = (input: string): number | null => {
  const value = Number(input.replace(",", "."));
  if (!Number.isFinite(value) || value <= 0) return null;
  return Math.round(value * 100);
};
