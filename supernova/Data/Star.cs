using System;
using System.Collections.Generic;
using HotChocolate;

#nullable disable

namespace Supernova.Api.Data
{
    public class Star
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public long X { get; set; }
        public long Y { get; set; }
        public long SectorX { get; set; }
        public long SectorY { get; set; }

        public virtual ICollection<Planet> Planets { get; set; }
    }
}