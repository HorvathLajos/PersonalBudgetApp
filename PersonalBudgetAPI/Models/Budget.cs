using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PersonalBudgetAPI.Models;

[Table("Budgets")]
public class Budget
{
    [Key]
    public int BudgetId { get; set; }

    public string BudgetName { get; set; }
    public double TotalAmount { get; set; }
    [ForeignKey("Users")]
    public int UserId { get; set; }
    public virtual User? User { get; set; }
    public virtual List<Transaction>? Transactions { get; set; }
}