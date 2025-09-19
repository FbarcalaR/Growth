using Growth.Domain;
using Growth.Domain.Users;
using Microsoft.EntityFrameworkCore;

namespace Growth.Application.Abstractions.Data;

public interface IApplicationDbContext
{
    DbSet<Routine> Routines { get; set; }
    DbSet<RoutineTask> RoutineTasks { get; set; }
    
    DbSet<User> Users { get; }
    
    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}