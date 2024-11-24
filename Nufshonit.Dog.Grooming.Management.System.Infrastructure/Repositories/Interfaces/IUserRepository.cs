using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Nufshonit.Dog.Grooming.Management.System.Infrastructure.Repositories.Interfaces
{
    public interface IUserRepository
    {
        public Task<bool> AddUser(UserDto userDto);
        Task<UserDto> GetUser(UserDto userDto);
    }
}
