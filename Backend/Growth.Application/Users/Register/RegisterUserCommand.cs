using Growth.BuildingBlocks.Messaging.Abstractions;

namespace Growth.Application.Users.Register;

public sealed record RegisterUserCommand(string Email, string FirstName, string LastName, string Password)
    : ICommand<Guid>;
