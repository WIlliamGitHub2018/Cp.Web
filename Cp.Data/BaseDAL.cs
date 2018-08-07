using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Configuration;
using System.Reflection;
using System.Data;

using MySql.Data.MySqlClient;
using Cp.Model;
using Cp.Model.Attributes;

namespace Cp.Data
{
    public class BaseDAL : IDisposable
    {

        public static string GetDefaultConnSting()
        {
            return ConfigurationManager.ConnectionStrings["Normandy"].ConnectionString;
        }
        public static string GetLogConnSting()
        {
            return ConfigurationManager.ConnectionStrings["BaseLog"].ConnectionString;
        }

       

        public int GetCount<T>(string strWhere = "1=1") where T : BaseEntity, new()
        {
            int iValue = 0;
            string connStr = GetDefaultConnSting();

            MySqlHelper mySqlSvr = new MySqlHelper(connStr);

            string sql = string.Format("select count(RowID) from {0} where {1}", typeof(T).Name, strWhere);
            object o = mySqlSvr.ExecuteScalar(sql);
            if (null == o)
            {
                return 0;
            }
            int.TryParse(o.ToString(), out iValue);
            return iValue;
        }

        public int executeSql(string groupCode, string resortCode,string sql) {
            

            MySqlHelper mySqlSvr = new MySqlHelper(GetDefaultConnSting());

            //string sql = string.Format("select count(RowID) from {0} where {1}", typeof(T).Name, strWhere);
            return mySqlSvr.ExecuteNonQuery(sql);
        }
        public int executeSqlDefault(string sql)
        {
            string connStr = GetDefaultConnSting();

            MySqlHelper mySqlSvr = new MySqlHelper(connStr);

            //string sql = string.Format("select count(RowID) from {0} where {1}", typeof(T).Name, strWhere);
            return mySqlSvr.ExecuteNonQuery(sql);
        }
        public int executeScalarSql(string sql)
        {

            int iValue = 0;
            MySqlHelper mySqlSvr = new MySqlHelper(GetDefaultConnSting());

            //string sql = string.Format("select count(RowID) from {0} where {1}", typeof(T).Name, strWhere);
            object o = mySqlSvr.ExecuteScalar(sql);
            if (null == o)
            {
                return 0;
            }
            int.TryParse(o.ToString(), out iValue);
            return iValue;
        }
        

        public bool Save<T>(T t) where T : BaseEntity
        {
            //此处不处理酒店表 集团表 集团区域表
            int rowID = InsertFromEntity(t);
            if (rowID != 0)
            {
                t.RowID = rowID;
                return true;
            }
            return false;
        }
        public bool Update<T>(T t) where T : BaseEntity, new()
        {
            //
            T oldT = GetByRowID<T>(t.RowID);
            if (null == oldT)
            {
                //不存在
                return false;
            }
            int result = UpdateFromEntity<T>(oldT, t);
            if (result > 0)
            {
                return true;
            }
            return false;
        }
        

        public bool Delete<T>(int rowID) where T : BaseEntity, new()
        {
            T t = new T();
            t.RowID = rowID;
            return Delete<T>(t);
        }
        public bool Delete<T>(T t) where T : BaseEntity, new()
        {
            int result = DelFromEntity<T>(t);
            if (result > 0)
            {
                return true;
            }
            return false;
        }

        public T GetByRowID<T>(T t) where T : BaseEntity, new()
        {
            return GetByRowID<T>(t.RowID);
        }

