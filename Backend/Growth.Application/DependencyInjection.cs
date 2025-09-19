using Growth.Application.Routines.CreateRoutine;
using Growth.Application.Routines.GetById;
using Growth.Application.Routines.GetRoutines;
using Growth.Application.Routines.RemoveRoutine;
using Growth.Application.Routines.UpdateRoutine;
using Growth.Application.RoutineTasks.CreateRoutineTask;
using Growth.Application.RoutineTasks.GetRoutineTaskById;
using Growth.Application.Users.GetById;
using Growth.Application.Users.Login;
using Growth.Application.Users.Register;
using Growth.BuildingBlocks.Messaging.Abstractions;
using Microsoft.Extensions.DependencyInjection;

namespace Growth.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        services.AddScoped<IQueryHandler<GetRoutinesQuery, RoutinesResponse>, GetRoutinesQueryHandler>();
        services.AddScoped<IQueryHandler<GetRoutineByIdQuery, RoutineResponse>, GetRoutineByIdQueryHandler>();
        services.AddScoped<ICommandHandler<CreateRoutineCommand, CreateRoutineResponse>, CreateRoutineCommandHandler>();
        services.AddScoped<ICommandHandler<UpdateRoutineCommand>, UpdateRoutineCommandHandler>();
        services.AddScoped<ICommandHandler<RemoveRoutineCommand>, RemoveRoutineCommandHandler>();
        
        services.AddScoped<ICommandHandler<CreateRoutineTaskCommand, CreateRoutineTaskResponse>, CreateRoutineTaskCommandHandler>();
        services.AddScoped<IQueryHandler<GetRoutineTaskByIdQuery, GetRoutineTaskByIdResponse>, GetRoutineTaskByIdQueryHandler>();

        services.AddScoped<ICommandHandler<RegisterUserCommand, Guid>, RegisterUserCommandHandler>();
        services.AddScoped<IQueryHandler<GetUserByIdQuery, UserResponse>, GetUserByIdQueryHandler>();
        services.AddScoped<ICommandHandler<LoginUserCommand, string>, LoginUserCommandHandler>();
        
        return services;
    }
}