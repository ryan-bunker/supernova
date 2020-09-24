using System.Collections;
using System.Collections.Generic;

namespace Supernova.Api.Data
{
    public class Player
    {
        public long Id { get; set; }
        public RaceProfile Race { get; set; }
        
        public ICollection<PlanetMeta> Planets { get; } = new List<PlanetMeta>();
    }
}