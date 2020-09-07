using System;

namespace Supernova.Api.Data
{
    public sealed class Planet
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public float R { get; set; }
        public float Phi { get; set; }
        public float Year { get; set; }
        
        public Guid StarId { get; set; }
        public Star Star { get; set; }
    }
}