namespace Supernova.Api.Data
{
    public class RaceProfile
    {
        public float GrowthRate { get; set; }
        public float GravityCenter { get; set; }
        public float GravityWidth { get; set; }
        public bool GravityImmune { get; set; }
        public float TemperatureCenter { get; set; }
        public float TemperatureWidth { get; set; }
        public bool TemperatureImmune { get; set; }
        public float RadiationCenter { get; set; }
        public float RadiationWidth { get; set; }
        public bool RadiationImmune { get; set; }
    }
}