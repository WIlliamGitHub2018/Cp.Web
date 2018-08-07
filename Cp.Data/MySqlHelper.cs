using Cp.Utility;
using MySql.Data.MySqlClient;
using System;
using System.Collections;
using System.Data;
using System.IO;
using System.Text;

namespace Cp.Data
{
    public class MySqlHelper
    {
        string connSting = "";

        public MySqlHelper(string _connSting)
        {
            connSting = _connSting;
        }

        /// <summary>
        /// 一个有效的数据库连接字符串
        /// </summary>
        /// <returns></returns>
        public string GetConnSting(string op = "")
        {
            //if (op == "get")
            //{
            //    connSting = connSting.Replace("online-eeac7fe24a0b4b05", "cn-north-1-79f2448673fc45e6");
            //}
            return connSting;
        }

        // 用于缓存参数的HASH表
        private Hashtable parmCache = Hashtable.Synchronized(new Hashtable());

        public bool TestConnect()
        {
            using (MySqlConnection conn = new MySqlConnection(GetConnSting()))
            {
                conn.Open();
                bool flag = conn.Ping();
                conn.Close();
                return flag;
            }
        }

        public int ExecuteNonQuery(string sql)
        {
            return ExecuteNonQuery(CommandType.Text, sql, null);
        }

        public int ExecuteNonQuery(string sql, params MySqlParameter[] commandParameters)
        {
            return ExecuteNonQuery(CommandType.Text, sql, commandParameters);
        }

        /// <summary>
        ///  给定连接的数据库用假设参数执行一个sql命令（不返回数据集）
        /// </summary>
        /// <param name="cmdType">命令类型(存储过程, 文本, 等等)</param>
        /// <param name="cmdText">存储过程名称或者sql命令语句</param>
        /// <param name="commandParameters">执行命令所用参数的集合</param>
        /// <returns>执行命令所影响的行数</returns>
        public int ExecuteNonQuery(CommandType cmdType, string cmdText, params MySqlParameter[] commandParameters)
        {
            MySqlCommand cmd = new MySqlCommand();
            MySqlConnection conn = null;
            try
            {
                using (conn = new MySqlConnection(GetConnSting()))
                {
                    PrepareCommand(cmd, conn, null, cmdType, cmdText, commandParameters);
                    int val = cmd.ExecuteNonQuery();
                    cmd.Parameters.Clear();
                    cmd.Dispose();
                    return val;
                }
            }
            catch (Exception ex)
            {
                string str = $"[ExecuteNonQuery]\r\n";
                str += $"[conn][{connSting}]\r\n";
                str += $"[sql][{cmdText}]";
                LogHelper.WriteException(str, ex, "异常", $"{nameof(MySqlHelper)}");
                return 0;
            }
            finally
            {
                if (null != conn)
                {
                    conn.Dispose();
                    conn.Close();
                }
            }
        }

        /// <summary>
        /// 用现有的数据库连接执行一个sql命令（不返回数据集）
        /// </summary>
        /// <param name="connection">一个现有的数据库连接</param>
        /// <param name="cmdType">命令类型(存储过程, 文本, 等等)</param>
        /// <param name="cmdText">存储过程名称或者sql命令语句</param>
        /// <param name="commandParameters">执行命令所用参数的集合</param>
        /// <returns>执行命令所影响的行数</returns>
        public int ExecuteNonQuery(MySqlConnection connection, CommandType cmdType, string cmdText, params MySqlParameter[] commandParameters)
        {
            MySqlCommand cmd = new MySqlCommand();
            PrepareCommand(cmd, connection, null, cmdType, cmdText, commandParameters);
            int val = cmd.ExecuteNonQuery();
            cmd.Parameters.Clear();
            return val;
        }

        /// <summary>
        ///使用现有的SQL事务执行一个sql命令（不返回数据集）
        /// </summary>
        /// <remarks>
        ///举例:
        ///  int result = ExecuteNonQuery(connString, CommandType.StoredProcedure, "PublishOrders", new MySqlParameter("@prodid", 24));
        /// </remarks>
        /// <param name="trans">一个现有的事务</param>
        /// <param name="cmdType">命令类型(存储过程, 文本, 等等)</param>
        /// <param name="cmdText">存储过程名称或者sql命令语句</param>
        /// <param name="commandParameters">执行命令所用参数的集合</param>
        /// <returns>执行命令所影响的行数</returns>
        public int ExecuteNonQuery(MySqlTransaction trans, CommandType cmdType, string cmdText, params MySqlParameter[] commandParameters)
        {
            MySqlCommand cmd = new MySqlCommand();
            PrepareCommand(cmd, trans.Connection, trans, cmdType, cmdText, commandParameters);
            int val = cmd.ExecuteNonQuery();
            cmd.Parameters.Clear();
            return val;
        }


