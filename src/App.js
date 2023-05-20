import React, { useEffect, useState } from 'react';
import './App.css';
import CreditsList from './components/CreditsList';
import NewLoan from './components/NewLoan';
import PaymentForm from './components/PaymentForm';
import AlertUser from './components/AlertUser';
import creditData from './creditData.json';

function App() {
  const [credits, setCredits] = useState([]);
  const [paymentDetails, setPaymentDetails] = useState({
    payment: 0,
    remainingCreditBalance: 0,
    moneyToTransfer: 0,
    moneyToReturn: 0,
  });

  useEffect(() => {
    setCredits(creditData);
  }, []);
  
  const addNewLoan = (newLoan) => {
    const borrowerLoans = credits.filter((credit) => credit.name === newLoan.name)
    const totalLoans = borrowerLoans.reduce((total, credit) => total + credit.amount, 0) + newLoan.amount

    if (totalLoans > 80000) {
      alert('User cannot borrow more than 80000 BGN');
      return;
    }
    const newCredit = { ...newLoan, id: Date.now() };
    setCredits([...credits, newCredit]);
  };

  const makePayment = (payment) => {
    const { creditId, amount } = payment;
    const updatedCredits = credits.map((credit) => {
      if (credit.id === parseInt(creditId)) {
        const remainingCreditAmount = credit.amount - amount;
        if (remainingCreditAmount < 0) {
          const remainingCreditBalance = credit.amount;
          const moneyToTransfer = remainingCreditBalance;
          const moneyToReturn = amount - credit.amount;
          setPaymentDetails({
            payment: amount,
            remainingCreditBalance,
            moneyToTransfer,
            moneyToReturn,
          });
          return { ...credit, amount: 0 };
        }
        return { ...credit, amount: remainingCreditAmount };
      }
      return credit;
    });

    setCredits(updatedCredits);
  };

  return (
    <div className="App">
      <h2>Credit Management</h2>
      <NewLoan addNewLoan={addNewLoan} />
      <CreditsList credits={credits} />
      <PaymentForm
        credits={credits}
        makePayment={makePayment}
      />
      {paymentDetails.payment !== 0 && (
        <AlertUser
          payment={paymentDetails.payment}
          remainingCreditBalance={paymentDetails.remainingCreditBalance}
          moneyToTransfer={paymentDetails.moneyToTransfer}
          moneyToReturn={paymentDetails.moneyToReturn}
        />
      )}
    </div>
  );
}

export default React.memo(App)
