import React, { useContext } from 'react';
import { UserContext } from './contexts/UserContext';

export default function PaidContent() {
  const currentUser = useContext(UserContext);

  return (
    <div>
      {currentUser && currentUser.paymentProcessed
        ? "Here's your paid content."
        : 'You did not pay.'}
    </div>
  );
}
