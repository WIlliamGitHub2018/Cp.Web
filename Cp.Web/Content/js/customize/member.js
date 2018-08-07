
function SaveScopeTrim() {
    var scopetrim = $('#ff_scope').serializeObject();
    $.post('/Member/SaveMemberScopeTrim', { request: scopetrim }, function (data) {
        if (data.result != 1) {
            layer.alert(data.msg);
        } else {
            layer.alert("保存成功!");
            table.reload('memberTable');
        }
    });
}
function GetMemberGiftList(id) {
    layerShow(' ', '.layer-coupon-detail', 800, 600);
    var table = $("#memberGiftTable");
    table.html("");
    if (id == undefined || id == "" || id == 0) {
        layer.alert("id");
        return false;
    }
    $('#giftmemberid').val(id);

    //var _index = layer.load(1, { shade: false }); //0代表加载的风格，支持0-2
    ////loading层
    //var index = layer.load(1, {
    //    shade: [0.1, '#fff'] //0.1透明度的白色背景
    //});

    var str = "";
    $.post("/Member/GetMemberGiftList", { id: id }, function (data) {
        if (data.length > 0) {
            $.each(data, function () {
                str += '<tr>';
                str += '<td>' + this.giftname + '</td>';
                str += '<td>' + this.price + '</td>';
                str += '<td>' + this.giftno + '</td>';
                str += '<td>' + this.BaseResortCode + '</td>';
                str += '<td>' + this.insert_date + '</td>';
                str += '<td>' + this.unvaliddate + '</td>';
                str += '<td>' + this.BaseResortCode + '</td>';
                str += '<td>' + this.active + '</td>';
                str += '<td>' + this.description + '</td>';
                str += '</tr>';
            });
            table.html(str);
        }
    });
    var gifttable = $("#giftTable");
    gifttable.html("");
    var giftstr = "";
    $.post("/Member/GetGiftList", function (data) {
        if (data.length > 0) {
            $.each(data, function () {
                giftstr += '<tr>';
                giftstr += '<td>' + this.name + '</td>';
                giftstr += '<td>' + this.price + '</td>';
                //giftstr += '<td>' + this.canusehotelcode + '</td>';
                giftstr += '<td> <button type="button" onclick="SendToMember(' + this.rowid + ',' + id + ')" class="layui-btn">发放</button> </td>';
                giftstr += '</tr>';
            });
            gifttable.html(giftstr);
        }
    });
}




function GiftDoSearch() {
    var items = $(".sec-item1 table tbody tr");
    var id;
    $.each(items, function () {
        if ($(this).hasClass('active')) {
            id = this.cells[1].innerHTML;
            return false;
        }
    });
    var gifttable = $("#giftTable");
    gifttable.html("");
    var giftstr = "";
    $.post("/Member/GetGiftList", { ExtCode1: $('#giftname').val() }, function (data) {
        if (data.length > 0) {
            $.each(data, function () {
                giftstr += '<tr>';
                giftstr += '<td>' + this.name + '</td>';
                giftstr += '<td>' + this.price + '</td>';
                giftstr += '<td>' + this.canusehotelcode + '</td>';
                giftstr += '<td> <button type="button" onclick="SendToMember(' + this.rowid + ',' + id + ')" class="layui-btn">发放</button> </td>';
                giftstr += '</tr>';
            });
            gifttable.html(giftstr);
        }
    });
}




