import React from 'react';
import './App.css';
import CreditsList from './components/CreditsList';
import NewLoan from './components/NewLoan';
import PaymentForm from './components/PaymentForm';


function App() {
  return (
    <div className="App">
      <h2>Credit Management</h2>
      <NewLoan />
      <CreditsList />
      <PaymentForm />
    </div>
  );
}

export default App;
