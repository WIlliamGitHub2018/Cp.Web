using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Cp.Utility
{
    public class CustomerCache
    {
        /// <summary>
        /// 容器
        /// </summary>
        private static Dictionary<string, KeyValuePair<DateTime, object>> _CustomerCacheDictionary = new Dictionary<string, KeyValuePair<DateTime, object>>();

        /// <summary>
        /// 添加缓存同名Key覆盖
        /// </summary>
        /// <param name="key"></param>
        /// <param name="data"></param>
        /// <param name="cacheTime"></param>
        public void Add(string key, object data, int cacheTime = 30)
        {
            _CustomerCacheDictionary.Add(key, new KeyValuePair<DateTime, object>(DateTime.Now.AddMinutes(cacheTime), data));
        }

        static CustomerCache()
        {

            Task.Run(() =>
            {
                bool flag = true;
                try
                {
                    while (flag)
                    {

                        if (_CustomerCacheDictionary.Count > 0)
                        {
                            List<string> list = new List<string>();
                            foreach (var item in _CustomerCacheDictionary)
                            {
                                KeyValuePair<DateTime, object> keyValuePair = item.Value;
                                if (DateTime.Now > keyValuePair.Key)//过期了
                                {
                                    list.Add(item.Key);
                                }
                            }
                            list.ForEach(t => _CustomerCacheDictionary.Remove(t));
                        }
                        Thread.Sleep(60000);

                    }
                }
                catch (Exception ex)
                {
                    flag = false;
                }
            });
        }
        /// <summary>
        /// func不能为空
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="key"></param>
        /// <param name="func">获取真实数据的方法委托</param>
        /// <returns></returns>
        public T Get<T>(string key, Func<T> func, int cacheTime = 30)
        {
            T t;
            if (!this.Contains(key))
            {
                t = func.Invoke();
                if (t != null)
                {
                    this.Add(key, t, cacheTime);
                }
            }
            else
            {
                t = (T)_CustomerCacheDictionary[key].Value;
            }
            return t;
        }

        public bool Contains(string key)
        {

            if (_CustomerCacheDictionary.ContainsKey(key))
            {
                KeyValuePair<DateTime, object> keyValuePair = _CustomerCacheDictionary[key];
                if (DateTime.Now > keyValuePair.Key)//过期了
                {
                    _CustomerCacheDictionary.Remove(key);
                    return false;
                }
                else
                    return true;
            }
            return false;
        }
    }
}
