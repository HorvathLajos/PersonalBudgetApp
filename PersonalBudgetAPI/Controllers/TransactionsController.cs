using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PersonalBudgetAPI.Data;
using PersonalBudgetAPI.Models;

namespace PersonalBudgetAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class TransactionsController : ControllerBase
    {
        private readonly PBudgetAppContext _context;
        public TransactionsController(PBudgetAppContext context) { _context = context; }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Transaction>>> GetTransaction()
        {
          if (_context.Transaction == null) return NotFound();
          return await _context.Transaction
              .ToListAsync();
        }
        //
        // // GET: api/Transactions/5
        // [HttpGet("{id}")]
        // public async Task<ActionResult<Transaction>> GetTransaction(int id)
        // {
        //   if (_context.Transaction == null)
        //   {
        //       return NotFound();
        //   }
        //     var transaction = await _context.Transaction.FindAsync(id);
        //
        //     if (transaction == null)
        //     {
        //         return NotFound();
        //     }
        //
        //     return transaction;
        // }
        //
        // // PUT: api/Transactions/5
        // // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        // [HttpPut("{id}")]
        // public async Task<IActionResult> PutTransaction(int id, Transaction transaction)
        // {
        //     if (id != transaction.TransactionId)
        //     {
        //         return BadRequest();
        //     }
        //
        //     _context.Entry(transaction).State = EntityState.Modified;
        //
        //     try
        //     {
        //         await _context.SaveChangesAsync();
        //     }
        //     catch (DbUpdateConcurrencyException)
        //     {
        //         if (!TransactionExists(id))
        //         {
        //             return NotFound();
        //         }
        //         else
        //         {
        //             throw;
        //         }
        //     }
        //
        //     return NoContent();
        // }

        [HttpPost]
        public async Task<ActionResult<Transaction>> PostTransaction(Transaction transaction)
        {
          if (_context.Transaction == null)
          {
              return Problem("Entity set 'PBudgetAppContext.Transaction'  is null.");
          }
          _context.Transaction.Add(transaction);
          await _context.SaveChangesAsync();

          return CreatedAtAction("GetTransaction", new { id = transaction.TransactionId }, transaction);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTransaction(int id)
        {
            if (_context.Transaction == null)
            {
                return NotFound();
            }
            var transaction = await _context.Transaction.FindAsync(id);
            if (transaction == null)
            {
                return NotFound();
            }

            _context.Transaction.Remove(transaction);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
