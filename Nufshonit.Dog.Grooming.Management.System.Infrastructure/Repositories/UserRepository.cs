using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Nufshonit.Dog.Grooming.Management.System.Infrastructure.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using YourNamespace.Infrastructure.Data;

namespace Nufshonit.Dog.Grooming.Management.System.Infrastructure.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly IDbContextFactory<DogGroomingContext> _contextFactory;

        private readonly IConfiguration _config;

        public UserRepository(IDbContextFactory<DogGroomingContext> context, IConfiguration config)
        {
            _contextFactory = context;
            _config = config;
        }

        public async Task<bool> AddUser(UserDto userDto)
        {
            try
            {
                using var context = _contextFactory.CreateDbContext();
                if (await context.Users.FirstOrDefaultAsync(u => u.UserName == userDto.UserName) != null)
                    return false;

                var user = new User
                {
                    UserName = userDto.UserName,
                    FirstName = userDto.FirstName,
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword(userDto.Password)
                };

                context.Users.Add(user);
                await context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {

                throw;
            }
           
        }

        public async Task<UserDto> GetUser(UserDto userDto)
        {
            try
            {
                using var context = _contextFactory.CreateDbContext();
                var user = await context.Users.FirstOrDefaultAsync(u => u.UserName == userDto.UserName);
            if (user == null || !BCrypt.Net.BCrypt.Verify(userDto.Password, user.PasswordHash))
                return null;

            var token = GenerateJwtToken(user);
            userDto.FirstName = user.FirstName;
            userDto.Token = token;
                userDto.Id = user.Id;
            return userDto;
            }
            catch (Exception ex)
            {

                throw;
            }
          
        }

        private string GenerateJwtToken(User user)
        {
            var claims = new[]
            {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Name, user.UserName)
        };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            //var token = new JwtSecurityToken(
            //    _config["Jwt:Issuer"],
            //    _config["Jwt:Issuer"],
            //    claims,
            //    expires: DateTime.Now.AddDays(1),
            //    signingCredentials: creds);

            var token = new JwtSecurityToken(
            issuer: _config["Jwt:Issuer"],
            audience: _config["Jwt:Audience"],
            claims: claims,
            expires: DateTime.Now.AddMinutes(30),
            signingCredentials: creds
        );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
