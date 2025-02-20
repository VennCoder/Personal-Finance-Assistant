import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Transactions from "./pages/Transactions";
import Goals from "./pages/Goals";
import BudgetWarning from "./pages/BudgetWarning";
import Investments from "./pages/Investments";
import PredictExpense from "./pages/PredictExpense";
import RecommendSavings from "./pages/RecommendSavings";
import QueryAI from "./pages/QueryAI";
import FilterTransactions from "./pages/FilterTransactions";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="container">
        <h1>AI Finance Assistant</h1>
        <nav>
          <ul>
            <li><Link to="/">Transactions</Link></li>
            <li><Link to="/goals">Savings Goals</Link></li>
            <li><Link to="/budget">Budget Warning</Link></li>
            <li><Link to="/investments">Investments</Link></li>
            <li><Link to="/predict_expense">Predict Expense</Link></li>
            <li><Link to="/recommend_savings">Recommend Savings</Link></li>
            <li><Link to="/query">Ask AI</Link></li>
            <li><Link to="/filter_transactions">Filter Transactions</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Transactions />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/budget" element={<BudgetWarning />} />
          <Route path="/investments" element={<Investments />} />
          <Route path="/predict_expense" element={<PredictExpense />} />
          <Route path="/recommend_savings" element={<RecommendSavings />} />
          <Route path="/query" element={<QueryAI />} />
          <Route path="/filter_transactions" element={<FilterTransactions />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
