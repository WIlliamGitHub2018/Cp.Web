$.fn.serializeObject = function () {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};
function verifyForm(formID) {
    var flag = true;
    $('#' + formID + ' [lay-verify=required]').each(function () {
        var labelText = $(this).parent().parent().find('label').text().replace('*', '');
        var typeText = '';
        switch ($(this).get(0).tagName.toLowerCase()) {
            case 'select':
                typeText = '选择';
                break;
            case 'input':
            case 'textarea':
                if (labelText.indexOf('时间') >= 0) {
                    typeText = '选择';
                } else {
                    typeText = '输入';
                }
                break;
            
        }
        if ($(this).val() == '' || $(this).val() == 0) {
            layer.msg('请' + typeText + $.trim(labelText));
            flag = false;
            return false;
        }
    });
    return flag;
}
function ResortFlag(resortcode) {
    if (resortcode.length > 0) {
        $(".common_group").hide();
    }
}
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = unescape(window.location.search).substr(1).match(reg);
    if (r != null) return r[2]; return null;
}
function initNav() {
    var _url = location.href;
    $('.nav-item').removeClass('active');
    $('.drop-menu li').find('a').removeClass('active');
    $('.drop-menu li').each(function (index, item) {
        var t = _url.indexOf($(this).attr('id').replace('nav_', ''));
        if (t >= 0) {
            $(this).closest('.nav-item').addClass('active');
            $(this).find('a').addClass('active');
            //if (_url.indexOf('SabanaScopePolicy') > 0) {
            //    $('#nav_SabanaScopePolicy').find('a').addClass('active');
            //} else {
            //    $(this).find('a').addClass('active');
            //}
        } else {

            $(this).find('a').removeClass('active');
        }
    });
    $(".btn-dropdown").on('click', function (e) {
        $(this).parent(".nav-item").toggleClass("active").siblings().removeClass('active');
    });
    //---nav二级菜单展开
    $('.two-menu').mouseenter(function () {
        console.log('show')
        $(this).children(".three-menu").show('fast');
    });
    $('.two-menu').mouseleave(function () {
        console.log('hide');
        $(this).children(".three-menu").hide('fast');
    });//---nav三级菜单展开
    $(".icon-fold").click(function () {
        $(this).parents('.sidebar').toggleClass('active');
        $(this).parents('.sidebar').siblings('.main-body').toggleClass("left-width");
    });
    //---nav菜单展开
    //$(".icon-fold").trigger('click');
}
function formLoad(options,form1)
{
    var defaults = {
        jsonValue: options,
        isDebug: false   //是否需要调试，这个用于开发阶段，发布阶段请将设置为false，默认为false,true将会把name value打印出来  
    }
    //设置参数  
    var setting = defaults;
    jsonValue = setting.jsonValue;
    //如果传入的json字符串，将转为json对象  
    if ($.type(setting.jsonValue) === "string") {
        jsonValue = $.parseJSON(jsonValue);
    }
    //如果传入的json对象为空，则不做任何操作  
    if (!$.isEmptyObject(jsonValue)) {
        var debugInfo = "";
        $.each(jsonValue, function (key, value) {
            //是否开启调试，开启将会把name value打印出来  
            if (setting.isDebug) {
                console.log("name:" + key + "; value:" + value);
                debugInfo += "name:" + key + "; value:" + value + " || ";
            }
            var formField = form1.find("[name='" + key + "']");
            if ($.type(formField[0]) === "undefined") {
                if (setting.isDebug) {
                    console.log("can not find name:[" + key + "] in form1!!!");    //没找到指定name的表单  
                }
            } else {
                var fieldTagName = formField[0].tagName.toLowerCase();
                if (fieldTagName == "input") {
                    if (formField.attr("type") == "radio") {
                        $("input:radio[name='" + key + "'][value='" + value + "']").attr("checked", "checked").next().trigger('click');
                    } else if (formField.attr("type") == "checkbox") {
                        $("input:checkbox[name='" + key + "'][value='" + value + "']").attr("checked", "checked").next().addClass('layui-form-checked');
                    } else {
                        formField.val((value + "").replace(/00:00:00|null/ig, ''));
                    }
                }
                else if (fieldTagName == "select") {
                    //do something special  
                    formField.val(value);
                }
                else if (fieldTagName == "textarea") {
                    //do something special  
                    formField.val(value);
                } else {
                    formField.val(value);
                }

            }
        })
        if (setting.isDebug) {
            console.log(debugInfo);
        }
    }
    form.render('select');
    return form1;    //返回对象，提供链式操作  
}
function CloseLayer()
{
    layer.closeAll();
}
$(function () {
    $(document).ajaxStart(function () {
        Loading();
    });
    $(document).ajaxComplete(function (event, request, settings) {
        layer.closeAll('loading');
        //$('.layui-layer-shade').trigger('click');
    });
    //选中行
    //$('body').on('click', '.layui-table-body tr', function () {

    //    if ($(this).find('div.layui-form-checkbox').hasClass('layui-form-checked')) {
    //        $(this).find('div.layui-form-checkbox').removeClass('layui-form-checked');
    //    } else {
    //        $(this).find('div.layui-form-checkbox').addClass('layui-form-checked');
    //    }

    //});

	//----酒店信息修改开始
	$(".simple-btn").click(function(){
		var parent = $(this).parent('.t-ct');
		parent.hide();
		parent.siblings(".t-edt").show();
	});//添加修改按钮通用点击展开修改内容
	$(".cancel-edit").click(function(){
		var parent = $(this).parents(".t-edt");
		parent.hide();
		parent.siblings(".t-ct").show();
	});//取消按钮通用
	//----酒店信息修改结束

	//----酒店政策修改
	$('.sec-edit-btn').click(function(){
		var parent = $(this).parents('.sec-title');
		parent.addClass('active');
		parent.siblings(".sec-item2").show();
		parent.siblings(".sec-item1").hide();
	});
	$('.cancel-common').click(function(){
		var parent = $(this).parents('.sec-item2');
		parent.siblings(".sec-item1").show();
		parent.siblings(".sec-title").removeClass('active');
		parent.hide();
	});//取消按钮通用
	$(".starDegree").click(function(){
		$(this).addClass("selected");
		$(this).prevAll(".starDegree").addClass("selected");
		$(this).nextAll(".starDegree").removeClass("selected");
	});//星级定级显示星星颜色

	//表单列表修改加类
	var listTr = $("table.table-con tr");
	listTr.click(function(){
		$(this).addClass("em");
		$(this).siblings("tr").removeClass("em");
	});
	//checkbox全选
	$("input.all-checkbox").click(function(){
        if(this.checked){
            $("input.list-checkbox").prop("checked", true);
            $("input.list-checkbox").parents('tr').addClass('active');
        }else{
            $("input.list-checkbox").prop("checked", false);
            $("input.list-checkbox").parents('tr').removeClass('active');
        }
    });
    //新增数据
    $('.insert-btn').on('click',function () {
		var parent = $(this).parents('.list-info-section');
		var modal = parent.children('.modal-add-all');
        modalOpen(modal);
    });
    //编辑数据
	$('.edit-btn').on('click',function () {
        var parent = $(this).parents('.list-info-section');
        var modal = parent.children('.modal-add-all');
		if(isDataSelected()){
            //获取当前数据内容（ajax调后台）赋值;

            modalOpen(modal);
		}
    });

    //    删除数据
	$(".delete-btn").click(function () {
	    var parent = $(this).parents('.list-info-section');
	    if (isDataSelected()) {
	        //确删除弹框
	        layer.confirm("确认删除吗？");
	    }

	});
	$('.log-btn').on('click', function () {
	    if (isDataSelected()) {
	        //获取当前数据内容（ajax调后台）赋值;
	        modalOpen('.modal-log-operate');
	    }
	});
	
    //ccms预订管理 iframe 调用js
    var reserveNavBtn = $(".common-iframe").find('ul.nav-list>li>a');
    $(reserveNavBtn).on('click',function(){
		$(this).parent("li").addClass("active");
        $(this).parent("li").siblings("li").removeClass("active");
        var href = $(this).attr('data-href');
        var iframe = $(".iframe-box >iframe");
        iframe.each(function () {
            if( $(this).attr('data-href') == href){
                $(this).addClass("active");
            	if($(this).attr('src') == ""){
                    $(this).attr("src",href) ;
				}
            }
            else {
            	$(this).removeClass("active");
			}
        });

    });
    //下拉酒店选择
    $('.option-box .dropdown-menu li').on('click',function () {
        var inputValue = $('.option-box').find("input[type='text']");
        var selectedValue =  $(this).children('a').text();
        $(this).addClass('selected');
        $(this).siblings('li').removeClass('selected');
        inputValue.val(selectedValue);
    });
    //查询项收起
    $('.search-switch').on('click', function () {
        var filter = $(this).parents('.switch-div').siblings('.sec-filter');
        if (!$(filter).hasClass('close')) {
            $(filter).addClass('close');
            $(filter).hide();
            $(this).html('展开查询 <i class="fa fa-angle-up"></i>')

        }
        else {
            $(filter).removeClass('close');
            $(filter).show();
            $(this).html('收起查询 <i class="fa fa-angle-down"></i>')
        }

        // $(this).parents('.switch-div').siblings('.sec-filter').slideToggle();
        // $(this).html('收起查询 <i class="fa fa-angle-down"></i>')
    });
    
});
function choice() {
    $('.sec-item1 tr').click(function () {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            //$(this).find(':checkbox').prop('checked', false);
        } else {
            $('.sec-item1 tr').removeClass('active');
            $(this).addClass('active');
            //$("input.all-checkbox").prop("checked", false);
            //$(this).find(':checkbox').prop('checked', true);
        }
    });
}
function sendSMS(text, phone) {
    $.post('/Order/SendSMS', { mobeils: phone, content: text}, function (data) {
        if (data.result == 1) {
            layer.msg('短信发送成功');
        } else {
            layer.msg(data.errorMsg);
        }
    });
}
//模态框open
function modalOpen(modalname) {
    $(modalname).modal('toggle');
}
function addLayer(title, content, w, h, maxmin) {
    layerShow(title, content, w, h);
}//新增弹出层type1方法
function editLayer(title, content, w, h, maxmin) {
    if (isDataSelected()) {
        //获取当前数据内容赋值;

        layerShow(title, content, w, h);
    }
}//编辑弹出层type1方法
function layerShow(title, content, w, h, maxmin) {
    var _index = -1;
    if (title == null || title == '') {
        title = false;
    };

    if (w == null || w == '') {
        w = 800;
    };
    if (h == null || h == '') {
        h = ($(window).height() - 50);
    };
    if (maxmin == null || maxmin == '') {
        maxmin = maxmin;
    };
    layui.use('layer', function () {
        var layer = layui.layer;
        _index = layer.open({
            type: 1
            , title: title //不显示标题栏
            // ,closeBtn: 1
            , area: [w + 'px', h + 'px']
            , shade: 0.6
            , moveType: 1 //拖拽模式，0或者1
            , resize: true //
            , maxmin: maxmin
            , moveOut: true //是否允许拖拽到窗口外
            , content: $(content)
            , end: function () {
                $('.layer-member').hide();
                $('.layer-member-edit').hide();
                $('.layer-log-operate').hide();
                $('.layer-activate').hide();
                $('.layer-frost').hide();
                $('.layer-lose').hide();
                $('.layer-delete').hide();
                $('.layer-editpass').hide();
                $('.layer-balancetrim').hide();
                $('.layer-givebalance').hide();
                $('.layer-backamount').hide();
                $('.layer-setlevel').hide();
                $('.layer-setmemberdate').hide();
                $('.layer-givegift').hide();
                $('.layer-givegiftpackage').hide();
                $('.layer-membergift').hide();
                $('.layer-storems').hide();
                $('.layer-moreactive').hide();

                $('.layer-recharge').hide();
                $('.layer-gift').hide();
                $('.layer-giftpackage').hide();
                $('.layer-paymethod').hide();
                $('.layer-scope').hide();
                $('.layer-room_consume').hide();
                $('.layer-food_consume').hide();
                $('.layer-points-detail').hide();
                $('.layer-stored-detail').hide();
                $('.layer-sabana').hide();
                $('.layer-validity').hide();
                $(".layer-common form input").each(function () {
                    $(this).val('');
                });
                $(".layer-common form select").each(function () {
                    $(this).val('');
                });
                $(".layer-common form textarea").each(function () {
                    $(this).val('');
                });
                var scale = $("#scale");
                var fixed = $("#fixed");
                var full = $("#full");
                scale.html("");
                fixed.html("");
                full.html("");
            }
        });
    });
    return _index;
}

