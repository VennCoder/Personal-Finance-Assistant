import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles.css";

function PredictExpense() {
  const [prediction, setPrediction] = useState("");

  useEffect(() => {
    fetchPrediction();
  }, []);

  const fetchPrediction = async () => {
    const res = await axios.get("http://127.0.0.1:5000/predict_expense");
    setPrediction(res.data.predicted_expense);
  };

  return (
    <div>
      <h2>Predicted Expense</h2>
      <p>Estimated Expense: ${prediction}</p>
    </div>
  );
}

export default PredictExpense;