var form;
var table;
var layer;
var $;
var laydate;
$(function () {
    var types = $("#ViewMemberType").val();
    var mtypes = eval('(' + types + ')');

    var levels = $("#ViewMemberLevel").val();
    var mlevels = eval('(' + levels + ')');
    layui.use(['form', 'element', 'layer', 'laydate', 'table', 'laypage'], function () {
        form = layui.form;
        table = layui.table;
        layer = layui.layer;
        laydate = layui.laydate;
        $ = layui.$;
        laydate.render({
            elem: '#birth_date' //指定元素
               , type: 'datetime'
        });
        laydate.render({
            elem: '#registerdate' //指定元素
            , type: 'datetime'
        });
        laydate.render({
            elem: '#memberdate' //指定元素
            , type: 'datetime'
        });
        laydate.render({
            elem: '#visadate' //指定元素
            , type: 'datetime'
        });
        GetList('searchForm #resortid', 'HotelCode', 'Name', '/List/GetResorts');
        //GetList('searchForm #memberlevel', 'code', 'description', '/List/GetMemberLevel');
        GetList('searchForm #membertype', 'attribute_code', 'description', '/List/GetMemberType?entity_code=MemberType');
        GetList('mem_edit #title', 'TitleCode', 'Description', '/List/GetTitle');
        GetList('mem_edit #language', 'LanguageCode', 'Description', '/List/GetLanguage');
        GetList('mem_edit #nationality', 'NationalityCode', 'Description', '/List/GetNationality');
        GetList('mem_edit #BaseResortCode', 'HotelCode', 'Name', '/List/GetResorts');
        GetList('mem_edit #id_type', 'PaperCode', 'PaperName', '/List/GetIdType');
        GetList('mem_edit #membersendtype', 'attribute_code', 'attribute_name_cn', '/List/GetMemberType?entity_code=MemberSendtype');
        GetList('ff_base #membertype', 'attribute_code', 'description', '/List/GetMemberType?entity_code=MemberType');
        GetList('mem_edit #membertype', 'attribute_code', 'description', '/List/GetMemberType?entity_code=MemberType');
        GetList('mem_edit #country', 'CountryCode', 'Description', '/List/GetCountry');
        GetList('mem_edit #ethnic', 'EthnicCode', 'Description', '/List/GetEthnic');
        GetList('mem_edit #state', 'StateCode', 'Description', '/List/GetState');
        GetList('mem_edit #city', 'CityCode', 'Description', '/List/GetCity');
        form.on('select(s_mtype)', function (data) {
            GetList('searchForm #memberlevel', 'code', 'description', '/List/GetMemberLevel?membertype=' + data.value);
        });
        form.on('select(base_mtype)', function (data) {
            GetList('ff_base #memberlevel', 'code', 'description', '/List/GetMemberLevel?membertype=' + data.value);
        });
        form.on('select(edit_mtype)', function (data) {
            GetList('mem_edit #memberlevel', 'code', 'description', '/List/GetMemberLevel?membertype=' + data.value);
        });
        //GetList('ff_base #memberlevel', 'code', 'description', '/List/GetMemberLevel');
        table.render({
            id: 'memberTable'
         , elem: '#memberdt'
         , method: 'post'

         , cols: [[
       { type: 'checkbox' }
       , { field: 'membercard', title: '会员卡' }
       , { field: 'last', title: '持卡人' }
       , { field: 'comefrom', title: '会员来自' }
       , {
           field: 'phone', title: '电话', templet: function (d) {
               if (d.phone == "NULL" || d.phone == null) {
                   return "";
               }
               else {
                   return d.phone;
               }

           }
       }
       , {
           field: 'membertype', title: '会员类型', templet: function (d) {
               var cvalue = "";
               for (i = 0; i < mtypes.length; i++) {
                   if (d.membertype == mtypes[i].attribute_code) {
                       cvalue = mtypes[i].description;
                       break;
                   }
               }
               return cvalue;
           }
       }
       , {
           field: 'memberlevel', title: '会员级别', templet: function (d) {
               var cvalue = "";
               for (i = 0; i < mlevels.length; i++) {
                   if (d.memberlevel == mlevels[i].code) {
                       cvalue = mlevels[i].description;
                       break;
                   }
               }
               return cvalue;
           }
       }
      
         , {
             field: 'balance', title: '储值'
         }
       , {
           field: 'scope', title: '积分'
       }, { field: 'memberstatus', title: '会员状态', templet: '#switchTpl', align: 'center' }
       //, {
       //    field: 'balance', title: '储值', templet: '<div><a href="javascript::" class="yellow-style points-btn" onclick=\"GetBalanceLog({{d.rowid}})\">{{d.balance}}</a></div>'
       //}
       //, {
       //    field: 'scope', title: '积分', templet: '<div><a href="javascript::" class="yellow-style points-btn" onclick=\"GetScopeLog({{d.rowid}})\">{{d.scope}}</a></div>'
       //}
         ]]
         , skin: 'row' //表格风格
         , even: true
         , limit: 10
         , limits: [10, 20, 30, 40, 50]
         , page: true
         , done: function (res, curr, count) {
             //如果是异步请求数据方式，res即为你接口返回的信息。
             //如果是直接赋值的方式，res即为：{data: [], count: 99} data为当前页数据、count为数据总长度

         }
        });
        table.on('checkbox(memberTable)', function (obj) {

        });
        var windowIndex = -1;
        var active = {
            //查询事件
            search: function () {
                var resortid = $("#resortid").val();
                var name = $("#name").val();
                var membertype = $("#membertype").val();
                var idcard = $("#idcard").val();
                var membercard = $("#membercard").val();
                var memberlevel = $("#memberlevel").val();
                var memberstatus = $("#memberstatus").val();
                //执行重载
                table.reload('memberTable', {
                    page: {
                        curr: 1 //重新从第 1 页开始
                    }
                    , url: '/Member/MemberList' //数据接口
                    , where: {
                        resortid: resortid
                        , name: name
                        , membertype: membertype
                        , membercard: membercard
                        , idcard: idcard
                        , memberlevel: memberlevel
                        , memberstatus: memberstatus
                    }
                });
            }
            //新建
            , add: function () {
                GetList('ff_per #country', 'CountryCode', 'Description', '/List/GetCountry');
                GetList('ff_per #ethnic', 'EthnicCode', 'Description', '/List/GetEthnic');
                GetList('ff_per #state', 'StateCode', 'Description', '/List/GetState');
                GetList('ff_per #city', 'CityCode', 'Description', '/List/GetCity');
                //form.on('select(State1)', function (data) {
                //    if (data.value != '') {
                //        GetCity(data.value, "#ff_per");
                //    }
                //});
                GetList('ff_per #title', 'TitleCode', 'Description', '/List/GetTitle');
                GetList('ff_per #language', 'LanguageCode', 'Description', '/List/GetLanguage');
                GetList('ff_per #nationality', 'NationalityCode', 'Description', '/List/GetNationality');
                GetList('ff_per #BaseResortCode', 'HotelCode', 'Name', '/List/GetResorts');
                GetList('ff_base #id_type', 'PaperCode', 'PaperName', '/List/GetIdType');
                addLayer('新建会员', '.layer-member', 950, 420);
            }
            //编辑
            , edit: function () {
                var checkStatus = table.checkStatus('memberTable')
               , data = checkStatus.data;
                if (data.length == 0) {
                    layer.msg('请选中一条数据！');
                    return false;
                }
                var memberid = data[0].rowid;
                var ff = $("#mem_edit");
                console.log(data[0]);
                formLoad(data[0], ff);
                layerShow('编辑会员', '.layer-member-edit', 950, 600);
                //$.post("/Member/GetSingleMember", { id: memberid }, function (data) {
                //    var ff = $("#mem_edit");
                //    formLoad(data, ff);
                //});
                //会员管理页面编辑弹框-卡值记录表格
                table.render({
                    elem: '#crm_table_member_calorific'
                    , url: '/Member/GetBalanceList?id=' + memberid
                    , cellMinWidth: 100 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
                    , cols: [[
                        { type: 'checkbox' }
                        , { field: 'insert_date', title: '日期', sort: true }
                        , { field: 'calorific_type', title: '操作类型' }
                        , { field: 'calorific_active_sum', title: '操作金额' }
                        , { field: 'calorific_send_sum', title: '赠送金额' }
                        , { field: 'calorific_use_sum', title: '使用金额' }
                        , { field: 'calorific_senduse_sum', title: '使用赠送金额' }
                        , { field: 'calorific_store_sum', title: '充值金额' }
                        , { field: 'calorific_place', title: '交易地点' }
                        , { field: 'calorific_casher_id', title: 'casher id' }
                        , { field: 'calorific_description', title: '描述' }
                    ]]
                    , even: true
                    , page: true
                });
                //会员管理页面编辑弹框-充值记录表格
                table.render({
                    elem: '#crm_table_member_store'
                    //,url: '/Member/GetBalanceList?id=' + memberid
                    , cellMinWidth: 100 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
                    , cols: [[
                        { type: 'checkbox' }
                        , { field: 'store_id', title: '编号', sort: true }
                        , { field: 'store_card_num', title: '卡号' }
                        , { field: 'store_pap_num', title: '证件号码' }
                        , { field: 'store_sum', title: '储值金额' }
                        , { field: 'store_give_sum', title: '赠送金额' }
                        , { field: 'store_person', title: '消费人' }
                        , { field: 'store_pay_method', title: '支付方式' }
                        , { field: 'store_operator', title: '操作员' }
                        , { field: 'store_place', title: '交易地点' }
                        , { field: 'store_casher_id', title: 'casher id' }
                    ]]
                    , even: true
                    , page: true
                });
                //会员管理页面编辑弹框-消费记录表格
                table.render({
                    elem: '#crm_table_member_consume'
                    // ,url:''
                    , cellMinWidth: 100 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
                    , cols: [[
                        { type: 'checkbox' }
                        , { field: 'consume_id', title: '编号', sort: true }
                        , { field: 'consume_card_num', title: '卡号' }
                        , { field: 'consume_pap_num', title: '证件号码' }
                        , { field: 'consume_num', title: '消费金额' }
                        , { field: 'consume_use_sum', title: '折扣金额' }
                        , { field: 'consume_person', title: '消费人' }
                        , { field: 'consume_pay_menthod', title: '支付方式' }
                        , { field: 'consume_operator', title: '操作员' }
                        , { field: 'consume_place', title: '交易地点' }
                        , { field: 'consume_casher_id', title: 'casher id' }
                    ]]
                    , even: true
                    , page: true
                });
                //会员管理页面编辑弹框-积分记录表格
                table.render({
                    elem: '#crm_table_member_scope'
                    , url: '/Member/GetScopeList?id=' + memberid
                    , cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
                    , cols: [[
                        { type: 'checkbox' }
                        , { field: 'scope_id', title: '编号', sort: true }
                        , { field: 'scope_type', title: '积分类型' }
                        , { field: 'scope_data', title: '产生时间' }
                        , { field: 'scope_operator', title: '操作员' }
                        , { field: 'scope_place', title: '交易地点' }
                        , { field: 'scope_casher_id', title: 'casher id' }
                    ]]
                    , even: true
                    , page: true
                });
            }
            //储值
            , racharge: function () {
                var checkStatus = table.checkStatus('memberTable')
                , data = checkStatus.data;
                if (data.length == 0) {
                    layer.msg('请选中一条数据！');
                    return false;
                }
                GetList('ff_recharge #paymenttype', 'PaymentTypeCode', 'Description', '/List/GetPaymentTypes');
                var ff = $("#ff_recharge");
                formLoad(data[0], ff);
                InlayerShow('储值管理', '.layer-storems', 800, 358);
            }
            //激活
            , enable: function () {
                var checkStatus = table.checkStatus('memberTable')
                , data = checkStatus.data;
                if (data.length == 0) {
                    layer.msg('请选中一条数据！');
                    return false;
                }
                $("#ff_active [name=membercard]").val(data[0].membercard);
                $("#ff_active [name=last]").val(data[0].last);
                $.post("/List/GetMemberLevelName", { code: data[0].memberlevel }, function (data) {
                    $("#ff_active [name=memberlevel]").val(data.description);
                });
                layerShow(' 激活会员卡', '.layer-activate', 800, 358);
            }
            //挂失
            , lose: function () {
                var checkStatus = table.checkStatus('memberTable')
               , data = checkStatus.data;
                if (data.length == 0) {
                    layer.msg('请选中一条数据！');
                    return false;
                }
                $("#ff_lose [name=membercard]").val(data[0].membercard);
                $("#ff_lose [name=last]").val(data[0].last);
                $.post("/List/GetMemberLevelName", { code: data[0].memberlevel }, function (data) {
                    $("#ff_lose [name=memberlevel]").val(data.description);
                })
                layerShow('挂失会员卡', '.layer-lose', 800, 358);
            }
            //冻结
            , frozen: function () {
                var checkStatus = table.checkStatus('memberTable')
                , data = checkStatus.data;
                if (data.length == 0) {
                    layer.msg('请选中一条数据！');
                    return false;
                }
                $("#ff_froze [name=membercard]").val(data[0].membercard);
                $("#ff_froze [name=last]").val(data[0].last);
                $.post("/List/GetMemberLevelName", { code: data[0].memberlevel }, function (data) {
                    $("#ff_froze [name=memberlevel]").val(data.description);
                })
                layerShow('冻结会员卡', '.layer-frost', 800, 358);
            }
            //注销
            , cancel: function () {
                var checkStatus = table.checkStatus('memberTable')
                , data = checkStatus.data;
                if (data.length == 0) {
                    layer.msg('请选中一条数据！');
                    return false;
                }
                $("#ff_cancel [name=membercard]").val(data[0].membercard);
                $("#ff_cancel [name=last]").val(data[0].last);
                $.post("/List/GetMemberLevelName", { code: data[0].memberlevel }, function (data) {
                    $("#ff_cancel [name=memberlevel]").val(data.description);
                })
                layerShow('注销会员卡', '.layer-delete', 800, 358);
            }
            //修改密码
            , editpass: function () {
                var checkStatus = table.checkStatus('memberTable')
               , data = checkStatus.data;
                if (data.length == 0) {
                    layer.msg('请选中一条数据！');
                    return false;
                }
                var membercard = data[0].membercard;
                var rowid = data[0].rowid;
                $("#ff_editpass [name=membercard]").val(membercard);
                $("#ff_editpass #RowID").val(rowid);
                layerShow('修改密码', '.layer-editpass', 700, 250);
            }
            //操作日志
            , records: function () {
                var checkStatus = table.checkStatus('memberTable')
               , data = checkStatus.data;
                if (data.length == 0) {
                    layer.msg('请选中一条数据！');
                    return false;
                }
                var memberid = data[0].rowid;
                layerShow('会员日志', '.layer-log-operate', 800, 358);
                var tb_log = $("#MemberLogTable");
                tb_log.html("");

                var str = "";
                $.post("/Member/GetMemberLogList", { id: memberid }, function (data) {
                    if (data.length > 0) {
                        $.each(data, function () {
                            str += '<tr>';
                            str += '<td>' + GetLogName(this.type) + '</td>';
                            str += '<td>' + this.operators + '</td>';
                            str += '<td>' + this.logdate + '</td>';
                            str += '<td>' + this.description + '</td>';
                            str += '</tr>';
                        });
                        tb_log.html(str);
                    }
                });
            }
            //更多操作
            , more: function () {
                var checkStatus = table.checkStatus('memberTable')
               , data = checkStatus.data;
                if (data.length == 0) {
                    layer.msg('请选中一条数据！');
                    return false;
                }
                var memberid = data[0].rowid;
                addLayer('更多操作', '.layer-moreactive', 500, 240);
            }
        }
        $('.layui-btn').on('click', function () {
            var type = $(this).data('type');
            active[type] ? active[type].call(this) : '';
        });
    });
    $(".btn_balancetrim").on("click", function () {
        var checkStatus = table.checkStatus('memberTable')
          , data = checkStatus.data;
        var memberid = data[0].rowid;
        var ff = $("#ff_balance");
        formLoad(data[0], ff);
        $("#ff_balance #memberid").val(memberid);
        InlayerShow('余额调整', '.layer-balancetrim', 800, 430);
    });
    $(".btn_givebalance").on("click", function () {
        var checkStatus = table.checkStatus('memberTable')
          , data = checkStatus.data;
        var memberid = data[0].rowid;
        var ff = $("#ff_givebalance");
        formLoad(data[0], ff);
        $("#ff_givebalance #memberid").val(memberid);
        console.log($("#ff_balance #memberid").val());
        InlayerShow('赠送金额调整', '.layer-givebalance', 800, 430);
    });
    $(".btn_setlevel").on("click", function () {
        GetList('ff_level #leveluptype', 'attribute_code', 'description', '/Member/GetMemberTypes');
        form.on('select(s_mtype)', function (data) {
            GetList('ff_level #newlevel', 'code', 'description', '/List/GetMemberLevel?membertype=' + data.value);
        });
        var checkStatus = table.checkStatus('memberTable')
          , data = checkStatus.data;
        var memberid = data[0].rowid;
        var memberlevel = data[0].memberlevel;
        var ff = $("#ff_level");
        formLoad(data[0], ff);
        $("#ff_level #RowID").val(memberid);
        $("#ff_level #olelevel").val(memberlevel);
        InlayerShow('设置会员级别', '.layer-setlevel', 800, 430);
    });
    $(".btn_setmemberdate").on("click", function () {
        InlayerShow('设置会员有效期', '.layer-setmemberdate', 800, 430);
        var checkStatus = table.checkStatus('memberTable')
          , data = checkStatus.data;
        var memberid = data[0].rowid;
        var ff = $("#ff_balance");
        formLoad(data[0], ff);
    });
    $(".btn_givegift").on("click", function () {
        GetList('ff_gift #giftid', 'rowid', 'name', '/List/GetGift');
        laydate.render({
            elem: '#unvaliddate' //指定元素
           , type: 'date'
        });
        laydate.render({
            elem: '#validdate' //指定元素
          , type: 'date'
        });
        var checkStatus = table.checkStatus('memberTable')
          , data = checkStatus.data;
        var memberid = data[0].rowid;
        $("#ff_gift #memberrowid").val(memberid);
        $("#ff_gift [name=membercard]").val(data[0].membercard);
        $("#ff_gift [name=last]").val(data[0].last);
        InlayerShow('赠送礼券', '.layer-givegift', 600, 430);
    });
    $(".btn_givegiftpackage").on("click", function () {
        InlayerShow('赠送礼券包', '.layer-givegiftpackage', 800, 430);
    });
    $(".btn_mygift").on("click", function () {
        InlayerShow('会员礼券列表', '.layer-membergift', 800, 430);
        table.render({
            elem: '#crm_table_member_membergift'
            // ,url:''
            , cellMinWidth: 100//全局定义常规单元格的最小宽度，layui 2.2.1 新增
            , cols: [[
                { type: 'checkbox' }
                , { field: 'membergift_id', title: '编号', sort: true }
                , { field: 'membergift_name', title: '礼品券名称' }
                , { field: 'membergift_num', title: '礼券号', sort: true }
                , { field: 'membergift_random', title: '验证码' }
                , { field: 'membergift_usedate', title: '生效期' }
                , { field: 'membergift_unusedate', title: '失效期' }
                , { field: 'membergift_description', title: '描述' }
            ]]
            , data: [{
                "membergift_id": "10001"
                , "membergift_name": "13355551251"
                , "membergift_num": "张三"
                , "membergift_random": "会员注册"
                , "membergift_usedate": "13355551251"
                , "membergift_unusedate": "张三"
                , "membergift_description": "会员注册"
            }]
            , even: true
            , page: true
        });
    });
});
function SubmitEditMember() {
    var main = $('#mem_edit').serializeObject();
    $.post('/Member/SaveMember', { m: main }, function (data) {
        if (data.result != 1) {
            layer.alert(data.msg);
        } else {
            layer.alert("保存成功!");
            table.reload('memberTable');
        }
    });
}
function SaveBaseMember() {
    var name = $('#ff_base [name=last]').val();
    var phone = $('#ff_base [name=phone]').val();
    var memberlevel = $('#ff_base #memberlevel').val();
    var idtype = $('#ff_base #id_type').val();
    var idnum = $('#ff_base [name=id_number]').val();
    if (name == "")
    {
        layer.alert("请输入姓名！");
        return false;
    }
    if (phone == "")
    {
        layer.alert("请输入联系方式！");
        return false;
    }
    if (memberlevel == "")
    {
        layer.alert("请选择会员级别！");
        return false;
    }
    if (idtype == "")
    {
        layer.alert("请选择证件类型！");
        return false;
    }
    if (idnum == "")
    {
        layer.alert("请输入证件号码！");
        return false;
    }
    var main = $('#ff_base').serializeObject();
    $.post('/Member/SaveMember', { m: main }, function (data) {
        if (data.result != 1) {
            layer.alert(data.msg);
        } else {
            layer.alert("保存成功!");
            $('#ff_per #rowid').val(data.rowid);
            $('#ff_more #rowid').val(data.rowid);
            table.reload('memberTable');
        }
    });
}
function SavePerMember() {
    if ($('#ff_per #rowid').val() == "") {
        layer.alert("请先保存基本信息！");
        return false;
    }
    var main = $('#ff_per').serializeObject();
    $.post('/Member/SaveMember', { m: main }, function (data) {
        if (data.result != 1) {
            layer.alert(data.msg);
        } else {
            layer.alert("保存成功!");
            table.reload('memberTable');
        }
    });
}
function SaveMoreMember() {
    if ($('#ff_more #rowid').val() == "") {
        layer.alert("请先保存基本信息！");
        return false;
    }
    var main = $('#ff_more').serializeObject();
    $.post('/Member/SaveMember', { m: main }, function (data) {
        if (data.result != 1) {
            layer.alert(data.msg);
        } else {
            layer.alert("保存成功!");
            table.reload('memberTable');
        }
    });
}
function SaveBalanceTrim() {
    var balancetrim = $('#ff_balance').serializeObject();
    $.post('/Member/SaveMemberBalanceTrim', { request: balancetrim }, function (data) {
        if (data.result != 1) {
            layer.alert(data.msg);
        } else {
            layer.alert("保存成功!");
        }
    });
}
function SaveGiveBalanceTrim() {
    var balancetrim = $('#ff_givebalance').serializeObject();
    $.post('/Member/SaveMemberGiveBalanceTrim', { request: balancetrim }, function (data) {
        if (data.result != 1) {
            layer.alert(data.msg);
        } else {
            layer.alert("保存成功!");
        }
    });
}
function SaveMemberRecharge() {
    var rechargeform = $('#ff_recharge').serializeObject();
    $.post('/Member/SaveMemberRecharge', { request: rechargeform }, function (data) {
        if (data.result != 1) {
            layer.alert(data.msg);
        } else {
            layer.alert("保存成功!");
            table.reload("memberTable");
        }
    });
}
function SaveMemberPassword() {
    var rechargeform = $('#ff_editpass').serializeObject();
    $.post('/Member/SaveMemberPassword', { request: rechargeform }, function (data) {
        if (data.result != 1) {
            layer.alert(data.msg);
        } else {
            layer.alert("保存成功!");
            table.reload("memberTable");
        }
    });
}
function InitMemberPassword() {
    var rowid = $("#ff_editpass #RowID").val();
    if (rowid == "")
    {
        layer.alert("请选择一条记录!");
        return false;
    }
    $.post('/Member/InitMemberPassword', { id: rowid }, function (data) {
        if (data.result != 1) {
            layer.alert(data.msg);
        } else {
            layer.alert("保存成功!");
            table.reload("memberTable");
        }
    });
}
function SetMemberLevel() {
    var main = $('#ff_level').serializeObject();
    $.post('/Member/SetMemberLevel', { m: main }, function (data) {
        if (data.result != 1) {
            layer.alert(data.msg);
        } else {
            layer.alert("设置成功!");
        }
    });
}
function SendToMember() {
    var main = $('#ff_gift').serializeObject();
    $.post('/Member/SendGift', { m: main }, function (data) {
        if (data.result != 1) {
            layer.alert(data.msg);
        } else {
            layer.alert("发放成功!");
        }
    });
}
function NormalMember() {
    var checkStatus = table.checkStatus('memberTable')
             , data = checkStatus.data;
    var memberid = data[0].rowid;
    var reason = $("#ff_active [name=reason]").val();
    $.post("/Member/NormalMember", { id: memberid, reason: reason }, function (data) {
        if (data.result != 1) {
            layer.alert(data.msg);
        }
        else {
            layer.alert("激活成功!");
            table.reload('memberTable');
        }
    })
}
function LoseMember() {
    var checkStatus = table.checkStatus('memberTable')
             , data = checkStatus.data;
    var memberid = data[0].rowid;
    var reason = $("#ff_lose [name=reason]").val();
    $.post("/Member/LoseMember", { id: memberid, reason: reason }, function (data) {
        if (data.result != 1) {
            layer.alert(data.msg);
        }
        else {
            layer.alert("挂失成功!");
            table.reload('memberTable');
        }
    })
}
function FrozeMember() {
    var checkStatus = table.checkStatus('memberTable')
             , data = checkStatus.data;
    var memberid = data[0].rowid;
    var reason = $("#ff_froze [name=reason]").val();
    $.post("/Member/FrozenMember", { id: memberid, reason: reason }, function (data) {
        if (data.result != 1) {
            layer.alert(data.msg);
        }
        else {
            layer.alert("冻结成功!");
            table.reload('memberTable');
        }
    })
}
function CancelMember() {
    var checkStatus = table.checkStatus('memberTable')
             , data = checkStatus.data;
    var memberid = data[0].rowid;
    var reason = $("#ff_cancel [name=reason]").val();
    $.post("/Member/CancelMember", { id: memberid, reason: reason }, function (data) {
        if (data.result != 1) {
            layer.alert(data.msg);
        }
        else {
            layer.alert("注销成功!");
            table.reload('memberTable');
        }
    })
}