import { formatEUR } from "../lib/format";

type ExpenseItemProps = {
  label: string;
  amountCents: number;
  paidBy: string;
  settled: boolean;
  onDelete: () => void;
  onToggle: () => void;
  onEdit: () => void;
};

export const ExpenseItem = ({
  amountCents,
  label,
  paidBy,
  onDelete,
  settled,
  onToggle,
  onEdit,
}: ExpenseItemProps) => {
  return (
    <li className={settled ? "expense expense--settled" : "expense"}>
      <input
        type="checkbox"
        checked={settled}
        onChange={onToggle}
        aria-label={`Réglée : ${label}`}
      />
      <div className="expense__body">
        <span className="expense__label">{label}</span>
        <span className="expense__meta">payé par {paidBy}</span>
      </div>
      <span className="expense__amount">{formatEUR(amountCents)}</span>
      <button className="expense__delete" onClick={onDelete}>
        Supprimer
      </button>
      <button onClick={onEdit}>Editer</button>
    </li>
  );
};
