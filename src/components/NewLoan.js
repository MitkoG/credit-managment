import React, { useState } from 'react'

function NewLoan({addNewLoan}) {
  const [loanName, setLoanName] = useState('');
  const [loanAmount, setLoanAmount] = useState('');
  const [loanTerm, setLoanTerm] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    const newLoan = {
      loanName,
      loanAmount,
      loanTerm
    };
    addNewLoan(newLoan);
    setLoanName('');
    setLoanAmount('');
    setLoanTerm('');
  }
  const styles = {
    form: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: '20px',
    },
    formGroup: {
      marginBottom: '10px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    input: {
      padding: '5px',
      borderRadius: '5px',
      border: '1px solid #ccc',
      width: '200px',
    },
    button: {
      padding: '10px 20px',
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
  };

  return (
    <form onSubmit={handleSubmit} style={styles}>
      <h3>New Loan</h3>
      <div style={styles.formGroup}>
        <label>Name</label>
        <input type='text' value={loanName} onChange={(e) => setLoanName(e.target.value)} required style={styles.input}></input>
      </div>
      <div style={styles.formGroup}>
        <label>Amount (BGN)</label>
        <input type='number' value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} required style={styles.input}></input>
      </div>
      <div style={styles.formGroup}>
        <label>Term (months)</label>
        <input type='number' value={loanTerm} onChange={(e) => setLoanTerm(e.target.value)} min='1' max='12' required style={styles.input}></input>
      </div>
      <button type="submit" style={styles.button}>Add Loan</button>
    </form>
  )
}

export default React.memo(NewLoan)
