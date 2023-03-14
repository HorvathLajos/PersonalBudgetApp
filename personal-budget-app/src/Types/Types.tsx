export type User = {
    userId : number,
    userName :string,
    userPassword :string
};
export type Transaction = {
    transactionId : number,
    transactionData : Date,
    transactionDesc? : string,
    transactionAmount : number,
    valid : boolean,
    budgetId : number
};
export type Budget = {
    budgetId : number,
    budgetName :string,
    totalAmount :number
    userId :number,
    transactions :Transaction[]
};
export type BudgetListProps = {
    budgets? :Budget[],
    openedBudgetIds?: number[],
    setOpenedBudgetIds?: React.Dispatch<React.SetStateAction<number[] | undefined>>
};
export type MyTableRow = {
    budgetId: number,
    budgetName: string,
    totalAmount: number,
    transactions: Transaction[]
};
export type AddTransactionProps = {
    AddTransaction :(budgetId :number, request :BudgetTransactionUpdateRequest) => void
};
export type BudgetTransactionUpdateRequest = {
    transactionData : Date,
    transactionDesc? : string,
    transactionAmount : number,
    valid : boolean,
    budgetId : number
}