using Growth.BuildingBlocks.Messaging.Abstractions;

namespace Growth.Application.RoutineTasks.GetRoutineTaskById;

public record GetRoutineTaskByIdQuery(int Id) : IQuery<GetRoutineTaskByIdResponse>;