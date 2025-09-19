using Growth.Application.Routines.GetById;
using Growth.Application.Routines.GetRoutines;
using Growth.BuildingBlocks.Messaging;
using Growth.BuildingBlocks.Messaging.Abstractions;

namespace Growth.API.Endpoints.Routines;

public class GetRoutines : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapGet("routines/", async (IQueryHandler<GetRoutinesQuery, RoutinesResponse> handler, CancellationToken cancellationToken) =>
            {
                var command = new GetRoutinesQuery();
                Result<RoutinesResponse> result = await handler.Handle(command, cancellationToken);
                return result.IsSuccess ? Results.Ok(result.Value) : Results.NotFound();
            })
        .WithTags(Tags.Routines)
        .RequireAuthorization();
    }
}