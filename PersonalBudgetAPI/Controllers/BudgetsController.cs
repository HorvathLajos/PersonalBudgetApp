using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PersonalBudgetAPI.Data;
using PersonalBudgetAPI.Models;

namespace PersonalBudgetAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BudgetsController : ControllerBase
    {
        private readonly PBudgetAppContext _context;

        public BudgetsController(PBudgetAppContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Budget>>> GetBudgets()
        {
          if (_context.Budget == null) return NotFound();
          return await _context.Budget
                .Include(b=>b.User)
                .Include(b=>b.Transactions)
                .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Budget>> GetBudget(int id)
        {
          if (_context.Budget == null) return NotFound();
          var budget = await _context.Budget
              .Include(b=>b.User)
              .Include(b=>b.Transactions)
              .FirstOrDefaultAsync(bud => bud.BudgetId == id);
          if (budget == null) return NotFound();
          return budget;
        }
        
        [HttpGet("/Budgets/User/{id}")]
        public async Task<ActionResult<IEnumerable<Budget>>> GetBudgetByUser(int id)
        {
            if (_context.Budget == null) return NotFound();
            var budgets = await _context.Budget
                .Where(bud => bud.UserId == id)
                .Include(b => b.User)
                .Include(b => b.Transactions)
                .ToListAsync();
            if (budgets == null) return NotFound();
            return Ok(budgets);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBudget(int id, [FromBody] BudgetUpdateRequest request)
        {
            var budgetUpdate = _context.Budget.FirstOrDefault(bud => bud.BudgetId == id);
            if (budgetUpdate == null) return null;
            if (request.TotalAmount != null) budgetUpdate.TotalAmount = request.TotalAmount;
            if (request.UserId != null)
            {
                var user = _context.User.FirstOrDefault(user => user.UserId == request.UserId);
                if (user == null) return NotFound("User not found");
                budgetUpdate.UserId = user.UserId;
                budgetUpdate.User = user;
            }
            await _context.SaveChangesAsync();
            return Ok(budgetUpdate);
        }
        
        [HttpPut("{id}/transactions")]
        public async Task<IActionResult> AddTransactionToBudget(int id, [FromBody] Transaction request)
        {
            var budgetUpdate = _context.Budget.FirstOrDefault(bud => bud.BudgetId == id);
            if (budgetUpdate == null) return null;
            request.BudgetId = id;
            _context.Transaction.Add(request);
            await _context.SaveChangesAsync();
            return Ok(budgetUpdate);
        }

        [HttpPost]
        public async Task<ActionResult<Budget>> AddBudget(Budget budget)
        {
          if (_context.Budget == null) return Problem("Entity set 'PBudgetAppContext.Budget'  is null.");
          _context.Budget.Add(budget);
          await _context.SaveChangesAsync();
          return CreatedAtAction("GetBudget", new { id = budget.BudgetId }, budget);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBudget(int id)
        {
            if (_context.Budget == null) return NotFound();
            var budget = await _context.Budget.FindAsync(id);
            if (budget == null) return NotFound();
            _context.Budget.Remove(budget);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
