using Growth.Application.Abstractions.Authentication;
using Growth.Application.Abstractions.Data;
using Growth.Application.Routines.CreateRoutine;
using Growth.Application.RoutineTasks.Errors;
using Growth.Application.Users.Errors;
using Growth.BuildingBlocks.Messaging;
using Growth.BuildingBlocks.Messaging.Abstractions;
using Growth.Domain;
using Growth.Domain.Users;
using Microsoft.EntityFrameworkCore;

namespace Growth.Application.RoutineTasks.CreateRoutineTask;

public class CreateRoutineTaskCommandHandler(IApplicationDbContext context, IUserContext userContext) : ICommandHandler<CreateRoutineTaskCommand, CreateRoutineTaskResponse>
{
    public async Task<Result<CreateRoutineTaskResponse>> Handle(CreateRoutineTaskCommand command, CancellationToken cancellationToken)
    {
        try
        {
            User? user = await context.Users
                .SingleOrDefaultAsync(u => u.Id == userContext.UserId, cancellationToken);
            if (user is null)
                return Result.Failure<CreateRoutineTaskResponse>(UserErrors.Unauthorized());
            
            var parentRoutine = await context.Routines
                .SingleOrDefaultAsync(r => r.Id == command.RoutineId && userContext.UserId == r.UserId, cancellationToken);
            if (parentRoutine == null)
                return Result.Failure<CreateRoutineTaskResponse>(RoutineTaskErrors.ParentRoutineNotFound(command.RoutineId));
            var newTask = new RoutineTask
            {
                Routine = parentRoutine,
                Name = command.Name,
                Repetition = command.TaskRepetition,
                Goals = command.Goals.ToList(),
                TaskSchedule = command.TaskSchedule,
                Notes = command.Notes,
                TaskStreak = new TaskStreak(0, 0),
            };
            parentRoutine.SeedNewPlant();
            context.RoutineTasks.Add(newTask);
            await context.SaveChangesAsync(cancellationToken);

            return new CreateRoutineTaskResponse(newTask.Id);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }
}