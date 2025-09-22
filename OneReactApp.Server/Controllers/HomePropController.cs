using Microsoft.AspNetCore.Mvc;

namespace OneReactApp.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HomePropController : ControllerBase
    {
        private static readonly string[] UserStaes = new[]
        {
            "Happy", "Not bad", "sad", "Cool", "Mild", "Warm"
        };



        private readonly ILogger<HomePropController> _logger;

        public HomePropController(ILogger<HomePropController> logger)
        {
            _logger = logger;
        }

        [HttpGet(Name = "GetHomeProp")]
        public IEnumerable<HomeProp> Get()
        {
            return Enumerable.Range(1, 5).Select(index => new HomeProp
            {
                UserId = DateOnly.FromDateTime(DateTime.Now.AddDays(index)).Day,
                UserName = DateOnly.FromDateTime(DateTime.Now.AddDays(index)).ToString(),
                UserState = UserStaes[Random.Shared.Next(UserStaes.Length)]
            })
            .ToArray();
        }
    }

}
