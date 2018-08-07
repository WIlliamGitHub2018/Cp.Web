layui.use('table', function() {
    $('.insert-op').on('click',function () {
        addLayer('新建会员','.layer-member',950,420 );
    });
    var table = layui.table;
    //会员管理页面表格
       table.render({
        elem: '#crm_table_member_list'
        // ,url:''
        , cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
        , cols: [[
            {type: 'checkbox'}
            , {field: 'member_id', title: '编号', sort: true}
            , {field: 'member_card', title: '会员卡'}
            , {field: 'member_name', title: '持卡人'}
            , {field: 'member_from', title: '会员来自'}
            , {field: 'member_activate' , title: '是否开卡'}
            , {field: 'member_mobile', title: '电话'}
            , {field: 'member_type', title: '会员类型'}
            , {field: 'member_level', title: '会员级别'}
            , {field: 'member_status', title: '会员状态'}
        ]]
        , data: [{
            "member_id": "10001"
            , "member_card": "13355551251"
            , "member_name": "张三"
            , "member_from": "会员注册"
            , "member_activate": "是"
            , "member_mobile": "13355551235"
            , "member_type": "MEM"
            , "member_level": "MEM1"
            , "member_status": "正常"
        },{
            "member_id": "10002"
            , "member_card": "13355551251"
            , "member_name": "张三"
            , "member_from": "会员注册"
            , "member_activate": "是"
            , "member_mobile": "13355551235"
            , "member_type": "MEM"
            , "member_level": "MEM1"
            , "member_status": "正常"
        }]
        , even: true
        , page: true
    });
        $('.edit-op').on('click',function () {
            //alert(111)
            var checkStatus = table.checkStatus('crm_table_member_list')
                ,data = checkStatus.data;
            if(data.length ==0 ){
                layer.msg('请选中一条数据！');
            }
            else {
                //获取数据
                // table.on('checkbox(rateCode)', function(obj){
                //     console.log(obj['data']['room_type'])
                // });
                layerShow('编辑会员', '.layer-member-edit', 950, 600);
                //会员管理页面编辑弹框-卡值记录表格
                table.render({
                    elem: '#crm_table_member_calorific'
                    // ,url:''
                    , cellMinWidth: 100 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
                    , cols: [[
                        {type: 'checkbox'}
                        , {field: 'calorific_date', title: '日期', sort: true}
                        , {field: 'calorific_type', title: '操作类型'}
                        , {field: 'calorific_active_sum', title: '操作金额'}
                        , {field: 'calorific_send_sum', title: '赠送金额'}
                        , {field: 'calorific_use_sum' , title: '使用金额'}
                        , {field: 'calorific_senduse_sum', title: '使用赠送金额'}
                        , {field: 'calorific_store_sum', title: '充值金额'}
                        , {field: 'calorific_place', title: '交易地点'}
                        , {field: 'calorific_casher_id', title: 'casher id'}
                        , {field: 'calorific_description', title: '描述'}
                    ]]
                    , data: [{
                        "calorific_date": "10001"
                        , "calorific_type": "13355551251"
                        , "calorific_active_sum": "张三"
                        , "calorific_send_sum": "会员注册"
                        , "calorific_use_sum": "是"
                        , "calorific_senduse_sum": "13355551235"
                        , "calorific_store_sum": "MEM"
                        , "calorific_place": "MEM1"
                        , "calorific_casher_id": "正常"
                        , "calorific_description": "正常"
                    }]
                    , even: true
                    , page: true
                });
                //会员管理页面编辑弹框-储值记录表格
                table.render({
                    elem: '#crm_table_member_store'
                    // ,url:''
                    , cellMinWidth: 100 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
                    , cols: [[
                        {type: 'checkbox'}
                        , {field: 'store_id', title: '编号', sort: true}
                        , {field: 'store_card_num', title: '卡号'}
                        , {field: 'store_pap_num', title: '证件号码'}
                        , {field: 'store_sum', title: '储值金额'}
                        , {field: 'store_give_sum' , title: '赠送金额'}
                        , {field: 'store_person', title: '消费人'}
                        , {field: 'store_pay_method', title: '支付方式'}
                        , {field: 'store_operator', title: '操作员'}
                        , {field: 'store_place', title: '交易地点'}
                        , {field: 'store_casher_id', title: 'casher id'}
                    ]]
                    , data: [{
                        "store_id": "10001"
                        , "store_card_num": "13355551251"
                        , "store_pap_num": "张三"
                        , "store_sum": "会员注册"
                        , "store_give_sum": "是"
                        , "store_person": "13355551235"
                        , "store_pay_method": "MEM"
                        , "store_operator": "MEM1"
                        , "store_place": "正常"
                        , "store_casher_id": "正常"
                    }]
                    , even: true
                    , page: true
                });
                //会员管理页面编辑弹框-消费记录表格
                table.render({
                    elem: '#crm_table_member_consume'
                    // ,url:''
                    , cellMinWidth: 100 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
                    , cols: [[
                        {type: 'checkbox'}
                        , {field: 'consume_id', title: '编号', sort: true}
                        , {field: 'consume_card_num', title: '卡号'}
                        , {field: 'consume_pap_num', title: '证件号码'}
                        , {field: 'consume_num', title: '消费金额'}
                        , {field: 'consume_use_sum' , title: '折扣金额'}
                        , {field: 'consume_person', title: '消费人'}
                        , {field: 'consume_pay_menthod', title: '支付方式'}
                        , {field: 'consume_operator', title: '操作员'}
                        , {field: 'consume_place', title: '交易地点'}
                        , {field: 'consume_casher_id', title: 'casher id'}
                    ]]
                    , data: [{
                        "consume_id": "10001"
                        , "consume_card_num": "13355551251"
                        , "consume_pap_num": "张三"
                        , "consume_num": "会员注册"
                        , "consume_use_sum": "是"
                        , "consume_person": "13355551235"
                        , "consume_pay_menthod": "MEM"
                        , "consume_operator": "MEM1"
                        , "consume_place": "正常"
                        , "consume_casher_id": "正常"
                    }]
                    , even: true
                    , page: true
                });
                //会员管理页面编辑弹框-积分记录表格
                table.render({
                    elem: '#crm_table_member_scope'
                    // ,url:''
                    , cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
                    , cols: [[
                        {type: 'checkbox'}
                        , {field: 'scope_id', title: '编号', sort: true}
                        , {field: 'scope_type', title: '积分类型'}
                        , {field: 'scope_data', title: '产生时间'}
                        , {field: 'scope_operator', title: '操作员'}
                        , {field: 'scope_place', title: '交易地点'}
                        , {field: 'scope_casher_id', title: 'casher id'}
                    ]]
                    , data: [{
                        "scope_id": "10001"
                        , "scope_type": "13355551251"
                        , "scope_data": "张三"
                        , "scope_operator": "会员注册"
                        , "scope_place": "是"
                        , "scope_casher_id": "13355551235"
                    }]
                    , even: true
                    , page: true
                });
            }
        });
        $('.activate-btn').on('click',function () {
        var checkStatus = table.checkStatus('crm_table_member_list')
            ,data = checkStatus.data;
        if(data.length ==0 ){
            layer.msg('请选中一条数据！');
        }
        else {
            //获取当前数据内容赋值;
            layerShow(' 激活会员卡','.layer-activate',800,358 );
        }
    });
        $('.lose-btn').on('click',function () {
        var checkStatus = table.checkStatus('crm_table_member_list')
            ,data = checkStatus.data;
        if(data.length ==0 ){
            layer.msg('请选中一条数据！');
        }
        else {
            //获取当前数据内容赋值;
            layerShow('挂失会员卡','.layer-lose',800,358 );
        }
    });
        $('.frost-btn').on('click',function () {
        var checkStatus = table.checkStatus('crm_table_member_list')
            ,data = checkStatus.data;
        if(data.length ==0 ){
            layer.msg('请选中一条数据！');
        }
        else {
            //获取当前数据内容赋值;
            layerShow('冻结会员卡','.layer-frost',800,358 );
        }
    });
        $(".logout-btn").on("click",function () {
        var checkStatus = table.checkStatus('crm_table_member_list')
            ,data = checkStatus.data;
        if(data.length ==0 ){
            layer.msg('请选中一条数据！');
        }
        else {
            //获取当前数据内容赋值;
            layerShow('注销会员卡','.layer-delete',800,358 );
        }
    });
        $(".editpass-btn").on("click",function () {
        var checkStatus = table.checkStatus('crm_table_member_list')
            ,data = checkStatus.data;
        if(data.length ==0 ){
            layer.msg('请选中一条数据！');
        }
        else {
            //获取当前数据内容赋值;
            layerShow('修改密码','.layer-editpass',700,250 );
        }
    });
        $(".more-btn").on("click",function () {
        addLayer('更多操作','.layer-moreactive',500,240 );

    });
        $(".btn_balancetrim").on("click",function () {
        InlayerShow('余额调整','.layer-balancetrim',800,430 );
    });
        $(".btn_givebalance").on("click",function () {
        InlayerShow('赠送金额调整','.layer-givebalance',800,430 );
    });
        $(".btn_backamount").on("click",function () {
        InlayerShow('会员退费','.layer-backamount',800,430 );
    });
        $(".btn_setlevel").on("click",function () {
        InlayerShow('设置会员级别','.layer-setlevel',800,430 );
    });
        $(".btn_setmemberdate").on("click",function () {
        InlayerShow('设置会员有效期','.layer-setmemberdate',800,430 );
    });
        $(".btn_givegift").on("click",function () {
            InlayerShow('赠送礼券','.layer-givegift',800,430 );
        });
        $(".btn_givegiftpackage").on("click",function () {
            InlayerShow('赠送礼券包','.layer-givegiftpackage',800,430 );
        });
        //会员管理会员退费弹框-充值记录弹框表格
        $(".recharge_list").on("click",function () {
            InlayerShow('充值记录','.layer-recharge',600,600 );
            table.render({
                elem: '#crm_table_member_recharge'
                // ,url:''
                , cellMinWidth:100 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
                , cols: [[
                    {type: 'checkbox'}
                    , {field: 'recharge_id', title: '编号', sort: true}
                    , {field: 'recharge_type', title: '付款代码'}
                    , {field: 'recharge_data', title: '充值日期'}
                    , {field: 'recharge_sum', title: '充值金额'}
                    , {field: 'recharge_pay_method', title: '支付方式'}
                ]]
                , data: [{
                    "recharge_id": "10001"
                    , "recharge_type": "13355551251"
                    , "recharge_data": "张三"
                    , "recharge_sum": "会员注册"
                    , "recharge_pay_method": "是"
                }]
                , even: true
                , page: true
            });
        });
        //会员管理赠送礼券弹框-礼券包记录弹框表格
        $(".gift_list").on("click",function () {
            InlayerShow('礼券列表','.layer-gift',600,600 );
            table.render({
                elem: '#crm_table_member_gift'
                // ,url:''
                , cellMinWidth: 100//全局定义常规单元格的最小宽度，layui 2.2.1 新增
                , cols: [[
                    {type: 'checkbox'}
                    , {field: 'giftpackage_id', title: '编号', sort: true}
                    , {field: 'giftpackage_code', title: 'code'}
                    , {field: 'giftpackage_name', title: '礼券名称'}
                    , {field: 'giftpackage_description', title: '礼券描述'}
                ]]
                , data: [{
                    "giftpackage_id": "10001"
                    , "giftpackage_code": "13355551251"
                    , "giftpackage_name": "张三"
                    , "giftpackage_description": "会员注册"
                }]
                , even: true
                , page: true
            });
        });
        //会员管理赠送礼券包弹框-礼券记录弹框表格
        $(".giftpackage_list").on("click",function () {
            InlayerShow('礼券包列表','.layer-giftpackage',600,600 );
            table.render({
                elem: '#crm_table_member_giftpackage'
                // ,url:''
                , cellMinWidth: 100//全局定义常规单元格的最小宽度，layui 2.2.1 新增
                , cols: [[
                    {type: 'checkbox'}
                    , {field: 'gift_id', title: '编号', sort: true}
                    , {field: 'gift_code', title: 'code'}
                    , {field: 'gift_name', title: '礼券名称'}
                    , {field: 'gift_description', title: '礼券描述'}
                ]]
                , data: [{
                    "gift_id": "10001"
                    , "gift_code": "13355551251"
                    , "gift_name": "张三"
                    , "gift_description": "会员注册"
                }]
                , even: true
                , page: true
            });
        });
        //会员管理会员礼券弹框表格
        $(".btn_mygift").on("click",function () {
            InlayerShow('会员礼券列表','.layer-membergift',800,430 );
            table.render({
                elem: '#crm_table_member_membergift'
                // ,url:''
                , cellMinWidth: 100//全局定义常规单元格的最小宽度，layui 2.2.1 新增
                , cols: [[
                    {type: 'checkbox'}
                    , {field: 'membergift_id', title: '编号', sort: true}
                    , {field: 'membergift_name', title: '礼品券名称'}
                    , {field: 'membergift_num', title: '礼券号', sort: true}
                    , {field: 'membergift_random', title: '验证码'}
                    , {field: 'membergift_usedate', title: '生效期'}
                    , {field: 'membergift_unusedate', title: '失效期'}
                    , {field: 'membergift_description', title: '描述'}
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
        $(".btn_store").on("click",function () {
            InlayerShow('储值管理','.layer-storems',800,358 );
        });
        //会员管理储值管理弹框-付款代码弹框表格
        $(".paycode_list").on("click",function () {
            InlayerShow('付款方式','.layer-paymethod',600,600 );
            table.render({
                elem: '#crm_table_member_code'
                // ,url:''
                , cellMinWidth: 100//全局定义常规单元格的最小宽度，layui 2.2.1 新增
                , cols: [[
                    {type: 'checkbox'}
                    , {field: 'code_id', title: '编号', sort: true}
                    , {field: 'code_code', title: '付款代码'}
                    , {field: 'code_name', title: '描述'}
                ]]
                , data: [{
                    "code_id": "10001"
                    , "code_code": "13355551251"
                    , "code_name": "张三"
                }]
                , even: true
                , page: true
            });
        });
        $(".btn_scope").on("click",function () {
            InlayerShow('积分调整','.layer-scope',800,430 );
        });
        $(".btn_food_consume").on("click",function () {
            InlayerShow('餐饮消费','.layer-food_consume',800,530 );
        });
        $(".btn_room_consume").on("click",function () {
            InlayerShow('客房消费','.layer-room_consume',800,530 );
        });


    //储值管理页面表格
        //储值
        table.render({
        elem: '#crm_table_store'
        // ,url:''
        , cellMinWidth: 100 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
        , cols: [[
            {type: 'checkbox'}
            , {field: 'store_id', title: '编号', sort: true}
            , {field: 'store_date', title: '充值时间'}
            , {field: 'store_member', title: '会员卡'}
            , {field: 'store_person', title: '持卡人'}
            , {field: 'store_surestatus' , title: '确认状态'}
            , {field: 'store_pay_num', title: '支付交易号'}
            , {field: 'store_sum', title: '充值金额'}
            , {field: 'store_account', title: '账户余额'}
            , {field: 'store_status', title: '支付状态'}
            , {field: 'store_pay_method' , title: '支付方式'}
            , {field: 'store_billing', title: '是否开票'}
            , {field: 'store_billstatus', title: '开票状态'}
            , {field: 'store_thisgive', title: '本次赠送'}
            , {field: 'store_status', title: '初始金额'}
        ]]
        , data: [{
            "store_id": "10001"
            , "store_date": "13355551251"
            , "store_member": "张三"
            , "store_person": "会员注册"
                , "store_surestatus": "是"
                , "store_pay_num": "13355551235"
                , "store_sum": "MEM"
                , "store_account": "MEM1"
                , "store_status": "正常"
                , "store_pay_method": "会员注册"
                , "store_billing": "是"
                , "store_billstatus": "13355551235"
                , "store_thisgive": "MEM"
                , "store_status": "MEM1"
        }]
        , even: true
        , page: true
    });
        //消费
        table.render({
        elem: '#crm_table_consume'
        // ,url:''
        , cellMinWidth: 100 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
        , cols: [[
            {type: 'checkbox'}
            , {field: 'consume_id', title: '编号', sort: true}
            , {field: 'consume_member', title: '会员卡'}
            , {field: 'consume_price', title: '单价'}
            , {field: 'consume_count', title: '数量'}
            , {field: 'consume_date' , title: '消费日期'}
            , {field: 'consume_pay_status', title: '结账状态'}
            , {field: 'consume_sum', title: '人数'}
            , {field: 'consume_account', title: '消费金额'}
            , {field: 'consume_balance', title: '账户余额'}
            , {field: 'consume_pay_code' , title: '付款代码'}
            , {field: 'consume_pay_method', title: '支付方式'}
            , {field: 'consume_billing', title: '是否开票'}
            , {field: 'consume_billstatus', title: '开票状态'}
            , {field: 'consume_billnum', title: '账单号码'}
            , {field: 'consume_operator', title: '操作人'}
        ]]
        , data: [{
            "consume_id": "10001"
            , "consume_member": "13355551251"
            , "consume_price": "张三"
            , "consume_count": "会员注册"
            , "consume_date": "是"
            , "consume_pay_status": "13355551235"
            , "consume_sum": "MEM"
            , "consume_account": "MEM1"
            , "consume_balance": "正常"
            , "consume_pay_code": "会员注册"
            , "consume_pay_method": "是"
            , "consume_billing": "13355551235"
            , "consume_billstatus": "MEM"
            , "consume_billnum": "MEM1"
                , "consume_operator": "MEM1"
            }]
        , even: true
        , page: true
    });
        //卡值
        table.render({
        elem: '#crm_table_member_calorific'
        // ,url:''
        , cellMinWidth: 100 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
        , cols: [[
            {type: 'checkbox'}
            , {field: 'calorific_date', title: '日期', sort: true}
            , {field: 'calorific_type', title: '操作类型'}
            , {field: 'calorific_active_sum', title: '操作金额'}
            , {field: 'calorific_send_sum', title: '赠送金额'}
            , {field: 'calorific_use_sum' , title: '使用金额'}
            , {field: 'calorific_senduse_sum', title: '使用赠送金额'}
            , {field: 'calorific_store_sum', title: '充值金额'}
            , {field: 'calorific_place', title: '交易地点'}
            , {field: 'calorific_casher_id', title: 'casher id'}
            , {field: 'calorific_description', title: '描述'}
        ]]
        , data: [{
            "calorific_date": "10001"
            , "calorific_type": "13355551251"
            , "calorific_active_sum": "张三"
            , "calorific_send_sum": "会员注册"
            , "calorific_use_sum": "是"
            , "calorific_senduse_sum": "13355551235"
            , "calorific_store_sum": "MEM"
            , "calorific_place": "MEM1"
            , "calorific_casher_id": "正常"
            , "calorific_description": "正常"
        }]
        , even: true
        , page: true
    });

    //优惠券管理页面表格
        table.render({
        elem: '#crm_table_coupon'
        // ,url:''
        , cellMinWidth: 100 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
        , cols: [[
            {type: 'checkbox'}
            , {field: 'coupon_id', title: '编号', sort: true}
            , {field: 'coupon_member', title: '会员卡'}
            , {field: 'coupon_membername', title: '持卡人'}
            , {field: 'coupon_number', title: '礼券号'}
            , {field: 'coupon_random' , title: '验证码'}
            , {field: 'coupon_use_status', title: '使用状态'}
            , {field: 'coupon_unuse_status', title: '失效状态'}
            , {field: 'coupon_name', title: '礼券名'}
            , {field: 'coupon_giftpackage', title: '礼券包'}
            , {field: 'coupon_use_date' , title: '使用日期'}
            , {field: 'coupon_use_place', title: '使用地点'}
            , {field: 'coupon_valid', title: '生效日期'}
            , {field: 'coupom_invalid', title: '失效日期'}
        ]]
        , data: [{
            "coupon_id": "10001"
            , "coupon_member": "13355551251"
            , "coupon_membername": "张三"
            , "coupon_number": "会员注册"
            , "coupon_random": "是"
            , "coupon_use_status": "13355551235"
            , "coupon_unuse_status": "MEM"
            , "coupon_name": "MEM1"
            , "coupon_giftpackage": "正常"
            , "coupon_use_date": "会员注册"
            , "coupon_use_place": "是"
            , "coupon_valid": "13355551235"
            , "coupom_invalid": "MEM"
        }]
        , even: true
        , page: true
    });
        $('.edit-coupon-op').on('click',function () {
        //alert(111)
        var checkStatus = table.checkStatus('crm_table_coupon')
            ,data = checkStatus.data;
        if(data.length ==0 ){
            layer.msg('请选中一条数据！');
        }
        else {
            layerShow('编辑优惠券', '.layer-edit', 750, 250);
        }
    });
    //积分管理页面表格
        table.render({
        elem: '#crm_table_memberscope'
        // ,url:''
        , cellMinWidth: 100 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
        , cols: [[
            {type: 'checkbox'}
            , {field: 'scope_id', title: '编号', sort: true}
            , {field: 'scope_member', title: '会员卡'}
            , {field: 'scope_memeberperson', title: '持卡人'}
            , {field: 'scope_from', title: '积分来源'}
            , {field: 'scope_type' , title: '积分类型'}
            , {field: 'scope_begin', title: '原始积分'}
            , {field: 'scope_now', title: '当前积分'}
            , {field: 'scope_sum', title: '操作金额'}
            , {field: 'scope_time', title: '操作时间'}
            , {field: 'scope_descripotion' , title: '积分描述'}
        ]]
        , data: [{
                "scope_id": "10001"
                , "scope_member": "13355551251"
                , "scope_memeberperson": "张三"
                , "scope_from": "会员注册"
                , "scope_type": "是"
                , "scope_begin": "13355551235"
                , "scope_now": "MEM"
                , "scope_sum": "MEM1"
                , "scope_time": "正常"
                , "scope_descripotion": "会员注册"
            }]
        , even: true
        , page: true
    });

    //礼券管理页面表格
        //礼券设置页面表格
        table.render({
        elem: '#crm_table_membergift'
        // ,url:''
        , cellMinWidth: 100 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
        , cols: [[
            {type: 'checkbox'}
            , {field: 'gift_id', title: '编号', sort: true}
            , {field: 'gift_name', title: '礼券名称'}
            , {field: 'gift_type', title: '礼券类型'}
            , {field: 'gift_brand', title: '礼券品牌'}
            , {field: 'gift_price' , title: '兑换类型'}
            , {field: 'gift_cash', title: '现金价格'}
            , {field: 'gift_scope', title: '积分价格'}
            , {field: 'gift_trust', title: '实际价格'}
            , {field: 'gift_description', title: '礼券描述'}
        ]]
        , data: [{
            "gift_id": "10001"
            , "gift_name": "13355551251"
            , "gift_type": "张三"
            , "gift_brand": "会员注册"
            , "gift_price": "是"
            , "gift_cash": "13355551235"
            , "gift_scope": "MEM"
            , "gift_trust": "MEM1"
            , "gift_description": "正常"
        }]
        , even: true
        , page: true
    });
        $('.insert_gift-op').on('click',function () {
            addLayer('新建礼券','.layer-gift',850,400 );
        });
        $('.edit_gift-btn').on('click',function () {
            var checkStatus = table.checkStatus('crm_table_membergift')
                ,data = checkStatus.data;
            if(data.length ==0 ){
                layer.msg('请选中一条数据！');
            }
            else {
                layerShow('编辑礼券', '.layer-gift', 850, 400);
            }
        });
        //礼券包设置页面表格
        table.render({
            elem: '#crm_table_membergiftpackage'
            // ,url:''
            , cellMinWidth: 100 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
            , cols: [[
                {type: 'checkbox'}
                , {field: 'giftpackage_id', title: '编号', sort: true}
                , {field: 'giftpackage_name', title: '礼券名称'}
                , {field: 'giftpackage_description', title: '礼券包描述'}
                , {field: 'giftpackage_operation', title: '操作'}
            ]]
            , data: [{
                "giftpackage_id": "10001"
                , "giftpackage_name": "13355551251"
                , "giftpackage_description": "张三"
                , "giftpackage_operation": "<a href='javascript:;' class='operate-btn info_btn'>查看</a>"
            }]
            , even: true
            , page: true
        });
        $('.insert_giftpackage-op').on('click',function () {
            addLayer('新建礼券包','.layer-gift-ms',850,280 );
        });
        $('.edit_giftpackage-op').on('click',function () {
            var checkStatus = table.checkStatus('crm_table_membergiftpackage')
                ,data = checkStatus.data;
            if(data.length ==0 ){
                layer.msg('请选中一条数据！');
            }
            else {
                layerShow('编辑礼券包', '.layer-gift-ms', 850, 280);
            }
        });
        $(".info_btn").on('click',function () {
            addLayer('查看礼券','.layer-giftpackage',850,400 );
            table.render({
                elem: '#crm_table_giftpackage_info'
                // ,url:''
                , cellMinWidth: 100 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
                , cols: [[

                    {type: 'checkbox'}
                    , {field: 'giftpackage_id', title: '编号', sort: true}
                    , {field: 'giftpackage_name', title: '礼券名称'}
                    , {field: 'giftpackage_usedate', title: '有效期'}
                    , {field: 'giftpackage_price', title: '实际价值'}
                    , {field: 'giftpackage_description', title: '礼券包描述'}
                ]]
                , data: [{
                    "giftpackage_id": "10001"
                    , "giftpackage_name": "13355551251"
                    , "giftpackage_usedate": "张三"
                    , "giftpackage_price": "10"
                    , "giftpackage_description": "抵10元"
                }]
                , even: true
                , page: true
            });
        });
    //会员配置页面表格
        //会员状态
        //会员类型
        //会员级别
        //发卡方式
})