define(function () {
    var city = function (option) {
        this.init(option);
    }
    city.prototype = {
        data: [{ "name": "城市选择", "data": [{ "code": 0, "name": "北京市", "data": [{ "code": "0_0", "name": "东城区", "areaNo": 101600 }, { "code": "0_1", "name": "西城区", "areaNo": 101500 }, { "code": "0_2", "name": "崇文区" }, { "code": "0_3", "name": "宣武区" }, { "code": "0_4", "name": "朝阳区", "areaNo": 101400 }, { "code": "0_5", "name": "丰台区", "areaNo": 101300 }, { "code": "0_6", "name": "石景山区", "areaNo": 101200 }, { "code": "0_7", "name": "海淀区", "areaNo": 101100 }, { "code": "0_8", "name": "门头沟区", "areaNo": 101000 }, { "code": "0_9", "name": "房山区", "areaNo": 100900 }, { "code": "0_10", "name": "通州区", "areaNo": 100800 }, { "code": "0_11", "name": "顺义区", "areaNo": 100700 }, { "code": "0_12", "name": "昌平区", "areaNo": 100600 }, { "code": "0_13", "name": "大兴区", "areaNo": 100500 }, { "code": "0_14", "name": "怀柔区", "areaNo": 100400 }, { "code": "0_15", "name": "平谷区", "areaNo": 100300 }, { "code": "0_16", "name": "密云县", "areaNo": 100200 }, { "code": "0_17", "name": "延庆县", "areaNo": 100100 }, { "code": "0_18", "name": "延庆镇" }], "areaNo": 100000 }, { "code": 1, "name": "天津市", "data": [{ "code": "1_0", "name": "和平区", "areaNo": 121600 }, { "code": "1_1", "name": "河东区", "areaNo": 121500 }, { "code": "1_2", "name": "河西区", "areaNo": 121400 }, { "code": "1_3", "name": "南开区", "areaNo": 121300 }, { "code": "1_4", "name": "河北区", "areaNo": 121200 }, { "code": "1_5", "name": "红桥区", "areaNo": 121100 }, { "code": "1_6", "name": "塘沽区" }, { "code": "1_7", "name": "汉沽区" }, { "code": "1_8", "name": "大港区" }, { "code": "1_9", "name": "东丽区", "areaNo": 121000 }, { "code": "1_10", "name": "西青区", "areaNo": 120900 }, { "code": "1_11", "name": "津南区", "areaNo": 120800 }, { "code": "1_12", "name": "北辰区", "areaNo": 120700 }, { "code": "1_13", "name": "武清区", "areaNo": 120600 }, { "code": "1_14", "name": "宝坻区", "areaNo": 120500 }, { "code": "1_15", "name": "蓟县", "areaNo": 120100 }, { "code": "1_16", "name": "宁河县", "areaNo": 120300 }, { "code": "1_17", "name": "芦台镇" }, { "code": "1_18", "name": "静海县", "areaNo": 120200 }, { "code": "1_19", "name": "静海镇" }], "areaNo": 120000 }, { "code": 2, "name": "上海市", "data": [{ "code": "2_0", "name": "黄浦区", "areaNo": 111700 }, { "code": "2_1", "name": "卢湾区" }, { "code": "2_2", "name": "徐汇区", "areaNo": 111600 }, { "code": "2_3", "name": "长宁区", "areaNo": 111500 }, { "code": "2_4", "name": "静安区", "areaNo": 111400 }, { "code": "2_5", "name": "普陀区", "areaNo": 111300 }, { "code": "2_6", "name": "闸北区", "areaNo": 111200 }, { "code": "2_7", "name": "虹口区", "areaNo": 111100 }, { "code": "2_8", "name": "杨浦区", "areaNo": 111000 }, { "code": "2_9", "name": "闵行区", "areaNo": 110900 }, { "code": "2_10", "name": "宝山区", "areaNo": 110800 }, { "code": "2_11", "name": "嘉定区", "areaNo": 110700 }, { "code": "2_12", "name": "浦东新区", "areaNo": 110600 }, { "code": "2_13", "name": "金山区", "areaNo": 110500 }, { "code": "2_14", "name": "松江区", "areaNo": 110400 }, { "code": "2_15", "name": "青浦区", "areaNo": 110300 }, { "code": "2_16", "name": "南汇区" }, { "code": "2_17", "name": "奉贤区", "areaNo": 110200 }, { "code": "2_18", "name": "崇明县", "areaNo": 110100 }, { "code": "2_19", "name": "城桥镇" }], "areaNo": 110000 }, { "code": 3, "name": "重庆市", "data": [{ "code": "3_0", "name": "渝中区", "areaNo": 133600 }, { "code": "3_1", "name": "大渡口区", "areaNo": 133500 }, { "code": "3_2", "name": "江北区", "areaNo": 133400 }, { "code": "3_3", "name": "沙坪坝区", "areaNo": 133300 }, { "code": "3_4", "name": "九龙坡区", "areaNo": 133200 }, { "code": "3_5", "name": "南岸区", "areaNo": 133100 }, { "code": "3_6", "name": "北碚区", "areaNo": 133000 }, { "code": "3_7", "name": "万盛区" }, { "code": "3_8", "name": "双桥区" }, { "code": "3_9", "name": "渝北区", "areaNo": 132700 }, { "code": "3_10", "name": "巴南区", "areaNo": 132600 }, { "code": "3_11", "name": "万州区", "areaNo": 133800 }, { "code": "3_12", "name": "涪陵区", "areaNo": 133700 }, { "code": "3_13", "name": "黔江区", "areaNo": 132500 }, { "code": "3_14", "name": "长寿区", "areaNo": 132400 }, { "code": "3_15", "name": "合川市" }, { "code": "3_16", "name": "永川区市" }, { "code": "3_17", "name": "江津市" }, { "code": "3_18", "name": "南川市" }, { "code": "3_19", "name": "綦江县" }, { "code": "3_20", "name": "潼南县", "areaNo": 131900 }, { "code": "3_21", "name": "铜梁县", "areaNo": 131800 }, { "code": "3_22", "name": "大足县" }, { "code": "3_23", "name": "荣昌县", "areaNo": 131700 }, { "code": "3_24", "name": "璧山县", "areaNo": 131600 }, { "code": "3_25", "name": "垫江县", "areaNo": 131200 }, { "code": "3_26", "name": "武隆县", "areaNo": 131100 }, { "code": "3_27", "name": "丰都县", "areaNo": 131300 }, { "code": "3_28", "name": "城口县", "areaNo": 131400 }, { "code": "3_29", "name": "梁平县", "areaNo": 131500 }, { "code": "3_30", "name": "开县", "areaNo": 130900 }, { "code": "3_31", "name": "巫溪县", "areaNo": 130500 }, { "code": "3_32", "name": "巫山县", "areaNo": 130600 }, { "code": "3_33", "name": "奉节县", "areaNo": 130700 }, { "code": "3_34", "name": "云阳县", "areaNo": 130800 }, { "code": "3_35", "name": "忠县", "areaNo": 131000 }, { "code": "3_36", "name": "石柱土家族自治县", "areaNo": 130400 }, { "code": "3_37", "name": "彭水苗族土家族自治县", "areaNo": 130100 }, { "code": "3_38", "name": "酉阳土家族苗族自治县", "areaNo": 130200 }, { "code": "3_39", "name": "秀山土家族苗族自治县", "areaNo": 130300 }], "areaNo": 130000 }, { "code": 4, "name": "河北省", "data": [{ "code": "4_0", "name": "石家庄市", "areaNo": 191100 }, { "code": "4_1", "name": "张家口市", "areaNo": 190500 }, { "code": "4_2", "name": "承德市", "areaNo": 190400 }, { "code": "4_3", "name": "秦皇岛市", "areaNo": 190900 }, { "code": "4_4", "name": "唐山市", "areaNo": 191000 }, { "code": "4_5", "name": "廊坊市", "areaNo": 190200 }, { "code": "4_6", "name": "保定市", "areaNo": 190600 }, { "code": "4_7", "name": "衡水市", "areaNo": 190100 }, { "code": "4_8", "name": "沧州市", "areaNo": 190300 }, { "code": "4_9", "name": "邢台市", "areaNo": 190700 }, { "code": "4_10", "name": "邯郸市", "areaNo": 190800 }], "areaNo": 190000 }, { "code": 5, "name": "山西省", "data": [{ "code": "5_0", "name": "太原市", "areaNo": 301100 }, { "code": "5_1", "name": "朔州市", "areaNo": 300600 }, { "code": "5_2", "name": "大同市", "areaNo": 301000 }, { "code": "5_3", "name": "阳泉市", "areaNo": 300900 }, { "code": "5_4", "name": "长治市", "areaNo": 300800 }, { "code": "5_5", "name": "晋城市", "areaNo": 300700 }, { "code": "5_6", "name": "忻州市", "areaNo": 300300 }, { "code": "5_7", "name": "晋中市", "areaNo": 300500 }, { "code": "5_8", "name": "临汾市", "areaNo": 300200 }, { "code": "5_9", "name": "吕梁市", "areaNo": 300100 }, { "code": "5_10", "name": "运城市", "areaNo": 300400 }], "areaNo": 300000 }, { "code": 6, "name": "内蒙古", "data": [{ "code": "6_0", "name": "呼和浩特市", "areaNo": 371200 }, { "code": "6_1", "name": "包头市", "areaNo": 371100 }, { "code": "6_2", "name": "乌海市", "areaNo": 371000 }, { "code": "6_3", "name": "赤峰市", "areaNo": 370900 }, { "code": "6_4", "name": "通辽市", "areaNo": 370800 }, { "code": "6_5", "name": "呼伦贝尔市", "areaNo": 370600 }, { "code": "6_6", "name": "鄂尔多斯市", "areaNo": 370700 }, { "code": "6_7", "name": "乌兰察布市", "areaNo": 370400 }, { "code": "6_8", "name": "巴彦淖尔市", "areaNo": 370500 }, { "code": "6_9", "name": "兴安盟", "areaNo": 370300 }, { "code": "6_10", "name": "锡林郭勒盟", "areaNo": 370200 }, { "code": "6_11", "name": "阿拉善盟", "areaNo": 370100 }] }, { "code": 7, "name": "辽宁省", "data": [{ "code": "7_0", "name": "沈阳市", "areaNo": 281400 }, { "code": "7_1", "name": "朝阳市", "areaNo": 280200 }, { "code": "7_2", "name": "阜新市", "areaNo": 280600 }, { "code": "7_3", "name": "铁岭市", "areaNo": 280300 }, { "code": "7_4", "name": "抚顺市", "areaNo": 281100 }, { "code": "7_5", "name": "本溪市", "areaNo": 281000 }, { "code": "7_6", "name": "辽阳市", "areaNo": 280500 }, { "code": "7_7", "name": "鞍山市", "areaNo": 281200 }, { "code": "7_8", "name": "丹东市", "areaNo": 280900 }, { "code": "7_9", "name": "大连市", "areaNo": 281300 }, { "code": "7_10", "name": "营口市", "areaNo": 280700 }, { "code": "7_11", "name": "盘锦市", "areaNo": 280400 }, { "code": "7_12", "name": "锦州市", "areaNo": 280800 }, { "code": "7_13", "name": "葫芦岛市", "areaNo": 280100 }], "areaNo": 280000 }, { "code": 8, "name": "吉林省", "data": [{ "code": "8_0", "name": "长春市", "areaNo": 250900 }, { "code": "8_1", "name": "白城市", "areaNo": 250200 }, { "code": "8_2", "name": "松原市", "areaNo": 250300 }, { "code": "8_3", "name": "吉林市", "areaNo": 250800 }, { "code": "8_4", "name": "四平市", "areaNo": 250700 }, { "code": "8_5", "name": "辽源市", "areaNo": 250600 }, { "code": "8_6", "name": "通化市", "areaNo": 250500 }, { "code": "8_7", "name": "白山市", "areaNo": 250400 }, { "code": "8_8", "name": "延边州" }], "areaNo": 250000 }, { "code": 9, "name": "黑龙江省", "data": [{ "code": "9_0", "name": "哈尔滨市", "areaNo": 201300 }, { "code": "9_1", "name": "齐齐哈尔市", "areaNo": 201200 }, { "code": "9_2", "name": "七台河市", "areaNo": 200500 }, { "code": "9_3", "name": "黑河市", "areaNo": 200300 }, { "code": "9_4", "name": "大庆市", "areaNo": 200800 }, { "code": "9_5", "name": "鹤岗市", "areaNo": 201000 }, { "code": "9_6", "name": "伊春市", "areaNo": 200700 }, { "code": "9_7", "name": "佳木斯市", "areaNo": 200600 }, { "code": "9_8", "name": "双鸭山市", "areaNo": 200900 }, { "code": "9_9", "name": "鸡西市", "areaNo": 201100 }, { "code": "9_10", "name": "牡丹江市", "areaNo": 200400 }, { "code": "9_11", "name": "绥化市", "areaNo": 200200 }, { "code": "9_12", "name": "大兴安岭地区", "areaNo": 200100 }], "areaNo": 200000 }, { "code": 10, "name": "江苏省", "data": [{ "code": "10_0", "name": "南京市", "areaNo": 261300 }, { "code": "10_1", "name": "徐州市", "areaNo": 261100 }, { "code": "10_2", "name": "连云港市", "areaNo": 260700 }, { "code": "10_3", "name": "宿迁市", "areaNo": 260100 }, { "code": "10_4", "name": "淮安市", "areaNo": 260600 }, { "code": "10_5", "name": "盐城市", "areaNo": 260500 }, { "code": "10_6", "name": "扬州市", "areaNo": 260400 }, { "code": "10_7", "name": "泰州市", "areaNo": 260200 }, { "code": "10_8", "name": "南通市", "areaNo": 260800 }, { "code": "10_9", "name": "镇江市", "areaNo": 260300 }, { "code": "10_10", "name": "常州市", "areaNo": 261000 }, { "code": "10_11", "name": "无锡市", "areaNo": 261200 }, { "code": "10_12", "name": "苏州市", "areaNo": 260900 }], "areaNo": 260000 }, { "code": 11, "name": "浙江省", "data": [{ "code": "11_0", "name": "杭州市", "areaNo": 351100 }, { "code": "11_1", "name": "湖州市", "areaNo": 350700 }, { "code": "11_2", "name": "嘉兴市", "areaNo": 350800 }, { "code": "11_3", "name": "舟山市", "areaNo": 350300 }, { "code": "11_4", "name": "宁波市", "areaNo": 351000 }, { "code": "11_5", "name": "绍兴市", "areaNo": 350600 }, { "code": "11_6", "name": "衢州市", "areaNo": 350400 }, { "code": "11_7", "name": "金华市", "areaNo": 350500 }, { "code": "11_8", "name": "台州市", "areaNo": 350200 }, { "code": "11_9", "name": "温州市", "areaNo": 350900 }, { "code": "11_10", "name": "丽水市", "areaNo": 350100 }], "areaNo": 350000 }, { "code": 12, "name": "安徽省", "data": [{ "code": "12_0", "name": "合肥市", "areaNo": 141600 }, { "code": "12_1", "name": "宿州市", "areaNo": 140500 }, { "code": "12_2", "name": "淮北市", "areaNo": 141100 }, { "code": "12_3", "name": "亳州市", "areaNo": 140300 }, { "code": "12_4", "name": "阜阳市", "areaNo": 140600 }, { "code": "12_5", "name": "蚌埠市", "areaNo": 141400 }, { "code": "12_6", "name": "淮南市", "areaNo": 141300 }, { "code": "12_7", "name": "滁州市", "areaNo": 140700 }, { "code": "12_8", "name": "马鞍山市", "areaNo": 141200 }, { "code": "12_9", "name": "芜湖市", "areaNo": 141500 }, { "code": "12_10", "name": "铜陵市", "areaNo": 141000 }, { "code": "12_11", "name": "安庆市", "areaNo": 140900 }, { "code": "12_12", "name": "黄山市", "areaNo": 140800 }, { "code": "12_13", "name": "六安市", "areaNo": 140400 }, { "code": "12_14", "name": "巢湖市" }, { "code": "12_15", "name": "池州市", "areaNo": 140200 }, { "code": "12_16", "name": "宣城市", "areaNo": 140100 }], "areaNo": 140000 }, { "code": 13, "name": "福建省", "data": [{ "code": "13_0", "name": "福州市", "areaNo": 150900 }, { "code": "13_1", "name": "南平市", "areaNo": 150300 }, { "code": "13_2", "name": "莆田市", "areaNo": 150700 }, { "code": "13_3", "name": "三明市", "areaNo": 150600 }, { "code": "13_4", "name": "泉州市", "areaNo": 150500 }, { "code": "13_5", "name": "厦门市", "areaNo": 150800 }, { "code": "13_6", "name": "漳州市", "areaNo": 150400 }, { "code": "13_7", "name": "龙岩市", "areaNo": 150200 }, { "code": "13_8", "name": "宁德市", "areaNo": 150100 }], "areaNo": 150000 }, { "code": 14, "name": "江西省", "data": [{ "code": "14_0", "name": "南昌市", "areaNo": 271100 }, { "code": "14_1", "name": "九江市", "areaNo": 270800 }, { "code": "14_2", "name": "景德镇市", "areaNo": 271000 }, { "code": "14_3", "name": "鹰潭市", "areaNo": 270600 }, { "code": "14_4", "name": "新余市", "areaNo": 270700 }, { "code": "14_5", "name": "萍乡市", "areaNo": 270900 }, { "code": "14_6", "name": "赣州市", "areaNo": 270500 }, { "code": "14_7", "name": "上饶市", "areaNo": 270100 }, { "code": "14_8", "name": "抚州市", "areaNo": 270200 }, { "code": "14_9", "name": "宜春市", "areaNo": 270300 }, { "code": "14_10", "name": "吉安市", "areaNo": 270400 }], "areaNo": 270000 }, { "code": 15, "name": "山东省", "data": [{ "code": "15_0", "name": "济南市", "areaNo": 311700 }, { "code": "15_1", "name": "青岛市", "areaNo": 311600 }, { "code": "15_2", "name": "聊城市", "areaNo": 310300 }, { "code": "15_3", "name": "德州市", "areaNo": 310400 }, { "code": "15_4", "name": "东营市", "areaNo": 311300 }, { "code": "15_5", "name": "淄博市", "areaNo": 311500 }, { "code": "15_6", "name": "潍坊市", "areaNo": 311100 }, { "code": "15_7", "name": "烟台市", "areaNo": 311200 }, { "code": "15_8", "name": "威海市", "areaNo": 310800 }, { "code": "15_9", "name": "日照市", "areaNo": 310700 }, { "code": "15_10", "name": "临沂市", "areaNo": 310500 }, { "code": "15_11", "name": "枣庄市", "areaNo": 311400 }, { "code": "15_12", "name": "济宁市", "areaNo": 311000 }, { "code": "15_13", "name": "泰安市", "areaNo": 310900 }, { "code": "15_14", "name": "莱芜市", "areaNo": 310600 }, { "code": "15_15", "name": "滨州市", "areaNo": 310200 }, { "code": "15_16", "name": "菏泽市", "areaNo": 310100 }], "areaNo": 310000 }, { "code": 16, "name": "河南省", "data": [{ "code": "16_0", "name": "郑州市", "areaNo": 211800 }, { "code": "16_1", "name": "开封市", "areaNo": 211700 }, { "code": "16_2", "name": "三门峡市", "areaNo": 210700 }, { "code": "16_3", "name": "洛阳市", "areaNo": 211600 }, { "code": "16_4", "name": "焦作市", "areaNo": 211100 }, { "code": "16_5", "name": "新乡市", "areaNo": 211200 }, { "code": "16_6", "name": "鹤壁市", "areaNo": 211300 }, { "code": "16_7", "name": "安阳市", "areaNo": 211400 }, { "code": "16_8", "name": "濮阳市", "areaNo": 211000 }, { "code": "16_9", "name": "商丘市", "areaNo": 210500 }, { "code": "16_10", "name": "许昌市", "areaNo": 210900 }, { "code": "16_11", "name": "漯河市", "areaNo": 210800 }, { "code": "16_12", "name": "平顶山市", "areaNo": 211500 }, { "code": "16_13", "name": "南阳市", "areaNo": 210600 }, { "code": "16_14", "name": "信阳市", "areaNo": 210400 }, { "code": "16_15", "name": "周口市", "areaNo": 210300 }, { "code": "16_16", "name": "驻马店市", "areaNo": 210200 }], "areaNo": 210000 }, { "code": 17, "name": "湖北省", "data": [{ "code": "17_0", "name": "武汉市", "areaNo": 221400 }, { "code": "17_1", "name": "十堰市", "areaNo": 221200 }, { "code": "17_2", "name": "襄樊市" }, { "code": "17_3", "name": "荆门市", "areaNo": 220800 }, { "code": "17_4", "name": "孝感市", "areaNo": 220700 }, { "code": "17_5", "name": "黄冈市", "areaNo": 220500 }, { "code": "17_6", "name": "鄂州市", "areaNo": 220900 }, { "code": "17_7", "name": "黄石市", "areaNo": 221300 }, { "code": "17_8", "name": "咸宁市", "areaNo": 220400 }, { "code": "17_9", "name": "荆州市", "areaNo": 220600 }, { "code": "17_10", "name": "宜昌市", "areaNo": 221100 }, { "code": "17_11", "name": "随州市", "areaNo": 220300 }, { "code": "17_12", "name": "省直辖县级行政单位" }, { "code": "17_13", "name": "恩施州" }], "areaNo": 220000 }, { "code": 18, "name": "湖南省", "data": [{ "code": "18_0", "name": "长沙市", "areaNo": 231400 }, { "code": "18_1", "name": "张家界市", "areaNo": 230700 }, { "code": "18_2", "name": "常德市", "areaNo": 230800 }, { "code": "18_3", "name": "益阳市", "areaNo": 230600 }, { "code": "18_4", "name": "岳阳市", "areaNo": 230900 }, { "code": "18_5", "name": "株洲市", "areaNo": 231300 }, { "code": "18_6", "name": "湘潭市", "areaNo": 231200 }, { "code": "18_7", "name": "衡阳市", "areaNo": 231100 }, { "code": "18_8", "name": "郴州市", "areaNo": 230500 }, { "code": "18_9", "name": "永州市", "areaNo": 230400 }, { "code": "18_10", "name": "邵阳市", "areaNo": 231000 }, { "code": "18_11", "name": "怀化市", "areaNo": 230300 }, { "code": "18_12", "name": "娄底市", "areaNo": 230200 }, { "code": "18_13", "name": "湘西州" }], "areaNo": 230000 }, { "code": 19, "name": "广东省", "data": [{ "code": "19_0", "name": "广州市", "areaNo": 162100 }, { "code": "19_1", "name": "深圳市", "areaNo": 161900 }, { "code": "19_2", "name": "清远市", "areaNo": 160600 }, { "code": "19_3", "name": "韶关市", "areaNo": 162000 }, { "code": "19_4", "name": "河源市", "areaNo": 160800 }, { "code": "19_5", "name": "梅州市", "areaNo": 161000 }, { "code": "19_6", "name": "潮州市", "areaNo": 160300 }, { "code": "19_7", "name": "汕头市", "areaNo": 161700 }, { "code": "19_8", "name": "揭阳市", "areaNo": 160200 }, { "code": "19_9", "name": "汕尾市", "areaNo": 160900 }, { "code": "19_10", "name": "惠州市", "areaNo": 161100 }, { "code": "19_11", "name": "东莞市", "areaNo": 160500 }, { "code": "19_12", "name": "珠海市", "areaNo": 161800 }, { "code": "19_13", "name": "中山市", "areaNo": 160400 }, { "code": "19_14", "name": "江门市", "areaNo": 161500 }, { "code": "19_15", "name": "佛山市", "areaNo": 161600 }, { "code": "19_16", "name": "肇庆市", "areaNo": 161200 }, { "code": "19_17", "name": "云浮市", "areaNo": 160100 }, { "code": "19_18", "name": "阳江市", "areaNo": 160700 }, { "code": "19_19", "name": "茂名市", "areaNo": 161300 }, { "code": "19_20", "name": "湛江市", "areaNo": 161400 }], "areaNo": 160000 }, { "code": 20, "name": "广西", "data": [{ "code": "20_0", "name": "南宁市", "areaNo": 361400 }, { "code": "20_1", "name": "桂林市", "areaNo": 361200 }, { "code": "20_2", "name": "柳州市", "areaNo": 361300 }, { "code": "20_3", "name": "梧州市", "areaNo": 361100 }, { "code": "20_4", "name": "贵港市", "areaNo": 360700 }, { "code": "20_5", "name": "玉林市", "areaNo": 360600 }, { "code": "20_6", "name": "钦州市", "areaNo": 360800 }, { "code": "20_7", "name": "北海市", "areaNo": 361000 }, { "code": "20_8", "name": "防城港市", "areaNo": 360900 }, { "code": "20_9", "name": "崇左市", "areaNo": 360100 }, { "code": "20_10", "name": "百色市", "areaNo": 360500 }, { "code": "20_11", "name": "河池市", "areaNo": 360300 }, { "code": "20_12", "name": "来宾市", "areaNo": 360200 }, { "code": "20_13", "name": "贺州市", "areaNo": 360400 }] }, { "code": 21, "name": "海南省", "data": [{ "code": "21_0", "name": "海口市", "areaNo": 240400 }, { "code": "21_1", "name": "三亚市", "areaNo": 240300 }, { "code": "21_2", "name": "省直辖行政单位" }], "areaNo": 240000 }, { "code": 22, "name": "四川省", "data": [{ "code": "22_0", "name": "成都市", "areaNo": 322100 }, { "code": "22_1", "name": "广元市", "areaNo": 321500 }, { "code": "22_2", "name": "绵阳市", "areaNo": 321600 }, { "code": "22_3", "name": "德阳市", "areaNo": 321700 }, { "code": "22_4", "name": "南充市", "areaNo": 321100 }, { "code": "22_5", "name": "广安市", "areaNo": 320800 }, { "code": "22_6", "name": "遂宁市", "areaNo": 321400 }, { "code": "22_7", "name": "内江市", "areaNo": 321300 }, { "code": "22_8", "name": "乐山市", "areaNo": 321200 }, { "code": "22_9", "name": "自贡市", "areaNo": 322000 }, { "code": "22_10", "name": "泸州市", "areaNo": 321800 }, { "code": "22_11", "name": "宜宾市", "areaNo": 320900 }, { "code": "22_12", "name": "攀枝花市", "areaNo": 321900 }, { "code": "22_13", "name": "巴中市", "areaNo": 320500 }, { "code": "22_14", "name": "达州市", "areaNo": 320700 }, { "code": "22_15", "name": "资阳市", "areaNo": 320400 }, { "code": "22_16", "name": "眉山市", "areaNo": 321000 }, { "code": "22_17", "name": "雅安市", "areaNo": 320600 }, { "code": "22_18", "name": "阿坝州" }, { "code": "22_19", "name": "甘孜州" }, { "code": "22_20", "name": "凉山州" }], "areaNo": 320000 }, { "code": 23, "name": "贵州省", "data": [{ "code": "23_0", "name": "贵阳市", "areaNo": 170900 }, { "code": "23_1", "name": "六盘水市", "areaNo": 170800 }, { "code": "23_2", "name": "遵义市", "areaNo": 170700 }, { "code": "23_3", "name": "安顺市", "areaNo": 170600 }, { "code": "23_4", "name": "毕节地区" }, { "code": "23_5", "name": "铜仁地区" }, { "code": "23_6", "name": "黔东南州" }, { "code": "23_7", "name": "黔南州" }, { "code": "23_8", "name": "黔西南州" }], "areaNo": 170000 }, { "code": 24, "name": "云南省", "data": [{ "code": "24_0", "name": "昆明市", "areaNo": 341600 }, { "code": "24_1", "name": "曲靖市", "areaNo": 341500 }, { "code": "24_2", "name": "玉溪市", "areaNo": 341400 }, { "code": "24_3", "name": "保山市", "areaNo": 341300 }, { "code": "24_4", "name": "昭通市", "areaNo": 341200 }, { "code": "24_5", "name": "丽江市", "areaNo": 341100 }, { "code": "24_6", "name": "思茅市" }, { "code": "24_7", "name": "临沧市", "areaNo": 340900 }, { "code": "24_8", "name": "德宏州" }, { "code": "24_9", "name": "怒江州" }, { "code": "24_10", "name": "迪庆州" }, { "code": "24_11", "name": "大理州" }, { "code": "24_12", "name": "楚雄州" }, { "code": "24_13", "name": "红河州" }, { "code": "24_14", "name": "文山州" }, { "code": "24_15", "name": "西双版纳州" }], "areaNo": 340000 }, { "code": 25, "name": "西藏", "data": [{ "code": "25_0", "name": "拉萨市", "areaNo": 390700 }, { "code": "25_1", "name": "那曲地区", "areaNo": 390300 }, { "code": "25_2", "name": "昌都地区", "areaNo": 390600 }, { "code": "25_3", "name": "林芝地区", "areaNo": 390100 }, { "code": "25_4", "name": "山南地区", "areaNo": 390500 }, { "code": "25_5", "name": "日喀则地区", "areaNo": 390400 }, { "code": "25_6", "name": "阿里地区", "areaNo": 390200 }] }, { "code": 26, "name": "陕西省", "data": [{ "code": "26_0", "name": "西安市", "areaNo": 331000 }, { "code": "26_1", "name": "延安市", "areaNo": 330500 }, { "code": "26_2", "name": "铜川市", "areaNo": 330900 }, { "code": "26_3", "name": "渭南市", "areaNo": 330600 }, { "code": "26_4", "name": "咸阳市", "areaNo": 330700 }, { "code": "26_5", "name": "宝鸡市", "areaNo": 330800 }, { "code": "26_6", "name": "汉中市", "areaNo": 330400 }, { "code": "26_7", "name": "榆林市", "areaNo": 330300 }, { "code": "26_8", "name": "安康市", "areaNo": 330200 }, { "code": "26_9", "name": "商洛市", "areaNo": 330100 }], "areaNo": 330000 }, { "code": 27, "name": "甘肃省", "data": [{ "code": "27_0", "name": "兰州市", "areaNo": 181400 }, { "code": "27_1", "name": "嘉峪关市", "areaNo": 181300 }, { "code": "27_2", "name": "白银市", "areaNo": 181100 }, { "code": "27_3", "name": "天水市", "areaNo": 181000 }, { "code": "27_4", "name": "武威市", "areaNo": 180900 }, { "code": "27_5", "name": "酒泉市", "areaNo": 180600 }, { "code": "27_6", "name": "张掖市", "areaNo": 180800 }, { "code": "27_7", "name": "庆阳市", "areaNo": 180500 }, { "code": "27_8", "name": "平凉市", "areaNo": 180700 }, { "code": "27_9", "name": "定西市", "areaNo": 180400 }, { "code": "27_10", "name": "陇南市", "areaNo": 180300 }, { "code": "27_11", "name": "临夏州" }, { "code": "27_12", "name": "甘南州" }], "areaNo": 180000 }, { "code": 28, "name": "青海省", "data": [{ "code": "28_0", "name": "西宁市", "areaNo": 290800 }, { "code": "28_1", "name": "海东地区", "areaNo": 290700 }, { "code": "28_2", "name": "海北州" }, { "code": "28_3", "name": "海南州" }, { "code": "28_4", "name": "黄南州" }, { "code": "28_5", "name": "果洛州" }, { "code": "28_6", "name": "玉树州" }, { "code": "28_7", "name": "海西州" }], "areaNo": 290000 }, { "code": 29, "name": "宁夏", "data": [{ "code": "29_0", "name": "银川市", "areaNo": 380500 }, { "code": "29_1", "name": "石嘴山市", "areaNo": 380400 }, { "code": "29_2", "name": "吴忠市", "areaNo": 380300 }, { "code": "29_3", "name": "固原市", "areaNo": 380200 }, { "code": "29_4", "name": "中卫市", "areaNo": 380100 }] }, { "code": 30, "name": "新疆", "data": [{ "code": "30_0", "name": "乌鲁木齐市", "areaNo": 401500 }, { "code": "30_1", "name": "克拉玛依市", "areaNo": 401400 }, { "code": "30_2", "name": "自治区直辖县级行政单位" }, { "code": "30_3", "name": "喀什地区", "areaNo": 400600 }, { "code": "30_4", "name": "阿克苏地区", "areaNo": 400800 }, { "code": "30_5", "name": "和田地区", "areaNo": 400500 }, { "code": "30_6", "name": "吐鲁番地区", "areaNo": 401300 }, { "code": "30_7", "name": "哈密地区", "areaNo": 401200 }, { "code": "30_8", "name": "克孜勒苏柯州" }, { "code": "30_9", "name": "博尔塔拉州" }, { "code": "30_10", "name": "昌吉州" }, { "code": "30_11", "name": "巴音郭楞州" }, { "code": "30_12", "name": "伊犁州" }, { "code": "30_13", "name": "塔城地区", "areaNo": 400300 }, { "code": "30_14", "name": "阿勒泰地区", "areaNo": 400200 }] }, { "code": 31, "name": "香港", "data": [{ "code": "31_0", "name": "香港特别行政区", "areaNo": 410000 }] }, { "code": 32, "name": "澳门", "data": [{ "code": "32_0", "name": "澳门特别行政区", "areaNo": 420000 }] }, { "code": 33, "name": "台湾省", "data": [{ "code": "33_0", "name": "台北" }, { "code": "33_1", "name": "高雄" }, { "code": "33_2", "name": "台中" }, { "code": "33_3", "name": "花莲" }, { "code": "33_4", "name": "基隆" }, { "code": "33_5", "name": "嘉义" }, { "code": "33_6", "name": "金门" }, { "code": "33_7", "name": "连江" }, { "code": "33_8", "name": "苗栗" }, { "code": "33_9", "name": "南投" }, { "code": "33_10", "name": "澎湖" }, { "code": "33_11", "name": "屏东" }, { "code": "33_12", "name": "台东" }, { "code": "33_13", "name": "台南" }, { "code": "33_14", "name": "桃园" }, { "code": "33_15", "name": "新竹" }, { "code": "33_16", "name": "宜兰" }, { "code": "33_17", "name": "云林" }, { "code": "33_18", "name": "彰化" }], "areaNo": 430000 }] }],
        filter: {},
        container: Object,
        callback: {},
        appendHtml: "",

        // 功能描述：初始化
        init: function (option) {
            this.setOption(option);
            this.loadData();
            this.loadEvent();
            this.setFilter();
            this.container.find(".filter-menu li:nth-child(1)").click();
        },

        // 功能描述：选项设置
        setOption: function (option) {
            if (!option) return;

            $('body').append("<div class=\"city-container-box\"><div class=\"city-container\"></div></div>");
            this.container = $('.city-container');
            this.filter = option.filter || {};
            this.callback = option.callback || null;
            this.appendHtml = option.appendHtml || "";
            if (this.container.length == 0) return;
        },

        // 功能描述：绑定菜单
        loadData: function () {
            var nav_data = this.data || [];
            if (nav_data.length == 0) return;

            var nav = [];
            var nav_menu = [], nav_tab_item = [], nav_tab_item_main = [], nav_tab_item_sub = [];
            var nav_menu_code, nav_menu_areano;
            for (var i = 0; i < nav_data.length; i++) {
                nav_menu_code = nav_data[i]["code"] || "";
                nav_menu_areano = nav_data[i]["areaNo"] || "";
                nav_menu.push(this.extractData(nav_data[i], "<li code=\"##code##\"><span>##name##</span><i class=\"iconfont icon-unfold\"></i></li>"));

                nav_tab_data = nav_data[i]["data"] || [];
                if (nav_tab_data.length == 0) continue;

                nav_tab_item_sub = [];
                nav_tab_item_main = [];
                for (var j = 0; j < nav_tab_data.length; j++) {
                    nav_tab_item_main.push(this.extractData(nav_tab_data[j], "<dd code=\"##code##\" areano=\"##areaNo##\">##name##</dd>"));

                    nav_tab_data_sub = nav_tab_data[j]["data"] || [];
                    if (nav_tab_data_sub.length == 0) continue;

                    nav_tab_item_sub.push("<dl class=\"filter-tab-item-sub\">");
                    nav_tab_item_sub.push(this.extractData(nav_tab_data[j], "<dd code=\"##code##\" areano=\"##areaNo##\">##name##</dd>"));
                    for (var k = 0; k < nav_tab_data_sub.length; k++) {
                        nav_tab_item_sub.push(this.extractData(nav_tab_data_sub[k], "<dd code=\"##code##\" areano=\"##areaNo##\">##name##</dd>"));
                    }
                    nav_tab_item_sub.push("</dl>");
                }

                if (nav_tab_item_sub.length > 0) {
                    nav_tab_item.push("<li class=\"filter-tab-item filter-tab-item-mutil\" code=\"" + nav_menu_code + "\">");
                    nav_tab_item.push("<dl class=\"filter-tab-item-main\">" + nav_tab_item_main.join("") + "</dl>");
                    nav_tab_item.push(nav_tab_item_sub.join("") + "</li>");
                } else {
                    nav_tab_item.push("<li class=\"filter-tab-item\" code=\"" + nav_menu_code + "\" areano=\"" + nav_menu_areano + "\">");
                    nav_tab_item.push("<dl class=\"filter-tab-item-sub\">" + nav_tab_item_main.join("") + "</dl></li>");
                }
            }

            nav.push("<div class=\"filter-close\">X</div>");
            nav.push("<ul class=\"filter-menu\">" + nav_menu.join("") + "</ul>");
            nav.push("<ul class=\"filter-tab\">" + nav_tab_item.join("") + this.appendHtml + "</ul>");

            this.container.html(nav.join(""));
        },

        // 功能描述：抽取数据
        extractData: function (data, template) {
            if (!data || !template) return "";

            var code = data["code"] || "";
            var areano = data["areaNo"] || "";
            var name = data["name"] || "";

            return template.replace("##code##", code).replace("##areaNo##", areano).replace("##name##", name);
        },

        // 功能描述：加载事件
        loadEvent: function () {
            var me = this;

            this.container.find(".filter-menu li").click(function () {
                $(".filter-tab .filter-tab-item").hide();
                me.container.find(".filter-tab .filter-tab-item-append").show();
                var obj = me.container.find(".filter-tab .filter-tab-item").eq($(this).index());
                if (obj) {
                    if (obj.hasClass("filter-tab-item-mutil") && obj.find(".filter-tab-item-main dd.on").length == 0) {
                        obj.find(".filter-tab-item-main dd:first-child").click();
                    } else if (obj.find(".filter-tab-item-sub dd.on").length == 0) {
                        obj.find(".filter-tab-item-sub dd:first-child").addClass("on");
                    }
                    obj.show();
                }

                return false;
            });

            this.container.find(".filter-tab-item-main dd").click(function () {
                $(this).siblings().removeClass("on");
                $(this).addClass("on");
                $(this).parent().parent().find(".filter-tab-item-sub").hide();
                var obj = $(this).parent().parent().find(".filter-tab-item-sub").eq($(this).index());
                if (obj) {
                    if (obj.find("dd.on").length == 0) {
                        obj.find("dd:first-child").addClass("on");
                    }
                    obj.show();
                }

                return false;
            });

            this.container.find(".filter-tab .filter-tab-item-sub dd").click(function () {
                $(this).parent().parent().find("dd.selected").removeClass("selected");
                $(this).addClass("selected");
                var result = me.getFilter();

                var fcode = $(this).attr("code") || "";
                var fname = $(this).html() || "";
                var idx = $(this).parent().parent().index();
                var obj = me.container.find(".filter-menu li").eq(idx);
                if (obj) {
                    //obj.find("span").html(fname);
                    obj.find("span").attr("code", fcode);
                }

                //回调函数
                if ($.isFunction(me.callback)) {
                    me.callback(result);
                }

                $('.city-container-box').remove();
                return false;
            });

            this.container.find(".filter-close").click(function () {
                $('.city-container-box').remove();
            })
        },

        // 功能描述：设置过滤条件
        setFilter: function () {
            for (var i = 0; i < this.data.length; i++) {
                var code = this.data[i].code || "";
                if (code == "") continue;
                if (!this.data[i].data || isNaN(this.data[i].data.length) || this.data[i].data.length <= 0) continue;

                var item = this.data[i].data[0];
                if (!this.filter[code]) continue;
            }

            for (var key in this.filter) {
                var fobj = this.filter[key] || null;
                if (!fobj) continue;

                var fcode = fobj["code"] || "";
                var fname = fobj["name"] || "";
                if (fcode == "" || fname == "") {

                }

                var obj = $(".filter-menu li[code=" + key + "]");
                if (obj) {
                    obj.attr("fcode", fcode);
                    obj.find("span").html(fname);
                }

                obj = $(".filter-tab .filter-tab-item[code=" + key + "]");
                if (obj) {
                    obj.find(".filter-tab-item-sub dd").each(function () {
                        var code = $(this).attr("code") || "";
                        if (code == fcode) {
                            $(this).addClass("selected");
                            return false;
                        }
                    })
                }
            }
        },

        // 功能描述：获取过滤条件
        getFilter: function () {
            var result = [], strResult = [];
            this.container.find(".filter-tab .filter-tab-item-main dd.on").each(function () {
                var code = $(this).attr("code") || "";
                var areano = $(this).attr("areano") || "";
                var name = $(this).html() || "";
                result.push({ type: "province", code: code, name: name, areano: areano });
            });
            this.container.find(".filter-tab .filter-tab-item-sub dd.selected").each(function () {
                var code = $(this).attr("code") || "";
                var areano = $(this).attr("areano") || "";
                var name = $(this).html() || "";
                result.push({ type: "city", code: code, name: name, areano: areano });
            });
            return result;
        }
    }

    return city;
});
