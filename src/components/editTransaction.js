import React,{useState} from "react";
import  useTrans  from "../hooks/useTrans";

const EditTransaction = ({
    transaction,
    setEditMode
}) => {

    const {editTransaction} = useTrans();
    const [text, setText] = useState(transaction.text);
    const [amount, setAmount] = useState(transaction.amount);

    const handleEdit = (e) => {
        e.preventDefault();
        const newTransaction = {
            id: transaction.id,
            text,
            amount: +amount
        };
        editTransaction(newTransaction);
        setEditMode(false);
    };

    return (
        <div>
            <h3>Edit Transaction</h3>
            <form onSubmit={handleEdit}>
                <div className="form-control">
                    <label htmlFor="text">Text</label>
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Enter text..."
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="amount">Amount <br />
                        (negative - expense, positive - income)</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Enter amount..."
                    />
                </div>
                <button className="btn">Edit Transaction</button>
            </form>
        </div>
    );
   

}

export default EditTransaction;