        public T GetByRowID<T>(int rowID) where T : BaseEntity, new()
        {

            string connStr = GetDefaultConnSting();
           

            MySqlHelper mySqlSvr = new MySqlHelper(connStr);
            string sql = string.Format("select * from {0} where RowID=?RowID", typeof(T).Name);
            DataSet ds = mySqlSvr.GetDataSet(sql, new MySqlParameter("?RowID", rowID));
            if (ds == null || ds.Tables == null || ds.Tables.Count <= 0)
            {
                return null;
            }
            if (ds.Tables[0].Rows == null || ds.Tables[0].Rows.Count <= 0)
            {
                return null;
            }
            return GetFromDataRow<T>(ds.Tables[0].Rows[0]);
        }
        public T GetByRowID<T>(string groupCode, string resortCode, string where) where T : BaseEntity, new()
        {

            string connStr = GetDefaultConnSting();

            MySqlHelper mySqlSvr = new MySqlHelper(connStr);
            string sql = string.Format("select * from {0} where {1}", typeof(T).Name, where);
            DataSet ds = mySqlSvr.GetDataSet(sql);
            if (ds == null || ds.Tables == null || ds.Tables.Count <= 0)
            {
                return null;
            }
            if (ds.Tables[0].Rows == null || ds.Tables[0].Rows.Count <= 0)
            {
                return null;
            }
            return GetFromDataRow<T>(ds.Tables[0].Rows[0]);
        }
        public List<T> GetList<T>(string strWhere = "1=1", string orderBy = "RowID") where T : BaseEntity, new()
        {
            T connEntity = new T();

            return GetList<T>(connEntity, strWhere, orderBy);
        }
        public List<T> GetList<T>(T t, string strWhere = "1=1", string orderBy = "RowID") where T : BaseEntity, new()
        {
            string connStr = GetDefaultConnSting(); ;
            
            MySqlHelper mySqlSvr = new MySqlHelper(connStr);

            string sql = string.Format("select * from {0} where  {1} order by {2} LIMIT 0,{3}", typeof(T).Name, strWhere, orderBy, 1000);
            DataSet ds = mySqlSvr.GetDataSet(sql);
            if (ds == null || ds.Tables == null || ds.Tables.Count <= 0)
            {
                return new List<T>();
            }
            if (ds.Tables[0].Rows == null || ds.Tables[0].Rows.Count <= 0)
            {
                return new List<T>();
            }
            return GetFromDataRows<T>(ds.Tables[0].Rows);
        }
       
        public List<T> GetListBySql<T>(string sql, string orderBy = "RowID") where T : BaseEntity, new()
        {
            string connStr = GetDefaultConnSting(); ;
           

            MySqlHelper mySqlSvr = new MySqlHelper(connStr);

            string selectSql = string.Format("{0} order by {1} LIMIT 0,1000", sql, orderBy);
            DataSet ds = mySqlSvr.GetDataSet(selectSql);
            if (ds == null || ds.Tables == null || ds.Tables.Count <= 0)
            {
                return new List<T>();
            }
            if (ds.Tables[0].Rows == null || ds.Tables[0].Rows.Count <= 0)
            {
                return new List<T>();
            }
            return GetFromDataRows<T>(ds.Tables[0].Rows);
        }
        public List<T> GetListPage<T>(int pageNo, int pageSize, out int recordCount, string strWhere = "1=1", string fieldList = "*", string orderBy = "RowID") where T : BaseEntity, new()
        {
            T connEntity = new T();

            return GetListPage<T>(connEntity, pageNo, pageSize, out recordCount, strWhere, fieldList, orderBy);
        }

        public List<T> GetListPage<T>(T t, int pageNo, int pageSize, out int recordCount, string strWhere = "1=1", string fieldList = "*", string orderBy = "RowID") where T : BaseEntity, new()
        {
            recordCount = 0;
            string connStr = GetDefaultConnSting();
           
            MySqlHelper mySqlSvr = new MySqlHelper(connStr);
            DataTable dt = mySqlSvr.GetCommPaddMySQL(fieldList, typeof(T).Name, pageNo, pageSize, ref recordCount, strWhere, orderBy);
            if (dt.Rows == null || dt.Rows.Count <= 0)
            {
                return new List<T>();
            }
            return GetFromDataRows<T>(dt.Rows);
        }

