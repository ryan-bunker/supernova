using System;
using System.Linq;
using System.Threading.Tasks;
using HotChocolate;
using HotChocolate.Types;
using Microsoft.EntityFrameworkCore;
using Supernova.Api.Data;

namespace Supernova.Api.Graph
{
    public class Query
    {
        [UseSelection]
        public IQueryable<Star> GetStars([Service] UniverseContext dbContext) => dbContext.Stars;

        [UseSelection]
        public async Task<IQueryable<Star>> GetSectorsAsync(long sxMin, long syMin, long sxMax, long syMax,
            [Service] UniverseContext dbContext, [Service] GalaxyGenerator generator)
        {
            var existingSectors = (
                from s in dbContext.Stars
                where s.SectorX >= sxMin && s.SectorX <= sxMax && s.SectorY >= syMin && s.SectorY <= syMax
                group s by new {s.SectorX, s.SectorY}
                into g
                select new {g.Key.SectorX, g.Key.SectorY}).ToHashSet();
            for (long sx = sxMin; sx <= sxMax; ++sx)
                for (long sy =syMin; sy<=syMax; ++sy)
                    if (!existingSectors.Contains(new {SectorX = sx, SectorY = sy}))
                        await generator.GenerateSector(sx, sy, dbContext);
                    
            return dbContext.Stars
                .Where(s =>
                s.SectorX >= sxMin && s.SectorX <= sxMax && s.SectorY >= syMin && s.SectorY <= syMax);
        }

        [UseSelection, UseFiltering]
        public IQueryable<PlanetMeta> GetPlanetMeta([Service] UniverseContext dbContext) => dbContext.PlanetMetas;
    }
}