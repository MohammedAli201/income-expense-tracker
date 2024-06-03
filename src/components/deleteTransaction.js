import React, { useEffect, useState } from "react";
import useTrans from "../hooks/useTrans";

const DeleteTransaction = ({ id, setDeletetMode,deletetMode }) => {
    const { deleteTransaction } = useTrans();
    const [currentDeleteMode, setCurrentDeleteMode] = useState(true);
 

    const handleDelete = (e) => {
        e.preventDefault();
        deleteTransaction(id);
        setDeletetMode(false);
        setCurrentDeleteMode(false)
    
      
    };
 console.log(currentDeleteMode)
    // when the user clicks on the delete button, 

    const handleCancel = () => {
        setDeletetMode(false);
        setCurrentDeleteMode(false)
    };

    useEffect(() => {
        setCurrentDeleteMode(deletetMode);
    }, [currentDeleteMode]);






 

    return (
        <div>
          
                <div>
                    <h3>Delete Transaction</h3>
                    <div>
                        <p>Are you sure you want to delete this transaction?</p>
                        <button onClick={handleDelete}>Yes</button>
                        <button onClick={()=>setCurrentDeleteMode(false)}>No</button>
                    </div>
                </div>
            
            
            
              
         
        </div>
    );
}

export default DeleteTransaction;
