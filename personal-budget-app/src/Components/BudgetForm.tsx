import { Box, Button, FormControl, FormHelperText,
  InputAdornment, OutlinedInput } from "@mui/material";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { AddBudgetProps, BudgetAddRequest } from "../Types/Types"

const BudgetForm = (props :AddBudgetProps) => {
  let { state } = useLocation();

  const selectedId = state && state.selectedBudget && state.selectedBudget.budgetId;
  const selectedName = state && state.selectedBudget && state.selectedBudget.budgetName;
  const selectedAmount = state && state.selectedBudget && state.selectedBudget.totalAmount;

  const [budgetName, setbudgetName] = useState(selectedName);
  const [amount, setAmount] = useState(selectedAmount);

  const onNameChange = (e: any) => setbudgetName(e.target.value);
  const onAmountChange = (e: any) => setAmount(e.target.value);
  const handleSubmit = () => {
    let date = new Date();
    // Time was off by an hour.
    date.setTime( date.getTime() - new Date().getTimezoneOffset()*60*1000 );
    let budget :BudgetAddRequest = {
        budgetName :budgetName,
        totalAmount :amount,
        userId:1,
        transactions:[]
    }
    if(selectedId != null){
      return props.ModBudget(selectedId, budget);
    }
    return props.AddBudget(budget);
  }
  const buttonValue = selectedId == null ? "Add new budget" : "Modify budget";
  
  return (
      <Box
        sx={{ backgroundColor: "#D4F1F4", height: '100vh'}}
        textAlign="center">
        <FormControl sx={{ m: 1, width: '90%' }} variant="outlined">
          <FormHelperText id="outlined-name-helper-text">Budget name</FormHelperText>
          <OutlinedInput
            onChange={onNameChange}
            value={budgetName == null ? "" : budgetName}
            aria-describedby="outlined-name-helper-text"
            inputProps={{
              'aria-label': 'Name'
            }}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: '90%' }} variant="outlined">
          <FormHelperText id="outlined-amount-helper-text">Amount</FormHelperText>
          <OutlinedInput
            type="number"
            onChange={onAmountChange}
            value={amount == null ? 0 : amount}
            endAdornment={<InputAdornment position="end">€</InputAdornment>}
            aria-describedby="outlined-amount-helper-text"
            inputProps={{
              'aria-label': 'Amount'
            }}
          />
        </FormControl>
        <Button 
          sx={{ display: "block", margin: "auto" }} 
          onClick={handleSubmit}
        >
          {buttonValue}
        </Button>
      </Box>
  );
};

export default BudgetForm