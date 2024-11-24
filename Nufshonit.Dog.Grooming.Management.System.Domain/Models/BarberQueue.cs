using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Nufshonit.Dog.Grooming.Management.System.Domain.Models
{
    public class BarberQueue : BaseEntity
    {
        public string? CustomerName { get; set; }
        public DateTime? ArrivalTime { get; set; }
        public long? CreatedByUserId { get; set; }
    }
}
