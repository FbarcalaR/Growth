using Growth.Domain;
using Growth.Domain.Users;

public class Plant
{
    public int Health { get; set; }
    public int ExperiencePoints { get; set; }
    public PlantLevel Level { get; set; }
    public GardenPosition GardenPosition { get; set; }
    public Routine Routine { get; set; }
}

public enum PlantLevel
{
    Seed,
    Sprout,
    Young,
    YoungAdult,
    Adult
}

public record GardenPosition(int X, int Y);
