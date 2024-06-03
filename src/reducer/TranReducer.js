export const initialState = {
    transactions: [],
};

export const TranReducer = (state, action) => {
    switch (action.type) {
        case "ADD_TRANSACTION":
            return {
                ...state,
                transactions: [action.payload, ...state.transactions],
            };
        case "DELETE_TRANSACTION":
            return {
                ...state,
                transactions: state.transactions.filter(
                    (transaction) => transaction.id !== action.payload
                ),
            };
        
        case "EDIT_TRANSACTION":
            return {
                ...state,
                transactions: state.transactions.map((transaction) => {
                    if (transaction.id === action.payload.id) {
                        return action.payload;
                    }
                    return transaction;
                }),
            };
         

        default:
            return state;
    }
};
