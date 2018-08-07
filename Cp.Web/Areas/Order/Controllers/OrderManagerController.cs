using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Cp.Web.Areas.Order.Controllers
{
    public class OrderManagerController : Controller
    {
        /// <summary>
        /// 新增提报
        /// </summary>
        /// <returns></returns>
        public ActionResult CreateOrder()
        {
            return View();
        }
        /// <summary>
        /// 我的提报
        /// </summary>
        /// <returns></returns>
        public ActionResult MyOrder()
        {
            return View();
        }
        /// <summary>
        /// 所有提报
        /// </summary>
        /// <returns></returns>
        public ActionResult AllOrder()
        {
            return View();
        }
       
    }
}