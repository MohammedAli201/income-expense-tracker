import React, { useState } from "react";
import useTrans from "../hooks/useTrans";

export default function EditTransaction({ transaction, setEditMode }) {
  const { editTransaction } = useTrans();
  const [text, setText] = useState(transaction.text);
  const [amount, setAmount] = useState(Math.abs(transaction.amount));
  const [date, setDate] = useState(transaction.Date);
  const [category, setCategory] = useState(transaction.Category);
  const [type, setType] = useState(transaction.amount < 0 ? "expense" : "income");
  const [error, setError] = useState("");
  const handleEdit = (event) => {
    event.preventDefault();
    const numericAmount = Number(amount);
    if (!text.trim() || !category.trim() || !date || !Number.isFinite(numericAmount) || numericAmount <= 0) {
      setError("Complete all fields and use an amount greater than zero.");
      return;
    }
    editTransaction({ id: transaction.id, text: text.trim(), amount: (type === "expense" ? -1 : 1) * numericAmount, date, category: category.trim() });
    setEditMode(false);
  };
  return (
    <section className="inline-editor" aria-labelledby="edit-heading">
      <h3 id="edit-heading">Edit entry</h3>
      <form onSubmit={handleEdit} className="entry-form">
        <label htmlFor="edit-type">Entry type</label>
        <select id="edit-type" value={type} onChange={event => setType(event.target.value)}><option value="expense">Expense</option><option value="income">Income</option></select>
        <label htmlFor="edit-text">Description</label><input id="edit-text" value={text} onChange={event => setText(event.target.value)} maxLength={120} required />
        <label htmlFor="edit-amount">Amount (NOK)</label><input id="edit-amount" type="number" min="0.01" step="0.01" value={amount} onChange={event => setAmount(event.target.value)} required />
        <div className="field-pair"><div><label htmlFor="edit-date">Date</label><input id="edit-date" type="date" value={date} onChange={event => setDate(event.target.value)} required /></div><div><label htmlFor="edit-category">Category</label><input id="edit-category" value={category} onChange={event => setCategory(event.target.value)} maxLength={60} required /></div></div>
        <div className="editor-actions"><button className="primary-button" type="submit">Save changes</button><button className="secondary-button" type="button" onClick={() => setEditMode(false)}>Cancel editing</button></div>
        {error && <p role="alert">{error}</p>}
      </form>
    </section>
  );
}
