using Growth.BuildingBlocks.Messaging.Abstractions;

namespace Growth.Application.Users.GetById;

public sealed record GetUserByIdQuery(Guid UserId) : IQuery<UserResponse>;
