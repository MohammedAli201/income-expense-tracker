import React,{useContext} from "react";
import tranContext from "../context/tranContext";

 const useTrans = () => {
    return useContext(tranContext);
}

export default useTrans;