import React from 'react';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import '../styles/CreditsList.css';

const CreditsList = ({ credits, deleteLoan }) => {
  if (credits.length === 0) {
    return <p>No loans available</p>;
  }

  const handleDeleteLoan = async (creditId) => {
    try {
      const loanRef = doc(db, 'loans', creditId);
      await deleteDoc(loanRef);
      console.log('Loan deleted successfully');
    } catch (error) {
      console.error('Error deleting loan: ', error);
    }
  };

  return (
    <table className="credits-table">
      <thead>
        <tr>
          <th className="table-header">Name</th>
          <th className="table-header">Amount (BGN)</th>
          <th className="table-header">Term (months)</th>
          <th className="table-header">Monthly Installment (BGN)</th>
          <th className="table-header">Actions</th>
        </tr>
      </thead>
      <tbody>
        {credits.map((credit) => (
          <tr key={credit.id} className="table-row">
            <td>{credit.name}</td>
            <td>{credit.amount}</td>
            <td>{credit.term}</td>
            <td>{credit.amount / credit.term}</td>
            <td>
              <button onClick={() => handleDeleteLoan(credit.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CreditsList;
