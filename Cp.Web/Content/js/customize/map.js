function poiSearch(point) {
    AMap.service(["AMap.PlaceSearch"], function () {
        var placeSearch = new AMap.PlaceSearch({ //构造地点查询类
            pageSize: 50,
            type: '酒店',
            pageIndex: 1,
            city: "022", //城市
        });
        var range = $('#LBS_range').val();
        if (isNaN(range) || range == 0) {
            range = 1.5;
        }
        var cpoint = [point.location.getLng(), point.location.getLat()]; //中心点坐标
        placeSearch.searchNearBy('99旅馆|99优选|99新标', cpoint, range*1000, function (status, result) {
            var pois = result.poiList.pois;
            var temp_str = '';
            $('#LBS_resorts').html('');
            for (var i = 0, l = pois.length; i < l; i++) {
                var poi = pois[i];
                var name = poi.name;
                if (poi.name.indexOf('99') >= 0) {
                    console.log(name);
                    if (name != '' & temp_str != name) {
                        var tbody = "";
                        tbody += '<tr>';
                        tbody += '<td>' + poi.distance + 'm</td>';
                        tbody += '<td>' + name + '</td>';
                        tbody += '</tr>';
                        $('#LBS_resorts').append(tbody);
                        temp_str = name;
                        name = name.substring(name.indexOf('(') + 1, name.lastIndexOf(')'));
                        if (name.indexOf('望海楼') >= 0) {
                            name = '天津之眼古文化街店';
                        }
                        HotelNames += (HotelNames == '' ? '' : ',') + name;
                        $('#HotelNames').val(HotelNames.replace(/店/g, ''));
                    }
                }
            }
        });
    });
    setTimeout('filter()', 1000);
}
function LBS_searchResorts(LBS_Address) {
    var geocoder = new AMap.Geocoder({
        city: '022', //城市，默认：“全国”
        radius: 1000 //范围，默认：500
    });
    //地理编码,返回地理编码结果
    geocoder.getLocation(LBS_Address, function (status, result) {
        if (status === 'complete' && result.info === 'OK') {
            var point = result.geocodes[0];
            poiSearch(point);
        }
    });
}
