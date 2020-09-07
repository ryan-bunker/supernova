using Microsoft.EntityFrameworkCore;

namespace Supernova.Api.Data
{
    public class UniverseContext : DbContext
    {
        public DbSet<Star> Stars { get; set; }
        public DbSet<Planet> Planets { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder options) =>
            options.UseSqlite("Data Source=universe.db");
    }
}