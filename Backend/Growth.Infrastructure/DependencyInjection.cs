using Growth.Application.Abstractions.Data;
using Growth.Infrastructure.Authorization;
using Growth.Infrastructure.Database;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Migrations;
using System.Text;
using Growth.Application.Abstractions.Authentication;
using Growth.Infrastructure.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

namespace Growth.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration) =>
        services
            // .AddServices()
            .AddDatabase(configuration)
            .AddHealthChecks(configuration)
            .AddAuthenticationInternal(configuration)
            .AddAuthorizationInternal();

         private static IServiceCollection AddDatabase(this IServiceCollection services, IConfiguration configuration)
         {
             string? connectionString = configuration.GetConnectionString("Database");

             services.AddDbContext<ApplicationDbContext>(
                 options => options
                     .UseNpgsql(connectionString, npgsqlOptions =>
                         npgsqlOptions.MigrationsHistoryTable(HistoryRepository.DefaultTableName, Schemas.Default))
                     .UseSnakeCaseNamingConvention());

             services.AddScoped<IApplicationDbContext>(sp => sp.GetRequiredService<ApplicationDbContext>());
             services.AddTransient<IAuthorizationHandler, PermissionAuthorizationHandler>();

             return services;
         }
         
         private static IServiceCollection AddHealthChecks(this IServiceCollection services, IConfiguration configuration)
         {
             services
                 .AddHealthChecks()
                 .AddNpgSql(configuration.GetConnectionString("Database")!);

             return services;
         }

         private static IServiceCollection AddAuthenticationInternal(
             this IServiceCollection services,
             IConfiguration configuration)
         {
             services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                 .AddJwtBearer(o =>
                 {
                     o.RequireHttpsMetadata = false;
                     o.TokenValidationParameters = new TokenValidationParameters
                     {
                         IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Secret"]!)),
                         ValidIssuer = configuration["Jwt:Issuer"],
                         ValidAudience = configuration["Jwt:Audience"]
                         // ClockSkew = TimeSpan.Zero
                     };
                 });

             services.AddHttpContextAccessor();
             services.AddScoped<IUserContext, UserContext>();
             services.AddSingleton<IPasswordHasher, PasswordHasher>();
             services.AddSingleton<ITokenProvider, TokenProvider>();

             return services;
         }
         
         
         private static IServiceCollection AddAuthorizationInternal(this IServiceCollection services)
         {
             services.AddAuthorization();

             services.AddScoped<PermissionProvider>();

             services.AddTransient<IAuthorizationHandler, PermissionAuthorizationHandler>();

             services.AddTransient<IAuthorizationPolicyProvider, PermissionAuthorizationPolicyProvider>();

             return services;
         }
}