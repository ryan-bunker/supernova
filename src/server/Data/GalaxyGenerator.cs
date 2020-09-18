using System;
using System.Collections.Immutable;
using System.Threading.Tasks;
using SupernovaApi;

namespace Supernova.Api.Data
{
    public class GalaxyGenerator
    {
        private readonly Random _rand;
        private readonly ImmutableList<string> _adjectives;
        private readonly ImmutableList<string> _nouns;
        private readonly long _sectorSize;
        private readonly double _starDensity;

        public GalaxyGenerator(Random rand, ImmutableList<string> adjectives, ImmutableList<string> nouns, long sectorSize, double starDensity)
        {
            _rand = rand;
            _adjectives = adjectives;
            _nouns = nouns;
            _sectorSize = sectorSize;
            _starDensity = starDensity;
        }

        public async Task GenerateSector(long x, long y, UniverseContext dbContext)
        {
            // each sector has +/-10% of _starDensity
            var count = Math.Floor(_rand.NextDouble() * 2 * _starDensity * 0.1 + _starDensity * 0.9);
            for (int i = 0; i < count; i++)
            {
                var star = GenerateStar(x, y);
                await dbContext.Stars.AddAsync(star);
            }

            await dbContext.SaveChangesAsync();
        }

        public Star GenerateStar(long sectorX, long sectorY)
        {
            var adj = _rand.Pick(_adjectives);
            var noun = _rand.Pick(_nouns);
            var star = new Star
            {
                Id = Guid.NewGuid(),
                Name = $"{adj} {noun}",
                X = _rand.NextLong(_sectorSize),
                Y = _rand.NextLong(_sectorSize),
                SectorX = sectorX,
                SectorY = sectorY,
            };

            var planetCount = _rand.Next(11);
            long currentR = 10_000_000_000;
            // venus = 108.09        108.09
            // earth = 150.61        42.52
            // mars = 209.46         58.85
            // a.belt = 403.5        194.04
            // jupiter = 768.63      365.13
            // saturn = 1493.7       725.07
            // uranus = 1839.2       345.5
            // neptune = 4476.3      2637.1
            // pluto = 5910          1433.7
            // 656.67 (42.52 - 2637.1)
            // 40 - 2000
            for (int i = 0; i < planetCount; i++)
            {
                var p = new Planet
                {
                    Id = Guid.NewGuid(),
                    StarId = star.Id,
                    Name = $"{star.Name} {i.ToRomanNumerals()}",
                    R = currentR + _rand.NextLong(40_000_000_000, 2_000_000_000_000),
                    Phi = (float) (_rand.NextDouble() * 2 * Math.PI),
                    Year = (float) (_rand.NextDouble() * 0.8 + 0.2)
                };
                currentR = p.R;
                star.Planets.Add(p);
            }

            return star;
        }
    }
}