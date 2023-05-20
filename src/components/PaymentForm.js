import React, { useState } from 'react'

function PaymentForm({credits}) {
  const [selectedCredit, setSelectedCredit] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
   //TODO submit payment
   e.preventDefault();
   console.log('SUBMIT');
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>Make Payment</h2>
      <div className="form-group">
        <label>Select Credit:</label>
        <select
          value={selectedCredit}
          onChange={(e) => setSelectedCredit(e.target.value)}
          required
        >
          <option value="">Select</option>
          {credits.map((credit) => (
            <option key={credit.id} value={credit.id}>
              {credit.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Amount (BGN):</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn">Make Payment</button>
    </form>
  )
}

export default React.memo(PaymentForm)
