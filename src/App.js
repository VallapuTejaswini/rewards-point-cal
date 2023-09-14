import React, { useState } from 'react';

const RewardPointsCalculator = () => {
  const [transactions, setTransactions] = useState({
    Month1: [{ id: 1, customerId: '', transactionAmount: '' }],
    Month2: [{ id: 1, customerId: '', transactionAmount: '' }],
    Month3: [{ id: 1, customerId: '', transactionAmount: '' }],
  });
  const [rewardPoints, setRewardPoints] = useState({});
  const [totalRewardPoints, setTotalRewardPoints] = useState({});

  const calculateRewardPoints = (transactionAmount) => {
    if (transactionAmount <= 50) {
      return 0;
    } else if (transactionAmount <= 100) {
      return transactionAmount - 50;
    } else {
      return 50 + 2 * (transactionAmount - 100);
    }
  };

  const handleInputChange = (e, monthId, id) => {
    const { name, value } = e.target;
    const updatedTransactions = { ...transactions };
    updatedTransactions[monthId] = updatedTransactions[monthId].map((transaction) =>
      transaction.id === id ? { ...transaction, [name]: value } : transaction
    );
    setTransactions(updatedTransactions);
  };

  const handleAddTransaction = (monthId) => {
    const newId =
      transactions[monthId].length > 0
        ? transactions[monthId][transactions[monthId].length - 1].id + 1
        : 1;
    const updatedTransactions = { ...transactions };
    updatedTransactions[monthId] = [
      ...transactions[monthId],
      { id: newId, customerId: '', transactionAmount: '' },
    ];
    setTransactions(updatedTransactions);
  };

  const handleCalculateRewardPoints = () => {
    const calculatedRewardPoints = {};
    const calculatedTotalRewardPoints = {};

    for (const monthId in transactions) {
      calculatedRewardPoints[monthId] = {};
      calculatedTotalRewardPoints[monthId] = 0;

      transactions[monthId].forEach((transaction) => {
        const { customerId, transactionAmount } = transaction;
        const rewardPointsEarned = calculateRewardPoints(
          Number(transactionAmount)
        );

        if (!calculatedRewardPoints[monthId][customerId]) {
          calculatedRewardPoints[monthId][customerId] = 0;
        }

        calculatedRewardPoints[monthId][customerId] += rewardPointsEarned;
        calculatedTotalRewardPoints[monthId] += rewardPointsEarned;
      });
    }

    setRewardPoints(calculatedRewardPoints);
    setTotalRewardPoints(calculatedTotalRewardPoints);
  };

  return (
    <div>
      <h1>Reward Points Calculator</h1>
      {Object.keys(transactions).map((monthId) => (
        <div key={monthId}>
          <h2>{monthId}</h2>
          <table>
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Customer ID</th>
                <th>Transaction Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions[monthId].map((transaction) => (
                <tr key={transaction.id}>
                  <td>{transaction.id}</td>
                  <td>
                    <input
                      type="text"
                      name="customerId"
                      value={transaction.customerId}
                      onChange={(e) => handleInputChange(e, monthId, transaction.id)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="transactionAmount"
                      value={transaction.transactionAmount}
                      onChange={(e) => handleInputChange(e, monthId, transaction.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={() => handleAddTransaction(monthId)}>Add Transaction</button>
        </div>
      ))}
      <button onClick={handleCalculateRewardPoints}>Calculate Reward Points</button>

      {/* Display Monthly Reward Points */}
      <h2>Monthly Reward Points</h2>
      {Object.keys(rewardPoints).map((monthId) => (
        <div key={monthId}>
          <h3>{monthId}</h3>
          <ul>
            {Object.keys(rewardPoints[monthId]).map((customerId) => (
              <li key={customerId}>
                Customer {customerId}: {rewardPoints[monthId][customerId]} points
              </li>
            ))}
          </ul>
        </div>
      ))}

      {/* Display Total Reward Points */}
      <h2>Total Reward Points</h2>
      {Object.keys(totalRewardPoints).map((monthId) => (
        <div key={monthId}>
          <h3>{monthId}</h3>
          <p>Total Points: {totalRewardPoints[monthId]}</p>
        </div>
      ))}
    </div>
  );
};

export default RewardPointsCalculator;
