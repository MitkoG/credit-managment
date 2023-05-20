import React, { useState } from 'react';
import '../styles/NewLoan.css';

const NewLoanForm = ({ addNewLoan }) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [term, setTerm] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const newLoan = {
      name,
      amount: parseFloat(amount),
      term: parseInt(term),
    };
    addNewLoan(newLoan);
    setName('');
    setAmount('');
    setTerm('');
  };

  return (
    <form onSubmit={handleSubmit} className="loan-form">
      <h2>New Loan</h2>
      <div className="form-group">
        <label>Borrower Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="input"
        />
      </div>
      <div className="form-group">
        <label>Amount (BGN):</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          className="input"
        />
      </div>
      <div className="form-group">
        <label>Term (months):</label>
        <input
          type="number"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          min="1"
          max="12"
          required
          className="input"
        />
      </div>
      <button type="submit" className="button">Create Loan</button>
    </form>
  );
};

export default NewLoanForm;
