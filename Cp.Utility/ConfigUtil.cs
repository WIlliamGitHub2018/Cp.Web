using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cp.Utility
{
    public class ConfigUtil
    {
        private ConfigUtil() { }

        /// <summary>
        /// 获得web.config配置节点的值并安全转换为整形 失败返回0
        /// </summary>
        /// <param name="key">关键字</param>
        /// <returns>节点整形值</returns>
        public static int GetIntValue(string key)
        {
            return GetIntValue(key, 0);
        }
        /// <summary>
        /// 获得web.config配置节点的值并安全转换为整形
        /// </summary>
        /// <param name="key">关键字</param>
        /// <param name="defaultValue">默认值</param>
        /// <returns>节点整形值</returns>
        public static int GetIntValue(string key, int defaultValue)
        {
            int.TryParse(ConfigurationManager.AppSettings[key], out defaultValue);
            return defaultValue;
        }
        /// <summary>
        /// 获得web.config配置节点的值
        /// </summary>
        /// <param name="key">关键字</param>
        /// <returns>节点值</returns>
        public static string GetStringValue(string key)
        {
            return ConfigurationManager.AppSettings[key];
        }
    }
}
