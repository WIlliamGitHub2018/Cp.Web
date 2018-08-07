using Cp.Model;
using Cp.Model.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cp.Utility.Extension
{
    public static class ValidateExtension
    {
        public static ResultInfo Validate(this object oObject)
        {
            Type type = oObject.GetType();
            foreach (var prop in type.GetProperties())
            {
                if (prop.IsDefined(typeof(ValidateAttribute), true))
                {
                    object[] attributeArray = prop.GetCustomAttributes(typeof(ValidateAttribute), true);
                    foreach (ValidateAttribute attribute in attributeArray)
                    {
                        var res= attribute.Vailidate(prop.GetValue(oObject));
                        if (!res.Result)
                        {
                            return res;//表示终止
                        }
                    }
                }
            }
            return new ResultInfo() { Result = true };
        }
    }
}
