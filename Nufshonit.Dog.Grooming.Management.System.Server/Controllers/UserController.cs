using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Nufshonit.Dog.Grooming.Management.System.Application.Services.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

[Route("api/[controller]")]
[ApiController]
public class UserController : ControllerBase
{
    private readonly IConfiguration _config;
    private readonly IUserService _userService;

    public UserController(IConfiguration config, IUserService userService)
    {
        _config = config;
        _userService = userService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(UserDto userDto)
        => Ok(await _userService.AddUser(userDto));
    

    [HttpPost("login")]
    public async Task<IActionResult> Login(UserDto userDto)
    {
       

        return Ok(await _userService.GetUser(userDto));

        
    }

   
}
