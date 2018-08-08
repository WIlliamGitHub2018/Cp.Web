using Cp.Business;
using Cp.Model;
using Cp.Model.Sys;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Cp.Web.Controllers
{
    public class LoginController : Controller
    {
        // GET: Login
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public JsonResult SingIn(string account, string pwd)
        {
            ResultInfo res = new ResultInfo();
            if (string.IsNullOrWhiteSpace(account) || string.IsNullOrWhiteSpace(pwd))
            {
                res.Result = false;
                res.Msg = "登录失败";
            }
            else
            {
                var bll = new UserBLL();
                User user = bll.UserLogin(account, pwd);
                if (user == null || user.RowID <= 0)
                {
                    res.Result = false;
                    res.Msg = "账号或密码错误";
                }
                else {
                    res.Result = true;
                    res.Msg = "登录成功";

                }
            }
            return Json(res);
        }
    }
}