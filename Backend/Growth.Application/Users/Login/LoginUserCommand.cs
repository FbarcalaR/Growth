using Growth.BuildingBlocks.Messaging.Abstractions;

namespace Growth.Application.Users.Login;

public sealed record LoginUserCommand(string Email, string Password) : ICommand<string>;
