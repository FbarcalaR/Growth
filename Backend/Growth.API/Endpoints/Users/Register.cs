using Growth.Application.Users.Register;
using Growth.BuildingBlocks.Messaging;
using Growth.BuildingBlocks.Messaging.Abstractions;

namespace Growth.API.Endpoints.Users;

internal sealed class Register : IEndpoint
{
    public sealed record Request(string Email, string FirstName, string LastName, string Password);

    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapPost("users/register", async (Request request, ICommandHandler<RegisterUserCommand, Guid> handler, CancellationToken cancellationToken) =>
        {
            var command = new RegisterUserCommand(
                request.Email,
                request.FirstName,
                request.LastName,
                request.Password);

            Result<Guid> result = await handler.Handle(command, cancellationToken);

            if (result.IsSuccess)
                return Results.Ok(result.Value);
            
            return Results.Problem();
        })
        .WithTags(Tags.Users);
    }
}
