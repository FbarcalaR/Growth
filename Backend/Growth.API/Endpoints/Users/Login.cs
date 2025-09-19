using Growth.Application.Users.Login;
using Growth.BuildingBlocks.Messaging;
using Growth.BuildingBlocks.Messaging.Abstractions;

namespace Growth.API.Endpoints.Users;

internal sealed class Login : IEndpoint
{
    public sealed record Request(string Email, string Password);

    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapPost("users/login", async (Request request, ICommandHandler<LoginUserCommand, string> handler, CancellationToken cancellationToken) =>
        {
            var command = new LoginUserCommand(request.Email, request.Password);

            Result<string> result = await handler.Handle(command, cancellationToken);

            if (result.IsSuccess)
                return Results.Ok(result.Value);
            return Results.Problem();
        })
        .WithTags(Tags.Users);
    }
}
