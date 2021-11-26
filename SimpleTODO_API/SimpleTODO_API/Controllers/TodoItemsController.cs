using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SimpleTODO_API.Data;
using SimpleTODO_API.Models;

namespace SimpleTODO_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoItemsController : ControllerBase
    {
        private readonly SimpleTODO_APIContext _context;
        private readonly UserManager<User> _userManager;

        public TodoItemsController(SimpleTODO_APIContext context, UserManager<User> userManager)
        {
            _context = context;

            _userManager = userManager;
        }

        // GET: api/TodoItems
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<TodoItem>>> GetTodoItem()
        {
            User user = await _userManager.GetUserAsync(HttpContext.User);

            IEnumerable<TodoItem> todos = await _context.TodoItem.Where(t => t.User.Id == user.Id).ToListAsync();

            return Ok(todos);
        } 

        // GET: api/TodoItems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TodoItem>> GetTodoItem(int id)
        {
            var todoItem = await _context.TodoItem.FindAsync(id);

            if (todoItem == null)
            {
                return NotFound();
            }

            return todoItem;
        }



        // PUT: api/TodoItems/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTodoItem(int id, TodoItem todoItem)
        {

            Console.WriteLine("Got a put request");


            if (id != todoItem.TodoItemId)
            {
                Console.WriteLine("id: " + id + ", TodoItemId: " + todoItem.TodoItemId);
                return BadRequest();
            }

            _context.Entry(todoItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TodoItemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/TodoItems
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<TodoItem>> PostTodoItem(TodoItem todoItem)
        {

            User user = await _userManager.GetUserAsync(HttpContext.User);
            todoItem.User = user;

            _context.TodoItem.Add(todoItem);
            await _context.SaveChangesAsync();

            return Ok("Everythings ok!");
            //return CreatedAtAction("GetTodoItem", new { id = todoItem.Id}, todoItem);
        }

        // DELETE: api/TodoItems/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TodoItem>> DeleteTodoItem(int id)
        {
            var todoItem = await _context.TodoItem.FindAsync(id);
            if (todoItem == null)
            {
                return NotFound();
            }

            _context.TodoItem.Remove(todoItem);
            await _context.SaveChangesAsync();

            return todoItem;
        }

        private bool TodoItemExists(int id)
        {
            return _context.TodoItem.Any(e => e.TodoItemId == id);
        }
    }
}
