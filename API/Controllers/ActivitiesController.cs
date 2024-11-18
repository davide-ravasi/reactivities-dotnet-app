using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {
        private readonly DataContext _context;
        // DataContext will be injected into the constructor
        // This is called dependency injection
        //  when an http request commes in, the controller will be created and the DataContext will be injected into it
        public ActivitiesController(DataContext context)
        {
            _context = context;

        }

        [HttpGet] //endpoint api/activities and it will return a list of activities
        public async Task<ActionResult<List<Activity>>> GetActivities()
        {
            return await _context.Activities.ToListAsync();
        }

        [HttpGet("{id}")] //endpoint api/activities/id and it will return a single activity
        public async Task<ActionResult<Activity>> GetActivity(Guid id)
        {
            return await _context.Activities.FindAsync(id);
        }
    }
}

// EF Core is an object-relational mapper (O/RM) that enables .NET developers to work with a database using .NET objects. It eliminates the need for most of the data-access code that developers usually need to write.
// ToListAsync() is an extension method that executes the query and returns a list of the results from EF Core
// FindAsync() is an extension method that finds an entity with the given primary key values. Returns the found entity or null if not found.