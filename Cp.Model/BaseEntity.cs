using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cp.Model
{
    public class BaseEntity
    {
        public int RowID { get; set; }
        public DateTime InsertDate { get; set; }
        
        public DateTime UpdateDate { get; set; }

        public int InserUserID { get; set; }
        public string InsertUserName { get; set; }
        
        public int UpdateUserID { get; set; }

        public string UpdateUserName { get; set; }
    }
}
