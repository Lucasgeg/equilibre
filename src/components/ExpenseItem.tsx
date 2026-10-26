import { formatEUR } from "../lib/format";

type ExpenseItemProps = {
  label: string;
  amountCents: number;
  paidBy: string;
  settled: boolean;
  onDelete: () => void;
  onToggle: () => void;
};

export const ExpenseItem = ({
  amountCents,
  label,
  paidBy,
  onDelete,
  settled,
  onToggle,
}: ExpenseItemProps) => {
  return (
    <li>
      {label} : {formatEUR(amountCents)} payé par {paidBy}{" "}
      <button onClick={onDelete}>Supprimer</button>
      <input type="checkbox" checked={settled} onChange={onToggle} />
    </li>
  );
};
