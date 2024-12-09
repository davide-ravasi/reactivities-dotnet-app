using Application.Activities;
using Microsoft.EntityFrameworkCore;
using Persistence;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<DataContext>(opt =>
{
  opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddCors(opt =>
{
  opt.AddPolicy("CorsPolicy", policy =>
  {
    policy.AllowAnyMethod().AllowAnyHeader().WithOrigins("http://localhost:3000");
  });
});

builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(List.Handler).Assembly));

var app = builder.Build();

// Configure the HTTP request pipeline.
// it's like a middleware
// things that are added here are executed in the order they are added
// in an incoming request or outcoming request
// the order is important
if (app.Environment.IsDevelopment())
{
  app.UseSwagger();
  app.UseSwaggerUI();
}

// app.UseHttpsRedirection();

app.UseCors("CorsPolicy");

app.UseAuthorization();

/*
It maps attribute-routed controllers to the request pipeline. 
This means it sets up the routing for controllers 
that use attributes like 
[Route], 
[HttpGet], 
[HttpPost], 
etc., 
to define their routes.
*/
app.MapControllers();

// Create a new scope for dependency injection
// this is a way to manage the lifetime of the services
// using means that the scope will be disposed of after the block of code is executed
// and clean up for memory
using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;

try
{
  // Retrieve the DataContext service
  var context = services.GetRequiredService<DataContext>();

  // Apply any pending migrations to the database
  await context.Database.MigrateAsync();


  // Seed the database with data
  await Seed.SeedData(context);
}
catch (Exception ex)
{
  // Retrieve the logger service
  var logger = services.GetRequiredService<ILogger<Program>>();

  // Log the error that occurred during migration
  logger.LogError(ex, "An error occurred during migration");
}

app.Run();




/*
- to see the database:
  command palette -> sqlite: open database
  then select the database file


- use dotnet watch --no-hot-reload run to run the application in watch mode
  because hot reload doesn't work well with EF migrations and
  even if there are changes in the code, sometimes it doesn't reflect in the browser

*/
