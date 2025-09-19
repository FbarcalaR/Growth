namespace Growth.Domain;

public record Goal
{
    public Metric Target { get; set; }
    public Metric? Progress { get; set; } = null;
}

public record Metric(string Name, double Value) { }