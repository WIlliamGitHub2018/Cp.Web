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


    $(".count_down").click(function () {
       // alert("----")
        var num_max=parseInt($(this).parents("td").siblings(".order_room_num").text());
       //alert(num_max)
        var input_val=parseInt($(this).siblings(".input_box").val());
        var input_val_end=input_val-1;
        if(input_val_end<0){
            // layer.msg('请选择你要预定的房间数');
        }else{
            $(this).siblings(".input_box").val(input_val_end)
        }
    })

    $(".count_up").click(function () {
        //alert("++++")
        var num_max=parseInt($(this).parents("td").siblings(".order_room_num").text());
        //alert(num_max)
        var input_val=parseInt($(this).siblings(".input_box").val());
        var input_val_end=input_val+1;
        if(input_val_end>num_max){
            layer.msg('您最多只能预定'+num_max+'间房');
        }else{
            $(this).siblings(".input_box").val(input_val_end)
        }
    })

    $(".common_request").click(function () {
        //alert(111)
        $(this).toggleClass("common_request_active");
        var vals=$(this).text();

        if($(this).hasClass("common_request_active")){
            var input_val=$(".requeat_input").val();
            var input_end_val=input_val+vals+" ";
            $(".requeat_input").val(input_end_val)
        }else{
            var input_val1=$(".requeat_input").val();
            var input_end_val1=input_val1.replace(vals,"");
            $(".requeat_input").val(input_end_val1)
        }

    })
    $(".common_float").click(function () {
        // alert(111)
        $(this).parents(".common-ms").toggleClass("common-ms-active");
        if($(this).parents(".common-ms").hasClass("common-ms-active")){
            // alert(123);
            // console.log($(this).find("i"));
            $(this).find("i").removeClass("fa-angle-double-left").addClass("fa-angle-double-right")

        }else{
            $(this).find("i").removeClass("fa-angle-double-right").addClass("fa-angle-double-left")

        }

    })
    //$(".points_methods").click(function () {

    //})
})
function InlayerShow(title,content,w,h) {
    if (title == null || title == '') {
        title=false;
    };

    if (w == null || w == '') {
        w=800;
    };
    if (h == null || h == '') {
        h=($(window).height() - 50);
    };
    layui.use('layer', function(){
        var layer = layui.layer;
        layer.open({
            type: 1
            ,title: title //不显示标题栏
            // ,closeBtn: 1
            ,area: [w+'px', h +'px']
            ,shade: 0.1
            ,moveType: 1 //拖拽模式，0或者1
            ,resize:true //
            ,moveOut: true //是否允许拖拽到窗口外
            ,content:$(content)
        });
    });
}