using Cp.Model.Sys;
using Cp.Utility;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Cp.Web.Controllers
{
    public class BaseController:Controller
    {
        
        public User LogUser
        {
            get
            {
                var user = Session[Common.SessionUser] as User;
                if (user == null) {
                    user = new User();
                }
                return user;
            }
        }
    }
}