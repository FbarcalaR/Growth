
using Growth.API.Extensions;
using Growth.Application.Users.GetById;
using Growth.BuildingBlocks.Messaging;
using Growth.BuildingBlocks.Messaging.Abstractions;

namespace Growth.API.Endpoints.Users;

internal sealed class GetById : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapGet("users/{userId}", async (Guid userId, IQueryHandler<GetUserByIdQuery, UserResponse> handler, CancellationToken cancellationToken) =>
        {
            var query = new GetUserByIdQuery(userId);

            Result<UserResponse>  result = await handler.Handle(query, cancellationToken);

            if(result.IsSuccess)
                return Results.Ok(result.Value);
            
            return Results.NotFound();
        })
        .HasPermission(Permissions.UsersAccess)
        .WithTags(Tags.Users);
    }
}
