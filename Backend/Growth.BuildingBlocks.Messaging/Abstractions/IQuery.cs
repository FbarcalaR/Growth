using Growth.Application.Abstractions.Messaging;

namespace Growth.BuildingBlocks.Messaging.Abstractions;

public interface IQuery<TResponse> : IRequest<Result<TResponse>>;