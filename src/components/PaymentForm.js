import React, { useState } from 'react';
import { doc, collection, addDoc, updateDoc, getDoc, runTransaction } from 'firebase/firestore';
import { db } from '../firebase';

const PaymentForm = ({ credits, makePayment }) => {
  const [creditId, setCreditId] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const payment = {
      creditId,
      amount: parseFloat(amount),
    };
  
    try {
      const loanRef = doc(db, 'loans', creditId);
  
      await runTransaction(db, async (transaction) => {
        const loanDoc = await transaction.get(loanRef);
        const currentLoanAmount = loanDoc.data().amount;
  
        const updatedLoanAmount = currentLoanAmount - payment.amount;
  
        transaction.update(loanRef, { amount: updatedLoanAmount });
      });
  
      await addDoc(collection(loanRef, 'payments'), payment);
  
      makePayment(payment);
      setCreditId('');
      setAmount('');
      console.log('Payment added successfully');
    } catch (error) {
      console.error('Error adding payment: ', error);
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <h2>Make Payment</h2>
      <div>
        <label>Loan:</label>
        <select value={creditId} onChange={(e) => setCreditId(e.target.value)}>
          <option value="">Select a loan</option>
          {credits.map((credit) => (
            <option key={credit.id} value={credit.id}>
              {credit.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Payment Amount (BGN):</label>
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
      </div>
      <button type="submit">Submit Payment</button>
    </form>
  );
};

export default PaymentForm;
