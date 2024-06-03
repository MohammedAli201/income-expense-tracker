import React,{useReducer} from "react";

import { TranReducer,initialState } from "../reducer/TranReducer";

const displayTransaction = () => {
    
    const [state, dispatch] = useReducer(TranReducer, initialState);
    console.log(state);
    return (
        <div>
           HELLO world
        </div>
    );
}

export default displayTransaction;