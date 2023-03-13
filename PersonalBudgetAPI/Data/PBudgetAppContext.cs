using Microsoft.EntityFrameworkCore;
using PersonalBudgetAPI.Models;
namespace PersonalBudgetAPI.Data;
public class PBudgetAppContext : DbContext
{
    public PBudgetAppContext (DbContextOptions<PBudgetAppContext> options) : base(options) {}

    public DbSet<Budget> Budget { get; set; }
    public DbSet<User> User { get; set; }
    public DbSet<Transaction> Transaction { get; set; }
}