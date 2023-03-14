import {useEffect, useState} from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import BudgetsList from './Components/BudgetsList';
import HomeComponent from './Components/HomeComponent';
import Report from './Components/Report';
import TransactionForm from './Components/TransactionForm';
import { Budget, BudgetTransactionUpdateRequest } from "./Types/Types";
import { useNavigate } from "react-router-dom";

function App() {
  const [budgets, setBudgets] = useState<Budget[]>();
  const [openedBudgetIds, setOpenedBudgetIds] = useState<number[]>();
  const navigate = useNavigate();
  
  const getBudgets = async () => {
    try {
      const response = await fetch('https://localhost:7167/Budgets/User/1');
      const json = await response.json();
      setBudgets(json);
    } catch (e :any) {
      throw new Error('Budgets not found');
    }
  };

  useEffect(() => {
    getBudgets();
  }, []);

  async function AddTransaction(budgetId :number, request :BudgetTransactionUpdateRequest) {
 
    const saveTransaction = async () => {
      try {
        const requestOptions = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(request)
        };
        const response = await fetch(`https://localhost:7167/Budgets/${budgetId}/transactions`, requestOptions)
          .then(response => response.json())
          .then(data => console.log(data) );
      } catch (e :any) {
        throw new Error('Budgets not found');
      }
    };
    await saveTransaction();
    await getBudgets();
    navigate("/dashboard");
  }
  
  return (
    <div className="App">
        <Routes>
          <Route path="/dashboard" element={<BudgetsList 
          budgets={budgets}
          openedBudgetIds={openedBudgetIds}
          setOpenedBudgetIds={setOpenedBudgetIds}
          />}></Route>
          <Route path="/transactions" element={<TransactionForm AddTransaction={AddTransaction}/>}></Route>
          <Route path="/report" element={<Report />}></Route>
          <Route path="/" element={<HomeComponent />}></Route>
        </Routes>
    </div>
  );
}

export default App;
