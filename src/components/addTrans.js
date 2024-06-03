import React, { useState } from "react";
import useTrans from "../hooks/useTrans";
import "../assets/styles/addTrans.css";
const AddTrans = () => {
    const [text, setText] = useState("");
    const [amount, setAmount] = useState(0);
    const [date, setDate] = useState("");
    const [category, setCategory] = useState("");

    const { state, addTransaction } = useTrans();

    const handleSubmit = (e) => {
        e.preventDefault();
        addTransaction({
            id: state.transactions.length + 1,
            text,
            amount: Number(amount),
            date,
            category,
        });
        setText("");
        setAmount(0);
        setDate("");
        setCategory("");
    };

    return (
        <div className="add-trans-container">
            <h3>Add New Transaction</h3>
            <form onSubmit={handleSubmit} className="add-trans-form">
                <div className="form-control">
                    <label htmlFor="text">Text</label>
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Enter text..."
                        required
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="amount">
                        Amount <br />
                        (negative - expense, positive - income)
                    </label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Enter amount..."
                        required
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="date">Date</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="category">Category</label>
                    <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        placeholder="Enter category..."
                        required
                    />
                </div>
                <button className="btn" type="submit">
                    Add Transaction
                </button>
            </form>
        </div>
    );
};

export default AddTrans;