        public List<T> GetListPage<T>(string groupCode, string resortCode, string sql, int pageNo, int pageSize, out int recordCount) where T : BaseEntity, new()
        {
            T connEntity = new T();
            return GetListPage<T>(connEntity, sql, pageNo, pageSize, out recordCount);
        }

        public List<T> GetListPage<T>(T t, string sql, int pageNo, int pageSize, out int recordCount) where T : BaseEntity, new()
        {
            recordCount = 0;
            string connStr = GetDefaultConnSting();
           

            MySqlHelper mySqlSvr = new MySqlHelper(connStr);
            DataTable dt = mySqlSvr.GetCommPaddMySQL(sql, pageNo, pageSize, ref recordCount);
            if (dt.Rows == null || dt.Rows.Count <= 0)
            {
                return new List<T>();
            }
            return GetFromDataRows<T>(dt.Rows);
        }

        public DataRow GetTableByRowID<T>(T t) where T : BaseEntity, new()
        {
            return GetTableByRowID<T>(t.RowID);
        }

        public DataRow GetTableByRowID<T>(int rowID) where T : BaseEntity, new()
        {

            string connStr = GetDefaultConnSting();
           
            MySqlHelper mySqlSvr = new MySqlHelper(connStr);
            string sql = string.Format("select * from {0} where RowID=?RowID", typeof(T).Name);
            DataSet ds = mySqlSvr.GetDataSet(sql, new MySqlParameter("?RowID", rowID));
            if (ds == null || ds.Tables == null || ds.Tables.Count <= 0)
            {
                return null;
            }
            if (ds.Tables[0].Rows == null || ds.Tables[0].Rows.Count <= 0)
            {
                return null;
            }
            return ds.Tables[0].Rows[0];
        }

        public DataTable GetListTable<T>(string strWhere = "1=1", string orderBy = "RowID") where T : BaseEntity, new()
        {
            T connEntity = new T();
            return GetListTable<T>(connEntity, strWhere, orderBy);
        }
        public DataTable GetListTable<T>(T t, string strWhere = "1=1", string orderBy = "RowID") where T : BaseEntity, new()
        {
            string connStr = GetDefaultConnSting();

            MySqlHelper mySqlSvr = new MySqlHelper(connStr);

            string sql = string.Format("select * from {0} where {1} order by {2} LIMIT 0,1000", typeof(T).Name, strWhere, orderBy);
            DataSet ds = mySqlSvr.GetDataSet(sql);
            if (ds == null || ds.Tables == null || ds.Tables.Count <= 0)
            {
                return new DataTable();
            }
            return ds.Tables[0];
        }

        public DataTable GetListPageTable<T>(int pageNo, int pageSize, out int recordCount, string strWhere = "1=1", string fieldList = "*", string orderBy = "RowID") where T : BaseEntity, new()
        {
            T connEntity = new T();

            return GetListPageTable<T>(connEntity, pageNo, pageSize, out recordCount, strWhere, fieldList, orderBy);
        }

        public DataTable GetListPageTable<T>(T t, int pageNo, int pageSize, out int recordCount, string strWhere = "1=1", string fieldList = "*", string orderBy = "RowID") where T : BaseEntity, new()
        {
            recordCount = 0;
            string connStr = GetDefaultConnSting();
           

            MySqlHelper mySqlSvr = new MySqlHelper(connStr);
            DataTable dt = mySqlSvr.GetCommPaddMySQL(fieldList, typeof(T).Name, pageNo, pageSize, ref recordCount, strWhere, orderBy);
            return dt;
        }

        public DataTable GetListPageTable<T>(string groupCode, string resortCode, string sql, int pageNo, int pageSize, out int recordCount) where T : BaseEntity, new()
        {
            T connEntity = new T();

            return GetListPageTable<T>(connEntity, sql, pageNo, pageSize, out recordCount);
        }

