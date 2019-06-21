<template>
<!-- 处方详情页 -->
    <div id="prescriptionCheck">
        <div class="tab_content">
                <div class="prescriptionCheck_head dis_f Pd-L24 Pd-R24" v-show="prescriptiondata.status == 1">
                    <h1>处方申请详情</h1>
                    <img src="../../../common/image/icon/icon_ddsh@2x.png" alt="" />
                    <span>等待开具中 <b>{{ downTime }}</b></span>
                </div>
                <div class="prescriptionCheck_head dis_f Pd-L24 Pd-R24" v-show="prescriptiondata.status == 3 && prescriptiondata.flag == 0">
                    <h1>处方申请详情</h1>
                    <img src="../../../common/image/icon/icon_ddsh@2x.png" alt="" />
                    <span>处方已开具，等待药师审核</span>
                </div>
                <div class="prescriptionCheck_head dis_f Pd-L24 Pd-R24" v-show="prescriptiondata.status == 3 && prescriptiondata.flag == 1">
                    <h1>处方申请详情</h1>
                    <img src="../../../common/image/icon/icon_cfykj@2x.png" alt="" />
                    <span>处方已开具，药师已审核</span>
                </div>
                <!-- 处方过期 -->
                 <div class="prescriptionCheck_header dis_f Pd-L24 Pd-R24" v-show="prescriptiondata.status == 5 && prescriptiondata.flag == 1">
                    <h1>处方申请详情</h1>
                    <img src="../../../common/image/icon/icon_cfygq@2x.png" alt="" />
                    <span>处方已开具，处方已过期</span>
                </div>

                 <!-- 处方审核未通过 -->
                 <div class="prescriptionCheck_header dis_f Pd-L24 Pd-R24" v-show="prescriptiondata.status == 3 && prescriptiondata.flag == 2">
                    <h1>处方申请详情</h1>
                    <img src="../../../common/image/icon/icon_cfygq@2x.png" alt="" />
                    <span>处方已开具，药师审核未通过</span>
                </div>
                <!-- 取消处方 -->
                 <div class="prescriptionCheck_header dis_f Pd-L24 Pd-R24" v-show="prescriptiondata.status == 4">
                    <h1>处方申请详情</h1>
                    <img src="../../../common/image/icon/icon_cfygq@2x.png" alt="" />
                    <span>已取消申请，处方开具失败</span>
                </div>

                <div class="Mg-T20 prescription">
                    <div class="prescription_msg bg_f">
                        <p class="orderList_tit Color_black Pd-T20 Pd-B20 Pd-L24 Pd-R24 Ft-S16 ">需求单信息</p>
                        <ul>
                            <li><span>处方需求单号</span><span>{{ prescriptiondata.number }}</span></li>
                            <li><span>处方申请时间</span><span>{{ prescriptiondata.creatime,'YYYY-MM-DD HH:mm' | moment }}</span></li>
                            <li><span>药店留言</span><span>{{ prescriptiondata.shop_word }}</span></li>
                        </ul>
                    </div>
                    
                <div class="prescription_box Mg-T24  bg_f" ref='prescription_box' id='html'>
                    <p class="orderList_tit Color_black Pd-T20 Pd-B20 Pd-L24 Pd-R24 Ft-S16 ">患者信息</p>
                    <div class="prescription_content">
                        
                        <div class="usermsg">
                            <ul >
                                <li>
                                    <label>患者姓名</label><span>{{ prescriptiondata.name }}</span>
                                </li>
                                <li>
                                    <label>患者性别</label><span v-text="prescriptiondata.sex == 1? '女': '男'"></span>
                                </li>
                                <li>
                                    <label>患者年龄</label><span>{{ prescriptiondata.age }}</span>
                                </li>
                                <li>
                                    <label>患者电话</label><span>{{ prescriptiondata.phone }}</span>
                                </li>
                            
                                <li>
                                    <label>肝功能</label><span v-text='prescriptiondata.liver'></span>
                                </li>
                                <li>
                                    <label>肾功能</label><span>{{ prescriptiondata.kidney }}</span>
                                </li>
                                <li>
                                    <label>过敏史</label><span>{{ prescriptiondata.allergy }}</span>
                                </li>
                                <li>
                                    <label>备孕情况</label><span>{{ prescriptiondata.yun }}</span>
                                </li>
                                <li>
                                    <label>过往病史</label><span>{{ prescriptiondata.ago }}</span>
                                </li>
                            </ul>
                            <ul>
                                <li>
                                    <label>临床诊断</label><span>{{ prescriptiondata.result }}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    </div>

                     <!-- 药品信息  -->
                    <div class="drug Mg-T24 bg_f" v-if='eat.length'>
                            <p class="orderList_tit Color_black Pd-T20 Pd-B20 Pd-L24 Pd-R24 Ft-S16 ">药品信息</p>
                            <ol class="dis_f" >
                                <li v-for='(val,i) in eat' :key='i'>
                                    {{ val.name }} <span>x{{ val.num }}</span>
                                    <span class="yao_yong">用法：<b>{{ val.usage }}</b></span>
                                </li>
                            </ol>
                        </div>
                </div>                  
                

            <!-- 处方开具信息 -->
                <div class="issue_msg bg_f Mg-T24" v-show="prescriptiondata.status == 3">
                    <p class="orderList_tit Color_black Pd-L24 Pd-B20 Ft-S16 ">处方开具信息 <span class='pointer'>查看原始处方</span></p>
                    <ul>
                        <li>
                            处方编号<span>{{ prescriptiondata.order_code }}</span>
                        </li>
                        <li>
                            开具医生<span>{{ prescriptiondata.doc_name }}</span>
                        </li>
                        <li>
                            开具时间<span>{{ prescriptiondata.start_time | moment }}</span>
                        </li>
                        <li>
                            处方失效时间<span>{{ prescriptiondata.undue_time | moment }}</span>
                        </li>
                    </ul>
                    <div>
                        <span>临床诊断</span>
                        <p>{{ prescriptiondata.result }}</p>
                    </div>
                    <ul v-if='prescriptiondata.flag == 1'>
                        <li>
                            审核药师<span>{{ prescriptiondata.flag_name }}</span>
                        </li>
                        <li>
                            审核时间<span>{{ prescriptiondata.flag_time | moment }}</span>
                        </li>
                        <p style="margin-left:5px;">
                            <span>审核说明</span>
                            <span v-text='prescriptiondata.flag_text == null?"无信息":prescriptiondata.flag_text'></span>
                        </p>
                    </ul>
                </div>

                <!-- 申请医生信息 -->
                <div class="doc_msg" v-if="rob.length">
                    <p class="Pd-B24 Pd-T20 Pd-L24 Color_black Ft-S16">申请医生信息</p>
                    <ul>
                        <li v-for='itm in rob' :key='itm.id'>
                            <span>{{ itm.true_name }}：</span>
                            <span>
                                <span v-text='itm.status == 1?"未接单":itm.status == 2?"已接单":itm.status == 3?"拒绝接单":itm.status == 4?"处方开具超时":"已开具"'></span>
                                <span v-if='itm.status == 3'>(原因：{{ itm.remark }})</span>
                                <span v-if='itm.status == 2'> 处方开具中{{ itm.creatime | downMoment }}</span>
                            </span>
                        </li>
                    </ul>
                </div>

                <!-- 审核未通过原因 -->
                <div class="defeated bg_f Mg-T20" v-if='prescriptiondata.flag == 2' >
                    <p class="orderList_tit Color_black Ft-S16 Pd-T20 Pd-B20 Pd-L24">审核未通过原因</p>
                    <div class="Pd-L24 Pd-T24 " v-text='prescriptiondata.flag_text == null ? "无信息":prescriptiondata.flag_text'></div>
                </div>
                <div class="prescription_btn">
                    <button class="layui-btn layui-btn-normal" style='width: 100px;'  @click='go("/server/YaoprescriptionListPic/YaoprescriptionList")'>返回</button>
                    <button v-show="prescriptiondata.status == 1" class="layui-btn Return_btn" @click='initdata'>取消申请</button>
                    <button v-show="prescriptiondata.status == 3 && prescriptiondata.flag == 0" class="layui-btn Return_btn" @click='yaoAudit'>药师审核</button>
                </div>
        </div>
        <!-- 取消审核 -->
        <div id="sendgoods" class="hide">
            <h2>服务提示</h2>
            <div>
                <p>取消申请后，医生将无法开具处方</p>
                <p>处方费用将退回鲁医通账户</p>
                <p>是否确认操作？</p>
            </div>
            <p class="clear">
                <span><button class="layui-btn cancel" @click='cancel(2)'>取消</button></span>
                <span><button class="layui-btn layui-btn-normal" @click="cancel(1)">确认</button></span>
            </p>
        </div> 
        <!-- 取消提示 -->
        <div id="sendgood" class="hide">
            <h2>服务提示</h2>
            <div>
                <p>{{server_msg}}</p>
                <p>{{server_msg2}}</p>
            </div>
            <p class="clears">
                <button class="layui-btn layui-btn-normal" @click="cancel(2)">好的</button>
            </p>
        </div> 
    </div>