        public MySqlDataReader ExecuteReader(string cmdText)
        {
            return ExecuteReader(CommandType.Text, cmdText, null);
        }


        public MySqlDataReader ExecuteReader(string cmdText, params MySqlParameter[] commandParameters)
        {
            return ExecuteReader(CommandType.Text, cmdText, commandParameters);
        }

        /// <summary>
        /// 用执行的数据库连接执行一个返回数据集的sql命令
        /// </summary>
        /// <remarks>
        /// 举例:
        ///  MySqlDataReader r = ExecuteReader(connString, CommandType.StoredProcedure, "PublishOrders", new MySqlParameter("@prodid", 24));
        /// </remarks>
        /// <param name="cmdType">命令类型(存储过程, 文本, 等等)</param>
        /// <param name="cmdText">存储过程名称或者sql命令语句</param>
        /// <param name="commandParameters">执行命令所用参数的集合</param>
        /// <returns>包含结果的读取器</returns>
        public MySqlDataReader ExecuteReader(CommandType cmdType, string cmdText, params MySqlParameter[] commandParameters)
        {
            //创建一个MySqlCommand对象
            MySqlCommand cmd = new MySqlCommand();
            //创建一个MySqlConnection对象
            MySqlConnection conn = new MySqlConnection(GetConnSting("get"));

            //在这里我们用一个try/catch结构执行sql文本命令/存储过程，因为如果这个方法产生一个异常我们要关闭连接，因为没有读取器存在，
            //因此commandBehaviour.CloseConnection 就不会执行
            try
            {
                //调用 PrepareCommand 方法，对 MySqlCommand 对象设置参数
                PrepareCommand(cmd, conn, null, cmdType, cmdText, commandParameters);
                //调用 MySqlCommand  的 ExecuteReader 方法
                MySqlDataReader reader = cmd.ExecuteReader(CommandBehavior.CloseConnection);
                //清除参数
                cmd.Parameters.Clear();
                cmd.Dispose();
                return reader;
            }
            catch (Exception ex)
            {
                //关闭连接，抛出异常
                string str = $"[ExecuteReader]\r\n";
                str += $"[conn][{connSting}]\r\n";
                str += $"[sql][{cmdText}]";
                LogHelper.WriteException(str, ex, "异常", $"{nameof(MySqlHelper)}");
                return null;
            }
            finally
            {
                if (null != conn)
                {
                    conn.Dispose();
                    conn.Close();
                }
            }
        }

        public DataSet GetDataSet(string cmdText)
        {
            return GetDataSet(CommandType.Text, cmdText, null);
        }

        public DataSet GetDataSet(string cmdText, params MySqlParameter[] commandParameters)
        {
            return GetDataSet(CommandType.Text, cmdText, commandParameters);
        }

