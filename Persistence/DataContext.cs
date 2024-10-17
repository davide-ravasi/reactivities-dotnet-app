using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : DbContext
    {
        // Constructor
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        // [DbSet] is a collection of entities that can be queried from the database. 
        // [Activity] is the entity class that represents the data in the database. 
        // [Activities] is the name of the table in the database.
        public DbSet<Activity> Activities { get; set; }
    }
}

// [DbContext] is a class that represents a session with the database and can be used to query and save instances of your entities.

// [DbContextOptions] is a class that is used to configure the context.