using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController] // This attribute indicates that the class defines an API controller that responds to HTTP requests
    [Route("api/[controller]")] // [controller] is a token that is replaced by the controller class name minus the "Controller" suffix
    public class BaseApiController : ControllerBase  // ControllerBase is a base class for an MVC controller without view support because we use React for the view
    {

    }
}