</template>
<script>
export default {
    name: 'prescriptionCheck',
    data() {
        return {
            prescriptiondata: {},   // 处方数据
            num: '',                // 
            doctorId: '',           // 获取id
            server_msg: '系统已为您再次提醒医生',         // 取消提示语
            server_msg2:'处方申请15分钟后，才可取消申请',         // 取消提示语2
            eat: {},                // 药品信息
            rob: {},                // 申请医生信息
            downTime: '',           // 计时时间
            times: '',              // 定时器
        }
    },
    mounted() {
        this.doctorId = this.$route.query.id
        var user = this.localstorage.get('logindata')
        this.num = user.number
        this.datadetail()
    },
    methods: {
        datadetail () {
            var self = this;
            self.$http.post('/shv2/recipetwo/recipe_look', this.$route.query, function (res) {
                console.log(res)
                if (res.code == 1) {
                    self.prescriptiondata = res.data.data
                    self.eat = res.data.eat
                    self.rob = res.data.rob
                    if (res.data.data.status == 1) {
                        // self.countDown(res.data.data.creatime)
                        self.countDown(1561110380)
                    }
                }
            }, function (err) { console.log(err)})
        },
        initdata() {    // 取消审核弹框
            var self = this;
            this.cencel_shade()
        //    layui.use(["layer"], function () {
        //         var layer = layui.layer;
        //         var $ = layui.jquery;
        //         layer.open({
        //             type: 1,
        //             shade: 0.4,
        //             shadeClose: true,
        //             closeBtn: 0,
        //             title: "",
        //             content: $("#sendgoods"),
        //             area: ["400px", "280px"],
        //         });
        //     });
        },
        countDown (time) {  // 倒计时
            var _this = this;
            var startTime = time
           _this.times = setInterval(() => {
                function oddo (mm) {
                    if (mm < 10) {
                        mm = '0' + mm
                    }
                    return mm
                }
                var endTime = Math.round((Date.now())/1000);
                var moments = endTime - startTime;
                var m = parseInt(moments % 60);
                var f = parseInt(moments / 60%60)
                var h = parseInt(moments / 3600%24)
                _this.downTime = oddo(h)+':'+oddo(f)+':'+oddo(m)
            }, 1000)
             
        },
        cancel (num) { //  取消审核或者确认取消
            if (num == 2) {
                layui.use(["layer"], function () {
                var layer = layui.layer;
                    layer.closeAll('page')
                })
                return;
            }
            var _this = this;
            
            layui.use('layer', function(){
            var layer = layui.layer;
            // _this.$http.post('/shv2/recipe/recipe_teacher', { id: _this.doctorId, flag: num }, function (res) {  // 审核接口
            //     console.log(res)
            //     if (res.code == 1) {
            //         layer.closeAll('page');
            //         layer.msg('审核成功', {icon:1})
            //         _this.datadetail()
            //     } else if (res.code == 3) {
            //         layer.closeAll('page');
            //         layer.msg('审核成功', {icon:1})
            //         _this.datadetail()
            //     } else {
            //         layer.closeAll('page');
            //         layer.msg('审核失败', { icon: 2})
            //     }
            // }, function (err) { console.log(err)})
                
            }); 
        },
        cencel_shade () {
            layui.use(["layer"], function () {
                var layer = layui.layer;
                var $ = layui.jquery;
                layer.open({
                    type: 1,
                    shade: 0.4,
                    shadeClose: true,
                    closeBtn:0,
                    title: "",
                    content: $("#sendgood"),
                    area: ["400px", "280px"],
                });
            });
        },
        yaoAudit () {  // 药师审核

        }
      
    },
    beforeDestroy () {
        if (this.times) {
            clearInterval(this.times)
        }
    }
}
</script>

