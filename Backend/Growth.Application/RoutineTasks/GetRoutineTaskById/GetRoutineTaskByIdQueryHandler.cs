using Growth.Application.Abstractions.Authentication;
using Growth.Application.Abstractions.Data;
using Growth.Application.Routines.Errors;
using Growth.Application.Users.Errors;
using Growth.BuildingBlocks.Messaging;
using Growth.BuildingBlocks.Messaging.Abstractions;
using Growth.Domain.Users;
using Microsoft.EntityFrameworkCore;

namespace Growth.Application.RoutineTasks.GetRoutineTaskById;

public class GetRoutineTaskByIdQueryHandler(IApplicationDbContext context, IUserContext userContext) : IQueryHandler<GetRoutineTaskByIdQuery, GetRoutineTaskByIdResponse>
{
    public async Task<Result<GetRoutineTaskByIdResponse>> Handle(GetRoutineTaskByIdQuery query, CancellationToken cancellationToken)
    {
     
        User? user = await context.Users
            .SingleOrDefaultAsync(u => u.Id == userContext.UserId, cancellationToken);
        if (user is null)
            return Result.Failure<GetRoutineTaskByIdResponse>(UserErrors.Unauthorized());
        
        var routine = await context.RoutineTasks
            .Include(t => t.Routine)
            .Include(t => t.Goals)
            .Where(t => t.Id == query.Id && t.Routine.UserId == user.Id)
            .SingleOrDefaultAsync(cancellationToken);
        
        if (routine is null)
            return Result.Failure<GetRoutineTaskByIdResponse>(RoutineErrors.NotFound(query.Id));
        
        var mappedRoutine = new GetRoutineTaskByIdResponse()
        {
            Name = routine.Name,
            Repetition = routine.Repetition,
            TaskSchedule = routine.TaskSchedule,
            Id = routine.Id,
            Goals = routine.Goals,
            TaskStreak = routine.TaskStreak,
            Notes = routine.Notes,
            Routine = routine.Routine,
        };
    
        return mappedRoutine;
    }
}