        public DataTable GetListPageTable<T>(T t, string sql, int pageNo, int pageSize, out int recordCount) where T : BaseEntity, new()
        {
            recordCount = 0;
            string connStr = GetDefaultConnSting();

            MySqlHelper mySqlSvr = new MySqlHelper(connStr);
            DataTable dt = mySqlSvr.GetCommPaddMySQL(sql, pageNo, pageSize, ref recordCount);
            return dt;
        }

        public static void RemoveDataTableFromEntity<T>(T t, DataTable dt) where T : BaseEntity, new()
        {
            DataRow[] drList = dt.Select("RowID=" + t.RowID);
            if (null == drList || drList.Count() <= 0)
            {
                return;
            }
            dt.Rows.Remove(drList[0]);
        }

        public static void GetDataTableFromEntity<T>(T t, DataTable dt) where T : BaseEntity, new()
        {
            DataRow dr = dt.NewRow();
            PropertyInfo[] proList = typeof(T).GetProperties();
            foreach (PropertyInfo pro in proList)
            {
                if (dt.Columns.Contains(pro.Name))
                {
                    dr[pro.Name] = pro.GetValue(t);
                }
            }
            dt.Rows.Add(dr);
        }
        public static void GetDataTableFromEntitys<T>(List<T> tList, DataTable dt) where T : BaseEntity, new()
        {
            DataRow dr;
            PropertyInfo[] proList = typeof(T).GetProperties();
            foreach (T t in tList)
            {
                dr = dt.NewRow();
                foreach (PropertyInfo pro in proList)
                {
                    if (dt.Columns.Contains(pro.Name))
                    {
                        dr[pro.Name] = pro.GetValue(t);
                    }
                }
                dt.Rows.Add(dr);
            }
        }


        public static T GetFromDataRow<T>(DataRow dr) where T : BaseEntity, new()
        {
            T t = new T();
            PropertyInfo[] proList = typeof(T).GetProperties();
            foreach (PropertyInfo pro in proList)
            {
                GetFieldValue(pro, dr, t);

            }
            return t;
        }



        private static object GetFieldDefaultValue(PropertyInfo pro)
        {
            switch (pro.PropertyType.Name)
            {
                case "decimal":

                case "int":
                    return 0;
                case "DateTime":
                    return new DateTime(1970, 1, 1);
                default:
                    return string.Empty;
            }
        }
        private static void GetFieldValue<T>(PropertyInfo pro, DataRow dr, T t)
        {
            if (!dr.Table.Columns.Contains(pro.Name))
            {
                return;
            }

            switch (pro.PropertyType.Name)
            {
                case "decimal":
                case "Decimal":
                    if (dr.IsNull(pro.Name))
                    {
                        pro.SetValue(t, decimal.Zero);
                    }
                    decimal dValue = decimal.Zero;
                    decimal.TryParse(dr[pro.Name].ToString(), out dValue);
                    pro.SetValue(t, dValue);
                    break;
                case "int":
                case "Int32":
                    if (dr.IsNull(pro.Name))
                    {
                        pro.SetValue(t, 0);
                    }
                    int iValue = 0;
                    int.TryParse(dr[pro.Name].ToString(), out iValue);
                    pro.SetValue(t, iValue);
                    break;
                case "DateTime":
                    DateTime dtValue = DateTime.MinValue;
                    if (dr.IsNull(pro.Name))
                    {
                        pro.SetValue(t, dtValue);
                    }
                    DateTime.TryParse(dr[pro.Name].ToString(), out dtValue);
                    pro.SetValue(t, dtValue);
                    break;
                default:
                    if (dr.IsNull(pro.Name))
                    {
                        pro.SetValue(t, string.Empty);
                    }
                    pro.SetValue(t, dr.Field<string>(pro.Name));
                    break;
            }
        }

