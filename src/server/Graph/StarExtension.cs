using System.Linq;
using HotChocolate;
using HotChocolate.Types;
using Supernova.Api.Data;

namespace Supernova.Api.Graph
{
    [ExtendObjectType(Name = "Star")]
    public class StarExtension
    {
        public IQueryable<Planet> GetPlanets([Parent] Star star, [Service] UniverseContext dbContext) =>
            dbContext.Planets.Where(p => p.StarId == star.Id);

    }
}