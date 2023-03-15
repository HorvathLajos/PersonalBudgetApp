import { Box, Button, FormControl, FormHelperText, InputAdornment, OutlinedInput, TextField, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { AddTransactionProps, BudgetTransactionUpdateRequest, Transaction } from "../Types/Types"

const TransactionForm = (props :AddTransactionProps) => {
  let { state } = useLocation();
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [toggleValue, setToggleValue] = useState("expenditure");

  const onDescChange = (e: any) => setDescription(e.target.value);
  const onAmountChange = (e: any) => setAmount(e.target.value);
  const handleToggle = (e: any) => setToggleValue(e.target.value);
  
  const handleSubmit = () => {
    let date = new Date();
    date.setTime( date.getTime() - new Date().getTimezoneOffset()*60*1000 );
    let transaction :BudgetTransactionUpdateRequest = {
        transactionData: date,
        transactionDesc: description,
        transactionAmount: toggleValue == "expenditure" ? amount * -1 : amount,
        valid: true,
        budgetId: state.selectedBudget.budgetId
    }
    return props.AddTransaction(state.selectedBudget.budgetId, transaction);
  }

  return (
      <Box
        sx={{ backgroundColor: "#D4F1F4", height: '100vh'}}
        textAlign="center"
      >
        <FormControl sx={{ m: 1, width: '90%' }} variant="outlined">
          <ToggleButtonGroup
            color="primary"
            value={toggleValue}
            exclusive
            onChange={handleToggle}
            aria-label="Type of transaction"
          >
            <ToggleButton value="expenditure">Expenditure</ToggleButton>
            <ToggleButton value="income">Income</ToggleButton>
          </ToggleButtonGroup>
        </FormControl>
        <FormControl sx={{ m: 1, width: '90%' }} variant="outlined">
          <FormHelperText id="outlined-desc-helper-text">Description</FormHelperText>
          <OutlinedInput
            onChange={onDescChange}
            aria-describedby="outlined-desc-helper-text"
            inputProps={{
              'aria-label': 'Description',
            }}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: '90%' }} variant="outlined">
          <FormHelperText id="outlined-amount-helper-text">Amount</FormHelperText>
          <OutlinedInput
            type="number"
            onChange={onAmountChange}
            endAdornment={<InputAdornment position="end">€</InputAdornment>}
            aria-describedby="outlined-amount-helper-text"
            inputProps={{
              'aria-label': 'Amount',
            }}
          />
        </FormControl>
        <Button sx={{ display: "block", margin: "auto" }} onClick={handleSubmit}>Add new transaction</Button>
      </Box>
  );
};

export default TransactionForm