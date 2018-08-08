using Cp.Business;
using Cp.Model.Sys;
using Cp.Utility;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Cp.Web.Core
{
    public class CheckLoginAttribute:ActionFilterAttribute
    {
        public bool IsCheck { get; set; }
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            base.OnActionExecuting(filterContext);
            if (!IsCheck)
            {
                return;  
            }
            string ctlName = filterContext.ActionDescriptor.ControllerDescriptor.ControllerName;
            if (ctlName == "Login")
            {
                return;
            }
            User user = filterContext.HttpContext.Session[Common.SessionUser] as User;
            var res = UserManager.VerifiLogin(user);
            if (!res)
            {
                filterContext.Result = new RedirectResult("/Login");
            }

        }
    }
}