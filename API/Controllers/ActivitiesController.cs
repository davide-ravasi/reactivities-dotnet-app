using Application.Activities;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActivitiesController : BaseApiController
    {
        [HttpGet] //endpoint api/activities and it will return a list of activities
        public async Task<ActionResult<List<Activity>>> GetActivities()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")] //endpoint api/activities/id and it will return a single activity
        public async Task<ActionResult<Activity>> GetActivity(Guid id)
        {
            return await Mediator.Send(new Details.Query { Id = id });
        }

        [HttpPost] //endpoint api/activities and it will create a new activity
        public async Task<IActionResult> CreateActivity(Activity activity)
        {
            await Mediator.Send(new Create.Command { Activity = activity });
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity(Guid id, Activity activity)
        {
            activity.Id = id;
            await Mediator.Send(new Edit.Command { Activity = activity });
            return NoContent();
        }
    }
}

// EF Core is an object-relational mapper (O/RM) that enables .NET developers to work with a database using .NET objects. It eliminates the need for most of the data-access code that developers usually need to write.
// ToListAsync() is an extension method that executes the query and returns a list of the results from EF Core
// FindAsync() is an extension method that finds an entity with the given primary key values. Returns the found entity or null if not found.

// In C#, DataContext is like your global state manager, enabling interaction with a database.

// In React, we pass data down to components via props. In C#, dependencies are passed into the class using constructor parameters.