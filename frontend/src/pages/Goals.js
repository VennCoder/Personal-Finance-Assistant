import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles.css";

function Goals() {
  const [goals, setGoals] = useState([]);
  const [goalData, setGoalData] = useState({ goal_name: "", target_amount: "", deadline: "" });

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    const res = await axios.get("http://127.0.0.1:5000/get_goals");
    setGoals(res.data);
  };

  const addGoal = async (e) => {
    e.preventDefault();
    await axios.post("http://127.0.0.1:5000/set_goal", goalData);
    fetchGoals();
    setGoalData({ goal_name: "", target_amount: "", deadline: "" });
  };

  const deleteGoal = async (goal_name) => {
    await axios.delete("http://127.0.0.1:5000/delete_goal", { data: { goal_name } });
    fetchGoals();
  };

  return (
    <div>
      <h2>Savings Goals</h2>
      <form onSubmit={addGoal}>
        <input type="text" placeholder="Goal Name" value={goalData.goal_name} onChange={(e) => setGoalData({ ...goalData, goal_name: e.target.value })} required />
        <input type="number" placeholder="Target Amount" value={goalData.target_amount} onChange={(e) => setGoalData({ ...goalData, target_amount: e.target.value })} required />
        <input type="date" value={goalData.deadline} onChange={(e) => setGoalData({ ...goalData, deadline: e.target.value })} required />
        <button type="submit">Set Goal</button>
      </form>
      <ul>
        {goals.map((g, index) => (
          <li key={index}>
            {g.goal_name} - ${g.target_amount} - Deadline: {g.deadline}
            <button onClick={() => deleteGoal(g.goal_name)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Goals;
