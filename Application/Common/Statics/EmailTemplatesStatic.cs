using System.IO;

namespace Application.Common.Statics
{
    public static class EmailTemplatesStatic
    {
        public static string EmailActivationTemplate = Path.Combine("contents", "emailTemplates", "EmailActivation.cshtml");
    }
}