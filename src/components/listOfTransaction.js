import React, { useState } from "react";
import useTrans from "../hooks/useTrans";
import EditTransaction from "./editTransaction";
import "../assets/styles/ListOfTransaction.css"// Assuming you will create a CSS file for styling

const ListOfTransaction = () => {
    const { state } = useTrans();
    const [editMode, setEditMode] = useState(false);
    const [deleteMode, setDeleteMode] = useState(false);
    const [currentTransaction, setCurrentTransaction] = useState(null);
    const [id, setId] = useState(0);

    const handleEditClick = (transaction) => {
        setCurrentTransaction(transaction);
        setEditMode(true);
    };

    const handleDelete = (id) => {
        setId(id);
        setDeleteMode(true);
    };
console.log(state.transactions)
    const confirmDelete = () => {
        // Assuming deleteTransaction is a function from the context
       // useTrans().deleteTransaction(id);
        setDeleteMode(false);
    };

    const display = state.transactions.map((transaction) => (
        <li key={transaction.id} className={`transaction-item ${transaction.amount < 0 ? "minus" : "plus"}`}>
            <div className="transaction-details">
                <span className="transaction-text">{transaction.text}</span>
                <span className="transaction-amount">{transaction.amount}</span>
                <span className="transaction-date">{transaction.Date}</span>
                <span className="transaction-category">{transaction.Category}</span>
            </div>
            <div className="transaction-actions">
                <button className="btn edit-btn" onClick={() => handleEditClick(transaction)}>Edit</button>
                <button className="btn delete-btn" onClick={() => handleDelete(transaction.id)}>Delete</button>
            </div>
        </li>
    ));

    return (
        <div className="transaction-container">
            <h3>History_</h3>
            <ul id="list" className="transaction-list">
                {display}
            </ul>
            {editMode && (
                <EditTransaction
                    transaction={currentTransaction}
                    setEditMode={setEditMode}
                />
            )}
            {deleteMode && (
                <div className="delete-confirmation">
                    <p>Are you sure you want to delete this transaction?</p>
                    <button onClick={confirmDelete}>Yes</button>
                    <button onClick={() => setDeleteMode(false)}>No</button>
                </div>
            )}
        </div>
    );
};

export default ListOfTransaction;
