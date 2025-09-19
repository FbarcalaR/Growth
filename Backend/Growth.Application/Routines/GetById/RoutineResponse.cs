using Growth.Domain;

namespace Growth.Application.Routines.GetById;

public class RoutineResponse
{
    public int Id { get; set; }
    public string Name { get; set; }
    public ICollection<RoutineTask> Tasks { get; set; } = new List<RoutineTask>();
    public ICollection<Goal> Goals { get; set; } = new List<Goal>();
    public DateTimeOffset StartDate { get; set; }
    public int TotalDays { get; set; }
    public IEnumerable<Plant> Plants { get; set; } = new List<Plant>();
}