        public static List<T> GetFromDataRows<T>(DataRow[] drList) where T : BaseEntity, new()
        {
            if (null == drList || drList.Count() <= 0)
            {              
                return new List<T>();
            }
            List<T> tList = new List<T>();

            PropertyInfo[] proList = typeof(T).GetProperties();
            foreach (DataRow dr in drList)
            {
                T t = new T();
                foreach (PropertyInfo pro in proList)
                {
                    Attribute noDBAttr = pro.GetCustomAttribute(typeof(NoDBAttribute));
                    if (noDBAttr != null)
                    {
                        continue;
                    }

                    GetFieldValue(pro, dr, t);
                }
                tList.Add(t);
            }          
            return tList;
        }
        public static List<T> GetFromDataRows<T>(DataRowCollection drList) where T : BaseEntity, new()
        {
            if (null == drList || drList.Count <= 0)
            {
                return new List<T>();
            }
            List<T> tList = new List<T>();

            PropertyInfo[] proList = typeof(T).GetProperties();
            foreach (DataRow dr in drList)
            {
                T t = new T();
                foreach (PropertyInfo pro in proList)
                {
                    Attribute noDBAttr = pro.GetCustomAttribute(typeof(NoDBAttribute));
                    if (noDBAttr != null)
                    {
                        continue;
                    }

                    GetFieldValue(pro, dr, t);
                }
                tList.Add(t);
            }
            return tList;
        }
        /// <summary>
        /// 指定存储到位置
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="t"></param>
        /// <param name="groupCode"></param>
        /// <param name="resortCode"></param>
        /// <returns></returns>
        private static int InsertFromEntity<T>(T t) where T : BaseEntity
        {
            string connStr = GetDefaultConnSting();
           
            MySqlHelper mySqlSvr = new MySqlHelper(connStr);

            List<MySqlParameter> parms = new List<MySqlParameter>();
            //
            PropertyInfo[] proList = typeof(T).GetProperties();
            StringBuilder sqlStr = new StringBuilder();
            StringBuilder valueStr = new StringBuilder();
            sqlStr.Append("insert into ");
            sqlStr.Append(typeof(T).Name);
            sqlStr.Append(" (");

            valueStr.Append(" values(");
            foreach (PropertyInfo pro in proList)
            {
                if (pro.Name.ToUpper() == "ROWID")
                {
                    continue;
                }
                Attribute noDBAttr = pro.GetCustomAttribute(typeof(NoDBAttribute));
                if (noDBAttr != null)
                {
                    continue;
                }
                sqlStr.Append("`");
                sqlStr.Append(pro.Name);
                sqlStr.Append("`,");

                valueStr.Append("?");
                valueStr.Append(pro.Name);
                valueStr.Append(",");

                object value = pro.GetValue(t);

                parms.Add(new MySqlParameter("?" + pro.Name, value));

            }
            sqlStr.Remove(sqlStr.Length - 1, 1);
            valueStr.Remove(valueStr.Length - 1, 1);
            valueStr.Append(")");
            sqlStr.Append(")");
            sqlStr.Append(valueStr.ToString());
            sqlStr.Append(";select last_insert_id() as id;");
            object rowID = mySqlSvr.ExecuteScalar(sqlStr.ToString(), parms.ToArray());
            if (null == rowID)
            {
                //RecordInfo(sqlStr.ToString(), "sqlLog");
                return 0;
            }
            else
            {
                return Convert.ToInt32(rowID);
            }
        }
        
