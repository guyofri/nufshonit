using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Nufshonit.Dog.Grooming.Management.System.Application.Services.Interfaces;
using System.Security.Claims;

namespace Nufshonit.Dog.Grooming.Management.System.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class QueueController : ControllerBase
    {

        private readonly IQueueService _queueService;
        public QueueController(IQueueService queueService)
        {
            _queueService = queueService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery]BarberQueueDto barberQueueDto)
        {
            barberQueueDto.CreatedByUserId = long.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            return Ok(await _queueService.Get(barberQueueDto));
        }

        [HttpGet("filters")]
        public async Task<IActionResult> GetByFilters([FromQuery] BarberQueueDto barberQueueDto)
        {
            barberQueueDto.CreatedByUserId = long.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            return Ok(await _queueService.GetByFilters(barberQueueDto));
        }

        [HttpPost]
        public async Task<IActionResult> Add(BarberQueueDto BarberQueueDto)
        {
            BarberQueueDto.CreatedByUserId = long.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            return Ok(await _queueService.Add(BarberQueueDto));
        }

        [HttpPatch]
        public async Task<IActionResult> Update(BarberQueueDto BarberQueueDto)
        {
           return Ok(await _queueService.Update(BarberQueueDto));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            return Ok(await _queueService.Delete(id));
        }
    }

}
