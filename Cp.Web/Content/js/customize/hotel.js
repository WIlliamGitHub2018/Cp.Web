var form;
var table;
var layer;
var $;
var laydate;
var element;
layui.use(['form', 'element', 'layer', 'laydate', 'table', 'laypage'], function () {
    form = layui.form;
    table = layui.table;
    layer = layui.layer;
    laydate = layui.laydate;
    element = layui.element;
    $ = layui.$;
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
    laydate.render({
        elem: '#OpeningDate' //指定元素
        , type: 'date'
        , change: function (value, date, endDate) {
            console.log(value); //得到日期生成的值，如：2017-08-18
            $(".checkinDate").val(value)
        }
    });


    laydate.render({
        elem: '#DefaultCheckoutTime' //指定元素
        , type: 'time'
        , format: 'HH:mm'
        , change: function (value, date, endDate) {
            console.log(value); //得到日期生成的值，如：2017-08-18
            $(".checkoutDate").val(value)
        }
    });
    laydate.render({
        elem: '#DefaultCheckinTime' //指定元素
        , type: 'time'
        , format: 'HH:mm'
        , change: function (value, date, endDate) {
            console.log(value); //得到日期生成的值，如：2017-08-18
            console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
            console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
        }

    });
    form.verify({
        name: function (value) {
            if (value.length == 0) {
                return '请输入名称';
            }
        }, address: function (value) {
            if (value.length == 0) {
                return '请输入地址';
            }
        }, longitude: function (value) {
            if (value.length == 0) {
                return '请输入经度';
            }
        }, latitude: function (value) {
            if (value.length == 0) {
                return '请输入纬度';
            }
        }, rooms: function (value) {
            if (value == 0) {
                return '请输入房间总数';
            }
        }, phone: function (value) {
            if (value.length == 0) {
                return '请输入酒店总机号';
            }
        }
  , email: [/^[a-z0-9._%-]+@([a-z0-9-]+\.)+[a-z]{2,4}$|^1[3|4|5|7|8]\d{9}$/, '邮箱格式不对']
        //, phone: [/^1[3|4|5|7|8]\d{9}$/, '手机必须11位，只能是数字！']
    });
    //GetList('CountryCode', 'CountryCode', 'Description', '/List/GetCountry');
    //GetList('StateCode', 'StateCode', 'Description', '/List/GetState');
    //GetList('CityCode', 'CityCode', 'Description', '/List/GetCity');
    form.on('radio(HaveBreakfast)', function (data) {
        console.log(data.elem); //得到radio原始DOM对象
        console.log(data.value); //被点击的radio的value值
        alert(data.value)
        if (data.value == 0) {
            $(".breakfast-cate").hide()
        } else {
            $(".breakfast-cate").show()

        }
    });
});
function radioDescription(name) {
    var valradio = $("input[name='" + name + "']:checked").val();
    var prop = $("input[name='" + name + "']:checked");
   // alert(valradio)
    if (valradio == 0) {
        prop.siblings(".policyDescription").hide();
    } else {
        prop.siblings(".policyDescription").show()

    }
}
function SaveResort() {
    var main = $('#base-info-form').serializeObject();
    console.log(main);
    //return false;
    $.post('/HotelManager/SaveResort', { resort: main }, function (data) {
        console.log(data)
        if (data.result != 1) {
            layer.alert(data.msg);
        } else {
            layer.confirm('保存成功！', {
                closeBtn: 0
                , btn: ['确定'] //可以无限个按钮
                , btn1: function (index, layero) {
                    //按钮【按钮三】的回调
                    $('.base-info-form').trigger('submit');
                }
            });
          //  layer.alert("保存成功!", function () {
          //  });
        }
    });
}
function SaveResortDetail() {
    var stars = 0;
    $('#detail-info-form').find('a').each(function () {
        if (($(this).attr("class")) == "starDegree selected") {
            stars++;
        }
    });
    $('#StarCode').val(stars);
    var zone = $('#Zone').val();
    var phone = $('#Phone').val();
    if (zone != '')
    {
        $('#Phone').val(zone + '-' + phone);
    }
    console.log($("#Phone").val());
    var pre_fax = $('#Pre_Fax').val();
    var fax = $('#Fax').val();
    if (pre_fax != '') {
        $('#Fax').val(pre_fax + '-' + fax);
    }
    console.log($('#Fax').val())
    var pre_busfax = $('#Pre_BusinessFax').val();
    var busfax = $('#BusinessFax').val();
    if (pre_busfax != '') {
        $('#BusinessFax').val(pre_busfax + '-' + busfax);
    }
    console.log($('#BusinessFax').val())
    var main = $('#detail-info-form').serializeObject();
    console.log(main);
  // return false;
    $.post('/HotelManager/SaveHotelDetail', { resort: main }, function (data) {
        console.log(data)
        if (data.result != 1) {
            layer.alert(data.msg);
        } else {
            layer.confirm('保存成功！', {
                closeBtn: 0
                , btn: ['确定'] //可以无限个按钮
                , btn1: function (index, layero) {
                    //按钮【按钮三】的回调
                    $('#detail-info-form').trigger('submit');
                }
            });
           // layer.alert("保存成功!");
        }
    });
}


