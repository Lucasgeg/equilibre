import { useState } from "react";
import { ExpenseItem } from "./components/ExpenseItem";
import { initialExpenses } from "./data";

export const App = () => {
  const [expenses, setExpenses] = useState(initialExpenses);

  const handleDelete = (id: string) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  const handleToggle = (id: string) => {
    setExpenses((prev) =>
      prev.map((e) => (e.id === id ? { ...e, settled: !e.settled } : e)),
    );
  };

  return (
    <ul>
      {expenses.map((expense) => (
        <ExpenseItem
          amountCents={expense.amountCents}
          label={expense.label}
          paidBy={expense.paidBy}
          onDelete={() => handleDelete(expense.id)}
          onToggle={() => handleToggle(expense.id)}
          settled={expense.settled}
          key={expense.id}
        />
      ))}
    </ul>
  );
};
