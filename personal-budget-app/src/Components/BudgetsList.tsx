import { Box, Collapse, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import { Budget, BudgetListProps } from "../Types/Types";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Link } from "react-router-dom";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';


const BudgetsList = (properties :BudgetListProps) => {
    const openedBudgets = properties.openedBudgetIds == null ? new Array<number>() : properties.openedBudgetIds;
    const setOpenedBudgetIds = properties.setOpenedBudgetIds;
    function Row(props: { row: Budget }) {
        const { row } = props;
        const [open, setOpen] = useState(
            properties.openedBudgetIds && properties.openedBudgetIds.indexOf(row.budgetId) > -1
        );
        
        return (
            <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => {setOpen(!open); setOpenedBudgetIds && setOpenedBudgetIds([...openedBudgets, row.budgetId])}}>
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">{row.budgetName}</TableCell>
                <TableCell align="right">{row.totalAmount}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box sx={{ margin: 1 }}>
                    <Typography variant="h6" gutterBottom component="div">
                        Transactions
                    </Typography>
                    <Link to={"/Transactions"} state={{ selectedBudget: row }}><AddCircleOutlineIcon fontSize="large"/></Link>
                    <Table size="small" aria-label="purchases">
                        <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell align="right">Amount</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {row.transactions.map((transactionRow) => (
                            <TableRow key={transactionRow.transactionId}>
                            <TableCell component="th" scope="row">
                                {transactionRow.transactionData.toString()}
                            </TableCell>
                            <TableCell>{transactionRow.transactionDesc}</TableCell>
                            <TableCell align="right">{transactionRow.transactionAmount}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                    </Box>
                </Collapse>
                </TableCell>
            </TableRow>
            </React.Fragment>
        );
    }

    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
            <TableHead>
                <TableRow>
                <TableCell />
                <TableCell><b>Budget</b></TableCell>
                <TableCell align="right"><b>Total amount</b></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {properties.budgets?.map((row) => (
                <Row key={row.budgetId} row={row} />
                ))}
            </TableBody>
            </Table>
        </TableContainer>
    );
}

export default BudgetsList