import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles.css";

function RecommendSavings() {
  const [suggestion, setSuggestion] = useState("");

  useEffect(() => {
    fetchRecommendation();
  }, []);

  const fetchRecommendation = async () => {
    const res = await axios.get("http://127.0.0.1:5000/recommend_savings");
    setSuggestion(res.data.savings_suggestion);
  };

  return (
    <div>
      <h2>Recommended Savings</h2>
      <p>{suggestion}</p>
    </div>
  );
}

export default RecommendSavings;
