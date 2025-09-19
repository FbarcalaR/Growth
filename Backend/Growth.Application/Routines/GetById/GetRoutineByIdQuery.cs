using Growth.BuildingBlocks.Messaging;
using Growth.BuildingBlocks.Messaging.Abstractions;

namespace Growth.Application.Routines.GetById;

public sealed record GetRoutineByIdQuery(int RoutineId) : IQuery<RoutineResponse>;