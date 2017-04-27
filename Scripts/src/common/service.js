define(["utils"], function (utils) {
    var module = {
        // 功能描述：加载字典
        getDict: function (cb) {
            var data = window.localStorage.getItem("dict");
            if (data) {
                cb && cb(JSON.parse(data));
            }
            $.utils.ajax({
                url: "/common/dict",
                success: function (data, result) {
                    var mysystem = [];
                    data.system.forEach(function (item) {
                        mysystem.push({ value: item.id, name: item.name });
                    });
                    data.mysystem = mysystem;

                    var mystore = [];
                    data.store.forEach(function (item) {
                        mystore.push({ value: item.id, address: item.address, name: item.storeName, areaID: item.areaID, provinceID: item.provinceID, cityID: item.cityID, regionID: item.regionID, systemID: item.systemID });
                    });
                    data.mystore = mystore;

                    window.localStorage.setItem("dict", JSON.stringify(data));
                }
            })
        }
    }
    return module;
});