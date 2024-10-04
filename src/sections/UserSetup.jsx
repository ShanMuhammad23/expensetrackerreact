import { useState } from 'react';
import { useExpense } from './ExpenseContext';

const UserSetup = () => {
  const { user, setUser } = useExpense();
  const [name, setName] = useState(user.name || '');
  const [income, setIncome] = useState(user.income || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser({ name, income: parseFloat(income) });
  };

  return (
    !user.name || !user.income ? ( // Only show the popup if the user is not set
      <div className="modal">
        <form onSubmit={handleSubmit}>
          <h2>Set Up Your Profile</h2>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
          />
          <input
            type="number"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            placeholder="Enter your income"
            required
          />
          <button type="submit">Save</button>
        </form>
      </div>
    ) : null
  );
};

export default UserSetup;
