using Cp.Data;
using Cp.Model;
using Cp.Model.Sys;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cp.Business
{
    public class UserBLL
    {
        BaseDAL dal = new BaseDAL();
        public User UserLogin(string name,string pwd)
        {
            string sql = $"SELECT a.*,b.RoleID,c.`Name` as RoleName,c.RoleType FROM `user` a";
            sql += $" LEFT JOIN userrole b on a.RowID = b.UserID";
            sql += $" LEFT JOIN role c ON b.RoleID = c.RowID";
            sql += $" where a.Account = '{name}' AND a.Pwd = '{pwd}'";
            User user = dal.GetListBySql<User>(sql)?.FirstOrDefault();
            return user;
        }
    }
}
