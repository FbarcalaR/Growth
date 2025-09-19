using Growth.Application.RoutineTasks.GetRoutineTaskById;
using Growth.BuildingBlocks.Messaging.Abstractions;

namespace Growth.API.Endpoints.RoutineTasks;

public class GetRoutineTaskById : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapGet("routine-tasks/{id:int}", async (int id, IQueryHandler<GetRoutineTaskByIdQuery, GetRoutineTaskByIdResponse> handler, CancellationToken cancellationToken) =>
            {
                var command = new GetRoutineTaskByIdQuery(id);
                var result = await handler.Handle(command, cancellationToken);
                return result.IsSuccess ? Results.Ok(result.Value) : Results.NotFound();
            })
            .WithTags(Tags.RoutineTasks)
            .RequireAuthorization();
    }
}