        /// <summary>
        /// 返回DataSet
        /// </summary>
        /// <param name="cmdType">命令类型(存储过程, 文本, 等等)</param>
        /// <param name="cmdText">存储过程名称或者sql命令语句</param>
        /// <param name="commandParameters">执行命令所用参数的集合</param>
        /// <returns></returns>
        public DataSet GetDataSet(CommandType cmdType, string cmdText, params MySqlParameter[] commandParameters)
        {
            //创建一个MySqlCommand对象
            MySqlCommand cmd = new MySqlCommand();
            //创建一个MySqlConnection对象
            MySqlConnection conn = null;

            //在这里我们用一个try/catch结构执行sql文本命令/存储过程，因为如果这个方法产生一个异常我们要关闭连接，因为没有读取器存在，
            try
            {
                //调用 PrepareCommand 方法，对 MySqlCommand 对象设置参数
                using (conn = new MySqlConnection(GetConnSting("get")))
                {
                    DateTime s = DateTime.Now;

                    PrepareCommand(cmd, conn, null, cmdType, cmdText, commandParameters);
                    //调用 MySqlCommand  的 ExecuteReader 方法
                    MySqlDataAdapter adapter = new MySqlDataAdapter();
                    adapter.SelectCommand = cmd;
                    DataSet ds = new DataSet();
                    adapter.Fill(ds);
                    cmd.Parameters.Clear();
                    cmd.Dispose();

                    if ((DateTime.Now - s).Seconds > 2)
                    {
                        string msg = $"[耗时sql]\r\n";
                        msg += $"[conn][{connSting}]\r\n";
                        msg += $"[sql][{cmdText}]";
                        LogHelper.Write(msg, "耗时", $"{nameof(MySqlHelper)}");
                    }

                    return ds;
                }
            }
            catch (Exception ex)
            {
                string str = $"[ExecuteScalar]\r\n";
                str += $"[conn][{connSting}]\r\n";
                str += $"[sql][{cmdText}]";
                LogHelper.WriteException(str, ex, "异常", $"{nameof(MySqlHelper)}");
                return null;
            }
            finally
            {
                if (null != conn)
                {
                    conn.Dispose();
                    conn.Close();
                }
            }
        }





        public object ExecuteScalar(string cmdText)
        {
            return ExecuteScalar(CommandType.Text, cmdText, null);
        }

        public object ExecuteScalar(string cmdText, params MySqlParameter[] commandParameters)
        {
            return ExecuteScalar(CommandType.Text, cmdText, commandParameters);
        }

        /// <summary>
        /// 用指定的数据库连接字符串执行一个命令并返回一个数据集的第一列
        /// </summary>
        /// <remarks>
        ///例如:
        ///  Object obj = ExecuteScalar(connString, CommandType.StoredProcedure, "PublishOrders", new MySqlParameter("@prodid", 24));
        /// </remarks>
        /// <param name="cmdType">命令类型(存储过程, 文本, 等等)</param>
        /// <param name="cmdText">存储过程名称或者sql命令语句</param>
        /// <param name="commandParameters">执行命令所用参数的集合</param>
        /// <returns>用 Convert.To{Type}把类型转换为想要的 </returns>
        public object ExecuteScalar(CommandType cmdType, string cmdText, params MySqlParameter[] commandParameters)
        {
            MySqlCommand cmd = new MySqlCommand();
            MySqlConnection conn = null;
            try
            {
                using (conn = new MySqlConnection(GetConnSting()))
                {
                    PrepareCommand(cmd, conn, null, cmdType, cmdText, commandParameters);
                    object val = cmd.ExecuteScalar();
                    cmd.Parameters.Clear();
                    cmd.Dispose();
                    return val;
                }
            }
            catch (Exception ex)
            {
                string str = $"[ExecuteScalar]\r\n";
                str += $"[conn][{connSting}]\r\n";
                str += $"[sql][{cmdText}]";
                LogHelper.WriteException(str, ex, "异常", $"{nameof(MySqlHelper)}");
                return 0;
            }
            finally
            {
                if (null != conn)
                {
                    conn.Dispose();
                }
            }
        }

        /// <summary>
        /// 用指定的数据库连接执行一个命令并返回一个数据集的第一列
        /// </summary>
        /// <remarks>
        /// 例如:
        ///  Object obj = ExecuteScalar(connString, CommandType.StoredProcedure, "PublishOrders", new MySqlParameter("@prodid", 24));
        /// </remarks>
        /// <param name="connection">一个存在的数据库连接</param>
        /// <param name="cmdType">命令类型(存储过程, 文本, 等等)</param>
        /// <param name="cmdText">存储过程名称或者sql命令语句</param>
        /// <param name="commandParameters">执行命令所用参数的集合</param>
        /// <returns>用 Convert.To{Type}把类型转换为想要的 </returns>
        public object ExecuteScalar(MySqlConnection connection, CommandType cmdType, string cmdText, params MySqlParameter[] commandParameters)
        {

            MySqlCommand cmd = new MySqlCommand();

            PrepareCommand(cmd, connection, null, cmdType, cmdText, commandParameters);
            object val = cmd.ExecuteScalar();
            cmd.Parameters.Clear();
            return val;
        }

        /// <summary>
        /// 将参数集合添加到缓存
        /// </summary>
        /// <param name="cacheKey">添加到缓存的变量</param>
        /// <param name="commandParameters">一个将要添加到缓存的sql参数集合</param>
        public void CacheParameters(string cacheKey, params MySqlParameter[] commandParameters)
        {
            parmCache[cacheKey] = commandParameters;
        }

