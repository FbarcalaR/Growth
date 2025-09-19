using System.Text.Json;
using Growth.Domain;
using Growth.Infrastructure.Routines;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Growth.Infrastructure.RoutineTasks;

internal sealed class RoutineTaskConfiguration : IEntityTypeConfiguration<RoutineTask>
{
    public void Configure(EntityTypeBuilder<RoutineTask> builder)
    {
        builder.HasKey(p => p.Id);
        builder.OwnsOne<TaskSchedule>(p => p.TaskSchedule);
        builder.OwnsOne<TaskStreak>(p => p.TaskStreak);

        builder.OwnsMany(t => t.Goals, goals =>
        {
            goals.WithOwner().HasForeignKey("RoutineTaskId");
            
            goals.Property<int>("Id").ValueGeneratedOnAdd();
            goals.HasKey("Id");

            goals.OwnsOne(g => g.Progress, progress =>
            {
                progress.WithOwner().HasForeignKey("GoalId");
            });
            goals.OwnsOne(g => g.Target, target =>
            {
                target.WithOwner().HasForeignKey("GoalId");
            });
        });
        
        builder.Navigation(t => t.Routine).AutoInclude(false);
        
        builder.Ignore(p => p.Repetition)
            .Property(p => p.Repetition)
            .HasConversion<TaskRepetitionConverter>();
    }
}