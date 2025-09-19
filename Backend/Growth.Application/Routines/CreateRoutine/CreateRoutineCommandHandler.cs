using Growth.Application.Abstractions.Authentication;
using Growth.Application.Abstractions.Data;
using Growth.Application.Users.Errors;
using Growth.BuildingBlocks.Messaging;
using Growth.BuildingBlocks.Messaging.Abstractions;
using Growth.Domain;
using Growth.Domain.Users;
using Microsoft.EntityFrameworkCore;

namespace Growth.Application.Routines.CreateRoutine;

public class CreateRoutineCommandHandler(IApplicationDbContext context, IUserContext userContext) : ICommandHandler<CreateRoutineCommand, CreateRoutineResponse>
{
    public async Task<Result<CreateRoutineResponse>> Handle(CreateRoutineCommand command, CancellationToken cancellationToken)
    {
        User? user = await context.Users.AsNoTracking()
            .SingleOrDefaultAsync(u => u.Id == userContext.UserId, cancellationToken);
        if (user is null)
            return Result.Failure<CreateRoutineResponse>(UserErrors.Unauthorized());
        
        var newRoutine = new Routine
        {
            Name = command.Name,
            StartDate = command.StartDate.UtcDateTime,
            UserId = user.Id
        };
        
        context.Routines.Add(newRoutine);
        await context.SaveChangesAsync(cancellationToken);

        return new CreateRoutineResponse(newRoutine.Id);
    }
}