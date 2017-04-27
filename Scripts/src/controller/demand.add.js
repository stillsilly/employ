define(function () {
    var module = function () {
        //
    };
    module.prototype = {
        positionTypeID: 1,
        number: 1,
        requirementsID: 1,
        sexual: 0,
        areaID:0,
        salaryType: 1,
        salary: 20,
        timeUnitID: 1,
        rewardType: 1,
        pushMoneyPercent: "30",
        bonusCondition: "20",
        bonusReward: "20",

        startDate: "2017-03-06",
        endDate: "2017-03-06",
        workHours: "08:00",
        offHours: "17:00",
        salaryDesc: "促销",


        cityName: "",

        provinceID: 1,
        cityID: 1,
        regionID: 1,
        tag_id:0,
        systemID: 1,
        storeID: 0,
        address: " ",
        jobDesc: " ",
        hideRa:false,
        sar:false,
        requirementsTagID: 0,
        interview: 1,
        contactName: "张小姐",
        contactmobile: "13245678902",
        applyDeadline: "2017-03-06",

        // 功能描述：初始化
        ready: function () {
            this.load();
            this.startDate=this.newDay();
            this.endDate=this.newDay();
            this.applyDeadline=this.newDay();
        },
        newDay:function(){
          let date=new Date();
          let year=  new Date().getFullYear();
          let mon=  new Date().getMonth()+1;
          let day= new Date().getDate();
          if(mon<10){
            mon='0'+mon;
          }
          if(day<10){
            day='0'+day;
          }
          return year+'-'+mon+'-'+day;
        },
        // 功能描述：加载
        load: function () {
            if(localStorage.dict){
                this.jobDesc=JSON.parse(localStorage.dict).job_desc;
            }
            var me = this;
            $.utils.ajax({
                url: "/requirement/user/personalcenter",
                // data: { requirementID: this.nav.id },
                type: "GET",
                success: function (data, result) {
                    if (!data) return;
                    me.contactName=data.realName;
                    me.contactmobile=data.mobile;
                   
                },
                error: function () {
                    me.item = {};
                }
            }) 
            if (!this.nav.id) return;
            $.utils.ajax({
                url: "/service/requirement/detail",
                data: { requirementID: this.nav.id },
                type: "GET",
                success: function (data, result) {
                    if (!data) return;
                    // if(data.officeHours){
                    //     me.workHours=data.officeHours.substring(0,5);
                    //     me.offHours=data.officeHours.substring(6);
                    // }
                    // if(data.cityID){
                    //     me.cityName=data.cityID;
                    // }
                    // if(data.storeName){
                    //     me.storeID=data.storeName;
                    // }
                    // for (var key in data) {
                    //     if (me[key]) {
                    //         me[key] = data[key];
                    //     }
                    // }
                   
                    // if(new RegExp('¥').test(me.salary)){
                    //     let salary=me.salary.slice(1);
                    //     // if(me.salary.slice(-1)=='天'){
                    //     //     me.timeUnitID='1';
                    //     //     me.salaryType=1;
                    //     // } else if (me.salary.slice(-1)=='小时') {
                    //     //     me.timeUnitID='2';
                    //     //     me.salaryType=2;
                    //     // }
                    //     me.salary=parseInt(salary);
                    // }
                     // 职位
                    data.positionTypeID&&(me.positionTypeID=data.positionTypeID);
                    // 招聘人数
                    data.number&&(me.number=data.number);
                    // 人员要求
                    data.requirementsID&&(me.requirementsID=data.requirementsID);//data.requirementsID;
                    // 性别要求
                    data.sexualCd&&(me.sexual=data.sexualCd);
                    // 薪资
                    data.salaryCd&&(me.salary=data.salaryCd);
                    data.timeUnitID&&(me.timeUnitID=data.timeUnitID);
                    if (me.salary == -1) {
                        me.sar = true;
                    };
                    data.salaryCd == -1&&(me.salary=20);
                    // 奖励
                    data.pushMoneyPercent&&(me.pushMoneyPercent=data.pushMoneyPercent);
                    data.bonusCondition&&(me.bonusCondition=data.bonusCondition);
                    data.bonusReward&&(me.bonusReward=data.bonusReward);
                    data.rewardType&&(me.rewardType=data.rewardType);
                    // 工作日期
                    // 工作时间
                    data.workHours&&(me.workHours=data.workHours);
                    data.offHours&&(me.offHours=data.offHours);
                    // 工作地点
                    data.cityIDCd&&(me.cityID=data.cityIDCd);
                    data.storeID&&(me.storeID=data.storeID);
                    data.provinceID&&(me.provinceID=data.provinceID);
                    data.regionID&&(me.regionID=data.regionID);
                    data.areaID&&(me.areaID=data.areaID);
                    // 所属系统
                    data.systemID&&(me.systemID=data.systemID);
                    // 门店
                    
                    // 地址
                    data.address&&(me.address=data.address);
                    // 职位描述
                    data.jobDesc&&(me.jobDesc=data.jobDesc);
                    // 要求
                    data.requirementsTagIDCd&&(me.tag_id=data.requirementsTagIDCd);
                    // 线下面试
                    data.interview&&(me.interview=data.interview);
                    // 联系人
                    data.contactName&&(me.contactName=data.contactName);
                    // 联系方式
                    data.contactmobile&&(me.contactmobile=data.contactmobile);
                    // 报名截止
                    // data.applyDeadline&&(me.applyDeadline=data.applyDeadline);
                },
                error: function () {
                    me.item = {};
                }
            })
        },
        sys:function(val){
            this.systemID=val;
        },  
        // 清空地址
        clearAdd:function(){
            this.address="";
        },
        isHide:function(hide){
            this.hideRa=hide;
        },
        format: function (date) {
            return date ? date.replace(/-/gi, "") : "";
        },
        // 功能描述：加载
        submit: function () {
            if(!this.number){
                $.poptips("请输入招聘人数");
                return;
            }
            if(!this.salary){
                $.poptips("请输入薪资");
                return;
            }
            if(!this.sexual){
                $.poptips("请选择性别要求");
                return;
            }
            if(!this.cityName){
                $.poptips("请选择工作地点");
                return;
            }
            if(!this.storeID){
                $.poptips("请选择门店");
                return;
            }
            if(!this.address){
                $.poptips("请选择门店");
                return;
            }
            if(!this.jobDesc){
                $.poptips("请输入职位描述");
                return;
            }
            if(!this.requirementsTagID){
                $.poptips("请选择职位要求");
                return;
            }
            if(!this.contactName){
                $.poptips("请输入联系人姓名");
                return;
            }
            if(!this.contactmobile){
                $.poptips("请输入联系方式");
                return;
            }
            var data = this.getAllData();
            // 判断有效电话号码，手机号码
            if (!$.utils.isTelphone(data.contactmobile)) {
                $.poptips("请输入有效的联系方式");
                return;
            }
            if (data.salaryType == 2) {
                data.salary = -1;
            }
            delete data.salaryType;
            delete data.cityName;
            delete data.hideRa;
            delete data.sar;
            delete data.tag_id;
            if(this.hideRa){
                data.pushMoneyPercent='';
                data.bonusCondition='';
                data.rewardType="";
                data.bonusReward="";
            }
            /*
            startDate: "2017-03-06",
            endDate: "2017-03-06",
            applyDeadline: "2017-03-06",
            */
            data.startDate = this.format(data.startDate);
            data.endDate = this.format(data.endDate);
            data.applyDeadline = this.format(data.applyDeadline);
            // for(var key in data){
            //     data[key]+='';
            // }
            data.rewardType+='';
            data.bonusReward+='';
            $.utils.ajax({
                    url: "/requirement/publish",
                    data: data,
                    success: function (data, result) {
                        if (data) {
                            $.poptips("发布需求成功~", function () {
                                $.jump("/Demand/List");
                            });
                        }
                    }
                })
        }
    }
    return module;
});