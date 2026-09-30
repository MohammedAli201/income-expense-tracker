import React, { useReducer } from "react";
import tranContext from "../context/tranContext";
import { TranReducer, initialState } from "../reducer/TranReducer";

const createId = () => {
  if (typeof window.crypto?.randomUUID === "function") return window.crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
};

const TransactionProvider = ({ children }) => {
  const [state, dispatch] = useReducer(TranReducer, initialState);
  const addTransaction = (transaction) => dispatch({
    type: "ADD_TRANSACTION",
    payload: { amount: transaction.amount, text: transaction.text, id: createId(), Date: transaction.date, Category: transaction.category },
  });
  const editTransaction = (transaction) => dispatch({
    type: "EDIT_TRANSACTION",
    payload: { amount: transaction.amount, text: transaction.text, id: transaction.id, Date: transaction.date, Category: transaction.category },
  });
  const deleteTransaction = (id) => dispatch({ type: "DELETE_TRANSACTION", payload: id });
  const loadSampleData = () => {
    if (state.transactions.length) return;
    const now = new Date();
    const date = [now.getFullYear(), String(now.getMonth() + 1).padStart(2, '0'), String(now.getDate()).padStart(2, '0')].join('-');
    [
      { text: "Freelance project", amount: 12500, category: "Work", date },
      { text: "Groceries", amount: -640.5, category: "Food", date },
      { text: "Train pass", amount: -890, category: "Transport", date },
      { text: "Coffee with a friend", amount: -78, category: "Everyday", date },
    ].forEach(addTransaction);
  };
  return <tranContext.Provider value={{ state, addTransaction, editTransaction, deleteTransaction, loadSampleData }}>{children}</tranContext.Provider>;
};
export default TransactionProvider;
