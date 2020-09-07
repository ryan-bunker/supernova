using System;
using System.Collections.Generic;

namespace Supernova.Api.Data
{
    public class Star
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public double X { get; set; }
        public double Y { get; set; }
        public int SectorX { get; set; }
        public int SectorY { get; set; }
        
        public List<Planet> Planets { get; } = new List<Planet>();
    }
}