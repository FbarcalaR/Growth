using Growth.Domain.Users;

namespace Growth.Application.Abstractions.Authentication;

public interface ITokenProvider
{
    string Create(User user);
}
