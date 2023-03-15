import { Box, Collapse, Paper, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import { Budget, BudgetListProps } from "../../Types/Types";
import { Link } from "react-router-dom";
import euro from "../../resources/euro.png"
import Moment from 'moment';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import './BudgetsList.css';


const BudgetsList = (properties :BudgetListProps) => {
    const openedBudgets = properties.openedBudgetIds == null 
    ? new Array<number>()
    : properties.openedBudgetIds;

    const setOpenedBudgetIds = properties.setOpenedBudgetIds;
    const [budgets, setBudgets] = useState<Budget[]>();
    
    useEffect(() => {
        setBudgets(properties.budgets);
    }, [properties.budgets]);

    function Row(props: { row: Budget }) {
        const { row } = props;

        const primaryValue = properties.openedBudgetIds != null
            ? properties.openedBudgetIds.indexOf(row.budgetId) > -1
            : false;

        const [open, setOpen] = useState<boolean>(primaryValue);

        const rowOffsettedAmount = row.transactions
            .map(trans => trans.transactionAmount)
            .reduce((sum, current) => sum + current, row.totalAmount);

        const colorInsert = 0 > rowOffsettedAmount ? 'red' : 'black';

        const amountTableCellValue = `Remaining: ${rowOffsettedAmount} / ${row.totalAmount}`;
        return (
            <React.Fragment>
            <TableRow sx={{backgroundColor: '#5885AF'}}>
                <TableCell component="th" scope="row" className="MyPointer"
                onClick={() => {
                    setOpen(!open); open 
                    ? setOpenedBudgetIds && setOpenedBudgetIds(openedBudgets.filter(bud => bud != row.budgetId))
                    : setOpenedBudgetIds && setOpenedBudgetIds([...openedBudgets, row.budgetId]) 
                }}>
                    <p className="BudgetTableCell MyPointer"><b>{row.budgetName}</b></p>
                </TableCell>
                <TableCell align="right" style={{color:`${colorInsert}`,}}>
                    <p className="BudgetTableCell"><b>{amountTableCellValue}</b></p>
                </TableCell>
                <TableCell>
                    <Link to={"/budgets"} state={{ selectedBudget: row }}><ModeEditIcon color="primary" className="MyPointer MarginOnRight"/></Link>
                    <DeleteForeverIcon color="error" className="MyPointer" onClick={() => {properties.deleteBudget && properties.deleteBudget(row.budgetId)}}/>
                </TableCell>
            </TableRow>
            <TableRow sx={{backgroundColor: '#D4F1F4'}}>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box sx={{ margin: 1 }}>
                        <p className="BudgetTableCellMain">Transactions <Link to={"/Transactions"} state={{ selectedBudget: row }}><img src={euro}/></Link></p>
                    <Table size="small" aria-label="transactions">
                        <TableHead>
                        <TableRow>
                            <TableCell><p className="BudgetTableCell">Date</p></TableCell>
                            <TableCell><p className="BudgetTableCell">Description</p></TableCell>
                            <TableCell align="right"><p className="BudgetTableCell">Amount</p></TableCell>
                            <TableCell/>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {row.transactions.map((transactionRow) => (
                            <TableRow key={transactionRow.transactionId}>
                                <TableCell component="th" scope="row">
                                    <p className="BudgetTableCell">
                                        {Moment(transactionRow.transactionData).format("DD-MM-YYYY HH:mm:ss")}
                                    </p>
                                </TableCell>
                                <TableCell>
                                    <p className="BudgetTableCell">{transactionRow.transactionDesc}</p>
                                </TableCell>
                                <TableCell align="right">
                                    <p className="BudgetTableCell">{transactionRow.transactionAmount}</p>
                                </TableCell>
                                <TableCell align="right">
                                    <DeleteForeverIcon color="error" className="MyPointer" onClick={() => {properties.deleteTransaction && properties.deleteTransaction(transactionRow.transactionId)}}/>
                                </TableCell>
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
        <>
        <Box sx={{ backgroundColor: "#41729F", position: 'fixed',top: 0,left: 0,width: '100%', display:'flex'}}>
            <p className="BudgetTableCellMain"><b>Budget</b> 
                <Link to={"/Budgets"}><img src={euro}/></Link>
            </p>
            <p className="BudgetTableCellMain"><b>State</b></p>
        </Box>
        <TableContainer component={Paper} className="TableContainer">
            <Table stickyHeader aria-label="collapsible table">
                <TableBody>
                    {budgets?.map((row) => (
                    <Row key={row.budgetId} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </>
    );
}

export default BudgetsList