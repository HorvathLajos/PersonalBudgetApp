import { Box, Button, FormControl, FormHelperText, InputAdornment, OutlinedInput } from "@mui/material";
import { useState } from "react";
import { AddBudgetProps, BudgetAddRequest } from "../Types/Types"

const BudgetForm = (props :AddBudgetProps) => {
  const [budgetName, setbudgetName] = useState("");
  const [amount, setAmount] = useState(0);

  const onNameChange = (e: any) => setbudgetName(e.target.value);
  const onAmountChange = (e: any) => setAmount(e.target.value);
  
  const handleSubmit = () => {
    let date = new Date();
    date.setTime( date.getTime() - new Date().getTimezoneOffset()*60*1000 );
    let budget :BudgetAddRequest = {
        budgetName :budgetName,
        totalAmount :amount,
        userId:1,
        transactions:[]
    }
    return props.AddBudget(budget);
  }
  
  return (
      <Box
      textAlign="center">
        <h2>Add new budget</h2>
        <FormControl sx={{ m: 1, width: '90%' }} variant="outlined">
          <FormHelperText id="outlined-name-helper-text">Budget name</FormHelperText>
          <OutlinedInput
            onChange={onNameChange}
            aria-describedby="outlined-name-helper-text"
            inputProps={{
              'aria-label': 'Name',
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

        <Button sx={{ display: "block", margin: "auto" }} onClick={handleSubmit}>Add new budget</Button>
      </Box>
  );
};

export default BudgetForm