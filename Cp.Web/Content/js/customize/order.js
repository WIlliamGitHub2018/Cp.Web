function setFilterValue() {
    $('.filter .choose_con').click(function () {
        var id = $(this).parent().attr('data-bind');
        $('#' + id).val($(this).attr('data-bind'));
        $(this).addClass('common_request_active').siblings().removeClass('common_request_active');
    });
}
function clearfilter() {
    $('.fiter_all').addClass('common_request_active').siblings().removeClass('common_request_active');
    $('.fiter_input').val('');
    $('#filter_Price input').val(0);
    filter();
}
function setPrice(id, obj) {
    if (id != '') {
        $('#all_Price').removeClass('common_request_active');
        $('#' + id).val($(obj).val());
        $(obj).parent().addClass('common_request_active');
    } else {
        $('#MinPrice,#MaxPrice').val(0);
        $('#filter_Price input').val(0);
        $('#filter_Price .choose_con').removeClass('common_request_active');
        $('#all_Price').addClass('common_request_active');
    }
}
function filter() {
    $('#search_form').trigger('submit');
}
function confirm(obj) {
    $('#ResvComments_text').text($('#ResvComments').val());
    var PayAmount = $('#PayAmount').val();
    if (PayAmount == '' || PayAmount == 0) {
        toNext(PayAmount, obj);
    } else {
        if (checkPayAmount(PayAmount)) {
            if ($('#SMSCode').val() == '' || $('#SMSCode').val() != validateCode) {
                layer.msg('验证码错误');
            } else {
                toNext(PayAmount,obj);
            }
        }
    }
}
function checkPayAmount(PayAmount) {
    if (PayAmount > member.balance) {
        layer.msg('储值余额不足'); return false;
    }
    return true;
}
function toNext(PayAmount,obj) {
    if (checkUserInfo()) {
        $('#PayAmount_text').text(PayAmount);
        obj.parents(".order_common_mes").siblings(".order_common_sure").show();
        obj.parents(".order_common_mes").hide();
    }
}
var validateCode = '';
function send_code() {
    var PayAmount = $('#PayAmount').val();
    if (PayAmount != '' & PayAmount>0&checkPayAmount()) {
        for (var i = 0; i < 6; i++) {
            validateCode += Math.floor(Math.random() * 10);
        }
        var text = "储值支付验证码：" + validateCode;
        sendSMS(text, member.phone);
    }
}
var resv = {}, crsResv = {},crsResv = {},_gift = null, FromDate, Disc;
function Reserve(HotelCode, RoomType, RoomTypeDesc, Price, htmlName) {
    resv.BaseResortCode = HotelCode;
    HotelCode = 'h' + HotelCode;
    var Rooms = $('#' + HotelCode + ' #' + RoomType + ' #Rooms').val();
    if (Rooms == 0) {
        layer.msg("预订房间数应大于0"); return;
    }
    if (htmlName == '') {
        if (member != null) {
            resv.MemberName = member.sname;
            resv.MemberNo = member.membercard;
            resv.Phone = member.phone;
        }
    } else {
        var inputPrice = $('#' + HotelCode + ' #' + RoomType + ' #Price').val();
        if (inputPrice > 0) {
            Price = inputPrice;
        }
        Disc = $('#' + HotelCode + ' #' + RoomType + ' #Disc').val();
    }
    resv.RoomType = RoomType;
    resv.Rtc = RoomType;
    resv.Rate = Price;
    resv.RateFinally = Price;
    resv.Price = Price;
    resv.Nights = $('#Nights').val();
    resv.TotalPrice = Price * Rooms * resv.Nights;
    resv.Rooms = Rooms;
    FromDate = StringToDate($('#FromDate').val());
    resv.DepartureDate = FromDate.DateAdd('d', resv.Nights).Format('yyyy-MM-dd');
    $('#Reserve_panel').html('').load('/prop/' + htmlName + 'CreateOrderProp.html', function () {
        var HotelName=$('#' + HotelCode + ' #HotelName').text();
        $('#HotelName_text').text(HotelName); 
        resv.HotelName = HotelName;
        resv.HotelAddress = $('#' + HotelCode + ' #HotelAddress').text();
        if (htmlName == '') {
            if (member != null) {
                $('#GuestName').val(member.sname);
                $('#AltName_text').text(member.sname);
                $('#Balance').val(member.availablebalance);
                $('#GuestPhone').val(member.phone);
                $('#ContactTel_text').text(member.phone);
            }
            $('#keepTime').text(FromDate.DateAdd('h', 12).Format('yyyy-MM-dd HH:mm:ss'));
            $('#HotelNotice_text').text($('#' + HotelCode + ' #HotelNotice').text());
        } else {
            $('#Disc_text').text(Disc);
            $('#ToDate_text').text(resv.DepartureDate);
        }
        $('#FromDate_text').text(FromDate.Format('yyyy-MM-dd'));
        $('#Nights_text').text(resv.Nights);
        $('#RoomTypeDesc_text').text(RoomTypeDesc);
        $('#Rooms_text').text(Rooms);
        $('#Price_text').text(Price);
        $('#TotalPrice_text').text(resv.TotalPrice);
        modalOpen('.modal-order-mes');
    });
}
function ResvSave() {
    var ResvType = $('#resvType').val();
    resv.ArrivalDate = $('#FromDate').val();
    resv.CheckinTime = resv.ArrivalDate;
    resv.SourceCode = $('#RateCode').val()=='RAC'?'1C':'1B';
    resv.Channel = 'CC';
    resv.Payment = 'CASH';
    resv.RateCode = $('#RateCode').val();
    resv.Adults = 1;
    resv.ResvType = 'Normal';
    if (ResvType == 1) {
        resv.ResvType = 'LONG';
    } else if (ResvType == 2) {
        resv.ResvType = 'TEAM';
    }
    var GuestList = [];
    var index = 0,nameStr='';
    $('.Guest').each(function (index,item) {
        var name = $(this).find('[name=GuestName]').val();
        var phone = $(this).find('[name=GuestPhone]');
        var email = $(this).find('[name=GuestEmail]');
        if (name != '' & $(phone).val() != '') {
            nameStr += nameStr == '' ? '' : "|";
            nameStr += name;
            if (index == 0) {
                resv.AltName = name;
                resv.Phone = $(phone).val();
            }
            var guestInfo = {};
            guestInfo.GuestName = name;
            guestInfo.GuestPhone = $(phone).val();
            guestInfo.GuestEmail = email.val();
            if ($(phone).val() != '' & $(phone).next().is(':checked')) {
                guestInfo.IsSendSMS = 1;
            }
            if ($(email).val() != '' & $(email).next().is(':checked')) {
                guestInfo.IsSendEmail = 1;
            }
            GuestList[index] = guestInfo;
            index++;
        }
    });
    var CallTel = '';
    resv.LastName = resv.AltName;
    if (ResvType > 0) {
        resv.BookName = resv.AltName;
        resv.FixFlag = 1;
        CallTel = resv.Phone;
    } else {
        CallTel = resv.Phone;
        resv.ResvComments = $('#ResvComments').val();
        resv.PayAmount = $('#PayAmount').val();
        if (member != null) {
            resv.BookName = member.sname;
            resv.IdCard = member.id_number;
            resv.MemberType = member.memberlevel;
            resv.MemberLevel = member.memberlevel;
        }
    }
    resv.BookPhone = CallTel;
    var crsResv = resv;
    crsResv.AltName = nameStr;
    crsResv.ContactTel = resv.Phone;
    crsResv.ContactName = resv.AltName;
    crsResv.CallTel = CallTel;
    
    $.post('/Order/CreateReservation', { resv: resv, crsResv: crsResv, GuestList: GuestList }, function (data) {
        if (data.result == 1) {
            closeProp();
            if (resv.Payment > 0 || _gift != null) {
                stepMsg('预订成功，正在支付');
                $.ajax({
                    url: '/Bill/PrePay',
                    data: { resv: data.content, gift: _gift },
                    type: 'post',
                    success: function (data) {
                        closeProp();
                        if (data.result == 1) {
                            layer.msg("支付成功", function () { filter(); });
                        }
                        else {
                            layer.alert(data.errorMsg);
                        }
                    }
                });
            } else {
                layer.msg("预订成功", function () { filter(); });
            }
        }
        else {
            layer.alert(data.errorMsg);
        }
    });
}
function showRefundReason() {
    if (isDataSelected()) {
        GetList('ReasonID', 'RowID', 'Description', '/Order/GetRebateReasonList');
        modalOpen('.modal-RefundReason');
    }
}
function GetBillProp() {
    if ($('#ReasonID').val() == '') {
        layer.msg('请选择退款原因'); return;
    }
    closeProp();
    var ResID = $('tr.active input[name=RowID]').val();
    var ResortCode = $('tr.active input[name=BaseResortCode]').val();
    GetBillDetailedProp(ResID, ResortCode, '?Refund=1');
}
function showCancelReason() {
    if (isDataSelected()) {
        GetList('CancelReason_select', 'Description', 'Description', '/List/GetCancelReason');
        modalOpen('.modal-CancelReason');
    }
}
var isRefund = false;
function CancelResv() {
    var reason = '';
    if ($('#CancelReason_select').val() != '') {
        reason = $('#CancelReason_select').val();
    } else if ($('#CancelReason_text').val() != '') {
        reason = $('#CancelReason_text').val();
    }
    if (reason == '') {
        layer.msg('请选择或输入取消原因'); return;
    }
    closeProp();
    var isCancel=true;
    var Balance = $('tr.active input[name=Balance]').val();
    if (Balance != 0) {
        isCancel=false;
        layer.confirm('该笔订单已付费，是否仍需继续取消？', {
            shadeClose:true,
            btn: ['确定', '取消'], //按钮
        }, function () {
            closeProp();
            var RowID = $('tr.active input[name=RowID]').val();
            var BaseResortCode = $('tr.active input[name=BaseResortCode]').val();
            stepMsg('正在平账');
            $.ajax({
                url: '/Bill/CancelPostBill',
                data: { ResID: RowID, BaseResortCode: BaseResortCode },
                type: 'post',
                async: false,
                success: function (data) {
                    if (data.result == 1) {
                        isRefund = true;
                        Cancel(reason);
                    }
                    else {
                        layer.alert(data.errorMsg);
                    }
                }
            });
        });
    }
    if (isCancel) {
        layer.confirm('确认取消订单？', {
            shadeClose: true,
            btn: ['确定', '取消'], //按钮
        }, function () {
            Cancel(reason);
        });
    }
}
function Cancel(reason) {
    closeProp();
    var RowID = $('tr.active input[name=RowID]').val();
    var BaseResortCode = $('tr.active input[name=BaseResortCode]').val();
    stepMsg('正在取消订单');
    $.post('/Order/Cancel', { ResvNameId: RowID, BaseResortCode: BaseResortCode, CancelReason: reason }, function (data) {
        if (data.result == 1) {
            if (isRefund) {
                closeProp();
                layer.confirm('订单已取消，是否退款？', {
                    shadeClose: true,
                    btn: ['确定', '取消'], //按钮
                }, function () {
                    closeProp();
                    isRefund = false;
                    showRefundReason();
                }, function () {
                    filter();
                });
            } else {
                layer.msg("订单已取消");
                filter();
            }
        }
        else {
            layer.alert(data.errorMsg);
        }
    });
}
function ConsumeMemberProp() {
    if (isDataSelected()) {
        GetMember(2);
        var Balance = $('.active input[name=Balance]').val();
        var TotalPrice = $('.active input[name=TotalPrice]').val();
        $('#m_balance').text(member.availablebalance);
        $('#pay_payAmount').text(accAdd(TotalPrice, Balance));
        modalOpen('.modal_ConsumeMember');
    }
}
function ConsumeMember() {
    var balance = $('#m_balance').text();
    var pay_payAmount = $('#pay_payAmount').text();
    if (parseFloat(pay_payAmount) > parseFloat(balance)) {
        layer.msg('余额不足'); return;
    }
    var rsRequest = {ResvNameId: $('.active input[name=RowID]').val(), BaseResortCode: $('.active input[name=BaseResortCode]').val()};
    $.post('/Bill/ConsumeMember', { rsRequest: rsRequest, totalamount: pay_payAmount }, function (data) {
        if (data.result == 1) {
            layer.msg("支付成功");
            closeProp();
            filter();
        }
        else {
            layer.alert(data.errorMsg);
        }
    });
}
var member = null;
function GetMember(op) {
    var memberNo = '', certificate = '';
    if (op == 1) {
        var keycode = $('#keycode').val();
        if (keycode.length == 11) {
            memberNo = keycode;
        } else if (keycode.length == 18) {
            certificate = keycode;
        } else if (keycode != '') {
            layer.msg("请输入格式正确的手机号或身份证号！");
            return;
        }
    } else {
        memberNo = $('.active input[name=MemberNo]').val();
    }
    $.ajax({
        url: '/Order/GetMember',
        data: { certificate_code: certificate, telephone: memberNo },
        type: 'post',
        async:false,
        success:function (data) {
            if (data.rowid > 0) {
                member = data;
                if (op == 1) {
                    $('#memberName').val(data.sname);
                    $('#memberPhone').val(data.phone);
                    $('#memberLevel_text').val(GetMemberLevelDesc(data.memberlevel));
                    $('#RateCode').val(data.memberlevel);
                    $('#IdNumber').val(data.id_number);
                    $('#memberID').val(data.rowid);
                }
            } else {
                layer.msg("未查询到会员数据！");
            }
        }
    });
    if (op==1) {
        //$.ajax({
        //    url: '/Order/UserBehavior',
        //    data: { MemberNo: memberNo, IdCard: certificate },
        //    dataType: 'html',
        //    type: 'post',
        //    global: false,
        //    success: function (data) {
        //        $('#UserBehavior_panel').html(data);
        //    }
        //});
    }
}
function GetBillDetailedProp(ResID,ResortCode,param) {
    $('.modal-balance-account').html('').load('/Bill/BillDetailedProp' + param, {
        ResID: ResID, BaseResortCode: ResortCode
    }, function () {
        modalOpen('.modal-balance-account');
    });
}
function ShowLog() {
    if (isDataSelected()) {
        var ResvNameId = $('.active input[name=RowID]').val();
        var ResortCode= $('.active input[name=BaseResortCode]').val()
        var param = '?ResvNameId=' + ResvNameId + '&BaseResortCode=' + ResortCode;
        $('#prop_iframe').attr('src', '/Order/ResvActions' + param);
        modalOpen('.modal-log-operate');
    }
}
function GetResvDaily(RowID, ArriveDate, DepartureDate, ResortCode) {
    $.post('/Order/GetResvDaily', { RowID: RowID, ArriveDate: ArriveDate, DepartureDate, BaseResortCode: ResortCode}, function (data) {
        if (data!='') {
            var beginDate = StringToDate(ArriveDate);
            var endDate = StringToDate(DepartureDate);
            var days = beginDate.DateDiff('d', endDate);
            var week = beginDate.getDay();
            var content = '';
            var num = 0,td=0;
            var trCount = (days + week) / 7;
            for (var tr = 0; tr < trCount; tr++) {
                content += "<tr>";
                for (td = 0; td < 7; td++) {
                    if (td >= week || tr > 0) {
                        content += '</a><td><a class="date">' + beginDate.DateAdd('d', num).Format('MM-dd') +
                            '<a class="price">￥' + data[num].RateAmt + '</a></td>';
                        num++;
                    } else {
                        content += '<td></td>';
                    }
                    if (num > days) {
                        break;
                    }
                }
                if (td < 6) {
                    for (var i = 0; i < 6 - td;i++){
                        content += '<td></td>';
                    }
                }
                content += "</tr>";
            }
            $('#daily_content').html(content);
            modalOpen('.modal-avg-price');
        }
    });
}

