using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Cp.Web.Areas.User.Controllers
{
    public class UserManagerController : Controller
    {
        // GET: User/UserManager
        public ActionResult Index()
        {
            return View();
        }
    }
}