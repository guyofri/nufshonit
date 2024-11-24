using Nufshonit.Dog.Grooming.Management.System.Application.Services.Interfaces;
using Nufshonit.Dog.Grooming.Management.System.Infrastructure.Repositories.Interfaces;

namespace Nufshonit.Dog.Grooming.Management.System.Application.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        public UserService(IUserRepository? userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<bool> AddUser(UserDto userDto)
        {
            return await _userRepository.AddUser(userDto);
        }

        public async Task<UserDto> GetUser(UserDto userDto)
        {

            return await _userRepository.GetUser(userDto);
        }
    }
}
