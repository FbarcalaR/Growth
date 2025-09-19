using Growth.Application.Routines.GetById;
using Growth.BuildingBlocks.Messaging;
using Growth.BuildingBlocks.Messaging.Abstractions;

namespace Growth.API.Endpoints.Routines;

public class GetRoutineById : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapGet("routines/{id:int}", async (int id, IQueryHandler<GetRoutineByIdQuery, RoutineResponse> handler, CancellationToken cancellationToken) =>
            {
                var command = new GetRoutineByIdQuery(id);
                Result<RoutineResponse> result = await handler.Handle(command, cancellationToken);
                return result.IsSuccess ? Results.Ok(result.Value) : Results.NotFound();
            })
        .WithTags(Tags.Routines)
        .RequireAuthorization();
    }
}