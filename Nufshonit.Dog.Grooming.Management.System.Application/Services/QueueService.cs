using Nufshonit.Dog.Grooming.Management.System.Application.Services.Interfaces;
using Nufshonit.Dog.Grooming.Management.System.Infrastructure.Repositories.Interfaces;

namespace Nufshonit.Dog.Grooming.Management.System.Application.Services
{
    public class QueueService : IQueueService
    {
        private readonly IQueueRepository _queueRepository;

        public QueueService(IQueueRepository queueRepository)
        {
            _queueRepository = queueRepository;
        }

        public async Task<BarberQueueDto> Add(BarberQueueDto BarberQueueDto)
        {
            return await _queueRepository.Add(BarberQueueDto);
        }

        public async Task<bool> Delete(long id)
        {
            return await _queueRepository.Delete(id);
        }

        public async Task<List<BarberQueueDto>> Get(BarberQueueDto BarberQueueDto)
        {

            return await _queueRepository.Get(BarberQueueDto);
        }

        public async Task<List<BarberQueueDto>> GetByFilters(BarberQueueDto barberQueueDto)
        {
            return await _queueRepository.GetByFilters(barberQueueDto);
        }

        public async Task<BarberQueueDto> Update(BarberQueueDto BarberQueueDto)
        {
            return await _queueRepository.Update(BarberQueueDto);
        }

    }
}
