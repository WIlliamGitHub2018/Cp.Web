function changeActiveYN(data, tableName, active,resortCode) {
    var op_text = '禁用';
    if (active == 1) {
        op_text = '激活';
    }
    layer.confirm('确认执行' + op_text + '操作？', {
        shadeClose: true,
        btn: ['确定', '取消'], //按钮
    }, function () {
        closeProp();
        var rowID_str = '';
        $.each(data, function () {
            rowID_str += (rowID_str == '' ? '' : ',') + $(this)[0]['RowID'];
        });
        if (typeof (resortCode) == 'undenfined' || resortCode==null) {
            resortCode = '';
        }
        $.post('/CRSManage/ChangeActiveYN', { ExtCode1: tableName, ExtCode2: rowID_str, Flag1: active, Code: resortCode }, function (data) {
            if (data.result == 1) {
                search_table();
                layer.msg('操作成功');
            } else {
                layer.msg('操作失败');
            }
        });
    });
    
}