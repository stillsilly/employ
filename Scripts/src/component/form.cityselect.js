define(["utils"], function (utils) {
    var dict = utils.getDict();
    var city = dict.city || []
    function getCity(parentID) {
        var result = [];
        for (var i = 0; i < city.length; i++) {
            if (city[i].parentID == parentID) {
                result.push(city[i]);
            }
        }
        return result;
    }
    function getCityName(areaNo) {
        for (var i = 0; i < city.length; i++) {
            if (city[i].areaNo == areaNo) {
                return city[i].areaName;
            }
        }
        return "";
    }
    return {
        template: '<div class="ui-city" v-if="showcity">\
                        <div class="ui-city-mask"></div>\
                        <div class="ui-city-box">\
                            <h3>省市区选择</h3>\
                            <ul>\
                                <li>\
                                    <em>所在大区：</em>\
                                    <select @change="change(1)" v-model=\"area_id\">\
                                        <option v-for=\"option in area\" v-bind:value=\"option.areaNo\">\
                                            {{ option.areaName }}\
                                        </option>\
                                    </select>\
                                    <div class="ui-select"></div>\
                                </li>\
                                <li>\
                                    <em>所在省份：</em>\
                                    <select @change="change(2)" v-model=\"province_id\">\
                                        <option v-for=\"option in province\" v-bind:value=\"option.areaNo\">\
                                            {{ option.areaName }}\
                                        </option>\
                                    </select>\
                                    <div class="ui-select"></div>\
                                </li>\
                                <li>\
                                    <em>所在城市：</em>\
                                    <select @change="change(3)" v-model=\"city_id\">\
                                        <option v-for=\"option in city\" v-bind:value=\"option.areaNo\">\
                                            {{ option.areaName }}\
                                        </option>\
                                    </select>\
                                    <div class="ui-select"></div>\
                                </li>\
                                <li>\
                                    <em>所在地区：</em>\
                                    <select v-model=\"region_id\">\
                                        <option v-for=\"option in region\" v-bind:value=\"option.areaNo\">\
                                            {{ option.areaName }}\
                                        </option>\
                                    </select>\
                                    <div class="ui-select"></div>\
                                </li>\
                            </ul>\
                            <div class="ui-city-btn">\
                                <ol>\
                                    <li @click="cancel">取消</li>\
                                    <li @click="ok" style="color:#f66666;">确定</li>\
                                </ol>\
                            </div>\
                        </div>\
                   </div>',
        props: ['chn', 'model', 'placeholder', 'province_id', 'city_id', 'region_id'],
        data: function () {
            return {
                area_id: 0,
                area: getCity(0),
                province: [],
                city: [],
                region: [],
                showcity: false
            }
        },
        events: {
            'showcity-broadcast': function (data) {
                console.log(data)
                this.area_id=data.area_id;
                this.change(1);
                this.province_id=data.province_id;
                this.change(2);
                this.city_id=data.city_id;
                this.change(3);
                this.region_id=data.region_id;
                this.change(4);
                this.showcity = true;
            },
            'showname-broadcast': function (data) {
                this.area_id=data.area_id;
                this.change(1);
                this.province_id=data.province_id;
                this.change(2);
                this.city_id=data.city_id;
                this.change(3);
                this.region_id=data.region_id;
                this.change(4);
                var pname = getCityName(this.province_id);
                var cname = getCityName(this.city_id);
                var rname = getCityName(this.region_id);
                this.model = pname + (cname ? "-" : "") + cname + (rname ? "-" : "") + rname;
                window.vm && window.vm.$broadcast("city-broadcast",data.store_id);
            },
        },
        methods: {
            change: function (type) {
                switch (type) {
                    case 1:
                        this.province = getCity(this.area_id);
                        this.city_id = -1;
                        this.region_id = -1;
                        break;
                    case 2:
                        this.city = getCity(this.province_id);
                        this.region_id = -1;
                        break;
                    case 3:
                        this.region = getCity(this.city_id);
                        break;
                }
            },

            ok: function () {
                this.showcity = false;
                var pname = getCityName(this.province_id);
                var cname = getCityName(this.city_id);
                var rname = getCityName(this.region_id);
                this.model = pname + (cname ? "-" : "") + cname + (rname ? "-" : "") + rname;
                window.vm && window.vm.$broadcast("city-broadcast");
                window.vm && window.vm.$broadcast("showname");
            },

            cancel: function () {
                this.showcity = false;
                // this.model = "";
                // this.province_id = -1;
                // this.city_id = -1;
                // this.region_id = -1;
            }
        }
    }
});