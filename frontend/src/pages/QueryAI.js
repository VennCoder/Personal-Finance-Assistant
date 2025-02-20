import React, { useState } from "react";
import axios from "axios";
import "../styles.css";

function QueryAI() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");

  const handleQuery = async () => {
    const res = await axios.post("http://127.0.0.1:5000/query", { query });
    setResponse(res.data.response);
  };

  return (
    <div>
      <h2>Ask AI</h2>
      <input
        type="text"
        placeholder="Ask a financial question..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleQuery}>Submit</button>
      <p>{response}</p>
    </div>
  );
}

export default QueryAI;
