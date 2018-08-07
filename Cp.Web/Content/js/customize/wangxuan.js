
var form;
var table;
var layer;
var $;
var laydate;
var upload;
var type;
var sourecHidden;
layui.use(['form', 'element', 'layer', 'laydate', 'table', 'laypage', 'upload'], function () {
    form = layui.form;
    table = layui.table;
    layer = layui.layer;
    laydate = layui.laydate;
    $ = layui.$;
    upload = layui.upload;
    sourecHidden = $('[name="sourecHidden"]').val();//来源pc/h5
    type = $('[name="categoryHidden"]').val();//文章或者栏目
    var setting = {
        data: {
            key: {},
            simpleData: {
                enable: true
            }
        },
        callback: {
            onClick: onClick
        }
    };
    //点击获取 点击的json元素数据 treeNode.json
    function onClick(event, treeId, treeNode, clickFlag) {
        console.log(treeNode.json);
        console.log(treeNode);
        // showLog("[ "+getTime()+" onClick ]&nbsp;&nbsp;clickFlag = " + clickFlag + " (" + (clickFlag===1 ? "普通选中": (clickFlag===0 ? "<b>取消选中</b>" : "<b>追加选中</b>")) + ")");
        console.log(event);
        console.log(treeId);
        console.log(treeNode.level);
        console.log(clickFlag);
        var type = $('[name="categoryHidden"]').val();//文章或者栏目
        if (type == 'article') {
            $('[name="ColumnID"]').val(treeNode.Column.RowID)
            $('[name="ColumnIDSelect"]').val(treeNode.Column.RowID)
            getArticle(treeNode.Column.RowID)
        } else if (type == 'column') {
            $('[name="ParentID"]').val(treeNode.Column.RowID)
            $('[name="LayerID"]').val(treeNode.Column.RowID)
            getColumn(treeNode.Column.RowID)
        }


    }

    var code;
    if (sourecHidden == 'pc') {
        code = '0'
    } else if (sourecHidden == 'h5') {
        code = '1'
    }
    //tree初始化赋值
    var zNodes;
    $.ajax({
        url: '/HotelManager/GetColumns',
        data: {
            Code: code,
            parentID: 0,
            hasAll: 1
        },
        type: 'POST',
        async: false,
        dataType: 'json',
        success: function (data) {
            console.log(data)
            zNodes = data;
        }, error: function () { //alert(11)

        }
    })
    $.fn.zTree.init($("#treeDemo"), setting, zNodes);

    //获取文章
    function getArticle(rowid) {
        //$("#data").load("/HotelManager/GetArticles", { "Code": code,"IntValue":r }, function () {
        //    alert("提交成功");
        //});
        table.render({
            elem: '#contentms'
            , url: '/HotelManager/GetArticles?Code=' + code + '&IntValue=' + rowid
            , cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
            , cols: [[
                { type: 'checkbox' }
                , { field: 'Name', title: '名称' }
                , { field: 'Title', title: '标题' }
                , { field: 'ColumnName', title: '所属栏目' }
                , { field: 'Desc', title: '文章描述' }
                , { field: 'Content', title: '内容' }
                , { field: 'SeoKeyWord', title: '文章关键字' }
                , { field: 'SeoDescription', title: 'seo描述' }
            ]]
            , even: true
            , page: true
            , done: function (res, curr, count) {
                //如果是异步请求数据方式，res即为你接口返回的信息。
                //如果是直接赋值的方式，res即为：{data: [], count: 99} data为当前页数据、count为数据总长度

            }
        });
    }
    //获取栏目
    function getColumn(rowid) {
        table.render({
            elem: '#contentms'
            , url: '/HotelManager/LoadTable?code=' + code + '&parentID=' + rowid
            , cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
            , cols: [[
                { type: 'checkbox' }
                , { field: 'RowID', title: '栏目ID' }
                , { field: 'Name', title: '名称' }
                , { field: 'ParentID', title: '上级栏目' }
                , { field: 'Status', title: '状态' }
                , { field: 'StatusText', title: '状态文本' }
                , { field: 'IsNavi', title: '导航显示' }
                , { field: 'IsIndexTop', title: '首页置顶' }
                , { field: 'ColumnType', title: '栏目类型' }
            ]]
            , even: true
            , page: true
            , done: function (res, curr, count) {
                //如果是异步请求数据方式，res即为你接口返回的信息。
                //如果是直接赋值的方式，res即为：{data: [], count: 99} data为当前页数据、count为数据总长度

            }
        });
    }
    if (type == 'article') {
        // getArticle(0)
    } else if (type == 'column') {
        getColumn(0)
    }

    //编辑弹出框
    $('.editNo-op').on('click', function () {
        var checkStatus = table.checkStatus('contentms')
            , data = checkStatus.data; //alert(data)
        console.log(data)
        if (data.length == 0) {
            layer.msg('请选中一条数据！');
        }
        else {
            //data = JSON.stringify(data)
            if (type == 'article') {
                var ff = $("#OpenArticle");
                console.log(ff);
                formLoad(data[0], ff);
                $('[name="RowID"]').val(data[0].RowID)
                addLayer('编辑文章', '.layer-add-all', 940, 400);
            } else if (type == 'column') {
                var ff = $("#OpenColumn");
                console.log(data[0]);
                formLoad(data[0], ff);
                $('[name="RowID"]').val(data[0].RowID)
                addLayer('编辑栏目', '.layer-add-all', 940, 400);
            }

        }
    });
    if (type == 'article') {
        var ImgType = 4;
    } else if (type == 'column') {
        var ImgType = 3;
    }
    //上传图片
    //普通图片上传
    var uploadInst = upload.render({
        elem: '#test1'
        , url: '/HotelManager/HttpUrl?imgType=' + ImgType
        , size: ''
        , accept: 'images'
        , before: function (obj) {
            //预读本地文件示例，不支持ie8
            obj.preview(function (index, file, result) {
                console.log(file);
                $('#demo1').attr('src', result); //图片链接（base64）
            });
        }
        , done: function (res) {
            //如果上传失败
            if (res.Result == false) {
                return layer.msg('上传失败');
            }
            else {
                $("[name='Src']").val(res.FileUrl);
                console.log(res);
            }
            //上传成功

        }
        , error: function () {
            //演示失败状态，并实现重传
            var demoText = $('#demoText');
            demoText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-mini demo-reload">重试</ a>');
            demoText.find('.demo-reload').on('click', function () {
                uploadInst.upload();
            });
        }
    });

});
//弹出新增窗口
$('.insertNo-op').on('click', function () {
    if (type == 'article') {
        var ColumnID = $('[name = "ColumnIDSelect"]').val();
        if (ColumnID == 0 || ColumnID == '') {
            layer.alert("请点击左侧栏目后，在新建文章!");
            return false;
        }
        $('[name = "ColumnID"]').val(ColumnID)
        if (sourecHidden == 'pc') {
           var   code = '0'
        } else if (sourecHidden == 'h5') {
           var code = '1'
        }
        $('[name="Source"]').val(code)
        $('[name = "ActiveYN"]').val('1')
        addLayer('新建文章', '.layer-add-all', 940, 450);
    } else if (type == 'column') {
        addLayer('新建栏目', '.layer-add-all', 940, 450);
    }
    
});
//保存文章/栏目
var ColumnID;
function SaveNo() {
    if (type == 'article') {
        var mes = $("#OpenArticle").serializeObject(); 
        var url = '/HotelManager/SaveArticle'
        if ($('[name="Title"]').val()=="") {
            layer.alert("请输入标题！");
            return false;
        }
        if ($('[name="Desc"]').val() == "") {
            layer.alert("请输入简介！");
            return false;
        }
        if ($('[name="Content"]').val() == "") {
            layer.alert("请输入内容！");
            return false;
        }
    } else if (type == 'column') {
        var mes = $("#OpenColumn").serializeObject();
        if ($('[name="Name"]').val() == "") {
            layer.alert("请输入名称！");
            return false;
        }
        if ($('[name="OrderNum"]').val() == "" || $('[name="OrderNum"]').val() == undefined) {
            layer.alert("请输入正确的排序值！");
            return false;
        }
        var url = '/HotelManager/SaveCmsColumn'
    }
    if (type == 'article') {
        ColumnID = $('[name = "ColumnID"]').val();
        $('[name="ColumnIDSelect"]').val(ColumnID)
    }
    console.log(mes)
    $.ajax({
        url: url,
        data: {
            item: mes
        },
        type: 'POST',
        async: false,
        dataType: 'json',
        success: function (data) {
            console.log(data)
            if (data.result != 1) {
                layer.alert(data.msg);
            }
            else {
                layer.alert("新建成功!");
                //location.reload();
                table.reload('contentms')
                //$('#contentms').trigger('submit')
            }
        }, error: function () { //alert(11)

         }
    })
}
//删除栏目/文章
$('.deleteNo-op').on('click', function () {
    var checkStatus = table.checkStatus('contentms')
        , data = checkStatus.data;
    if (data.length == 0) {
        layer.msg('请选中一条数据！');
    }
    else {
        layer.confirm('确认要删除吗？', {
            btn: ['确定', '取消']//按钮
        }, function (index) {
            var id = data[0].RowID;
            console.log(id)
            if (type == 'article') {
                var url = '/HotelManager/DeleteArticle?id='
            } else if (type == 'column') {
                var url = '/HotelManager/DeleteColumn?id='
            }
            $.ajax({
                url: url + id,
                type: 'POST',
                dataType: 'json',
                success: function (data) {
                    console.log(data)
                    if (data.result != 1) {
                        layer.alert(data.msg);
                    }
                    else {
                        layer.alert("删除成功!");
                        //location.reload();
                        table.reload('contentms')
                    }
                }, error: function () { //alert(11)

                }
            })
        });
    }
});
//图片管理
$('.pic-op').on('click', function () {
    var checkStatus = table.checkStatus('contentms')
        , data = checkStatus.data;
    if (data.length == 0) {
        layer.msg('请选中一条数据！');
    }
    else {
       // layerShow('图片管理', '.picMs', 700, 450, true);//弹框后 渲染table
        layui.use('layer', function () {
            var layer = layui.layer;
            _index = layer.open({
                type: 1
                , title: '图片管理' //不显示标题栏
                // ,closeBtn: 1
                , area: ['100%', '100%']
                , shade: 0.6
                , moveType: 1 //拖拽模式，0或者1
                //, resize: true //
                , content: $('.picMs')
               // , success: function () {
               //     search_table();
                //}
            });
        });
        if (type == 'article') {
            var IntType = 4;
        } else if (type == 'column') {
            var IntType = 3;
        }
        var code;
        if (sourecHidden == 'pc') {
            code = '0'
        } else if (sourecHidden == 'h5') {
            code = '1'
        }
        console.log(code)
        $('[name="rowidparpic"]').val(data[0].RowID)
        var url = '/HotelManager/GetPicList?Code=' + data[0].RowID + '&IntStatus=' + code + '&IntType=' + IntType;
        console.log(url)
        $.ajax({
            url: url ,
            type: 'POST',
            dataType: 'json',
            success: function (data) {
                console.log(data.data)
                if (data == '') {
                    layer.alert('没有数据');
                }
                else {
                    console.log(data.data);
                    if (data.msg == '无可用数据') {
                        layer.alert('没有图片数据，请上传');
                    } else {
                        var obj = data.data;
                        var info = '';
                        // console.log(info)
                        $("#cPc").empty();
                        var imgurl = 'http://file.sabanaglobe.com';
                        for (var i = 0; i < obj.length; i++) {
                            var aa = JSON.stringify(obj[i]);
                            if (obj[i].IsIndex == 0) {
                                console.log("fou")
                                console.log(obj[i])
                                //info += '<div class="col-md-3 room-box pic-box"><div class="pic-info roompic-info" ><img src="' + imgurl + obj[i].Src + '"><span class="first-pic">首图</span><div class="pic-text"><a class="pic-setFirst" onclick="IndexImg(' + obj[i].RowID + ')">设为首图</a><a class="pic-delete" onclick="DelImg(' + obj[i].RowID + ')">删除</a><a class="pic-edits" name="' + aa + '" onclick="EditImg(this)">编辑</a></div></div><p class="img-name">' + obj[i].Name + '</p></div>';
                                info += "<div class='col-md-3 room-box pic-box'><div class='pic-info roompic-info' ><img src='" + imgurl + obj[i].Src + "'><span class='first-pic'>首图</span><div class='pic-text'><a class='pic-setFirst' onclick='IndexImg(" + obj[i].RowID + ")'>设为首图</a><a class='pic-delete' onclick='DelImg(" + obj[i].RowID + ")'>删除</a><a class='pic-edits' name='" + aa + "' onclick='EditImg(this)'>编辑</a></div></div><p class='img-name'>" + obj[i].Name + "</p></div>";

                            } else if (obj[i].IsIndex == 1) {
                                console.log("shi")
                                info += "<div class='col-md-3 room-box pic-box'><div class='pic-info roompic-info active' ><img src='" + imgurl + obj[i].Src + "'><span class='first-pic'>首图</span><div class='pic-text'><a class='pic-setFirst' onclick='IndexImg(" + obj[i].RowID + ")'>设为首图</a><a class='pic-delete' onclick='DelImg(" + obj[i].RowID + ")'>删除</a><a class='pic-edits' name='" + aa + "' onclick='EditImg(this)'>编辑</a></div></div><p class='img-name'>" + obj[i].Name + "</p></div>";
                            }

                        }
                        $("#cPc").append(info);
                    }
                    
                    //layer.alert("查看成功!");
                    //location.reload();
                  //  table.reload('contentpicms')
                }
            }, error: function () { //alert(11)

            }
        })
        
    }
})
function EditImg(img) {
    var name = $(img).attr('name');
    console.log(name);
    name = JSON.parse(name);
    var ff = $("#picInfo");
    formLoad(name, ff);
    var url = $('[name="configFile"]').val()
    // url = url.substr(0, url.lastIndexOf("/"));
    $('#demo1').attr('src', url + name.Src)
    $('[name="RowID"]').val(name.RowID)
    addLayer('编辑图片', '.layer-add-all-pic', 940, 400);
}
//图片列表 弹出新增框
$('.addPic-pic').on('click', function () {
    if (type == 'article') {
        var ImgType = 4;
    } else if (type == 'column') {
        var ImgType = 3;
    }
    $('[name="ImgType"]').val(ImgType);
    if (sourecHidden == 'pc') {
        var Source = '0'
    } else if (sourecHidden == 'h5') {
        var Source = '1'
    }
    $('[name="Source"]').val(Source);
    $('[name="TypeCode"]').val($('[name="rowidparpic"]').val());
    layerShow('新建图片', '.layer-add-all-pic', 750, 400, false);

});
//保存图片相关信息
function savePicInfo() {
    var mes = $("#picInfo").serializeObject();console.log(mes)
    $.ajax({
        url: '/HotelManager/SaveImg',
        data: {
            model: mes
        },
        type: 'POST',
        async: false,
        dataType: 'json',
        success: function (data) {
            console.log(data)
            if (data.result != 1) {
                layer.alert(data.msg);
            }
            else {
                layer.alert("新建成功!");
                layer.closeAll()

                //location.reload();
                //table.reload('contentpicms')
            }
        }, error: function () { //alert(11)

        }
    })
}
//弹出编辑图片框
$('.editPic-pic').on('click', function () {
    var checkStatus = table.checkStatus('contentpicms')
        , data = checkStatus.data; //alert(data)

    console.log(data)
    if (data.length == 0) {
        layer.msg('请选中一条数据！');
    }
    else {
        var ff = $("#picInfo");
        console.log(ff);
        formLoad(data[0], ff);
        var url = $('[name="configFile"]').val()
       // url = url.substr(0, url.lastIndexOf("/"));
        $('#demo1').attr('src',url+data[0].Src)
        $('[name="RowID"]').val(data[0].RowID)
        addLayer('编辑图片', '.layer-add-all-pic', 940, 400);
        
    }
})
//删除图片
function DelImg(id) {
    layer.confirm("确认删除吗？", {
        btn: ['确定', '取消'] //按钮
    }, function () {
        console.log(id)
        //return false;
        $.post('/HotelManager/DeleteImg?id=' + id, function (data) {
            console.log(data)
            if (data.result != 1) {
                layer.alert(data.msg);
            } else {
                layer.alert("删除成功!");
               // layer.closeAll();
                location.reload();
               // $('#search_form').trigger('submit');

            }
        });
    }, function () {
        layer.closeAll();
    });


}

//设为首图


function IndexImg(id) {

    console.log(id)
    layer.confirm('确认要设为首图吗？', {
        btn: ['确定', '取消']//按钮
    }, function (index) {
        //var url = '/HotelManager/IndexImg?id='
        $.post('/HotelManager/IndexImg?id=' + id, function (data) {
            console.log(data)
            if (data.result != 1) {
                layer.alert(data.msg);
            } else {
                layer.alert("设置成功!");
                layer.closeAll()
             //   $('#search_form').trigger('submit');
            }
        });
    })
}
    //return false;
   

//layui.use(['layedit'], function () {
//    var layedit = layui.layedit;
//    var index = layedit.build('demo'); //建立编辑器
//    layedit.setContent(index, "你好");
//});