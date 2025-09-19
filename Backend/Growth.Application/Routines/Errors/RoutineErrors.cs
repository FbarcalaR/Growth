using Growth.BuildingBlocks.Messaging;

namespace Growth.Application.Routines.Errors;

public static class RoutineErrors
{
    public static Error NotFound(int routineId) => Error.NotFound(
        "Routine.NotFound",
        $"The routine with the Id = '{routineId}' was not found");
}