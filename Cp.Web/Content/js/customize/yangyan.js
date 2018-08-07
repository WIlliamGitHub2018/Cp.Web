// function cancelorder(aa) {
//     //var event=e.target;
//     //$(this).parents(".passger_box").empty();
//     aa.parentNode.parentNode.parentNode.parentNode.parentNode.removeAttribute("type");
//     aa.parentNode.parentNode.parentNode.parentNode.parentNode.innerHTML='';
//     //alert(aa.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute('class'));
//     //$(this).parents(".passger_box").removeAttr("type");   parents(".passger_box")
// }
$(function () {
    //查询酒店-长包房
    $(".find_hotel").click(function () {
        //alert(111)
        $(".hotel_part").css("display","block");
        //alert(222)
    })

    $(".order").click(function () {
        var modalOrderMes = $('.modal-order-permanent');
        modalOrderMes.modal('toggle');
         //alert($(this).parents(".hotel_bigbox").children(".passger_box").attr("type"))


        $(".order_check").click(function () {

            $(this).parents(".passger_box_mes").siblings(".passger_box_sure").show();
            $(this).parents(".passger_box_mes").hide();
            $(".order_cancel").click(function () {

            })
        })
        $(".order_cancel").click(function () {
           // alert(123456)
           //  $(this).parents(".passger_box").removeAttr("type");
           //  $(this).parents(".passger_box").empty();
        })

        $(".add_user").click(function () {
           // alert(123)
            var into='';
            into +='<div class="passger_sma_box">';
            into +='<div class="layui-form-item">'
            into += '<div class="layui-inline"><label class="layui-form-label">入住人全名</label><div class="layui-input-block"><input type="text" name=""  placeholder="请输入姓名" class="layui-input"></div></div>';
            into +='<div class="layui-inline"><label class="layui-form-label">联系手机</label><div class="layui-input-block"><input type="text" name=""  placeholder="请输入手机号" class="layui-input"></div></div>';
            into += '<div class="layui-inline"><label class="layui-form-label">邮箱</label><div class="layui-input-block"><input type="text" name=""  placeholder="请输入邮箱" class="layui-input"></div> </div>';
            into +='</div></div>';
            $(".pass_index_box").after(into);
        })
    })
    $(".common_float").click(function () {
        // alert(111)
        var left=$(".common_left");

        if (left.css("display") == "block") {
            $('.fa-angle-double-left').addClass('fa-angle-double-right');
            //alert(123)
            $(".common_right").css({
                width:"100%"
            })
            // $(".common-ms").css({position:"relative"});
            $(".common_float").css({
                // position:"absolute",
                top:"0",
                left:"0",
                right:"100%",
                bottom:"0"
            })
            left.css("display","none");
        } else {
            $('.fa-angle-double-left').removeClass('fa-angle-double-right');
            //alert(234)
            $(".common_right").css({
                width:"65%"
            })
            // $(".common-ms").css({position:"relative"});
            $(".common_float").css({
                // position:"absolute",
                 top: "0",
                bottom: "0",
                 margin: "auto",
                right:"31.7%"
            })
            left.css("display","block");
        }
    })
})