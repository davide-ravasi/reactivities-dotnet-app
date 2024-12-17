using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Create
    {
        public class Command : IRequest
        {
            public Activity Activity { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                // entity framework will track the changes and save it to the database
                // but it will not save it to the database until we call save changes
                // so no need to be async
                _context.Activities.Add(request.Activity);

                // save changes will return the number of changes  
                // that have been saved to the database
                await _context.SaveChangesAsync();
            }
        }

    }
}