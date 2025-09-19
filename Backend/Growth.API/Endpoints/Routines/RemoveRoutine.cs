using Growth.Application.Routines.GetById;
using Growth.Application.Routines.RemoveRoutine;
using Growth.BuildingBlocks.Messaging;
using Growth.BuildingBlocks.Messaging.Abstractions;

namespace Growth.API.Endpoints.Routines;

public class RemoveRoutine : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapDelete("routines/{id:int}", async (int id, ICommandHandler<RemoveRoutineCommand> handler, CancellationToken cancellationToken) =>
            {
                var command = new RemoveRoutineCommand(id);
                Result result = await handler.Handle(command, cancellationToken);
                return result.IsSuccess ? Results.Ok() : Results.NotFound();
            })
            .WithTags(Tags.Routines)
            .RequireAuthorization();
    }
}