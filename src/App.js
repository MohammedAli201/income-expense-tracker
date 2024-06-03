import React from 'react';
import AddTrans from './components/addTrans';
import TransactionProvider from './Providers/TransactionProvider';
import ListOfTransaction from './components/listOfTransaction';



function App() {
  return (
    <TransactionProvider>
      <AddTrans />
      <ListOfTransaction />
   
    </TransactionProvider>
   
  );
}

export default App;
