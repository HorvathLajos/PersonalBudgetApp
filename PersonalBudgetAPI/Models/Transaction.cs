using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PersonalBudgetAPI.Models;

[Table("Transactions")]
public class Transaction
{
    [Key]
    public int TransactionId { get; set; }
    [DataType(DataType.Date)]
    public DateTime TransactionData { get; set; }
    public string? TransactionDesc { get; set; }
    public double TransactionAmount { get; set; }
    public bool Valid { get; set; }
    [ForeignKey("Budgets")]
    public int BudgetId { get; set; }
}