using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cp.Utility
{
    public class Common
    {
        /// <summary>
        /// 日志跟目录
        /// </summary>
        public static string LogRoot = ConfigUtil.GetStringValue("LogRoot");

        public const string SessionUser = "Account";
    }
}
