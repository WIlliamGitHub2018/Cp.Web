using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cp.Model.Attributes
{
    public class LengthAttribute:ValidateAttribute
    {
        private int length = 0;

        public LengthAttribute(int _length,string errorMsg)
        {
            length = _length;
            ErrorMessage=errorMsg;
        }

        public override string ErrorMessage { get; set; }

        public override ResultInfo Vailidate(object value)
        {
            ResultInfo res = new ResultInfo();
            if (value != null && !string.IsNullOrWhiteSpace(value.ToString()))
            {
                int ilen = value.ToString().Length;
                if (ilen > length)
                {
                    res.Result = false;
                    res.Msg = ErrorMessage;
                }
            }
            else {
                res.Result = false;
                res.Msg = ErrorMessage;
            }
            return res;
        }
    }
}
