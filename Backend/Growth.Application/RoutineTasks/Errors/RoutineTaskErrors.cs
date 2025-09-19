using Growth.BuildingBlocks.Messaging;

namespace Growth.Application.RoutineTasks.Errors;

public static class RoutineTaskErrors
{
    public static Error ParentRoutineNotFound(int routineId) => Error.NotFound(
        "RoutineTask.ParentNotFound",
        $"The routine with the Id = '{routineId}' was not found");
}