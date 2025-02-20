import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles.css";

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [formData, setFormData] = useState({ date: "", category: "", amount: "" });

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    const res = await axios.get("http://127.0.0.1:5000/transactions");
    setTransactions(res.data.transactions);
  };

  const addTransaction = async (e) => {
    e.preventDefault();
    await axios.post("http://127.0.0.1:5000/add_transaction", formData);
    fetchTransactions();
    setFormData({ date: "", category: "", amount: "" });
  };

  return (
    <div>
      <h2>Transactions</h2>
      <form onSubmit={addTransaction}>
        <input type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} required />
        <input type="text" placeholder="Category" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} required />
        <input type="number" placeholder="Amount" value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })} required />
        <button type="submit">Add</button>
      </form>
      <ul>
        {transactions.map((t, index) => (
          <li key={index}>{t.date} - {t.category} - ${t.amount}</li>
        ))}
      </ul>
    </div>
  );
}

export default Transactions;
