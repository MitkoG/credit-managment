import React, { useEffect, useState } from 'react';
import './App.css';
import CreditsList from './components/CreditsList';
import PaymentForm from './components/PaymentForm';
import AlertUser from './components/AlertUser';
import { addDoc, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db, loansCollection } from './firebase';
import NewLoanForm from './components/NewLoanForm';

function App() {
  const [credits, setCredits] = useState([]);
  const [paymentDetails, setPaymentDetails] = useState({
    payment: 0,
    remainingCreditBalance: 0,
    moneyToTransfer: 0,
    moneyToReturn: 0,
  });

  useEffect(() => {
    const fetchCredits = async () => {
      try {
        const querySnapshot = await getDocs(loansCollection);
        const creditsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCredits(creditsData);
      } catch (error) {
        console.error('Error fetching credits: ', error);
      }
    };
    fetchCredits();
  }, []);

const deleteLoan = async (creditId) => {
  try {
    const loanRef = doc(db, 'loans', creditId);
    await deleteDoc(loanRef);

    const updatedCredits = credits.filter((credit) => credit.id !== creditId);
    setCredits(updatedCredits);
    console.log(updatedCredits, 'updatedCredits')
    console.log('Loan deleted successfully');

    if (updatedCredits.length === 0) {
      setPaymentDetails({
        payment: 0,
        remainingCreditBalance: 0,
        moneyToTransfer: 0,
        moneyToReturn: 0,
      });
    }
  } catch (error) {
    console.error('Error deleting loan: ', error);
  }
};

  

const addNewLoan = async (newLoan) => {
  try {
    const docRef = await addDoc(loansCollection, newLoan);
    const newCredit = { ...newLoan, id: docRef.id };
    setCredits((prevCredits) => [...prevCredits, newCredit]);
    console.log('Loan added successfully');
  } catch (error) {
    console.error('Error adding loan: ', error);
  }
};


  const makePayment = async (payment) => {
    const { creditId, amount } = payment;
    const updatedCredits = credits.map((credit) => {
      if (credit.id === creditId) {
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
  
    try {
      const loanRef = doc(db, 'loans', creditId);
      await updateDoc(loanRef, { amount: updatedCredits.find((credit) => credit.id === creditId).amount });
  
      setCredits(updatedCredits);
      console.log('Loan amount updated successfully');
    } catch (error) {
      console.error('Error updating loan amount: ', error);
    }
  };
  
  return (
    <div className="App">
      <h2>Credit Management</h2>
      <NewLoanForm addNewLoan={addNewLoan} />
      <CreditsList credits={credits} deleteLoan={deleteLoan} />
      <PaymentForm credits={credits} makePayment={makePayment} />
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

export default React.memo(App);
