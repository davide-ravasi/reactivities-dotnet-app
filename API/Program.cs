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

app.Run();
