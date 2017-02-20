
App({
    onLaunch: function () {
        // Do something initial when launch.
    },
    onShow: function () {
        // Do something when show.
    },
    onHide: function () {
        // Do something when hide.
    },
    onError: function (msg) {
        console.log(msg)
    },
    getLocation: function (callback) {
        wx.getLocation({
            type: 'wgs84',
            success: function (res) {
                var lng = res.longitude;
                var lat = res.latitude;
                wx.request({
                    url: 'http://route.showapi.com/238-2',
                    data: {
                        showapi_appid: "30695",
                        showapi_sign: "8aa12ab5fe134936a39c37b62e74133f",
                        lng: lng,
                        lat: lat,
                        from: "5",
                    },
                    method: 'GET',
                    success: function (res) {
                        callback(res)
                    }
                })
            }
        })
    },
    searchLocation: function (callback, areaName, page) {
        wx.request({
            url: 'http://route.showapi.com/1149-1',
            data: {
                showapi_appid: "30695",
                showapi_sign: "8aa12ab5fe134936a39c37b62e74133f",
                areaName: areaName,
                page: page

            },
            method: 'GET',
            success: function (res) {
                callback(res)
            }
        })
    },
    processLevel: function (index) {
        var totIndex = parseInt(index / 3);
        var potIndex = parseInt(index % 3);
        var length = totIndex + potIndex;
        var array = [];
        for (var i = 1; i <= length; i++) {
            if (i <= totIndex) {
                array.push(1);
            }
            else {
                array.push(0);
            }
        }
        return array;
    },
    processStar: function (index) {
        var array = [];
        for (var i = 0; i < 5; i++) {
            if (i < index) {
                array.push(1);
            }
            else {
                array.push(0);
            }
        }
        return array;
    },
})