<style scoped lang="less">
#prescriptionCheck {
    padding-bottom: 20px;
    background-color: #F1F2F9;
    .orderList_tit {
        border-bottom: 1px solid #F1F2F9;
    }
    .layui-table[lay-even] tr:nth-child(even) {
        background-color: #e5f0ff;
    }
    .tab_content {

      .prescriptionCheck_head {
            color: #3196FF;
            padding: 12px 0;
            border: 1px solid #3196FF;
            background-color: #E0E9F8;
            h1 {
                font-size: 16px;
                margin-right: 36px;
                font-weight: 540;
            }
            img {
                height: 24px;
                vertical-align: middle;
            }
            span {
                margin-top:2px;
                margin-left: 5px;
                vertical-align: middle;
                b {
                    font-weight:normal;
                }
            }
            
        }

        .prescriptionCheck_header {
            color: #F09F88;
            padding: 12px 0;
            border: 1px solid #F09F88;
            background-color: #F1EAED;
            h1 {
                font-size: 16px;
                margin-right: 36px;
                font-weight: 540;
            }
            img {
                height: 24px;
                vertical-align: middle;
            }
            span {
                margin-top:2px;
                margin-left: 5px;
                vertical-align: middle;
                b {
                    font-weight:normal;
                }
            }
        }

        .layui-tab-content {
            padding-left: 1px;
            padding-right: 1px;
            .layui-table {
                outline: 1px solid rgba(221, 221, 221, 1);
                text-align: center;
                .table_headtr {
                    height: 50px;
                    background: #dae9ff;
                    td {
                        font-size: 16px;
                    }
                }
                tbody {
                    td {
                        height: 40px;
                        font-size: 14px;
                        color: #666;
                        p {
                            line-height: 30px;
                        }
                        .doctor {
                            ul {
                                li {
                                    line-height: 25px;
                                }
                            }
                        }
                    }
                }
            }
        }

        .prescription {
            width:100%;
            .prescription_msg {
               
               > ul {
                   padding: 24px;
                   overflow: hidden;
                    li {
                        float: left;
                        width: 33.3%;
                        color: #666;
                        span:last-child {
                            margin-left: 24px;
                            color: #333;
                        }
                    }
                    li:last-child {
                       span {
                           display: inline-block;
                           vertical-align: top;
                       }
                        span:last-child {
                            width: 75%;
                        }
                        
                    }   
                }
            }
            
            .prescription_box {
                
                .come {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    img {
                        width: 100%;
                    }
                }
            .prescription_content {
               
                .usermsg {
                     padding: 24px;
                    >ul {
                        overflow: hidden;
                        li {
                            float: left;
                            padding: 12px 0;
                            width: 33.3%;
                            font-size: 14px;
                            font-weight: 540;
                            color: #666;
                            label {
                                width: 80px;
                                display: inline-block;
                                text-align: right;
                            }
                            span {
                                margin-left: 20px;
                                color: #333;
                            }
                        }
                    }
                    ul:last-child {
                        padding: 0;
                    }
                }
                
               
            }
        }


        .drug {
            >ol {
                padding: 0 24px;
                >li {
                    color: #666;
                    font-size: 14px;
                    line-height: 50px;
                    margin-right: 30px;
                    font-weight: 540;
                    font-size: 15px;
                    >span {
                        margin-left: 100px;
                    }
                    
                    .yao_yong {
                        >b {
                            font-weight: 500;
                        }
                    }   
                }
            }
        }

        }

        .issue_msg {
            padding: 24px 0;
            >p {
                border-bottom: 1px solid #F1F2F9;
                span {
                    font-size: 12px;
                    color: #3196FF;
                    margin-left: 12px;
                }
            }
            ul {
                padding: 12px 24px 0;
                overflow: hidden;
                li {
                    color: #666;
                    float: left;
                    padding: 12px 0;
                    width: 50%;
                    span {
                        margin-left: 24px;
                        color: #333;
                    }
                }
                >p {
                    color: #666;
                    span:last-child {
                        color: #333;
                        margin-left: 20px;
                    }
                }
            }
            > div {
                padding: 0 24px;
                margin-top: 12px;
                display: flex;
                margin-left: 5px;
                color: #666;
                span {
                    display: inline-block;
                    width: 80px;
                }
                p {
                    color: #333;
                    width: 90%;
                    display: inline-block;
                    line-height: 20px;

                }
            }
        }

        .doc_msg {
            margin-top: 24px;
            background-color: #fff;
            > p {
                
                border-bottom: 1px solid #F1F2F9;
            }
            ul {
                padding: 20px 24px;
                li {
                    padding-left: 24px;
                    height: 40px;
                    line-height: 40px;
                    color: #666;
                    span:last-child {
                        margin-left: 1px;
                        color: #333;
                    }
                }
                li:nth-child(odd) {
                    background-color: #F3F3F3;
                }
            }
        }
        .defeated {
            color: #666;
            >p {
                border-bottom: 1px solid #F1F2F9;
            }
            > div {
                padding: 0 24px 24px;
            }
        }
        .prescription_btn {
            text-align: center;
            margin-top: 20px;
            .Return_btn {
                background: #fff;
                border: 1px solid #3196FF;
                color: #3196FF;
                margin-left: 40px;
            }
        }
 
    }


    #sendgoods {
        h2 {
            text-align: center;
            font-size: 18px;
            margin-top: 30px;
        }
        >div {
            text-align: center;
            padding: 20px 0;
            p {
                line-height: 25px;
            }
        }
        .clear {
            margin-top: 20px;
            text-align: center;
            width:100%;
            button {
                width: 100px;
            }
            .cancel {
                background: #fff;
                color:#128DFF;
                border:1px solid #128DFF;
                margin-right: 20px;
            }
        }
    }

    #sendgood {
       padding: 30px;
        h2 {
            text-align: center;
            font-size: 18px;
            margin-top: 30px;
        }
        > div {
            padding: 30px 0;
            p {
                text-align: center;
                line-height: 25px;
            }
        }
        .clears {
            text-align: center;
            button {
                width: 100px;
            }
        }
    }
}
</style>
