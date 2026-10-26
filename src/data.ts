import type { Expense } from "./types";

export const initialExpenses: Expense[] = [
  {
    id: "e1",
    label: "Courses",
    amountCents: 4250,
    paidBy: "Léa",
    settled: false,
  },
  {
    id: "e2",
    label: "Loyer",
    amountCents: 62000,
    paidBy: "Tom",
    settled: true,
  },
  {
    id: "e3",
    label: "Internet",
    amountCents: 2999,
    paidBy: "Léa",
    settled: false,
  },
];
