export type Expense = {
  id: string;
  label: string;
  amountCents: number; // en centimes
  paidBy: string;
  settled: boolean;
  groupId: string;
};

export type Group = {
  id: string;
  name: string;
  members: string[];
};
