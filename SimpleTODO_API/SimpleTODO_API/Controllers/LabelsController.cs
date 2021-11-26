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
using SimpleTODO_API.ViewModels;

namespace SimpleTODO_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LabelsController : ControllerBase
    {
        private readonly SimpleTODO_APIContext _context;
        private readonly UserManager<User> _userManager;

        public LabelsController(SimpleTODO_APIContext context, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        // GET: api/Labels
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<LabelVM>>> GetLabel()
        {
            User user = await _userManager.GetUserAsync(HttpContext.User);

            ICollection<UserLabel> userLabels = await _context.UserLabel.Where<UserLabel>(ul => ul.UserId == user.Id).ToListAsync();
            ICollection<LabelVM> labels = new List<LabelVM>();

            foreach(var userLabel in userLabels)
            {
                Label label = await _context.Label.FindAsync(userLabel.LabelId);
                LabelVM labelVM = new LabelVM(label);

                labels.Add(labelVM);
            }


            return Ok(labels);
        }

        /*
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Label>>> GetLabel()
        {
            return await _context.Label.ToListAsync();
        }
        */
        // GET: api/Labels/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Label>> GetLabel(int id)
        {
            var label = await _context.Label.FindAsync(id);

            if (label == null)
            {
                return NotFound();
            }

            return label;
        }

        // PUT: api/Labels/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLabel(int id, Label label)
        {
            if (id != label.LabelId)
            {
                return BadRequest();
            }

            _context.Entry(label).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LabelExists(id))
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

        // POST: api/Labels
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Label>> PostLabel(Label label)
        {
            User user = await _userManager.GetUserAsync(HttpContext.User);
            bool labelExists = await _context.Label.Where<Label>(l => l.Name == label.Name).AnyAsync();
            UserLabel userLabel;

            if (labelExists)
            {
                Label foundLabel = await _context.Label.Where(l => l.Name == label.Name).FirstOrDefaultAsync();
                userLabel = new UserLabel(user, foundLabel);

                _context.UserLabel.Add(userLabel);
                await _context.SaveChangesAsync();

                //return CreatedAtAction("GetLabel", new { id = foundLabel.LabelId }, foundLabel);
                return Ok();
            }

            userLabel = new UserLabel(user, label);
            _context.Label.Add(label);
            _context.UserLabel.Add(userLabel);

            await _context.SaveChangesAsync();

            //return CreatedAtAction("GetLabel", new { id = label.LabelId }, label);
            return Ok();
        }

        [HttpPost("{id}")]
        [Authorize]
        public async Task<ActionResult<Label>> UpdateLabel(int id, Label label)
        {
            if (id != label.LabelId)
            {
                return BadRequest();
            }
            User user = await _userManager.GetUserAsync(HttpContext.User);
            int usageCount = await _context.UserLabel.Where(ul => ul.LabelId == label.LabelId).CountAsync();

            if(usageCount == 1)
            {
                bool labelExists = await _context.Label.Where<Label>(l => l.Name == label.Name).AnyAsync();
                if (labelExists)
                {
                    Label newLabel = await _context.Label.Where<Label>(l => l.Name == label.Name).FirstOrDefaultAsync();
                    UserLabel userLabel = new UserLabel(user, newLabel);
                    UserLabel oldUserLabel = await _context.UserLabel.Where(ul => (ul.LabelId == label.LabelId && ul.UserId == user.Id)).FirstOrDefaultAsync();

                    _context.UserLabel.Remove(oldUserLabel);
                    _context.UserLabel.Add(userLabel);
                    _context.Label.Remove(label);

                    await _context.SaveChangesAsync();
                    return Ok();
                }
                else
                {
                    _context.Entry(label).State = EntityState.Modified;

                    try
                    {
                        await _context.SaveChangesAsync();
                    }
                    catch (DbUpdateConcurrencyException)
                    {
                        if (!LabelExists(id))
                        {
                            return NotFound();
                        }
                        else
                        {
                            throw;
                        }
                    }
                }

            }
            else
            {

                UserLabel toDelete = await _context.UserLabel.Where(ul => (ul.LabelId == label.LabelId && ul.UserId == user.Id)).FirstOrDefaultAsync();

                if (toDelete == null) return NotFound();
                _context.UserLabel.Remove(toDelete);

                bool labelExists = await _context.Label.Where<Label>(l => l.Name == label.Name).AnyAsync();
                UserLabel userLabel;

                if (labelExists)
                {
                    Label foundLabel = await _context.Label.Where(l => l.Name == label.Name).FirstOrDefaultAsync();
                    userLabel = new UserLabel(user, foundLabel);

                    _context.UserLabel.Add(userLabel);
                    await _context.SaveChangesAsync();

                    //return CreatedAtAction("GetLabel", new { id = foundLabel.LabelId }, foundLabel);
                    return Ok();
                }
                Label newLabel = new Label
                {
                    Name = label.Name
                };
                userLabel = new UserLabel(user, newLabel);
                _context.Label.Add(newLabel);
                _context.UserLabel.Add(userLabel);

                await _context.SaveChangesAsync();
            }

            return Ok();
        }



        /*
        // POST: api/Labels
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Label>> PostLabel(Label label)
        {
            _context.Label.Add(label);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetLabel", new { id = label.LabelId }, label);
        } */

        // DELETE: api/Labels/5
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult<Label>> DeleteLabel(int id)
        {
            var label = await _context.Label.FindAsync(id);
            if (label == null)
            {
                return NotFound();
            }

            User user = await _userManager.GetUserAsync(HttpContext.User);
            int usageCount = await _context.UserLabel.Where(ul => ul.LabelId == label.LabelId).CountAsync();

            if(usageCount == 1)
            {
                _context.Label.Remove(label);
                await _context.SaveChangesAsync();
                return label;
            }
            else
            {
                UserLabel userLabel = await _context.UserLabel.Where(ul => (ul.LabelId == label.LabelId && ul.UserId == user.Id)).FirstOrDefaultAsync();
                _context.UserLabel.Remove(userLabel);
                await _context.SaveChangesAsync();
                return Ok();
            }
        }

        /*
        // DELETE: api/Labels/5
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult<Label>> DeleteLabel(int id)
        {
            var label = await _context.Label.FindAsync(id);
            if (label == null)
            {
                return NotFound();
            }

            _context.Label.Remove(label);
            await _context.SaveChangesAsync();

            return label;
        } */

        private bool LabelExists(int id)
        {
            return _context.Label.Any(e => e.LabelId == id);
        }
    }
}
