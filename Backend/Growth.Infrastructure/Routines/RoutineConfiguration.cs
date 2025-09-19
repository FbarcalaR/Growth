using Growth.Domain;
using Growth.Domain.Users;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Growth.Infrastructure.Routines;

internal sealed class RoutineConfiguration : IEntityTypeConfiguration<Routine>
{
    public void Configure(EntityTypeBuilder<Routine> builder)
    {
        builder.HasKey(p => p.Id);
        builder.HasMany(t => t.Tasks).WithOne( t => t.Routine);
        builder.Ignore(t => t.Goals);
        builder.Navigation(r => r.Tasks).AutoInclude();
        
        builder.OwnsMany(t => t.Plants, plants =>
        {
            plants.OwnsOne(p => p.GardenPosition);
        });
    }
}