


import React,{useReducer} from "react";

import tranContext from "../context/tranContext";
import { TranReducer, initialState } from "../reducer/TranReducer";

const TransactionProvider = ({children}) => {
    const [state, dispatch] = useReducer(TranReducer, initialState);
    const addTransaction = (transaction) => {

        dispatch({
            type: "ADD_TRANSACTION",
            payload: {
                amount: transaction.amount,
                text: transaction.text,
                id: transaction.id,
                Date: transaction.date,
                Category: transaction.category,
            },
        });
    }

    const editTransaction = (transaction) => {
        dispatch({
            type: "EDIT_TRANSACTION",
            payload: {
                amount: transaction.amount,
                text: transaction.text,
                id: transaction.id,
                Date: transaction.date,
                Category: transaction.category,
            },
        });
    }

    const deleteTransaction = (id) => {
        dispatch({
            type: "DELETE_TRANSACTION",
            payload: id,
        });
    };




    return (
        <tranContext.Provider value={{state, addTransaction, editTransaction, deleteTransaction}}>
            {children}
        </tranContext.Provider>
    );
};
export default TransactionProvider;
