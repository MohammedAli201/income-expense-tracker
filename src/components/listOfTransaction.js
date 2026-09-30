import React, { useState } from "react";
import useTrans from "../hooks/useTrans";
import EditTransaction from "./editTransaction";
import { formatMoney } from "../utils/formatMoney";

export default function ListOfTransaction() {
  const { state, deleteTransaction } = useTrans();
  const [filter, setFilter] = useState("all");
  const [editingId, setEditingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const editing = state.transactions.find(item => item.id === editingId);
  const deleting = state.transactions.find(item => item.id === deletingId);
  const transactions = state.transactions.filter(item => filter === "all" || (filter === "income" ? item.amount > 0 : item.amount < 0));

  return (
    <section className="panel activity-panel" aria-labelledby="activity-heading">
      <div className="panel-header"><span className="section-number">02</span><h2 id="activity-heading">Recent activity</h2><span className="entry-count">{state.transactions.length} entries</span></div>
      <div className="filter-group" aria-label="Filter entries">{["all", "income", "expenses"].map(value => <button key={value} aria-pressed={filter === value} onClick={() => setFilter(value)}>{value === "all" ? "All entries" : value === "income" ? "Income" : "Expenses"}</button>)}</div>
      {transactions.length === 0 ? <div className="empty-state"><span className="empty-symbol" aria-hidden="true">↗</span><h3>{state.transactions.length ? "No matching entries" : "A fresh start."}</h3><p>{state.transactions.length ? "Choose another filter to see your entries." : "Add your first entry, or try the sample data above."}</p></div> : (
        <ul className="transaction-list">{transactions.map(transaction => (
          <li key={transaction.id} className="transaction-item">
            <span className={`transaction-symbol ${transaction.amount > 0 ? "positive" : "negative"}`} aria-hidden="true">{transaction.amount > 0 ? "↙" : "↗"}</span>
            <div className="transaction-detail"><strong>{transaction.text}</strong><span>{transaction.Category} <span aria-hidden="true">·</span> {transaction.Date}</span></div>
            <strong className={`transaction-amount ${transaction.amount > 0 ? "positive" : ""}`}>{transaction.amount > 0 ? "+" : "−"}{formatMoney(Math.abs(transaction.amount))}</strong>
            <div className="transaction-actions"><button onClick={() => { setEditingId(transaction.id); setDeletingId(null); }} aria-label={`Edit ${transaction.text}`}>Edit</button><button onClick={() => { setDeletingId(transaction.id); setEditingId(null); }} aria-label={`Delete ${transaction.text}`}>Delete</button></div>
          </li>
        ))}</ul>
      )}
      {editing && <EditTransaction key={editing.id} transaction={editing} setEditMode={() => setEditingId(null)} />}
      {deleting && <div className="delete-confirmation" role="group" aria-label="Confirm deletion"><p>Delete <strong>{deleting.text}</strong>?</p><button className="danger-button" onClick={() => { deleteTransaction(deleting.id); setDeletingId(null); }}>Delete entry</button><button className="secondary-button" onClick={() => setDeletingId(null)}>Keep entry</button></div>}
    </section>
  );
}
