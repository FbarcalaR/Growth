using Growth.BuildingBlocks.Messaging.Abstractions;

namespace Growth.Application.Routines.GetRoutines;

public sealed record GetRoutinesQuery() : IQuery<RoutinesResponse>;