function InlayerShow(title, content, w, h) {
    if (title == null || title == '') {
        title = false;
    };

    if (w == null || w == '') {
        w = 800;
    };
    if (h == null || h == '') {
        h = ($(window).height() - 50);
    };
    layui.use('layer', function () {
        var layer = layui.layer;
        layer.open({
            type: 1
            , title: title //不显示标题栏
            // ,closeBtn: 1
            , area: [w + 'px', h + 'px']
            , shade: 0.1
            , moveType: 1 //拖拽模式，0或者1
            , resize: true //
            , moveOut: true //是否允许拖拽到窗口外
            , content: $(content)
            , end: function () {
                $('.layer-balancetrim').hide();
                $('.layer-member-edit').hide();
                $('.layer-log-operate').hide();
                $('.layer-activate').hide();
                $('.layer-frost').hide();
                $('.layer-lose').hide();
                $('.layer-delete').hide();
                $('.layer-editpass').hide();
                $('.layer-balancetrim').hide();
                $('.layer-givebalance').hide();
                $('.layer-backamount').hide();
                $('.layer-setlevel').hide();
                $('.layer-setmemberdate').hide();
                $('.layer-givegift').hide();
                $('.layer-givegiftpackage').hide();
                $('.layer-membergift').hide();
                $('.layer-storems').hide();

                $('.layer-recharge').hide();
                $('.layer-gift').hide();
                $('.layer-giftpackage').hide();
                $('.layer-paymethod').hide();
                $('.layer-scope').hide();
                $('.layer-room_consume').hide();
                $('.layer-food_consume').hide();
                $('.layer-points-detail').hide();
                $('.layer-stored-detail').hide();
                $(".layer-common form input").each(function () {
                    $(this).val('');
                });
                $(".layer-common form select").each(function () {
                    $(this).val('');
                });
                $(".layer-common form textarea").each(function () {
                    $(this).val('');
                });
            }
            });
            });
            }

