using System.Security.Claims;

namespace Growth.Infrastructure.Authentication;

internal static class ClaimsPrincipalExtensions
{
    public static Guid GetUserId(this ClaimsPrincipal? principal)
    {
        string? userId = principal?.FindFirstValue(ClaimTypes.NameIdentifier);

        return Guid.TryParse(userId, out Guid parsedUserId) ?
            parsedUserId :
            throw new ApplicationException("User id is unavailable");
    }
    
    private static string? FindFirstValue(this ClaimsPrincipal principal, string claimType)
    {
        ArgumentNullException.ThrowIfNull(principal);
        
        var claim = principal.FindFirst(claimType);
        return claim?.Value;
    }
}