function NightsOnChange() {
    var nights = $("#Nights").val();
    if (nights < 1) {
        $("#Nights").val(1);
        alertify.alert("入住天数不允许小余1天"); return;
    }
    $('#ToDate').val(StringToDate($('#FromDate').val()).DateAdd('d', nights).Format('yyyy-MM-dd'));
}
function ArrivaDateOnChange() {
    var Nights = $("#Nights").val();
    $('#ToDate').val(StringToDate($('#FromDate').val()).DateAdd('d', Nights).Format('yyyy-MM-dd'));
}
function DepartOnChange() {
    var ArrivaDate = $('#FromDate').val();
    var diff = DateDiff($('#ToDate').val(), ArrivaDate);
    if (diff < 0) {
        alertify.alert("离店日期不允许小于到店日期");
        $('#ToDate').val(StringToDate(ArrivaDate).DateAdd('d', $("#Nights").val()).Format('yyyy-MM-dd'));
    }else{
        $("#Nights").val(diff);
    }
}
function hideBtn() {
    $('.sec-item1 tr').click(function () {
        $('.operate-btns a').show();
        var Balance = $(this).find('input[name=Balance]').val();
        var resvStatus = $(this).find('input[name=ResvStatus]').val();
        var MemberNo = $(this).find('input[name=MemberNo]').val();
        if (resvStatus >= 90) {
            $('#CancelResv,#PayAmount').hide();
        } else {
            $('#refund').hide();
        }
        if (MemberNo == '') {
            $('#PayAmount').hide();
        }
    })
}
function checkUserInfo() {
    var sendType_text = '';
    var name = $('.Guest [name=GuestName]:eq(0)').val();
    var phone = $('.Guest [name=GuestPhone]:eq(0)');
    if (name == '') {
        layer.msg('请输入姓名'); return false;
    }
    if ($(phone).val() == '') {
        layer.msg('请输入手机号'); return false;
    } else {
        if ($(phone).next().is(':checked')) {
            sendType_text += '短信';
        }
    }
    var email = $('.Guest [name=GuestEmail]:eq(0)');
    if ($(email).val() != '' & $(email).next().is(':checked')) {
        sendType_text += (sendType_text == '' ? '' : '/') + '邮件';
    }
    $('#GuestName').val(name);
    $('#AltName_text').text(name);
    $('#GuestPhone').val($(phone).val());
    $('#ContactTel_text').text($(phone).val());
    $('#sendType_text').text(sendType_text);
    return true;
}
function GetMemberLevelDesc(level) {
    var levelDesc = "";
    switch (level) {
        case "MEM0":
        case "MEM1":
            levelDesc = "银卡";
            break;
        case "MEM2":
            levelDesc = "金卡";
            break;
        case "MEM3":
            levelDesc = "钻石卡";
            break;
    }
    return levelDesc;
}
function hideLeft() {
    $('.common_float').trigger('click');
}
