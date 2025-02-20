import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles.css";

function Investments() {
  const [suggestion, setSuggestion] = useState("");

  useEffect(() => {
    fetchSuggestion();
  }, []);

  const fetchSuggestion = async () => {
    const res = await axios.get("http://127.0.0.1:5000/investments");
    setSuggestion(res.data.investment_suggestion);
  };

  return (
    <div>
      <h2>Investment Suggestions</h2>
      <p>{suggestion}</p>
    </div>
  );
}

export default Investments;
