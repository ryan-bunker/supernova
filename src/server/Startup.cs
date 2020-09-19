using System;
using System.Collections.Immutable;
using System.IO;
using HotChocolate;
using HotChocolate.AspNetCore;
using HotChocolate.Execution.Configuration;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Supernova.Api.Data;
using Supernova.Api.Graph;

namespace Supernova.Api
{
    public class Startup
    {
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            var adjectives = File.ReadAllLines("Data/adjectives.txt");
            var nouns = File.ReadAllLines("Data/nouns.txt");
            
            services.AddSingleton(new GalaxyGenerator(
                new Random(1234),
                adjectives.ToImmutableList(),
                nouns.ToImmutableList(),
                30_860_000_000_000_000, 10));

            services.AddCors();
            
            services
                .AddDbContext<UniverseContext>()
                .AddGraphQL(
                        SchemaBuilder.New()
                            .AddQueryType<Query>()
                            .Create(),
                    new QueryExecutionOptions {ForceSerialExecution = true});
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            using (var db = new UniverseContext())
                db.Database.EnsureCreated();
            
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            
            app.UseCors(o => o
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowAnyOrigin());

            app.UseRouting();

            app.UseGraphQL()
                .UsePlayground();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapGet("/", async context =>
                {
                    await context.Response.WriteAsync("Hello World!");
                });
            });
        }
    }
}
