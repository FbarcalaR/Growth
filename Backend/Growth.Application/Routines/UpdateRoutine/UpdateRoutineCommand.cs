using Growth.BuildingBlocks.Messaging.Abstractions;
using Growth.Domain;

namespace Growth.Application.Routines.UpdateRoutine;

public class UpdateRoutineCommand : ICommand
{
    public int Id { get; set; }
    public string Name { get; set; }
    public DateTimeOffset StartDate { get; set; }
    public ICollection<RoutineTask> Tasks { get; set; } = new List<RoutineTask>();

}