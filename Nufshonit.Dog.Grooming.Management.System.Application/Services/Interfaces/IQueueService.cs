using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Nufshonit.Dog.Grooming.Management.System.Application.Services.Interfaces
{
    public interface IQueueService
    {
        public Task<BarberQueueDto> Add(BarberQueueDto BarberQueueDto);
        public Task<BarberQueueDto> Update(BarberQueueDto BarberQueueDto);
        public Task<bool> Delete(long id);
        public Task<List<BarberQueueDto>> Get(BarberQueueDto BarberQueueDto);
        public Task<List<BarberQueueDto>> GetByFilters(BarberQueueDto barberQueueDto);
    }
}
