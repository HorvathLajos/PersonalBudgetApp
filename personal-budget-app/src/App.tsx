import {useEffect, useState} from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import BudgetsList from './Components/BudgetList/BudgetsList';
import TransactionForm from './Components/TransactionForm';
import { Budget, BudgetAddRequest, BudgetTransactionUpdateRequest } from "./Types/Types";
import { useNavigate } from "react-router-dom";
import BudgetForm from './Components/BudgetForm';

function App() {
  const [ budgets, setBudgets ] = useState<Budget[]>();
  const [ openedBudgetIds, setOpenedBudgetIds ] = useState<number[]>();
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
        throw new Error('Transaction error');
      }
    };
    await saveTransaction();
    await getBudgets();
    navigate("/dashboard");
  }

  async function DeleteTransaction(transactionId :number) {
 
    const delTransaction = async () => {
      try {
        const requestOptions = {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' }
        };
        await fetch(`https://localhost:7167/Transactions/${transactionId}`, requestOptions);
        await getBudgets();
      } catch (e :any) {
        throw new Error('Transaction deletion error');
      }
    };
    await delTransaction();
  }

  async function AddBudget(budget :BudgetAddRequest) {
 
    const AddABudget = async () => {
      try {
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(budget)
        };
        await fetch(`https://localhost:7167/Budgets`, requestOptions);
        await getBudgets();
      } catch (e :any) {
        throw new Error('Transaction deletion error');
      }
    };
    await AddABudget();
    navigate("/dashboard");
  }

  async function DeleteBudget(budgetId :number) {
 
    const delBudget = async () => {
      try {
        const requestOptions = {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' }
        };
        await fetch(`https://localhost:7167/Budgets/${budgetId}`, requestOptions);
        await getBudgets();
      } catch (e :any) {
        throw new Error('Budget deletion error');
      }
    };
    await delBudget();
    navigate("/dashboard");
  }
  
  return (
    <div className="App">
        <Routes>
          <Route path="/dashboard" element={<BudgetsList 
          budgets={budgets}
          openedBudgetIds={openedBudgetIds}
          setOpenedBudgetIds={setOpenedBudgetIds}
          deleteTransaction={DeleteTransaction}
          deleteBudget={DeleteBudget}
          />}></Route>
          <Route path="/transactions" element={<TransactionForm AddTransaction={AddTransaction}/>}></Route>
          <Route path="/budgets" element={<BudgetForm AddBudget={AddBudget}/>}></Route>
        </Routes>
    </div>
  );
}

export default App;