function SavePolicy() {
    var valradio = $("input[name='IsChildAllow']:checked").val();
    var description = $("input[name='IsChildAllow']:checked").attr("title")
    $(".ChildDescription").val(description)
    var petradio = $("input[name='IsPetAllow']:checked").val();
    var petdescription = $("input[name='IsPetAllow']:checked").attr("title")
    $(".PetDescription").val(petdescription)
    
    var main = $('#HotelPolicy').serializeObject();
    console.log(main);
  //  return false;
    $.post('/HotelManager/SaveResort', { resort: main }, function (data) {
        console.log(data)
        if (data.result != 1) {
            layer.alert(data.msg);
        } else {
            layer.confirm('保存成功！', {
                closeBtn: 0
                , btn: ['确定'] //可以无限个按钮
                , btn1: function (index, layero) {
                    //按钮【按钮三】的回调
                    $('#HotelPolicy').trigger('submit');
                }
            });
            //layer.alert("保存成功!");
        }
    });
}

function SaveFacility() {
    var main = $('#HotelFacility').serializeObject();
    console.log(main);
    //return false;
    $.post('/HotelManager/SaveHotelFacility', { resort: main }, function (data) {
        console.log(data)
        if (data.result != 1) {
            layer.alert(data.msg);
        } else {
            layer.confirm('保存成功！', {
                closeBtn: 0
                , btn: ['确定'] //可以无限个按钮
                , btn1: function (index, layero) {
                    //按钮【按钮三】的回调
                    $('#HotelFacility').trigger('submit');
                }
            });
           // layer.alert("保存成功!");
           // location.reload();
        }
    });
}

function SaveType() {
   
    var valradio = $("input[name='HaveWindow1']:checked").val();
    //$(".haveWindow").val(valradio)
    var main = $('.room-detail-lists').serializeObject();
    var id = main.RowID;
    console.log(main);
   // return false;
    $.post('/HotelManager/SaveRoomType', { item: main }, function (data) {
        console.log(data)
        if (data.result != 1) {
            layer.alert(data.msg);
        } else {
            layer.confirm('保存成功！', {
                closeBtn: 0
                , btn: ['确定'] //可以无限个按钮
                , btn1: function (index, layero) {
                    //按钮【按钮三】的回调
                    window.location = "/HotelManager/RoomTypeInfo?id=" + id;
                }
            });
          //  layer.alert("保存成功!");
        }
    });
}
function SaveContect() {
    var main = $('#HotelContact').serializeObject();
    console.log(main);
    //return false;
    $.post('/HotelManager/SaveHotelContact', { item: main }, function (data) {
        console.log(data)
        if (data.result != 1) {
            layer.alert(data.msg);
        } else {
            layer.confirm('保存成功！', {
                closeBtn: 0
                , btn: ['确定'] //可以无限个按钮
                , btn1: function (index, layero) {
                    //按钮【按钮三】的回调
                    location.reload();
                }
            });
            //layer.alert("保存成功!");
           // location.reload();
        }
    });
}

function imgLength(img,flag) {
    if (flag) {
        var type = $(img).parents(".sec-title").siblings(".main-content").find("input").val();
        console.log(type)
        $("#TypeCode").val(type)
        var length = $(img).parents(".sec-title").siblings(".main-content").find("img").length;
        if (length >= 1) {
            layer.alert("列表图已存在，如需修改请删除之后继续上传");
            return false;
        }
        addLayer('新建图文', '.layer-add-all', 750, 400);

    } else {
        var type1 = $(img).parents(".sec-title").siblings(".main-content").find("input").val();
        console.log(type1)
        $("#TypeCode").val(type1)
        addLayer('新建图文', '.layer-add-all', 750, 400);

    }
   // return
    

};

function SaveImg() {
    var valradio = $("#IntStatus").val();
    console.log(valradio);
    sessionStorage.setItem("IntStatus", valradio);
    $("#ImgType").val($("#ImgTypehid").val())
    $("#IsIndex").val($("#IsIndexhid").val())
    //console.log($("#IsIndexhid").val())
   //return false
    $("#source").val(valradio);
    //console.log(valradio)
    if ($("#imgname").val() == ""  ) {
        layer.alert("名称不能为空")
        return false;
    }
    var srcAll = $("#Src").val();
    console.log(srcAll);
    //var src = srcAll.substr(12);
    ////console.log(src)
    //$("#Src").val(src)
    var main = $('#Picture').serializeObject();
    console.log(main);
    //return false;
    $.post('/HotelManager/SaveImg', { model: main }, function (data) {
        console.log(data)
        if (data.result != 1) {
            layer.alert(data.msg);
        } else {
            layer.alert("保存成功!");
            layer.closeAll();
            $('#demo1').attr('src', '');
            $('#search_form').trigger('submit');

        }
    });
    
}

function DelImg(id) {
    layer.confirm("确认删除吗？", {
        btn: ['确定', '取消'] //按钮
    }, function () {
        console.log(id)
        //return false;
        $.post('/HotelManager/DeleteImg?id='+id, function (data) {
            console.log(data)
            if (data.result != 1) {
                layer.alert(data.msg);
            } else {
                layer.alert("删除成功!");
                layer.closeAll()
                $('#search_form').trigger('submit');

            }
        });
        }, function () {
            layer.closeAll();
    });
    

}

function IndexImg(id) {

    console.log(id)
    //return false;
    $.post('/HotelManager/IndexImg?id=' + id, function (data) {
        console.log(data)
        if (data.result != 1) {
            layer.alert(data.msg);
        } else {
            layer.alert("设置成功!");
          $('#search_form').trigger('submit');
        }
    });
}

 