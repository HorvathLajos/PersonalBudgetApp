import React, {useEffect, useState} from 'react';
import './App.css';
import {Budget, User} from "./Types/Types";

function App() {
  const [budgets, setBudgets] = useState<Budget[]>();
  
  const getBudgets = async () => {
    try {
      const response = await fetch('https://localhost:7167/Budgets');
      const json = await response.json();
      setBudgets(json);
    } catch (e :any) {
      throw new Error('Budgets not found');
    }
  };

  useEffect(() => {
    getBudgets();
  }, []);
  
  return (
    <div className="App">
      
    </div>
  );
}

export default App;
