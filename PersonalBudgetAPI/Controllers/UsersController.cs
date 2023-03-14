// using Microsoft.AspNetCore.Mvc;
// using Microsoft.EntityFrameworkCore;
// using PersonalBudgetAPI.Data;
// using PersonalBudgetAPI.Models;
//
// namespace PersonalBudgetAPI.Controllers
// {
//     [Route("[controller]")]
//     [ApiController]
//     public class UsersController : ControllerBase
//     {
//         private readonly PBudgetAppContext _context;
//         public UsersController(PBudgetAppContext context) { _context = context; }
//
//         [HttpGet]
//         public async Task<ActionResult<IEnumerable<User>>> GetUsers()
//         {
//           if (_context.User == null) return NotFound();
//           return await _context.User.ToListAsync();
//         }
//
//         [HttpGet("{id}")]
//         public async Task<ActionResult<User>> GetUserById(int id)
//         {
//             if (_context.User == null) return NotFound();
//             var user = await _context.User
//                 .FirstOrDefaultAsync(user => user.UserId ==id);
//
//             if (user == null) return NotFound();
//             return user;
//         }
//
//         [HttpPut("{id}")]
//         public async Task<IActionResult> UpdateUser(int id, [FromBody] User user)
//         {
//             if (id != user.UserId) return BadRequest();
//             _context.Entry(user).State = EntityState.Modified;
//             try
//             {
//                 await _context.SaveChangesAsync();
//             }
//             catch (DbUpdateConcurrencyException)
//             {
//                 if (!UserExists(id)) return NotFound();
//                 throw;
//             }
//             return NoContent();
//         }
//
//         [HttpPost]
//         public async Task<ActionResult<User>> AddUser(User user)
//         {
//           if (_context.User == null) return Problem("Entity set 'PBudgetAppContext.User'  is null.");
//           _context.User.Add(user);
//           await _context.SaveChangesAsync();
//           return CreatedAtAction("GetUserById", new { id = user.UserId }, user);
//         }
//         
//         [HttpPost("/budget")]
//         public async Task<ActionResult<User>> AddBudgetToUser(int id, Budget budget)
//         {
//             if (_context.User == null) return Problem("Entity set 'PBudgetAppContext.User'  is null.");
//             var user = await _context.User
//                 .FirstOrDefaultAsync(user => user.UserId ==id);
//             if (user == null) return NotFound();
//             
//             if (budget.TotalAmount == null)  return BadRequest();
//             if (budget.UserId != null)
//             {
//                 budget.UserId = user.UserId;
//                 _context.Budget.Add(budget);
//             }
//             await _context.SaveChangesAsync();
//             return CreatedAtAction("GetUserById", new { id = user.UserId }, user);
//         }
//
//         [HttpDelete("{id}")]
//         public async Task<IActionResult> DeleteUser(int id)
//         {
//             if (_context.User == null) return NotFound();
//             var user = await _context.User.FindAsync(id);
//             if (user == null) return NotFound();
//             _context.User.Remove(user);
//             await _context.SaveChangesAsync();
//             return NoContent();
//         }
//         private bool UserExists(int id)
//         {
//             return (_context.User?.Any(e => e.UserId == id)).GetValueOrDefault();
//         }
//     }
// }
