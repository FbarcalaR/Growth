using Growth.Application.Abstractions.Authentication;
using Growth.Application.Abstractions.Data;
using Growth.Application.Routines.CreateRoutine;
using Growth.Application.Routines.Errors;
using Growth.Application.Users.Errors;
using Growth.BuildingBlocks.Messaging;
using Growth.BuildingBlocks.Messaging.Abstractions;
using Growth.Domain;
using Growth.Domain.Users;
using Microsoft.EntityFrameworkCore;

namespace Growth.Application.Routines.RemoveRoutine;

public class RemoveRoutineCommandHandler(IApplicationDbContext context, IUserContext userContext) : ICommandHandler<RemoveRoutineCommand>
{
    public async Task<Result> Handle(RemoveRoutineCommand command, CancellationToken cancellationToken)
    {
        User? user = await context.Users
            .SingleOrDefaultAsync(u => u.Id == userContext.UserId, cancellationToken);
        if (user is null)
            return Result.Failure<CreateRoutineResponse>(UserErrors.Unauthorized());
        
        Routine? routine = await context.Routines
            .SingleOrDefaultAsync(r => r.Id == command.RoutineId && r.UserId == userContext.UserId, cancellationToken);
        
        if (routine is null)
            return Result.Failure(RoutineErrors.NotFound(command.RoutineId));
        
        context.Routines.Remove(routine);
        await context.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}