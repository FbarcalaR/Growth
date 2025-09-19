using Growth.Domain.Abstractions;

namespace Growth.Domain;

public class RoutineTask : IEntity<int>
{
    public int Id { get; set; }
    public string Name { get; set; }
    public ITaskRepetition Repetition { get; set; }
    public ICollection<Goal> Goals { get; set; } = new List<Goal>();
    public TaskSchedule TaskSchedule { get; set; }
    public TaskStreak TaskStreak { get; set; }
    public string? Notes { get; set; }

    public Routine Routine { get; set; }
}

public record TaskSchedule(
    DateTimeOffset FromTime,
    DateTimeOffset ToTime)
{
    public TimeSpan Duration => ToTime - FromTime;
}

public record TaskStreak(int MaxStreakDays, int CurrentStreakDays);
