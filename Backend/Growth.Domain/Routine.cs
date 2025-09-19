using Growth.Domain.Abstractions;
using Growth.Domain.Users;

namespace Growth.Domain;

public class Routine : IEntity<int>
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public ICollection<RoutineTask> Tasks { get; set; } = new List<RoutineTask>();
    public ICollection<Goal> Goals => Tasks.SelectMany(t => t.Goals).ToList();
    public DateTimeOffset StartDate { get; set; }
    public int TotalDays => DateTimeOffset.UtcNow.Subtract(StartDate).Days;
    
    public ICollection<Plant> Plants { get; set; } = new List<Plant>();
    public required Guid UserId { get; set; }
    public User User { get; set; }

    public void SeedNewPlant()
    {
        var newPlant = new Plant
        {
            Health = 100,
            ExperiencePoints = 0,
            Level = PlantLevel.Seed,
            GardenPosition = new GardenPosition(0, 0),
            Routine = this
        };
        Plants.Add(newPlant);
    }
}
