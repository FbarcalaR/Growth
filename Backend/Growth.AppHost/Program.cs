var builder = DistributedApplication.CreateBuilder(args);

builder.AddProject<Projects.Growth_API>("GrowthAPI");

builder.Build().Run();
