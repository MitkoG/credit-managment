import React from 'react';

function AlertUser({ payment, remainingCreditBalance, moneyToTransfer, moneyToReturn }) {
  return (
    <div className="alert">
      <p>
        You are trying to pay {payment} BGN, your credit balance is {remainingCreditBalance} BGN, so we will transfer {moneyToTransfer} BGN, and the remaining amount of {moneyToReturn} BGN will not be charged.
      </p>
    </div>
  );
}

export default React.memo(AlertUser);
