using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Nufshonit.Dog.Grooming.Management.System.Domain.Models;
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
    public class QueueRepository : IQueueRepository
    {

        private readonly DogGroomingContext _context;
        private readonly IConfiguration _config;

        public QueueRepository(DogGroomingContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        public async Task<BarberQueueDto> Add(BarberQueueDto BarberQueueDto)
        {
            try
            {
                var queueEntry = new BarberQueue
                {
                    CustomerName = BarberQueueDto.CustomerName,
                    ArrivalTime = BarberQueueDto.ArrivalTime,
                    CreatedByUserId = BarberQueueDto.CreatedByUserId,
                    CreatedDate = DateTime.Now
                };

                await _context.BarberQueues.AddAsync(queueEntry);
                await _context.SaveChangesAsync();

                return new BarberQueueDto { Id = queueEntry.Id, CreatedByUserId = queueEntry.CreatedByUserId, ArrivalTime = queueEntry.ArrivalTime, CustomerName = queueEntry.CustomerName};
            }
            catch (Exception ex)
            {

                throw;
            }
           
        }

        public async Task<List<BarberQueueDto>> Get(BarberQueueDto BarberQueueDto)
        {
            //var queues = await _context.BarberQueues
            //                     //    .Where(q => q.CreatedByUserId == BarberQueueDto.CreatedByUserId)
            //                         .ToListAsync();


            var dtos = new List<BarberQueueDto>();
            FormattableString formattableString = $"exec GetAllQueues";

            var queues = await _context.Database
                .SqlQuery<BarberQueue>(formattableString)
                .ToListAsync();


            foreach (var queue in queues)
                dtos.Add(new BarberQueueDto { CustomerName = queue.CustomerName, ArrivalTime = queue.ArrivalTime, CreatedByUserId = queue.CreatedByUserId, Id = queue.Id , CreatedDate = queue.CreatedDate});

            return dtos;
        }

        public async Task<List<BarberQueueDto>> GetByFilters(BarberQueueDto BarberQueueDto)
        {
            var queues =  _context.BarberQueues.AsNoTracking();
            if (!BarberQueueDto.CustomerName.IsNullOrEmpty())
                queues = queues.Where(q => q.CustomerName == BarberQueueDto.CustomerName);

            if (BarberQueueDto.FromCreatedDate != null)
                queues = queues.Where(q => q.CreatedDate >= BarberQueueDto.FromCreatedDate);

            if (BarberQueueDto.ToCreatedDate != null)
                queues = queues.Where(q => q.CreatedDate <= BarberQueueDto.ToCreatedDate);


            var list = await queues.ToListAsync();

            var dtos = new List<BarberQueueDto>();
            foreach (var queue in list)
                dtos.Add(new BarberQueueDto { CustomerName = queue.CustomerName, ArrivalTime = queue.ArrivalTime, CreatedByUserId = queue.CreatedByUserId, Id = queue.Id, CreatedDate = queue.CreatedDate });

            return dtos;
        }

        public async Task<BarberQueueDto> Update(BarberQueueDto barberQueueDto)
        {
            var queue = await _context.BarberQueues.FindAsync(barberQueueDto.Id);
            if (queue == null) 
                return null;

            queue.CustomerName = barberQueueDto.CustomerName;
            queue.ArrivalTime = barberQueueDto.ArrivalTime;

            await _context.SaveChangesAsync();
            return new BarberQueueDto { Id = queue.Id, CreatedByUserId = queue.CreatedByUserId, ArrivalTime = queue.ArrivalTime, CustomerName = queue.CustomerName };
        }

        public async Task<bool> Delete(long id)
        {
            var queue = await _context.BarberQueues.FindAsync(id);
            if (queue == null) return false;

            _context.BarberQueues.Remove(queue);
            await _context.SaveChangesAsync();
            return true;
        }

        
    }
}
