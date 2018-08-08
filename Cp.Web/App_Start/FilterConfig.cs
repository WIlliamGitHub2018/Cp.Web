using Cp.Web.Core;
using System.Web;
using System.Web.Mvc;

namespace Cp.Web
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
            filters.Add(new CheckLoginAttribute() { IsCheck = true });
        }
    }
}
