export type Expense = {
  id: string;
  label: string;
  amountCents: number; // en centimes
  paidBy: string;
  settled: boolean;
};
