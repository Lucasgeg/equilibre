import type { Expense } from "../types";
import { ExpenseItem } from "./ExpenseItem";

type ExpenseListProps = {
  expenses: Expense[];
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
  onEdit: (id: string) => void;
};

export const ExpenseList = ({
  expenses,
  onDelete,
  onToggle,
  onEdit,
}: ExpenseListProps) => {
  return (
    <ul>
      {expenses.map((expense) => (
        <ExpenseItem
          key={expense.id}
          label={expense.label}
          amountCents={expense.amountCents}
          paidBy={expense.paidBy}
          settled={expense.settled}
          onDelete={() => onDelete(expense.id)}
          onToggle={() => onToggle(expense.id)}
          onEdit={() => onEdit(expense.id)}
        />
      ))}
    </ul>
  );
};
