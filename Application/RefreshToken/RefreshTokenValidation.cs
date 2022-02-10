using FluentValidation;

namespace Application.RefreshToken
{
    public class CustomerRefreshTokenValidation:AbstractValidator<RefreshTokenCommand>
    {
        public CustomerRefreshTokenValidation()
        {
            RuleFor(a => a.Token)
                .NotNull().WithMessage("token is required");
        }
    }
}