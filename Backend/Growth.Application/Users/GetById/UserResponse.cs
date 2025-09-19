namespace Growth.Application.Users.GetById;

public sealed record UserResponse
{
    public required Guid Id { get; init; }

    public required string Email { get; init; }

    public string? FirstName { get; init; }

    public string? LastName { get; init; }
}
