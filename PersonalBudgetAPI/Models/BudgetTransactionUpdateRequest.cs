namespace PersonalBudgetAPI.Models;

public class BudgetTransactionUpdateRequest
{
    public DateTime TransactionData { get; set; }
    public string? TransactionDesc { get; set; }
    public double TransactionAmount { get; set; }
    public int BudgetId { get; set; }
}