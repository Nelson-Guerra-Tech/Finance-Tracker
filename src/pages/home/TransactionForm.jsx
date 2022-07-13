import React, { useState, useEffect } from 'react';
import { useFirestore } from '../../hooks/useFirestore';

export default function TransactionForm({ uid }) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const { addDocuments, response } = useFirestore('transactions');

  const handleSubmit = (e) => {
    e.preventDefault();
    addDocuments({
      uid,
      name,
      amount,
    });

    console.log({ name, amount });
  };

  // useEffect, reset the form fields is success property is true
  useEffect(() => {
    if (response.success) {
      setName('');
      setAmount('');
    }
  }, [response.success]);

  return (
    <>
      <h3>Add a Transaction</h3>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Transaction name:</span>
          <input
            type='text'
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>

        <label>
          <span>Amount ($):</span>
          <input
            type='number'
            required
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
          />
        </label>

        <button>Add Transaction </button>
      </form>
    </>
  );
}
