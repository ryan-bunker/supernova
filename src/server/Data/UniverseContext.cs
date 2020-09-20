using Microsoft.EntityFrameworkCore;

namespace Supernova.Api.Data
{
    public class UniverseContext : DbContext
    {
        public DbSet<Star> Stars { get; set; }
        public DbSet<Planet> Planets { get; set; }
        public DbSet<PlanetMeta> PlanetMetas { get; set; }
        public DbSet<Ship> Ships { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder options) =>
            options.UseSqlite("Data Source=universe.db");

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Star>()
                .HasMany(t => t.Planets)
                .WithOne(t => t.Star)
                .HasForeignKey(t => t.StarId);

            modelBuilder.Entity<Star>()
                .HasIndex(t => new {t.SectorX, t.SectorY});

            modelBuilder.Entity<Planet>()
                .HasOne<PlanetMeta>()
                .WithOne()
                .HasForeignKey<PlanetMeta>(t => t.PlanetId);

            modelBuilder.Entity<PlanetMeta>()
                .HasKey(t => t.PlanetId);
                
            modelBuilder.Entity<PlanetMeta>()
                .OwnsOne(t => t.Surface);
            modelBuilder.Entity<PlanetMeta>()
                .OwnsOne(t => t.Concentration);

            modelBuilder.Entity<Player>()
                .HasMany<Ship>()
                .WithOne()
                .HasForeignKey(t => t.PlayerId);
            modelBuilder.Entity<Player>()
                .HasMany<PlanetMeta>()
                .WithOne()
                .HasForeignKey(t => t.OwnerId);

            modelBuilder.Entity<Ship>()
                .OwnsOne(t => t.LocationPoint);
        }
    }
}