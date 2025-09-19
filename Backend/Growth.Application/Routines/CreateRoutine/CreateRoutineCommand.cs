using Growth.BuildingBlocks.Messaging.Abstractions;
using Growth.Domain;
using Growth.Domain.Users;

namespace Growth.Application.Routines.CreateRoutine;

public class CreateRoutineCommand : ICommand<CreateRoutineResponse>
{
    public required string Name { get; set; }
    public DateTimeOffset StartDate { get; set; }
}