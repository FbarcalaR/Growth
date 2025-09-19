namespace Growth.Domain;

public interface ITaskRepetition
{
    public DateTimeOffset LastDueDateTime { get; init; }
    public DateTimeOffset NextDueDate { get; }
}

public class DailyTask(DateTimeOffset lastDueDateTime) : ITaskRepetition
{
    public DateTimeOffset LastDueDateTime { get; init; } = lastDueDateTime;

    public DateTimeOffset NextDueDate => LastDueDateTime.AddDays(1);
}

public class WeeklyTask(DateTimeOffset lastDueDateTime) : ITaskRepetition
{
    public DateTimeOffset LastDueDateTime { get; init; } = lastDueDateTime;

    public DateTimeOffset NextDueDate => LastDueDateTime.AddDays(7);
}

public class MonthlyTask(DateTimeOffset lastDueDateTime) : ITaskRepetition
{
    public DateTimeOffset LastDueDateTime { get; init; } = lastDueDateTime;

    public DateTimeOffset NextDueDate => LastDueDateTime.AddMonths(1);
}

public class YearlyTask(DateTimeOffset lastDueDateTime) : ITaskRepetition
{
    public DateTimeOffset LastDueDateTime { get; init; } = lastDueDateTime;

    public DateTimeOffset NextDueDate => LastDueDateTime.AddYears(1);
}

public class CustomTask(DateTimeOffset lastDueDateTime) : ITaskRepetition
{
    public DateTimeOffset LastDueDateTime { get; init; } = lastDueDateTime;
    public required IEnumerable<DayOfWeek> RepeatsOnDays { get; set; }

    public DateTimeOffset NextDueDate
    {
        get
        {
            DayOfWeek? nextDueDayOfWeek = RepeatsOnDays.FirstOrDefault(d => d > LastDueDateTime.DayOfWeek);
            nextDueDayOfWeek = nextDueDayOfWeek ?? RepeatsOnDays.First();
            var daysUntilNextDueDate = nextDueDayOfWeek.Value - LastDueDateTime.DayOfWeek;
            return LastDueDateTime.AddDays(daysUntilNextDueDate);
        }
    }
}