        /// <summary>
        /// 找回缓存参数集合
        /// </summary>
        /// <param name="cacheKey">用于找回参数的关键字</param>
        /// <returns>缓存的参数集合</returns>
        public MySqlParameter[] GetCachedParameters(string cacheKey)
        {
            MySqlParameter[] cachedParms = (MySqlParameter[])parmCache[cacheKey];

            if (cachedParms == null)
                return null;

            MySqlParameter[] clonedParms = new MySqlParameter[cachedParms.Length];
            for (int i = 0, j = cachedParms.Length; i < j; i++)
                clonedParms[i] = (MySqlParameter)((ICloneable)cachedParms[i]).Clone();

            return clonedParms;
        }

        /// <summary>
        /// 准备执行一个命令
        /// </summary>
        /// <param name="cmd">sql命令</param>
        /// <param name="conn">OleDb连接</param>
        /// <param name="trans">OleDb事务</param>
        /// <param name="cmdType">命令类型例如 存储过程或者文本</param>
        /// <param name="cmdText">命令文本,例如:Select * from Products</param>
        /// <param name="cmdParms">执行命令的参数</param>
        private void PrepareCommand(MySqlCommand cmd, MySqlConnection conn, MySqlTransaction trans, CommandType cmdType, string cmdText, MySqlParameter[] cmdParms)
        {

            if (conn.State != ConnectionState.Open)
                conn.Open();

            cmd.Connection = conn;
            cmd.CommandText = cmdText;

            if (trans != null)
                cmd.Transaction = trans;

            cmd.CommandType = cmdType;

            if (cmdParms != null)
            {
                foreach (MySqlParameter parm in cmdParms)
                    cmd.Parameters.Add(parm);
            }
        }

        public DataTable GetCommPaddMySQL(string sqlStr, int curNum, int pageNum, ref int totalCount)
        {
            DataTable dt_MySQL = new DataTable();
            if (curNum < 1)
            {
                curNum = 1;
            }
            int startPageNum = (curNum - 1) * pageNum;
            StringBuilder sql = new StringBuilder();
            sql.Append(sqlStr);
            sql.Append(" limit ");
            sql.Append(startPageNum.ToString());
            sql.Append(",");
            sql.Append(pageNum.ToString());
            sql.Append(";SELECT FOUND_ROWS();");
            DataSet ds = GetDataSet(sql.ToString());
            dt_MySQL = ds.Tables[0];
            if (!string.IsNullOrEmpty(ds.Tables[1].Rows[0][0].ToString()))
                totalCount = Convert.ToInt32(ds.Tables[1].Rows[0][0].ToString());
            else
                totalCount = 0;

            return dt_MySQL;
        }

        public DataTable GetCommPaddMySQL(string fieldList, string tbName, int curNum, int pageNum, ref int totalCount, string sqlWhere, string orderBy)
        {
            DataTable dt_MySQL = new DataTable();
            if (curNum < 1)
            {
                curNum = 1;
            }
            int startPageNum = (curNum - 1) * pageNum;
            StringBuilder sql = new StringBuilder();
            sql.Append("SELECT SQL_CALC_FOUND_ROWS");
            sql.Append(fieldList);
            sql.Append(" FROM ");
            sql.Append(tbName);
            sql.Append(" WHERE ");
            sql.Append(sqlWhere);
            if (!string.IsNullOrEmpty(orderBy))
            {
                sql.Append(" Order By ");
                sql.Append(orderBy);
            }
            sql.Append(" limit ");
            sql.Append(startPageNum.ToString());
            sql.Append(",");
            sql.Append(pageNum.ToString());
            sql.Append(";SELECT FOUND_ROWS();");
            DataSet ds = GetDataSet(sql.ToString());
            dt_MySQL = ds.Tables[0];
            if (!string.IsNullOrEmpty(ds.Tables[1].Rows[0][0].ToString()))
                totalCount = Convert.ToInt32(ds.Tables[1].Rows[0][0].ToString());
            else
                totalCount = 0;

            return dt_MySQL;
        }

