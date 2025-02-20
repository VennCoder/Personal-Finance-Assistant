import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles.css";

function BudgetWarning() {
  const [warning, setWarning] = useState("");

  useEffect(() => {
    fetchWarning();
  }, []);

  const fetchWarning = async () => {
    const res = await axios.get("http://127.0.0.1:5000/budget_warning");
    setWarning(res.data.warning || res.data.message);
  };

  return (
    <div>
      <h2>Budget Warning</h2>
      <p>{warning}</p>
    </div>
  );
}

export default BudgetWarning;
