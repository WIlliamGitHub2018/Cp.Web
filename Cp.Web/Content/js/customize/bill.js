function Refund(text, billID, ResID, TrnCode, ResortCode) {
    var blParam = {};
    blParam.BillRowID = billID;
    blParam.ResID = ResID;
    blParam.TrnCode = TrnCode;
    blParam.BaseResortCode = ResortCode;
    $.post('/Bill/Refund', { request: blParam, RebateReasonID: $('#ReasonID').val() }, function (data) {
        if (data.result == 1) {
            layer.msg(text + '成功');
            reloadBill(ResID, ResortCode);
        } else {
            layer.alert(data.errorMsg);
        }
    });
}
function reloadBill(ResID, ResortCode) {
    $('.modal-balance-account').html('').load('/Bill/BillDetailedProp', {
        ResID: ResID, BaseResortCode: ResortCode
    });
}