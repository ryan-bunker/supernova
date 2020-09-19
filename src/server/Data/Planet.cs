using System;

namespace Supernova.Api.Data
{
    public class Planet
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public long R { get; set; }
        public float Phi { get; set; }
        public float Year { get; set; }
        
        public Guid StarId { get; set; }
        public virtual Star Star { get; set; }
    }
}