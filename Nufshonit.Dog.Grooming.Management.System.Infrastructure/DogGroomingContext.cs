using Microsoft.EntityFrameworkCore;
using Nufshonit.Dog.Grooming.Management.System.Domain.Models;
using System.Collections;

namespace YourNamespace.Infrastructure.Data
{
    public class DogGroomingContext : DbContext
    {
        public DogGroomingContext(DbContextOptions<DogGroomingContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<BarberQueue> BarberQueues { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(u => u.Id);
                entity.Property(u => u.UserName);
                entity.Property(u => u.PasswordHash);
                entity.Property(u => u.FirstName);
                entity.Property(u => u.CreatedDate);
            });

            modelBuilder.Entity<BarberQueue>(entity =>
            {
                entity.HasKey(u => u.Id);
                entity.Property(u => u.CreatedByUserId);
                entity.Property(u => u.CreatedDate);
                entity.Property(u => u.ArrivalTime);
                entity.Property(u => u.CustomerName);
            });
        }
    }
}
