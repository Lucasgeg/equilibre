import { useState } from "react";
import { ExpenseItem } from "./components/ExpenseItem";
import { initialExpenses } from "./data";
import { formatEUR } from "./lib/format";
import { ExpenseForm } from "./components/ExpenseForm";
import type { Expense, Group } from "./types";
import { ExpenseList } from "./components/ExpenseList";

export const initialGroups: Group[] = [
  { id: "g1", name: "Colocation", members: ["Léa", "Tom"] },
  { id: "g2", name: "Week-end Bretagne", members: ["Léa", "Tom", "Sam"] },
];

const members = ["Ahmed", "Yassin", "Nathan", "Lyza"];

export const App = () => {
  const [expenses, setExpenses] = useState(initialExpenses);
  const [searchValue, setSearchValue] = useState("");
  const [groups, setGroups] = useState<Group[]>(initialGroups);
  const [groupId, setGroupId] = useState(initialGroups[0].id);
  console.log("🚀 ~ App ~ groupId:", groupId);
  const [editingId, setEditingId] = useState<string | null>(null);

  const group = groups.find((g) => g.id === groupId);

  const groupExpenses = expenses.filter((e) => e.groupId === groupId);
  console.log("🚀 ~ App ~ groupExpenses:", groupExpenses);
  const editing = groupExpenses.find((e) => e.id === editingId);
  console.log("🚀 ~ App ~ editing:", editing);

  const saveExpense = (expense: Expense) => {
    setExpenses((prev) =>
      prev.some((e) => e.id === expense.id)
        ? prev.map((e) => (e.id === expense.id ? expense : e))
        : [...prev, expense],
    );
    setEditingId(null);
  };

  const addMember = (groupId: string, name: string) => {
    setGroups((prev) =>
      prev.map((g) =>
        g.id === groupId ? { ...g, members: [...g.members, name] } : g,
      ),
    );
  };

  const handleDelete = (id: string) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  const addExpense = (expense: Expense) => {
    setExpenses((prev) => [...prev, expense]);
  };

  const handleToggle = (id: string) => {
    setExpenses((prev) =>
      prev.map((e) => (e.id === id ? { ...e, settled: !e.settled } : e)),
    );
  };

  const handleEdit = (id: string) => {
    console.log("🚀 ~ handleEdit ~ id:", id);

    setEditingId(id);
  };

  const visible = expenses.filter((expense) =>
    expense.label.toLowerCase().includes(searchValue.toLowerCase()),
  );

  const totalNotPaid = expenses.reduce(
    (sum, expense) => (expense.settled ? sum : sum + expense.amountCents),
    0,
  );

  return (
    <main className="app">
      <ExpenseForm members={members} onAdd={addExpense} />

      <input
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
        placeholder="Rechercher..."
      />
      <ExpenseList
        expenses={visible}
        onDelete={handleDelete}
        onToggle={handleToggle}
        onEdit={handleEdit}
      />
      <p className="summary">
        <span>Reste à régler</span>
        <strong>{formatEUR(totalNotPaid)}</strong>
      </p>
    </main>
  );
};
