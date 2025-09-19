using Growth.Application.Abstractions.Messaging;

namespace Growth.BuildingBlocks.Messaging.Abstractions;

public interface ICommand: IRequest<Result>;
public interface ICommand<TResponse>: IRequest<Result<TResponse>>;