        private static int UpdateFromEntity<T>(T oldT, T newT) where T : BaseEntity
        {
            string connStr = GetDefaultConnSting();
            

            MySqlHelper mySqlSvr = new MySqlHelper(connStr);
            List<MySqlParameter> parms = new List<MySqlParameter>();
            //
            PropertyInfo[] proList = typeof(T).GetProperties();
            StringBuilder sqlStr = new StringBuilder();
            bool hasChange = false;
            sqlStr.Append("update ");
            sqlStr.Append(typeof(T).Name);
            sqlStr.Append(" set ");
            foreach (PropertyInfo pro in proList)
            {
                if (pro.Name.ToUpper() == "ROWID")
                {
                    continue;
                }
                Attribute noDBAttr = pro.GetCustomAttribute(typeof(NoDBAttribute));
                if (noDBAttr != null)
                {
                    continue;
                }
                object oldValue = pro.GetValue(oldT);
                object newValue = pro.GetValue(newT);
                if (oldValue == null)
                {
                    oldValue = GetFieldDefaultValue(pro);
                }
                if (newValue == null)
                {
                    newValue = GetFieldDefaultValue(pro);
                }
                if (oldValue.ToString() != newValue.ToString())
                {
                    //有变化，更新
                    sqlStr.Append("`");
                    sqlStr.Append(pro.Name);
                    sqlStr.Append("`=");

                    sqlStr.Append("?");
                    sqlStr.Append(pro.Name);
                    sqlStr.Append(",");
                    parms.Add(new MySqlParameter("?" + pro.Name, newValue));

                    hasChange = true;
                }
            }
            sqlStr.Remove(sqlStr.Length - 1, 1);
            sqlStr.Append(" where RowID=");

            sqlStr.Append(oldT.RowID.ToString());
            //sqlStr.Append(proList);
            if (hasChange)
            {
                return mySqlSvr.ExecuteNonQuery(sqlStr.ToString(), parms.ToArray());
            }
            return 0;
        }
        private static int DelFromEntity<T>(T t) where T : BaseEntity
        {
            string connStr = GetDefaultConnSting();
            

            MySqlHelper mySqlSvr = new MySqlHelper(connStr);

            string sql = string.Format("delete from {0} where RowID=?RowID", typeof(T).Name);
            return mySqlSvr.ExecuteNonQuery(sql, new MySqlParameter("?RowID", t.RowID));
        }

        
       


        

        #region DefaultDB
        public List<T> GetListDefault<T>(string strWhere = "1=1", string orderBy = "RowID") where T : BaseEntity, new()
        {

            MySqlHelper mySqlSvr = new MySqlHelper(GetDefaultConnSting());

            string sql = string.Format("select * from {0} where {1} order by {2} LIMIT 0,1000", typeof(T).Name, strWhere, orderBy);
            DataSet ds = mySqlSvr.GetDataSet(sql);
            if (ds == null || ds.Tables == null || ds.Tables.Count <= 0)
            {
                return new List<T>();
            }
            if (ds.Tables[0].Rows == null || ds.Tables[0].Rows.Count <= 0)
            {
                return new List<T>();
            }
            return GetFromDataRows<T>(ds.Tables[0].Rows);
        }

        public List<T> GetListPageDefault<T>(int pageNo, int pageSize, out int recordCount, string strWhere = "1=1", string fieldList = "*", string orderBy = "RowID",string tableName=null) where T : BaseEntity, new()
        {
            recordCount = 0;
            string name = typeof(T).Name;
            if (!string.IsNullOrEmpty(tableName)) {
                name = tableName;
            }
            MySqlHelper mySqlSvr = new MySqlHelper(GetDefaultConnSting());
            DataTable dt = mySqlSvr.GetCommPaddMySQL(fieldList, name, pageNo, pageSize, ref recordCount, strWhere, orderBy);
            if (dt.Rows == null || dt.Rows.Count <= 0)
            {
                return new List<T>();
            }
            return GetFromDataRows<T>(dt.Rows);
        }

        public List<T> GetListDefaultOnSql<T>(string sql = "1=1") where T : BaseEntity, new()
        {

            MySqlHelper mySqlSvr = new MySqlHelper(GetDefaultConnSting());

            DataSet ds = mySqlSvr.GetDataSet(sql);
            if (ds == null || ds.Tables == null || ds.Tables.Count <= 0)
            {
                return new List<T>();
            }
            if (ds.Tables[0].Rows == null || ds.Tables[0].Rows.Count <= 0)
            {
                return new List<T>();
            }
            return GetFromDataRows<T>(ds.Tables[0].Rows);
        }
        #endregion


        #region 继承的IDisposable内容
        private bool disposed = false;

        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    //Context.Dispose();
                }
            }
            this.disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
        #endregion
    }
}
