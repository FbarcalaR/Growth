using Growth.Domain;

namespace Growth.Application.RoutineTasks.GetRoutineTaskById;

public class GetRoutineTaskByIdResponse
{
    public int Id { get; set; }
    public string Name { get; set; }
    public ITaskRepetition Repetition { get; set; }
    public IEnumerable<Goal> Goals { get; set; }
    public TaskSchedule TaskSchedule { get; set; }
    public TaskStreak TaskStreak { get; set; }
    public string Notes { get; set; }

    public Routine Routine { get; set; }
}