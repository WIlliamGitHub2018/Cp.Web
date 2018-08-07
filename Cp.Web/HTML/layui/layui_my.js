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
        var child = $(data.elem).siblings('input[type="checkbox"]');
        child.each(function(index, item){
            item.checked = data.elem.checked;
        });
        form.render('checkbox');
    });
    form.on('checkbox(list-checkbox)',function(data){
        var allCheck = $(data.elem).siblings(' input[lay-filter="list-select-all"]');
        if(data.elem.checked != true){
             allCheck.prop("checked",false);
        }
        form.render('checkbox');
        // var sib = $(data.elem).siblings('[lay-filter="list-checkbox"]:checked').length;
        // var total = $(data.elem).siblings('[lay-filter="list-checkbox"]').length;
        // console.log(total);
        // if(sib == total){
        //     $(data.elem).siblings('input[type="checkbox"]').prop("checked",true);
        //     form.render();
        // }else{
        //     $(data.elem).siblings(' input[lay-filter="list-select-all"]').prop("checked",false);
        //     form.render();
        // }
    });
    //layui 复选框全选问题
});

