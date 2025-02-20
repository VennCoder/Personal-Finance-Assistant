import React, { useState } from "react";
import axios from "axios";
import "../styles.css";

function FilterTransactions() {
  const [filters, setFilters] = useState({ start_date: "", end_date: "", category: "" });
  const [transactions, setTransactions] = useState([]);

  const fetchFilteredTransactions = async () => {
    const res = await axios.post("http://127.0.0.1:5000/transactions/filter", filters);
    setTransactions(res.data.transactions);
  };

  return (
    <div>
      <h2>Filter Transactions</h2>
      <input
        type="date"
        placeholder="Start Date"
        value={filters.start_date}
        onChange={(e) => setFilters({ ...filters, start_date: e.target.value })}
      />
      <input
        type="date"
        placeholder="End Date"
        value={filters.end_date}
        onChange={(e) => setFilters({ ...filters, end_date: e.target.value })}
      />
      <input
        type="text"
        placeholder="Category"
        value={filters.category}
        onChange={(e) => setFilters({ ...filters, category: e.target.value })}
      />
      <button onClick={fetchFilteredTransactions}>Filter</button>
      
      <ul>
        {transactions.map((t, index) => (
          <li key={index}>{t.date} - {t.category} - ${t.amount}</li>
        ))}
      </ul>
    </div>
  );
}

export default FilterTransactions;
