using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Diagnostics;
using System.Linq;
using System.Security.Claims;
using System.Text;

namespace RaisingTheBAR.BLL.Filters
{
    public class LoggingActionFilter : IActionFilter
    {
        private static readonly log4net.ILog log = log4net.LogManager.GetLogger(typeof(LoggingActionFilter));

        public void OnActionExecuted(ActionExecutedContext context)
        {
            var controller = context.Controller as Controller;
            var sb = new StringBuilder();
            sb.AppendLine(context.ActionDescriptor.DisplayName);
            sb.AppendLine(controller.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Name)?.Value ?? "Anonymous");
            sb.Append(controller.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Role)?.Value ?? "Anonymous");

            log.Debug(sb.ToString());
        }

        public void OnActionExecuting(ActionExecutingContext context)
        {
        }
    }
}
