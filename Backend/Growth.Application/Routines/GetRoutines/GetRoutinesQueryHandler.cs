using Growth.Application.Abstractions.Authentication;
using Growth.Application.Abstractions.Data;
using Growth.Application.Routines.GetById;
using Growth.Application.Users.Errors;
using Growth.BuildingBlocks.Messaging;
using Growth.BuildingBlocks.Messaging.Abstractions;
using Growth.Domain.Users;
using Microsoft.EntityFrameworkCore;

namespace Growth.Application.Routines.GetRoutines;

public class GetRoutinesQueryHandler(IApplicationDbContext context, IUserContext userContext) : IQueryHandler<GetRoutinesQuery, RoutinesResponse>
{
    public async Task<Result<RoutinesResponse>> Handle(GetRoutinesQuery query, CancellationToken cancellationToken)
    {
        User? user = await context.Users.AsNoTracking()
            .SingleOrDefaultAsync(u => u.Id == userContext.UserId, cancellationToken);
        if (user is null)
            return Result.Failure<RoutinesResponse>(UserErrors.Unauthorized());

        var routines = await context.Routines
            .AsNoTracking()
            .Where(routine => routine.UserId == user.Id)
            .Select(routine => new RoutineResponse()
            {
                Name = routine.Name,
                Id = routine.Id,
                StartDate = routine.StartDate,
                TotalDays = routine.TotalDays,
                Tasks = routine.Tasks,
                Goals = routine.Goals,
                Plants = routine.Plants
            })
            .ToListAsync(cancellationToken);

        return new RoutinesResponse { Routines = routines };
    }
}