namespace Supernova.Api.Configuration
{
    public class GameConfiguration
    {
        public long SectorSize { get; set; }
        public long StarDensity { get; set; }
        public float GravityMin { get; set; }
        public float GravityMax { get; set; }
        public int GravityPrecision { get; set; }
        public float TemperatureMin { get; set; }
        public float TemperatureMax { get; set; }
        public int TemperaturePrecision { get; set; }
        public float RadiationMin { get; set; }
        public float RadiationMax { get; set; }
        public int RadiationPrecision { get; set; }
    }
}