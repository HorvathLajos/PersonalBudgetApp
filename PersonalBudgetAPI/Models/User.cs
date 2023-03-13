using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace PersonalBudgetAPI.Models;

[Table("Users")]
public class User
{
    [Key]
    public int UserId { get; set; }
    public string UserName { get; set; }
    [PasswordPropertyText]
    public string UserPassword { get; set; }
}