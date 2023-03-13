namespace PersonalBudgetAPI.Models;

public class BudgetUpdateRequest
{
    public double TotalAmount { get; set; }
    
    public string BudgetName { get; set; }
    public int? UserId { get; set; }
}