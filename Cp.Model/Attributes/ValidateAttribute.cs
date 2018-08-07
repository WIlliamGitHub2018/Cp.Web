using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cp.Model.Attributes
{
    public abstract class ValidateAttribute:Attribute
    {
        public abstract ResultInfo Vailidate(object obj);
        public abstract string ErrorMessage { get; set; }
    }
}
