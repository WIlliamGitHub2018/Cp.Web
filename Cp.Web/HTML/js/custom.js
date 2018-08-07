$(window).load(function () {
	$(".top-nav-bar").load('top_nav.html');
    $('.sidebar').load('aside.html',function () {
        $(".btn-dropdown").on('click',function(e){
            var parent = $(this).parent(".nav-item");
            var dropMenu = parent.children(".drop-menu");
            if(!parent.hasClass("active")){
                parent.addClass("active");
                parent.siblings(".nav-item").removeClass("active");
                dropMenu.slideDown(3000);
                parent.siblings(".nav-item").children(".drop-menu").slideUp(3000);
            }
            else{
                parent.removeClass("active");
                dropMenu.slideUp();
            }

            // $(this).siblings(".drop-menu").slideToggle();
            // parent.toggleClass("active");
            // if($(this).parent(".nav-item").hasClass("active")){
            //     $(this).parent(".nav-item").siblings('.nav-item').removeClass("active");
            // }



        });//---nav二级菜单展开
        $('.two-menu').mouseenter(function () {
            $(this).children(".three-menu").show('fast');
        });
        $('.two-menu').mouseleave(function () {
            $(this).children(".three-menu").hide('fast');
        });//---nav三级菜单展开
        $(".icon-fold").click(function () {
            $(this).parents('.sidebar').toggleClass('active');
            $(this).parents('.sidebar').siblings('.main-body').toggleClass("left-width");
        });//---nav菜单展开
    });
});

$(document).ready(function(){

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
	//table 数据checkbox全选
	$("input.all-checkbox").click(function(){
        if(this.checked){
            $("input.list-checkbox").prop("checked", true);
            $("input.list-checkbox").parents('tr').addClass('active');
        }else{
            $("input.list-checkbox").prop("checked", false);
            $("input.list-checkbox").parents('tr').removeClass('active');
        }
    });
    //一条数据选中效果
	$('.sec-item1>.table>tbody>tr').click(function () {
		$(this).toggleClass('active');
        var checkbox = $(this).find("input.list-checkbox");
		if( $(this).hasClass('active') ){
            checkbox.prop('checked',true);
		}
		else {
            checkbox.prop('checked',false);
            $("input.all-checkbox").prop("checked", false);
		}
    });

    //    删除数据
    $(".delete-btn").click(function () {
        if(isDataSelected()){
            //确删除弹框
            layer.confirm("确认删除吗？");
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

//表格排序按钮
    $('.table-sort-btn').on('click',function () {
       $(this).toggleClass('up');
    });

    $('.more-query-btn').on('click',function(){
        $(this).parents('.high-query ').toggleClass('active')
       $(this).parents('.layui-form-item').siblings('.more-query-lists').slideToggle();
    });
//市场代码、价格代码等选择
    $('.layer-code-btn').on('click',function(){
        var index = parent.layer.getFrameIndex(window.name);
        var input = $(this).siblings('.layui-input-block').children('input');
        var  title = $(this).siblings('.layui-form-label').text();

        //打开弹框
        parent.layerIframeShow(title,'crs_code_query.html',700,500);
    });

    //查询项收起
    $('.search-switch').on('click',function () {
        var filter = $(this).parents('.switch-div').siblings('.sec-filter');
        if(!$(filter).hasClass('close')){
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


//所有通用方法
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
}//判断是否选中数据
function addLayer(title,content,w,h,maxmin) {
    layerShow(title,content,w,h);
}//新增弹出层type1方法
function editLayer(title,content,w,h,maxmin) {
    if(isDataSelected()){
        //获取当前数据内容赋值;

        layerShow(title,content,w,h);
    }
}//编辑弹出层type1方法
function layerShow(title,content,w,h,maxmin,func) {
    var _index = -1;
    if (title == null || title == '') {
        title=false;
    };

    if (w == null || w == '') {
        w = 800;
    }
    if (h == null || h == '') {
        h=($(window).height() - 50);
    }
    if (maxmin == null || maxmin == '') {
        maxmin=maxmin;
    };
    layui.use('layer', function(){
        var layer = layui.layer;
        _index = layer.open({
            type: 1
            ,title: title //不显示标题栏
            // ,closeBtn: 1
            ,area: [w, h]
            ,shade: 0.6
            ,moveType: 1 //拖拽模式，0或者1
            ,resize:true //
            ,maxmin: maxmin
            ,moveOut: true //是否允许拖拽到窗口外
            , content: $(content)
            , success: func
        });
    });
    return _index;
}//弹出层type1打开方法
function layerIframeShow(title,url,w,h,id) {
    var _index = -1;
    if (title == null || title == '') {
        title=false;
    };
    if(url == null || url == ''){
        //not found
    }
    if (w == null || w == '') {
        w=800;
    };
    if (h == null || h == '') {
        h=($(window).height() - 50);
    };
    layui.use('layer', function(){
        var layer = layui.layer;
        _index = layer.open({
            type: 2
            ,title: title //不显示标题栏
            ,area: [w+'px', h +'px']
            ,shade: 0.3
            // ,id : 'xx'
            ,moveType: 1 //拖拽模式，0或者1
            ,resize:true //
            ,maxmin: true
            ,moveOut: true //是否允许拖拽到窗口外
            ,content:url
        });
    });
    console.log(_index);
    return _index;

}
function editLayerIframe(title,url,w,h){
    if(isDataSelected()){
        //获取当前数据内容赋值;

        layerIframeShow(title,url,w,h);
    }
}//编辑iframe方法







