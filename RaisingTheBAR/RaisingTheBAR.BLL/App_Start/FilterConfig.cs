using System.Web;
using System.Web.Mvc;

namespace RaisingTheBAR.BLL
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
