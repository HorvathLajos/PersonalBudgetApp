import { Box, Button, FormControl, FormHelperText, InputAdornment, OutlinedInput, TextField } from "@mui/material";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { AddTransactionProps, BudgetTransactionUpdateRequest, Transaction } from "../Types/Types"

const TransactionForm = (props :AddTransactionProps) => {
  let { state } = useLocation();
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);

  const onDescChange = (e: any) => setDescription(e.target.value);
  const onAmountChange = (e: any) => setAmount(e.target.value);

  const handleSubmit = () => {
    let transaction :BudgetTransactionUpdateRequest = {
        transactionData: new Date(),
        transactionDesc: description,
        transactionAmount: amount,
        valid: true,
        budgetId: state.selectedBudget.budgetId
    }
    return props.AddTransaction(state.selectedBudget.budgetId, transaction);
  }

  return (
      <Box>
        <h2>Add new transaction</h2>
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
            onChange={onAmountChange}
            endAdornment={<InputAdornment position="end">€</InputAdornment>}
            aria-describedby="outlined-amount-helper-text"
            inputProps={{
              'aria-label': 'Amount',
            }}
          />
        </FormControl>

        <Button onClick={handleSubmit}>Add</Button>
      </Box>
  );
};

export default TransactionForm