//一般直接写在一个js文件中
layui.use(['layer', 'form','laypage','table','upload'], function(){
	 var form = layui.form
         ,layer = layui.layer
          ,laydate = layui.laydate
          ,laypage = layui.laypage
          ,table = layui.table;

  //触发事件
  var active = {
    updateOrder: function(){
      //配置一个透明的iframe层 ,修改订单
      layer.open({
        type:2,
        title:'订单修改',
        area:['800px','500px'],
        shade:0.3,
        id:"lay2",
         btn:['提交','取消'],
        moveType:0,
         content:'lay_open.html',
        // content:'layui.js',
        
      });
    },
    deleteOrder: function(){
       //配置一个透明的iframe层 ,删除订单
      layer.confirm('确认删除吗?', {icon: 2, title:'删除订单'}, function(index){
      //do something
      
      layer.close(index);
    });
    },
    addOrder: function(){
       //配置一个透明的iframe层 ,添加订单
      layer.open({
        // time: 20000, //20s后自动关闭
        type:2,
        title:'订单添加',
        area:['800px','500px'],
        shade:0.3,
        id:"lay1",
         btn:['提交','取消'],
        moveType:0,
        content:'lay_open.html',
        
      });
    }
  };
  //表格渲染
  table.render({
    elem: '#order-list'
    // ,height: 200
    ,cols: [[ //标题栏
      // {checkbox: true, LAY_CHECKED: true}, //默认全选
      {field: 'order_id', title: '订单号', width: 80, sort: true}
      ,{field: 'member_name', title: '会员号', width: 120}
      ,{field: 'customer_name', title: '客人姓名', width: 150}
      ,{field: 'member_degree', title: '会员等级', width: 150}
      ,{field: 'room_type', title: '房型', width: 80}
      ,{field: 'price', title: '价格', width: 100}
      ,{field: 'date_arrive', title: '到店日期', width: 80, sort: true}
      ,{field: 'date_leave', title: '离店日期', width: 80, sort: true}
      ,{field: 'comments', title: '备注', width: 80, sort: true}
    ]] 
    ,skin: 'row' //表格风格
    ,even: true
    //,page: true //是否显示分页
    ,limits: [5, 7, 10]
    ,limit: 5 //每页默认显示的数量
    ,data: [{
      "order_id": "10001"
      ,"member_name": "杜甫"
      ,"customer_name": "xianxin@layui.com"
      ,"member_degree": "金卡"
      ,"room_type": "大床A"
      ,"price": "389"
      ,"date_arrive": "10/11/2017"
      ,"date_leave": "10/11/2017"
      ,"comments": "打扫房间欧派跟我讲"
    }, {
      "order_id": "10004"
      ,"member_name": "贤心"
      ,"customer_name": "xianxin@layui.com"
      ,"member_degree": "金卡"
      ,"room_type": "大床A"
      ,"price": "389"
      ,"date_arrive": "10/11/2017"
      ,"date_leave": "10/11/2017"
      ,"comments": "打扫房间欧派跟我讲"
    }, {
      "order_id": "10007"
      ,"member_name": "贤心"
      ,"customer_name": "xianxin@layui.com"
      ,"member_degree": "金卡"
      ,"room_type": "大床A"
      ,"price": "389"
      ,"date_arrive": "10/11/2017"
      ,"date_leave": "10/11/2017"
      ,"comments": "打扫房间欧派跟我讲"
    }]
    
  });
   //表格渲染结束

  //表单渲染

  form.render();
    // $('body').on('click','.layui-table-body tr td',function(){
    //     if($(this).index()!=0){
    //         if(  $(this).parents('tr').find('div.layui-form-checkbox').hasClass('layui-form-checked') ){console.log(44)
    //             $(this).parents('tr').find('div.layui-form-checkbox').removeClass('layui-form-checked');
    //             $(this).parents('tr').find("input[type=checkbox]").prop("checked",false);
    //
    //
    //         }else{console.log($(this).parent('tr'))
    //             $(this).parents('tr').find('div.layui-form-checkbox').addClass('layui-form-checked');
    //
    //           $(this).parents('tr').find("input[type=checkbox]").prop('checked',true)
    //
    //         }
    //         //form.render();
    //     }
    //     table.render();
    // })

  //分页渲染
  laypage.render({
    elem: 'pages' //注意，这里的 test1 是 ID，不用加 # 号
    ,count: 50 //数据总数，从服务端得到
  });
  //分页渲染结束

  // 点击事件代码
  $('#layerDemo .layui-btn').on('click', function(){
    var othis = $(this), method = othis.data('method');
    active[method] ? active[method].call(this, othis) : '';

  });

//layui 复选框全选问题
    form.on('checkbox(list-select-all)', function(data){
        var sibLists = $(data.elem).siblings('input[lay-filter="list-checkbox"]');
        sibLists.each(function(index, item){
            item.checked = data.elem.checked;
        });

        var ListAllCheck =  $(data.elem).parents(".all-checked-row").find(' input[lay-filter="list-permission-all"]');//总全选checkbox
        var ListAllRowCheck =  $(data.elem).parents(".all-checked-row").find(' input[lay-filter="list-select-all"]');//所有行全选checkbox
        var lenListRow = ListAllRowCheck.length;
        var LenAllChecked = ListAllRowCheck.filter(':checked').length;
        if(lenListRow == LenAllChecked){
            ListAllCheck.prop("checked",true);
        }
        else {
            ListAllCheck.prop("checked",false);
        }
        form.render('checkbox');
    });
    form.on('checkbox(list-checkbox)',function(data){
        var listSibRow = $(data.elem).parents('.layui-form-item').first().find('input[lay-filter="list-checkbox"]');//行同胞
        var listRowAll = $(data.elem).siblings(' input[lay-filter="list-select-all"]');//行全选checkbox
        var lenRow = listSibRow.length;//行list-checkbox长度
        var lenRowChecked = listSibRow.filter(':checked').length;//行list-checkbox选中长度
        if(lenRow == lenRowChecked){
            listRowAll.prop("checked",true);
        }
        else {
            listRowAll.prop("checked",false);
        }
        var ListAllCheck =  $(data.elem).parents(".all-checked-row").find(' input[lay-filter="list-permission-all"]');//总全选checkbox
        var ListAllCheckbox = $(data.elem).parents(".all-checked-row").find(':checkbox[lay-filter !="list-permission-all"]');//除总选外所有checkbox
        var lenAll = ListAllCheckbox.length;//除总选外所有checkbox长度
        var lenAllChecked = ListAllCheckbox.filter(':checked').length;//除总选外所有checkbox选中长度
        if(lenAll == lenAllChecked){
            ListAllCheck.prop("checked",true);
        }
        else {
            ListAllCheck.prop("checked",false);
        }

        form.render('checkbox');

    });
    //layui 复选框全选问题
});

