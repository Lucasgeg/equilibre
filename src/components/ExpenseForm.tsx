import { useState, type SubmitEvent } from "react";
import { parseAmountToCents } from "../lib/money";
import type { Expense } from "../types";

export type FormValues = { label: string; amount: string; paidBy: string };

type ExpenseFormProps = {
  members: string[];
  onSave: (expense: Expense) => void;
  groupId: string;
  initial?: Expense;
};

export const ExpenseForm = ({
  members,
  onAdd,
  groupId,
  onSave,
  initial,
}: ExpenseFormProps) => {
  const initialState = {
    amount: "",
    label: "",
    paidBy: members[0],
  };
  const [values, setValues] = useState<FormValues>(initialState);

  const update = (field: keyof FormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const amountCents = parseAmountToCents(values.amount);
  const labelError = values.label.trim() === "";
  const isValid = !labelError && amountCents !== null;

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isValid || amountCents === null) return;
    onAdd({
      amountCents,
      id: crypto.randomUUID(),
      label: values.label.trim(),
      paidBy: values.paidBy,
      settled: false,
    });
    setValues(initialState);
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <input
        placeholder="Libellé"
        value={values.label}
        onChange={(e) => update("label", e.target.value)}
      />
      <input
        placeholder="Montant"
        value={values.amount}
        onChange={(e) => update("amount", e.target.value)}
      />
      <select
        value={values.paidBy}
        onChange={(e) => update("paidBy", e.target.value)}
      >
        {members.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>
      <button type="submit" disabled={!isValid}>
        Ajouter
      </button>
    </form>
  );
};
