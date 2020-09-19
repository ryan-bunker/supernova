using System;

namespace Supernova.Api.Data
{
    public class PlanetMeta
    {
        public Guid PlanetId { get; set; }
        public float Gravity { get; set; }
        public float Temperature { get; set; }
        public float Radiation { get; set; }
        public Minerals Surface { get; set; }
        public Minerals Concentration { get; set; }
        public int Factories { get; set; }
        public int Mines { get; set; }
        public int Population { get; set; }
    }
}