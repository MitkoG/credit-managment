import React, { useState } from 'react';
import './App.css';
import CreditsList from './components/CreditsList';
import NewLoan from './components/NewLoan';
import PaymentForm from './components/PaymentForm';


function App() {
  const [credits, setCredits] = useState([]);
  const addNewLoan = (newLoan) => {
    const newCredit = {...newLoan, id: Date.now()}
    setCredits([...credits, newCredit]);
  }

  return (
    <div className="App">
      <h2>Credit Management</h2>
      <NewLoan addNewLoan={addNewLoan}/>
      <CreditsList credits={credits} />
      <PaymentForm credits={credits}/>
    </div>
  );
}

export default React.memo(App)
