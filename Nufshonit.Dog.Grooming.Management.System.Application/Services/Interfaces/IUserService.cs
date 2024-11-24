using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Nufshonit.Dog.Grooming.Management.System.Application.Services.Interfaces
{
    public interface IUserService
    {
        public Task<bool> AddUser(UserDto userDto);
        public Task<UserDto> GetUser(UserDto userDto);
    }
}
