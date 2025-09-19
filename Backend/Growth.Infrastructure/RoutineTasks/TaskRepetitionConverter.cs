using System.Text.Json;
using System.Text.Json.Serialization;
using Growth.Domain;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Growth.Infrastructure.RoutineTasks;

public class TaskRepetitionConverter() : ValueConverter<ITaskRepetition, string>(
    p => JsonSerializer.Serialize(new DbTaskRepetition(p), JsonSerializerOptions.Default),
    p => JsonSerializer.Deserialize<DbTaskRepetition>(p, JsonSerializerOptions.Default)!.ToTaskRepetition());

public class DbTaskRepetition
{
    public DateTimeOffset LastDueDateTime { get; init; }
    public IEnumerable<DayOfWeek> RepeatsOnDays { get; set; } = [];
    public string Discriminator { get; set; }

    [JsonConstructor]
    public DbTaskRepetition() {}
    
    public DbTaskRepetition(ITaskRepetition original)
    {
        LastDueDateTime = original.LastDueDateTime;
        Discriminator = original.GetType().Name;
        if (original is CustomTask customTask)
            RepeatsOnDays = customTask.RepeatsOnDays;
    }
    
    public ITaskRepetition ToTaskRepetition()
    {
        return Discriminator switch
        {
            nameof(DailyTask) => new DailyTask(LastDueDateTime),
            nameof(WeeklyTask) => new WeeklyTask(LastDueDateTime),
            nameof(MonthlyTask) => new MonthlyTask(LastDueDateTime),
            _ => new CustomTask(LastDueDateTime)
            {
                RepeatsOnDays = RepeatsOnDays,
            },
        };
    }
}