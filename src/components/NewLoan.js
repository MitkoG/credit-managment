import React, { useState } from 'react';
import '../styles/NewLoan.css';

const NewLoanForm = ({ addNewLoan }) => {
  const [loanName, setLoanName] = useState('');
  const [loanAmount, setLoanAmount] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const newLoan = {
      loanName,
      loanAmount: parseFloat(loanAmount),
      loanTerm: parseInt(loanTerm),
    };
    addNewLoan(newLoan);
    setLoanName('');
    setLoanAmount('');
    setLoanTerm('');
  };

  return (
    <form onSubmit={handleSubmit} className="loan-form">
      <h3>New Loan</h3>
      <div className="form-group">
        <label>Name:</label>
        <input
          type="text"
          value={loanName}
          onChange={(e) => setLoanName(e.target.value)}
          required
          className="input"
        />
      </div>
      <div className="form-group">
        <label>Amount (BGN):</label>
        <input
          type="number"
          value={loanAmount}
          onChange={(e) => setLoanAmount(e.target.value)}
          required
          className="input"
        />
      </div>
      <div className="form-group">
        <label>Term (months):</label>
        <input
          type="number"
          value={loanTerm}
          onChange={(e) => setLoanTerm(e.target.value)}
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

export default React.memo(NewLoanForm)
