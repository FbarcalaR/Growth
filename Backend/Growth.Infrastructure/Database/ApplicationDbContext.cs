using Growth.Application.Abstractions.Data;
using Growth.Domain;
using Growth.Domain.Users;
using Growth.Infrastructure.Routines;
using Microsoft.EntityFrameworkCore;

namespace Growth.Infrastructure.Database;

public sealed class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : DbContext(options), IApplicationDbContext
{
    public DbSet<Routine> Routines { get; set; }
    public DbSet<RoutineTask> RoutineTasks { get; set; }

    public DbSet<User> Users { get; set; }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(ApplicationDbContext).Assembly);

        modelBuilder.HasDefaultSchema(Schemas.Default);
    }
}
