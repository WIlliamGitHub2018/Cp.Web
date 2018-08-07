var urlPath = 'https://file.99inn.cc';
var JSHash = {
    math: { url: urlPath + "/Content/js/math.js", version: "1.0.0" },
    DateTimeExtend: { url: urlPath + "/Content/js/DateTimeExtend.js", version: "1.0.0" },
    custom: { url: urlPath + "/Content/js/customize/custom.js", version: "1.0.0" },
    yangyan: { url: urlPath + "/Content/js/customize/yangyan.js", version: "1.0.0" },
    yangyan: { url: urlPath + "/Content/js/customize/order.js", version: "1.0.0" }
};
//根据传入的key，动态生成js加载语句   
function loadJS(sKey) {
    var keys = sKey.split(',');
    for (var k = 0; k < keys.length; k++) {
        var node = JSHash[keys[k]];
            $('head').append('<script src="' + node.url + '?version=' + node.version + '"></script>');
    }
}
var cssHASH = [
    { url: urlPath + "/Content/css/common.css", version: "1.0" },
    { url: urlPath + "/Content/css/custom.css", version: "1.0" },
    { url: urlPath + "/Content/css/theme.css", version: "1.0" }
];
function loadcss() {
    for (var i = 0; i < cssHASH.length; i++) {
        var node = cssHASH[i];
        $('head').append('<link rel="stylesheet" href="' + node.url + '?version=' + node.version + '" />');
    }
}
//loadcss();
