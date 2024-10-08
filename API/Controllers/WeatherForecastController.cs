using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController] // This attribute indicates that the class defines an API controller that responds to HTTP requests
[Route("[controller]")] // [controller] is a token that is replaced by the controller class name minus the "Controller" suffix
public class WeatherForecastController : ControllerBase  // ControllerBase is a base class for an MVC controller without view support because we use React for the view
{
    private static readonly string[] Summaries = new[]
    {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

    private readonly ILogger<WeatherForecastController> _logger;

    public WeatherForecastController(ILogger<WeatherForecastController> logger)
    {
        _logger = logger;
    }

    [HttpGet(Name = "GetWeatherForecast")] // This attribute indicates that the method will respond to HTTP GET requests, it defined an endpoint
    public IEnumerable<WeatherForecast> Get()
    {
        return Enumerable.Range(1, 5).Select(index => new WeatherForecast
        {
            Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            TemperatureC = Random.Shared.Next(-20, 55),
            Summary = Summaries[Random.Shared.Next(Summaries.Length)]
        })
        .ToArray();
    }
}
