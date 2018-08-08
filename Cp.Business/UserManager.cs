using Cp.Model.Sys;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cp.Business
{
    public class UserManager
    {
        public static bool VerifiLogin(User user)
        {
            if (user == null||user.RowID<=0)
            {
                return false;
            }
            return true;

        }

    }
}
