using Microsoft.OpenApi.Models;

namespace Growth.API.Extensions;


internal static class ServiceCollectionExtensions
{
    internal static IServiceCollection AddSwaggerGenWithAuth(this IServiceCollection services)
    {
        services.AddSwaggerGen(o =>
        {
            o.CustomSchemaIds(id => id.FullName!.Replace('+', '-'));
        });
    
        return services;
    }
}
