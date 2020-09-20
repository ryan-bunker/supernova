using System;

namespace Supernova.Api.Data
{
    public class Ship
    {
        public long Id { get; set; }
        public long PlayerId { get; set; }
        
        // location
        public Guid? LocationStar { get; set; }
        public Guid? LocationPlanet { get; set; }
        public PointLocation? LocationPoint { get; set; }
    }

    public class PointLocation
    {
        public long X { get; set; }
        public long Y { get; set; }
        public long SectorX { get; set; }
        public long SectorY { get; set; }
    }
}