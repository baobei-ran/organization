<template>
    <div id="bookingorderdetail" class="" style="height:95%">
        <div class="bg_f Mg-B24">
            <p class="bookingorderdetail_tit Pd-B24 Pd-T24 Pd-L24 Ft-S16 Color_black">基本信息</p>
            <table class="Mg-L24 Mg-T12 table">
                <tr>
                    <td width="33.3%">
                        <p >
                            <span class="Color_black">
                                医生姓名:
                            </span>
                            <span class="Color_gray6" v-text='doctorMsg.true_name'>
                                张三
                            </span>
                        </p>
                    </td>
                    <td width="33.3%">
                        <p >
                            <span class="Color_black">
                                医生手机:
                            </span>
                            <span class="Color_gray6" v-text='doctorMsg.phone'>
                                18588888888
                            </span>
                        </p>
                    </td>
                    <td width="33.3%">
                        <p>
                            <span class="Color_black">
                                医生邮箱:
                            </span>
                            <span class="Color_gray6" v-text='doctorMsg.mailbox'>
                                zhangsan@163.com
                            </span> </p>
                    </td>
                </tr>
                <tr>
                    <td>
                        <p >
                            <span class="Color_black">
                                医生职称:
                            </span>
                            <span class="Color_gray6" v-text='doctorMsg.name'>
                                主任医师
                            </span> </p>
                    </td>
                    <td>
                        <p >
                            <span class="Color_black">
                                所属科室:
                            </span>
                            <span class="Color_gray6" v-text='doctorMsg.department_name'>
                                妇产科
                            </span>
                        </p>
                    </td>
                    <td><span></span><span></span></td>
                </tr>
            </table>
        </div>
        <div class="bg_f">
            <p class="bookingorderdetail_tit Pd-B24 Pd-T24 Pd-L24 Pd-R24 Ft-S16 Color_black clear"><span class="fl">排班信息</span> <span class="fr icon_right1"><i>停</i>停诊</span><span class="fr icon_right Mg-R40"><i>普</i>普通门诊</span></p>
            <div class="Pd-L24 Pd-R24 Mg-T24">
                <table id="tab" border="1">
                    <thead>
                        <tr>
                            <td rowspan="2">排班</td>
                            <td v-for="(val,index) in datearr">
                                <span v-text="val.week">08/27</span>
                            </td>
                        </tr>
                        <tr>
                            <td v-for="(val,index) in datearr"> <span v-text="val.date">08/27</span></td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>上午</td>
                            <td v-for="val in 21"></td>
                        </tr>
                        <tr>
                            <td>下午</td>
                            <td v-for="val in 21"><i class="icon_stop">停</i></td>
                        </tr>
                        <tr>
                            <td>晚上</td>
                            <td v-for="val in 21"><i class="icon_default">普</i></td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
        <p class="ac"><span class="Color_white Ft-S16 goback pointer" @click="go('/server/doctorScheduling')">返回</span></p>
    </div>
</template>
<script>
export default {
    name: 'bookingorderdetail',
    data() {
        return {
            datearr: [],    // 日期
            doctorMsg: '',   // 医生信息
            normal: [],  //  正常排班数据
            stop: []    // 停诊数据
        }
    },
    mounted() {
        this.initdata();
        this.Datelist()
    },
    methods: {
        initdata() {
            var _this = this;
            console.log(_this.$route.query)
            this.$http.post('/shv2/server/doc_class', _this.$route.query , function (res) {
                console.log(res)
                if (res.code == 1) {
                    _this.doctorMsg = res.data;
                    _this.normal = res.normal;
                    _this.stop = res.stop;
                }
            }, function (err) { console.log(err)})
        },
        Datelist() {
            this.datearr;
            let datetime = new Date().getTime();
            let onedays = 24 * 60 * 60 * 1000
            for (let i = 0; i < 21; i++) {
                let month = (new Date(datetime).getMonth() + 1 + '').length > 1 ? new Date(datetime).getMonth() + 1 : '0' + (new Date(datetime).getMonth() + 1)
                let dates = (new Date(datetime).getDate() + '').length > 1 ? new Date(datetime).getDate() : '0' + new Date(datetime).getDate();
                let week = new Date(datetime).getDay();
                switch (week) {
                    case 0: week = '周日'; break;
                    case 1: week = "周一"; break;
                    case 2: week = "周二"; break;
                    case 3: week = "周三"; break;
                    case 4: week = "周四"; break;
                    case 5: week = "周五"; break;
                    case 6: week = "周六"; break;
                }
                let dateobj = {
                    week: week,
                    date: month + '.' + dates
                }
                this.datearr.push(dateobj);
                datetime += onedays;
            }
        },
    }
}
</script>

<style scoped lang="less">
#bookingorderdetail {
    .icon_stop {
        font-style: normal;
        display: inline-block;
        height: 28px;
        width: 28px;
        text-align: center;
        line-height: 28px;
        border-radius: 2px;
        background: #ff3131;
        font-size: 16px;
        color: #fff;
    }
    .icon_default {
        font-style: normal;
        display: inline-block;
        height: 28px;
        width: 28px;
        text-align: center;
        line-height: 28px;
        border-radius: 2px;
        background: #2ec97a;
        font-size: 16px;
        color: #fff;
    }
    div {
        border-radius: 4px;
        padding-bottom: 12px;
        .bookingorderdetail_tit {
            border-bottom: 1px solid #f1f2f9;
            i {
                font-style: normal;
                display: inline-block;
                height: 28px;
                width: 28px;
                text-align: center;
                line-height: 28px;
                margin-right: 12px;
                border-radius: 2px;
            }
            .icon_right1 {
                font-size: 14px;
                i {
                    background: #ff3131;
                    font-size: 16px;
                    color: #fff;
                }
            }
            .icon_right {
                font-size: 14px;
                i {
                    background: #2ec97a;
                    font-size: 16px;
                    color: #fff;
                }
            }
        }
        .table {
            width: 100%;
            text-align: left;
            font-size: 14px;
            color: #333;
            td {
                height: 38px;
            }
        }
        #tab {
            width: 100%;
            text-align: center;
            border: 1px solid #c2c3c3;
            border-color: #c2c3c3;
            font-size: 14px;
            color: #333;
            thead {
                td {
                    background: #f1f2f9;
                }
            }
            td {
                height: 50px;
            }
        }
    }
    .goback {
        display: inline-block;
        width: 120px;
        height: 40px;
        line-height: 40px;
        background: rgba(49, 150, 255, 1);
        border-radius: 4px;
        margin-top: 24px;
    }
}
</style>