        // 取最大的ID  
        public Int32 GetMaxId(out string sError, string sKeyField, string sTableName)
        {
            DataTable dt = GetDataTable(out sError, "select IFNULL(max(" + sKeyField + "),0) as MaxID from " + sTableName);
            if (dt != null && dt.Rows.Count > 0)
            {
                return Convert.ToInt32(dt.Rows[0][0].ToString());
            }
            return 0;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="dbName"></param>
        /// <returns></returns>
        public bool IsExistDataBase(string dbName)
        {
            string sql = string.Format("SELECT * FROM information_schema.SCHEMATA where SCHEMA_NAME='" + dbName + "';");
            return ExecuteNonQuery(sql) > 0;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="dbName"></param>
        /// <returns></returns>
        public bool CreateDataBase(string dbName)
        {
            string sql = string.Format("CREATE DATABASE `" + dbName + "` /*!40100 DEFAULT CHARACTER SET utf8 */;");
            return ExecuteNonQuery(sql) > 0;
        }

        public DataTable GetDataTable(out string sError, string sql)
        {
            DataTable dt = null;
            sError = string.Empty;
            MySqlConnection myConn = null;
            try
            {
                myConn = new MySqlConnection(GetConnSting("get"));
                MySqlCommand myCommand = new MySqlCommand(sql, myConn);
                myConn.Open();
                MySqlDataAdapter adapter = new MySqlDataAdapter(myCommand);
                dt = new DataTable();
                adapter.Fill(dt);
                myCommand.Dispose();
            }
            catch (Exception ex)
            {
                string str = $"[GetDataTable]\r\n";
                str += $"[conn][{connSting}]\r\n";
                str += $"[sql][{sql}]";
                LogHelper.WriteException(str, ex, "异常", $"{nameof(MySqlHelper)}");
            }
            finally
            {
                if (null != myConn)
                {
                    myConn.Dispose();
                    myConn.Close();
                }
            }
            return dt;
        }

        public bool IsExistTable(string tableName)
        {
            string sql = string.Format("select TABLE_NAME from INFORMATION_SCHEMA.TABLES where TABLE_SCHEMA='reaper' and TABLE_NAME='" + tableName + "' ;");
            return ExecuteNonQuery(sql) > 0;
        }

        public bool CreateTable(string path)
        {
            StreamReader file = new StreamReader(path, Encoding.Default);
            if (file == null)
                return false;

            string sqlStr = file.ReadToEnd();

            return ExecuteNonQuery(sqlStr) > 0;
        }



        /// <summary>
        /// 单引号包围
        /// </summary>
        /// <param name="str"></param>
        /// <returns></returns>
        public string AddSingleQuoteMark(string str)
        {
            if (string.IsNullOrEmpty(str))
                return "''";
            return "'" + str.Replace("'", "''") + "'";
        }




        /// <summary>
        /// @Author:      HTL
        /// @Email:       Huangyuan413026@163.com
        /// @DateTime:    2015-06-03 19:54:49
        /// @Description: 获取当前堆栈的上级调用方法列表,直到最终调用者,只会返回调用的各方法,而不会返回具体的出错行数，可参考：微软真是个十足的混蛋啊！让我们跟踪Exception到行把！（不明真相群众请入） 
        /// </summary>
        /// <returns></returns>
        private string GetStackTraceModelName()
        {
            //当前堆栈信息
            System.Diagnostics.StackTrace st = new System.Diagnostics.StackTrace();
            System.Diagnostics.StackFrame[] sfs = st.GetFrames();
            //过虑的方法名称,以下方法将不会出现在返回的方法调用列表中
            string _filterdName = "ResponseWrite,ResponseWriteError,";
            string _fullName = string.Empty, _methodName = string.Empty;
            for (int i = 1; i < sfs.Length; ++i)
            {
                //非用户代码,系统方法及后面的都是系统调用，不获取用户代码调用结束
                if (System.Diagnostics.StackFrame.OFFSET_UNKNOWN == sfs[i].GetILOffset()) break;
                _methodName = sfs[i].GetMethod().Name;//方法名称
                                                      //sfs[i].GetFileLineNumber();//没有PDB文件的情况下将始终返回0
                if (_filterdName.Contains(_methodName)) continue;
                _fullName = _methodName + "()->" + _fullName;
            }
            st = null;
            sfs = null;
            _filterdName = _methodName = null;
            return _fullName.TrimEnd('-', '>');
        }
    }
}
