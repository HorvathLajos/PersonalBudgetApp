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
    Valid : boolean,
    BudgetId : number
};
export type Budget = {
    budgetId : number,
    budgetName :string,
    TotalAmount :number
    userId :number
};