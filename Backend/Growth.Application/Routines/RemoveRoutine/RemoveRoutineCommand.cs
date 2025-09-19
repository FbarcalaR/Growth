using Growth.BuildingBlocks.Messaging.Abstractions;

namespace Growth.Application.Routines.RemoveRoutine;

public record RemoveRoutineCommand(int RoutineId) : ICommand;