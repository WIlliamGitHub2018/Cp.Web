using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cp.Model.Sys
{
    public class UserRole:BaseEntity
    {
        public int UserID { get; set; }
        public int RoleID { get; set; }
    }
}
