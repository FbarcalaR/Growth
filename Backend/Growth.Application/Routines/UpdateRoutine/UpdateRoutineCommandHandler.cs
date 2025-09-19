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

namespace Growth.Application.Routines.UpdateRoutine;

public class UpdateRoutineCommandHandler(IApplicationDbContext context, IUserContext userContext) : ICommandHandler<UpdateRoutineCommand>
{
    public async Task<Result> Handle(UpdateRoutineCommand command, CancellationToken cancellationToken)
    {
        try
        {
            
            User? user = await context.Users
                .SingleOrDefaultAsync(u => u.Id == userContext.UserId, cancellationToken);
            if (user is null)
                return Result.Failure<CreateRoutineResponse>(UserErrors.Unauthorized());
            
            var entity = await context.Routines
                .FirstOrDefaultAsync(routine => routine.Id == command.Id && routine.UserId == userContext.UserId, cancellationToken);
            if (entity is null)
                return Result.Failure(RoutineErrors.NotFound(command.Id));
        
            entity.StartDate = command.StartDate;
            entity.Name = command.Name;
            entity.Tasks = command.Tasks;
            context.Routines.Update(entity);
            await context.SaveChangesAsync(cancellationToken);
            return Result.Success();
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }
}