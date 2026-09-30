import React, { useState } from "react";
import useTrans from "../hooks/useTrans";

export default function AddTrans() {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("expense");
  const [message, setMessage] = useState("");
  const { addTransaction } = useTrans();

  const handleSubmit = (event) => {
    event.preventDefault();
    const numericAmount = Number(amount);
    if (!text.trim() || !category.trim() || !date || !Number.isFinite(numericAmount) || numericAmount <= 0) {
      setMessage("Enter a description, category, date and an amount greater than zero.");
      return;
    }
    addTransaction({ text: text.trim(), amount: (type === "expense" ? -1 : 1) * numericAmount, date, category: category.trim() });
    setText(""); setAmount(""); setDate(""); setCategory("");
    setMessage("Entry added.");
  };

  return (
    <section className="panel entry-panel" aria-labelledby="add-heading">
      <div className="panel-header"><span className="section-number">01</span><h2 id="add-heading">Add an entry</h2></div>
      <p className="panel-description">Keep track of what comes in. And what goes out.</p>
      <form onSubmit={handleSubmit} className="entry-form">
        <label htmlFor="entry-type">Entry type</label>
        <select id="entry-type" value={type} onChange={event => setType(event.target.value)}><option value="expense">Expense</option><option value="income">Income</option></select>
        <label htmlFor="entry-text">Description</label>
        <input id="entry-text" value={text} onChange={event => setText(event.target.value)} placeholder="e.g. Weekly groceries" maxLength={120} required />
        <label htmlFor="entry-amount">Amount (NOK)</label>
        <input id="entry-amount" type="number" min="0.01" step="0.01" value={amount} onChange={event => setAmount(event.target.value)} placeholder="0.00" required />
        <div className="field-pair">
          <div><label htmlFor="entry-date">Date</label><input id="entry-date" type="date" value={date} onChange={event => setDate(event.target.value)} required /></div>
          <div><label htmlFor="entry-category">Category</label><input id="entry-category" value={category} onChange={event => setCategory(event.target.value)} placeholder="e.g. Food" maxLength={60} required /></div>
        </div>
        <button className="primary-button" type="submit">Add entry <span aria-hidden="true">+</span></button>
        <p className="form-message" role="status">{message}</p>
      </form>
    </section>
  );
}
