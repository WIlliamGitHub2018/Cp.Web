using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cp.Utility
{
    public class LogHelper
    {
        public static void Write(string txt, string fileName = "", string dir = "")
        {
            Task.Run(() => {
                string root = Common.LogRoot;
                string path = "";
                try
                {

                    if (!string.IsNullOrWhiteSpace(root))
                    {
                        if (!string.IsNullOrWhiteSpace(dir))
                        {
                            path = Path.Combine(root + $"\\{DateTime.Now.ToString("yyyy-MM-dd")}", dir);
                        }
                        else
                        {
                            path = root + $"\\{DateTime.Now.ToString("yyyy-MM-dd")}";
                        }

                        if (!Directory.Exists(path))
                        {
                            Directory.CreateDirectory(path);
                        }
                        string filePath = string.Empty;
                        if (!string.IsNullOrWhiteSpace(fileName))
                        {

                            filePath = Path.Combine(path, $"{fileName}.txt");
                        }
                        else
                        {
                            filePath = Path.Combine(path, $"{DateTime.Now.ToString("yyyy_MM_dd_HHmmssfff")}.txt");
                        }

                        File.AppendAllText(filePath, txt);
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"[{DateTime.Now}][写日志错误][{txt}][{ex.Message}]");
                }
            });
        }

        public static void WriteException(string txt, Exception ex, string fileName = "", string dir = "")
        {
            string str = $"[{DateTime.Now}][异常信息]\r\n";
            str += $"[Message][{ex.Message}]\r\n";
            str += $"[Source][{ex.Source}]\r\n";
            str += $"[StackTrace][{ex.StackTrace}]\r\n";
            str += $"[TargetSite][{ex.TargetSite}]\r\n";
            var inner = ex.InnerException;
            if (inner != null)
            {
                str += $"[inMessage][{inner.Message}]\r\n";
                str += $"[inSource][{inner.Source}]\r\n";
                str += $"[inStackTrace][{inner.StackTrace}]\r\n";
                str += $"[inTargetSite][{inner.TargetSite}]\r\n";
            }
            string msg = $"{txt}\r\n{str}";
            Write(msg, fileName, dir);
        }
    }
}
