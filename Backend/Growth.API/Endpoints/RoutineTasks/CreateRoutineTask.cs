using Growth.Application.Routines.CreateRoutine;
using Growth.Application.RoutineTasks.CreateRoutineTask;
using Growth.BuildingBlocks.Messaging.Abstractions;
using Growth.Domain;

namespace Growth.API.Endpoints.RoutineTasks;

public class CreateRoutineTask: IEndpoint
{
    public sealed class CreateRoutineTaskRequest
    {
        public required int RoutineId { get; set; }
        public required string Name { get; set; }
        
        public IEnumerable<Metric> GoalTargets { get; set; } = [];

        public TaskSchedule TaskSchedule { get; set; }
        
        public string Notes { get; set; }
        
        public RepetitionTypes RepetitionType { get; set; }
        private IEnumerable<DayOfWeek> RepeatsOnDays { get; set; } = [];
        public ITaskRepetition GetTaskRepetition()
        {
            switch (RepetitionType)
            {
                case RepetitionTypes.Daily:
                    return new DailyTask(DateTimeOffset.UtcNow);
                case RepetitionTypes.Weekly:
                    return new WeeklyTask(DateTimeOffset.UtcNow);
                case RepetitionTypes.Monthly:
                    return new MonthlyTask(DateTimeOffset.UtcNow);
                case RepetitionTypes.Yearly:
                    return new YearlyTask(DateTimeOffset.UtcNow);
                case RepetitionTypes.Custom:
                    return new CustomTask(DateTimeOffset.UtcNow)
                    {
                        RepeatsOnDays = RepeatsOnDays
                    };
                default:
                    throw new ArgumentOutOfRangeException();
            }
        }

    }

    public enum RepetitionTypes
    {
        Daily = 0,
        Weekly = 1,
        Monthly = 2,
        Yearly = 3,
        Custom = 4
    }

    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapPost("routine-tasks", async (CreateRoutineTaskRequest request, ICommandHandler<CreateRoutineTaskCommand, CreateRoutineTaskResponse> handler, CancellationToken cancellationToken) =>
            {
                var command = new CreateRoutineTaskCommand()
                {
                    Name = request.Name,
                    RoutineId = request.RoutineId,
                    Notes = request.Notes,
                    TaskSchedule = request.TaskSchedule,
                    TaskRepetition = request.GetTaskRepetition(),
                    Goals = request.GoalTargets.Select(target => new Goal{ Target = target } )
                };
                var result = await handler.Handle(command, cancellationToken);
                return result.IsSuccess ? Results.Ok(result.Value) : Results.NotFound();
            })
            .WithTags(Tags.RoutineTasks)
            .RequireAuthorization();
    }
}