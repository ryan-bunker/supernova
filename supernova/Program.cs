using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Supernova.Api.Data;

namespace Supernova.Api
{
    public static class Program
    {
        public static void Main(string[] args)
        {
            var cts = new CancellationTokenSource();
            
            CreateHostBuilder(args)
                .Build()
                .SpawnGameUpdateLoop(cts.Token, out var updateTask)
                .Run();

            Console.WriteLine("Shutting down...");
            cts.Cancel();
            updateTask.Wait();
            Console.WriteLine("Finished");
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });

        public static IHost SpawnGameUpdateLoop(this IHost host, CancellationToken cancellationToken, out Task task)
        {
            var serviceScopeFactory = host.Services.GetService<IServiceScopeFactory>();
            
            var scope = serviceScopeFactory.CreateScope();
            // var dbContext = services.GetRequiredService<UniverseContext>();
            // var gameUpdate = new GameUpdate(dbContext);
            var gameUpdate = scope.ServiceProvider.GetService<GameUpdate>();

            task = gameUpdate.Run(cancellationToken)
                .ContinueWith(t => scope.Dispose(), cancellationToken);
            
            return host;
        }
    }
}
