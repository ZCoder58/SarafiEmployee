using MediatR;

namespace Application.RefreshToken
{
    public record RefreshTokenCommand(string Token) : IRequest<RefreshTokenDto>;
    
}