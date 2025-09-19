using Growth.Application.Abstractions.Authentication;
using Growth.Application.Abstractions.Data;
using Growth.Application.Routines.CreateRoutine;
using Growth.Application.Routines.Errors;
using Growth.Application.Users.Errors;
using Growth.BuildingBlocks.Messaging;
using Growth.BuildingBlocks.Messaging.Abstractions;
using Growth.Domain.Users;
using Microsoft.EntityFrameworkCore;

namespace Growth.Application.Routines.GetById;

public class GetRoutineByIdQueryHandler(IApplicationDbContext context, IUserContext userContext) : IQueryHandler<GetRoutineByIdQuery, RoutineResponse>
{
    public async Task<Result<RoutineResponse>> Handle(GetRoutineByIdQuery query, CancellationToken cancellationToken)
    {
        User? user = await context.Users.AsNoTracking()
            .SingleOrDefaultAsync(u => u.Id == userContext.UserId, cancellationToken);
        if (user is null)
            return Result.Failure<RoutineResponse>(UserErrors.Unauthorized());
        
        var routine = await context.Routines.
            AsNoTracking().
            Where(routine => routine.Id == query.RoutineId && routine.UserId == user.Id)
            .Select(routine => new RoutineResponse()
            {
                Name = routine.Name,
                Id = routine.Id,
                StartDate = routine.StartDate,
                TotalDays = routine.TotalDays,
                Tasks = routine.Tasks,
                Goals = routine.Goals
            })
            .SingleOrDefaultAsync(cancellationToken);
    
        if (routine == null)
            return Result.Failure<RoutineResponse>(RoutineErrors.NotFound(query.RoutineId));
    
        return routine;
    }
}