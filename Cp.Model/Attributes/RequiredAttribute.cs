using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cp.Model.Attributes
{
    [AttributeUsage(AttributeTargets.Property | AttributeTargets.Field)]
    public class RequiredAttribute : ValidateAttribute
    {
        public RequiredAttribute(string _ErroMsg)
        {
            ErrorMessage = _ErroMsg;
        }

        public override string ErrorMessage { get; set; }

        public override ResultInfo Vailidate(object value)
        {
            ResultInfo res = new ResultInfo();
            if (value != null && !string.IsNullOrWhiteSpace(value.ToString()))
            {
                res.Result = true;
            }
            else {
                res.Result = false;
                res.Msg = ErrorMessage;
            }
            return res;

        }
    }
}
