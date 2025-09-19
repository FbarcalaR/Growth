using Growth.Application.Routines.CreateRoutine;
using Growth.Application.Routines.GetById;
using Growth.BuildingBlocks.Messaging;
using Growth.BuildingBlocks.Messaging.Abstractions;
using Growth.Domain;

namespace Growth.API.Endpoints.Routines;

public class CreateRoutine: IEndpoint
{
    private sealed class CreateRoutineRequest
    {
        public string Name { get; set; }
        public DateTimeOffset StartDate { get; set; }
    }   

    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapPost("routines", async (CreateRoutineRequest request, ICommandHandler<CreateRoutineCommand, CreateRoutineResponse> handler, CancellationToken cancellationToken) =>
            {
                var command = new CreateRoutineCommand()
                {
                    Name = request.Name,
                    StartDate = request.StartDate,
                };
                var result = await handler.Handle(command, cancellationToken);
                return result.IsSuccess ? Results.Ok(result.Value) : Results.NotFound();
            })
            .WithTags(Tags.Routines)
            .RequireAuthorization();
    }
}
