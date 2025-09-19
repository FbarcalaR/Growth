using Growth.Application.Routines.UpdateRoutine;
using Growth.BuildingBlocks.Messaging.Abstractions;
using Growth.Domain;

namespace Growth.API.Endpoints.Routines;

public class UpdateRoutine: IEndpoint
{
    private sealed class UpdateRoutineRequest
    {
        public string Name { get; set; }
        public DateTimeOffset StartDate { get; set; }
        public IEnumerable<UpdateTaskRequest> Tasks { get; set; } = new List<UpdateTaskRequest>();

        public sealed class UpdateTaskRequest
        {
            public required string Name { get; set; }
        
            public IEnumerable<Goal> Goals { get; set; } = [];

            public TaskSchedule TaskSchedule { get; set; }
        
            public string Notes { get; set; }
            public TaskStreak TaskStreak { get; set; }
        
            public RepetitionTypes RepetitionType { get; set; }
            private IEnumerable<DayOfWeek> RepeatsOnDays { get; set; } = [];
            public ITaskRepetition GetTaskRepetition()
            {
                return RepetitionType switch
                {
                    RepetitionTypes.Daily => new DailyTask(DateTimeOffset.UtcNow),
                    RepetitionTypes.Weekly => new WeeklyTask(DateTimeOffset.UtcNow),
                    RepetitionTypes.Monthly => new MonthlyTask(DateTimeOffset.UtcNow),
                    RepetitionTypes.Yearly => new YearlyTask(DateTimeOffset.UtcNow),
                    RepetitionTypes.Custom => new CustomTask(DateTimeOffset.UtcNow) { RepeatsOnDays = RepeatsOnDays },
                    _ => throw new ArgumentOutOfRangeException()
                };
            }

            public enum RepetitionTypes
            {
                Daily = 0,
                Weekly = 1,
                Monthly = 2,
                Yearly = 3,
                Custom = 4
            }
        }
    }
    
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapPut("routines/{id:int}", async (int id, UpdateRoutineRequest request, ICommandHandler<UpdateRoutineCommand> handler, CancellationToken cancellationToken) =>
            {
                var command = new UpdateRoutineCommand()
                {
                    Id = id,
                    Name = request.Name,
                    StartDate = request.StartDate,
                    Tasks = request.Tasks.Select(t => new RoutineTask()
                    {
                        Name = t.Name,
                        TaskSchedule = t.TaskSchedule,
                        Notes = t.Notes,
                        Goals = t.Goals.ToList(),
                        Repetition = t.GetTaskRepetition(),
                        TaskStreak = t.TaskStreak,
                    }).ToList()
                };
                var result = await handler.Handle(command, cancellationToken);
                return result.IsSuccess ? Results.Ok() : Results.NotFound();
            })
            .WithTags(Tags.Routines)
            .RequireAuthorization();
    }
}
