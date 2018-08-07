using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cp.Model
{
    public class User:BaseEntity
    {
        public string Account { get; set; }

        public string Pwd { get; set; }

        public string Name { get; set; }

        public string Phone { get; set; }

        public string IDCard { get; set; }

        public string Sex { get; set; }

        public string Post { get; set; }

        public string Email { get; set; }
    }
}
