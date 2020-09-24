using System;
using System.Diagnostics;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Supernova.Api.Configuration;
using Supernova.Api.Data;

namespace Supernova.Api
{
    public class GameUpdate
    {
        private readonly UniverseContext _dbContext;
        private readonly GameConfiguration _gameConfig;

        public GameUpdate(UniverseContext dbContext, GameConfiguration gameConfig)
        {
            _dbContext = dbContext;
            _gameConfig = gameConfig;
        }

        public async Task Run(CancellationToken cancellationToken)
        {
            var lastTimestamp = Stopwatch.GetTimestamp();
            
            while (!cancellationToken.IsCancellationRequested)
            {
                var ts = Stopwatch.GetTimestamp();
                var elapsedSeconds = (ts - lastTimestamp) / (float)Stopwatch.Frequency;
                lastTimestamp = ts;
                
                await foreach (var player in _dbContext.Players.Include(p => p.Planets).AsAsyncEnumerable()
                    .WithCancellation(cancellationToken))
                {
                    foreach (var planet in player.Planets)
                    {
                        var hab = Habitability(
                            planet.Gravity, planet.Temperature, planet.Radiation,
                            player.Race.GravityCenter, player.Race.TemperatureCenter, player.Race.RadiationCenter,
                            player.Race.GravityWidth, player.Race.TemperatureWidth, player.Race.RadiationWidth);

                        planet.Population += (int)Math.Round(planet.Population * player.Race.GrowthRate * hab * elapsedSeconds / 60);

                        planet.Surface.Ironium += (int)(planet.Mines * 100 * planet.Concentration.Ironium * elapsedSeconds / 60);
                        planet.Surface.Germanium += (int)(planet.Mines * 100.0 * planet.Concentration.Germanium * elapsedSeconds / 60);
                        planet.Surface.Boranium += (int)(planet.Mines * 100.0 * planet.Concentration.Boranium * elapsedSeconds / 60);
                    }
                }

                await _dbContext.SaveChangesAsync(cancellationToken);

                var remain = 1 - (Stopwatch.GetTimestamp() - lastTimestamp) / (float) Stopwatch.Frequency;
                if (remain > 0)
                    await Task.Delay(TimeSpan.FromSeconds(remain), cancellationToken);
            }
        }

        private float Habitability(float g, float t, float r, float gc, float tc, float rc, float gw, float tw,
            float rw)
        {
            // scale values
            g = Math.Abs(g - gc) / gw;
            t = Math.Abs(t - tc) / tw;
            r = Math.Abs(r - rc) / rw;

            var x = Math.Max(0, g - 0.5f);
            var y = Math.Max(0, t - 0.5f);
            var z = Math.Max(0, r - 0.5f);

            return (float) (Math.Sqrt((1 - g) * (1 - g) + (1 - t) * (1 - t) + (1 - r) * (1 - r)) *
                ((1 - x) * (1 - y) * (1 - z)) / Math.Sqrt(3));
        }
    }
}