//弹出层type1打开方法
function layerIframeShow(title, url, w, h, id) {
    var _index = -1;
    if (title == null || title == '') {
        title = false;
    };
    if (url == null || url == '') {
        //not found
    }
    if (w == null || w == '') {
        w = 800;
    };
    if (h == null || h == '') {
        h = ($(window).height() - 50);
    };
    layui.use('layer', function () {
        var layer = layui.layer;
        _index = layer.open({
            type: 2
            , title: title //不显示标题栏
            , area: [w + 'px', h + 'px']
            , shade: 0.3
            // ,id : 'xx'
            , moveType: 1 //拖拽模式，0或者1
            , resize: true //
            , maxmin: true
            , moveOut: true //是否允许拖拽到窗口外
            , content: url
        });
    });
    return _index;

}
function editLayerIframe(title, url, w, h) {
    if (isDataSelected()) {
        //获取当前数据内容赋值;

        layerIframeShow(title, url, w, h);
    }
}//编辑iframe方法
function Refresh() {
    var obj = $('iframe.active');
    obj.attr('src', obj.attr('data-href'));
}
//判断是否选中数据
function isDataSelected() {
    var items = $(".sec-item1 table tbody tr");
    var flag = false;
    //选中一条数据\
    var length = $(items).length;

    $(items).each(function (index) {
        if( $(this).hasClass('active')){
            flag = true;
            return false;
        }
        else if(index == length-1){
            layer.msg('请选中一条数据！');
        }
    });//选中一条数据
    return flag;
}
//查看操作日志
function GetList(id, vn, nn, url) {
    $.ajax({
        url: url,
        type: 'post',
        global: false,
        success: function (data) {
            var str = '<option value="">请选择</option>';
            if ($("#" + id + ' option').length == 1) {
                str = $("#" + id).html();
            }
            $.each(data, function (index, item) {
                str += '<option value="' + item[vn] + '">' + item[nn] + '</option>';
            });
            $("#" + id).html(str);
            form.render('select');
        }
    });
}
function GetCity(State, FormID) {
    if (State != '') {
        $.ajax({
            url: '/List/GetCity',
            type: 'post',
            global: false,
            success: function (data) {
                var str = "",count=0;
                $.each(data, function (index, item) {
                    if (item['StateCode'] == State) {
                        count++;
                        str += '<option value="' + item['CityCode'] + '">' + item['CityName'] + '</option>';
                    }
                });
                if (count > 1) {
                    str = "<option value=''>请选择</option>"+str;
                }
                if (FormID == null) {
                    $("#City").html(str);
                }
                else
                {
                    console.log(str);
                    console.log(FormID);
                    $(FormID +" #City").html(str);
                }
                form.render('select');
            }
        });
    }
}
//表格排序
function sort_table(formID) {
    $('.table-sort-btn').on('click', function () {
        if ($('#OrderBy').length == 0) {
            $('#' + formID).append('<input type="hidden" id="OrderBy" name="OrderBy" />');
        }
        var field = $(this).attr('id').replace('Field', '');
        var SortTypeID = field + 'SortType';
        if ($('#' + SortTypeID).length == 0) {
            $('#' + formID).append('<input type="hidden" id="' + SortTypeID + '" class="SortType" value="" />');
        }
        if ($('#' + SortTypeID).val() == 'up') {
            $('#' + SortTypeID).val('');
            $('#OrderBy').val(field + ' desc');
        } else {
            $('#' + SortTypeID).val('up');
            $('#OrderBy').val(field + ' asc');
        }
        $('#' + formID).trigger('submit');
    });
    $('.SortType').each(function () {
        var id = $(this).attr('id').replace('SortType', 'Field');
        $('#' + id).addClass($(this).val());
    });
}
//退出登陆
function LogOut() {
    $.ajax({
        url: '/Base/LogOut',
        type: 'post',
        global: false,
        success: function () {
            location.href = "/Login/Login?url=/Home";
        }
    });
}
function Loading() {
    if (msgStr == '') {
        layer.load();
    } else {
        layer.msg(msgStr, {
            icon: 16,
            shade: 0.01
        });
        msgStr = '';
    }
}
var msgStr='';
function stepMsg(text) {
    msgStr = text;
}
function closeProp() {
    $('.close').trigger('click');
}
//获取会员级别名称
function GetMemberLevelName(code)
{
    var name = "";
    $.post("/List/GetMemberLevelName", { code: code }, function (data) {
        name = data.description;
    });
    return name;
}
//获取会员类型名称
function GetMemberTypeName(code) {
    var name = "";
    $.post("/List/GetMemberLevelName", { code: code }, function (data) {
        name = data.description;
    });
    return name;
}
//0新建1编辑2删除3充值4消费5销卡6冻结7重用8合并9升级10到期11退费12卡值调整13积分调整14商品兑换15冻结押金16卡值转移17积分转移18卡值清零
function GetLogName(type) {
    var typeName = "";
    switch (type) {
        case "0":
            typeName = "新建";
            break;
        case "1":
            typeName = "编辑";
            break;
        case "2":
            typeName = "删除";
            break;
        case "3":
            typeName = "充值";
            break;
        case "4":
            typeName = "消费";
            break;
        case "5":
            typeName = "销卡";
            break;
        case "6":
            typeName = "冻结";
            break;
        case "7":
            typeName = "重用";
            break;
        case "8":
            typeName = "合并";
            break;
        case "9":
            typeName = "升级";
            break;
        case "10":
            typeName = "到期";
            break;
        case "11":
            typeName = "退费";
            break;
        case "12":
            typeName = "卡值调整";
            break;
        case "13":
            typeName = "积分调整";
            break;
        case "14":
            typeName = "商品兑换";
            break;
        case "15":
            typeName = "冻结押金";
            break;
        case "16":
            typeName = "卡值转移";
            break;
        case "17":
            typeName = "积分转移";
            break;
        case "18":
            typeName = "卡值清零";
            break;
        case "19":
            typeName = "挂失";
            break;
        case "20":
            typeName = "赠送金额调整";
            break;
    }
    return typeName;
}
function GetScopeLogType(type) {
    var typeName = "";
    switch (type) {
        case "0":
            typeName = "充值";
            break;
        case "1":
            typeName = "消费";
            break;
        case "2":
            typeName = "调整";
            break;
        case "3":
            typeName = "赠送";
            break;
        case "4":
            typeName = "积分调整";
            break;
        case "5":
            typeName = "商品兑换";
            break;
        case "6":
            typeName = "积分转移";
            break;
        case "7":
            typeName = "作为介绍人获得积分";
            break;
        case "8":
            typeName = "作为销售员获得积分";
            break;
        case "9":
            typeName = "来自账单的消费";
            break;
        case "10":
            typeName = "积分消费";
            break;
        case "11":
            typeName = "退费";
            break;
        case "12":
            typeName = "会员升级";
            break;
        case "13":
            typeName = "兑换客房";
            break;
        case "14":
            typeName = "app预定赠送积分";
            break;
        case "15":
            typeName = "h5预定赠送积分";
            break;
        case "16":
            typeName = "微信预定赠送积分";
            break;
        case "17":
            typeName = "支付宝预定赠送积分";
            break;
        case "18":
            typeName = "官网预定赠送积分";
            break;
        case "19":
            typeName = "会员签到赠送积分";
            break;
        case "20":
            typeName = "自有渠道点评赠送积分";
            break;
    }
    return typeName;
}
function GetBalanceLogType(type) {
    var typeName = "";
    switch (type) {
        case "0":
            typeName = "充值";
            break;
        case "1":
            typeName = "消费";
            break;
        case "2":
            typeName = "调整";
            break;
        case "3":
            typeName = "赠送";
            break;
        case "4":
            typeName = "退费";
            break;
        case "5":
            typeName = "卡值调整";
            break;
        case "6":
            typeName = "商品兑换";
            break;
        case "7":
            typeName = "卡值转移";
            break;
        case "8":
            typeName = "押金冻结";
            break;
        case "9":
            typeName = "卡值清零";
            break;
        case "10":
            typeName = "赠送金额调整";
            break;
    }
    return typeName;
}