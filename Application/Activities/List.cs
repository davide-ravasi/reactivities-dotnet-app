using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

/*
Think of it like a module in JavaScript—it groups related classes and functionality together. This namespace contains logic related to "Activities" in the application.
*/
namespace Application.Activities
{
    // The List class contains the query and handler for listing activities
    // This class encapsulates the logic for querying the list of activities.
    public class List
    {
        // The Query class represents the query to list activities
        // It implements IRequest<List<Activity>> from MediatR
        // This tells MediatR that this query expects a response in the form of a List<Activity>
        // Equivalent to defining an interface in JavaScript that describes a function's input and output.
        public class Query : IRequest<List<Activity>> { }

        // The Handler class handles the Query request
        // It implements IRequestHandler<Query, List<Activity>> from MediatR
        public class Handler : IRequestHandler<Query, List<Activity>>
        {
            // Private field to hold the DataContext instance
            // In React, we pass data down to components via props. In C#, dependencies are passed into the class using constructor parameters.
            // In C#, DataContext is like your global state manager, enabling interaction with a database.
            private readonly DataContext _context;

            // Constructor to initialize the DataContext via dependency injection
            public Handler(DataContext context)
            {
                _context = context;
            }

            // Method to handle the Query request
            // It returns a Task<List<Activity>> and uses the DataContext to query the database
            public async Task<List<Activity>> Handle(Query request, CancellationToken cancellationToken)
            {
                // Asynchronously query the Activities table and return the result as a list
                return await _context.Activities.ToListAsync();
            }
        }
    }
}

/*
How It All Fits Together ------------------
--A client (e.g., a web request) sends a Query object asking for the list of activities.

--MediatR routes this query to the Handler class.

--The Handler:
-----Uses the DataContext to query the database.
-----Returns the list of activities to the client.

Comparison to React ------------------
DataContext: Similar to a global state manager or a service that provides data to your components.
Constructor: Similar to passing props or using context to provide dependencies to your components.
Handle Method: Similar to making an API call to fetch data and then updating the state with the fetched data.
MediatR: Similar to middleware that intercepts actions and routes them to the appropriate handlers.
*/