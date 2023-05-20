import React from 'react';
import '../styles/CreditsList.css';

function CreditsList({ credits }) {
  return (
    <table className="credits-table">
      <thead>
        <tr>
          <th className="table-header">Name</th>
          <th className="table-header">Amount (BGN)</th>
          <th className="table-header">Term (months)</th>
          <th className="table-header">Monthly Installment (BGN)</th>
        </tr>
      </thead>
      <tbody>
        {credits.map((credit) => (
          <tr key={credit.id} className="table-row">
            <td>{credit.name}</td>
            <td>{credit.amount}</td>
            <td>{credit.term}</td>
            <td>{credit.amount / credit.term}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default React.memo(CreditsList);
