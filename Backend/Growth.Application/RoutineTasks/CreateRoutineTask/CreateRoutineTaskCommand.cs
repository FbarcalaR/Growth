using Growth.Application.Routines.CreateRoutine;
using Growth.BuildingBlocks.Messaging.Abstractions;
using Growth.Domain;

namespace Growth.Application.RoutineTasks.CreateRoutineTask;

public class CreateRoutineTaskCommand : ICommand<CreateRoutineTaskResponse>
{
    public required int RoutineId { get; set; }
    public required string Name { get; set; }

    public IEnumerable<Goal> Goals { get; set; } = [];
    
    public TaskSchedule TaskSchedule { get; set; }

    public ITaskRepetition TaskRepetition { get; set; }
    
    public string Notes { get; set; }
}