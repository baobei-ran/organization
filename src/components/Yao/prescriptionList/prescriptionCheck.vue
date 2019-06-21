<template>
    <div id="prescriptionCheck">
        <div class="tab_content">
                <div class="prescriptionCheck_head dis_f Pd-L24 Pd-R24">
                    <h1>处方申请详情</h1>
                    <img src="../../../common/image/icon/icon_ddsh@2x.png" alt="">
                    <span>等待开具中 <b>01:26</b></span>
                </div>
                <div class="prescriptionCheck_head dis_f Pd-L24 Pd-R24">
                    <h1>处方申请详情</h1>
                    <img src="../../../common/image/icon/icon_ddsh@2x.png" alt="">
                    <span>处方已开具，等待药师审核</span>
                </div>
                <div class="prescriptionCheck_head dis_f Pd-L24 Pd-R24">
                    <h1>处方申请详情</h1>
                    <img src="../../../common/image/icon/icon_cfykj@2x.png" alt="">
                    <span>处方已开具，药师已审核</span>
                </div>
                <!-- 处方过期 -->
                 <div class="prescriptionCheck_header dis_f Pd-L24 Pd-R24">
                    <h1>处方申请详情</h1>
                    <img src="../../../common/image/icon/icon_cfygq@2x.png" alt="">
                    <span>处方已开具，处方已过期</span>
                </div>

                 <!-- 处方审核未通过 -->
                 <div class="prescriptionCheck_header dis_f Pd-L24 Pd-R24">
                    <h1>处方申请详情</h1>
                    <img src="../../../common/image/icon/icon_cfygq@2x.png" alt="">
                    <span>处方已开具，药师审核未通过</span>
                </div>
                <!-- 取消处方 -->
                 <div class="prescriptionCheck_header dis_f Pd-L24 Pd-R24">
                    <h1>处方申请详情</h1>
                    <img src="../../../common/image/icon/icon_cfygq@2x.png" alt="">
                    <span>已取消申请，处方开具失败</span>
                </div>

                <div class="Mg-T20 prescription">
                    <div class="prescription_msg bg_f">
                        <p class="orderList_tit Color_black Pd-T20 Pd-B20 Pd-L24 Pd-R24 Ft-S16 ">需求单信息</p>
                        <ul>
                            <li><span>处方需求单号</span><span>23132748937492379</span></li>
                            <li><span>处方申请时间</span><span>2018-09-09 12：00</span></li>
                            <li><span>药店留言</span><span>患者信息真实，请尽快开具，患者信息真实，请尽快开具患者信息真实，请尽快开具</span></li>
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
                                    临床诊断<span>{{ prescriptiondata.result }}</span>
                                </li>
                            </ul>
                        </div>
                        <p style="height:24px; background-color: #f1f2f9;"></p>
                        <div class="drug">
                            <p class="orderList_tit Color_black Pd-T20 Pd-B20 Pd-L24 Pd-R24 Ft-S16 ">药品信息</p>
                            <ol class="dis_f" >
                                <li v-for='(val,i) in prescriptiondata.recipe_eat' :key='i'>
                                    {{ val.name }} <span>x{{ val.num }}</span>
                                    <span class="yao_yong">用法：<b>{{ val.usage }}</b></span>
                                </li>
                            </ol>
                        </div>
                        
                        
                    </div>
                       
                    </div>



                </div>

            <!-- 处方开具信息 -->
                <div class="issue_msg bg_f Mg-T24">
                    <p class="orderList_tit Color_black Pd-L24 Pd-B20 Ft-S16 ">处方开具信息 <span class='pointer'>查看原始处方</span></p>
                    <ul>
                        <li>
                            处方编号<span>62783682639797</span>
                        </li>
                        <li>
                            开具医生<span>李楠楠</span>
                        </li>
                        <li>
                            开具时间<span>2018-09-09 09:00</span>
                        </li>
                        <li>
                            处方失效时间<span>2019-01-01 12:00</span>
                        </li>
                    </ul>
                    <div>
                        <span>临床诊断</span>
                        <p>就收到货是的是的红色经典红色经典圣诞节斯柯达祭祀的精髓倒计时肯定就是市地税局的三季度刷卡金多斯拉克京东数科倒计时肯定就是倒计时了倒计时了肯德基是来得及深刻的紧身裤的紧身裤</p>
                    </div>
                    <ul v-if='true'>
                        <li>
                            审核药师<span>李潇潇</span>
                        </li>
                        <li>
                            审核时间<span>2019-01-01 12:00</span>
                        </li>
                        <p>
                            <span>审核说明</span>
                            <span>药品使用方法有误，应为外用，不可口服。药品使用方法有误，应为外用</span>
                        </p>
                    </ul>
                </div>

                <!-- 申请医生信息 -->
                <div class="doc_msg">
                    <p class="Pd-B24 Pd-T20 Pd-L24 Color_black Ft-S16">申请医生信息</p>
                    <ul>
                        <li><span>就是：</span><span>刷机大师</span></li>
                        <li><span>搜索：</span><span>受持读诵的导出</span></li>
                        <li><span>无时无刻：</span><span>菜市场</span></li>
                        <li><span>大厦：</span><span>的从事</span></li>
                    </ul>
                </div>

                <!-- 审核未通过原因 -->
                <div class="defeated bg_f Mg-T20" >
                    <p class="orderList_tit Color_black Ft-S16 Pd-T20 Pd-B20 Pd-L24">审核未通过原因</p>
                    <div class="Pd-L24 Pd-T24 ">无信息</div>
                    <ul >
                        <li v-for="(val,i) in prescriptiondata.doc_remark" :key='i'>{{val.name}}:<span>{{ val.remark }}</span></li>
                    </ul>
                </div>
                <div class="prescription_btn">
                    <button class="layui-btn layui-btn-normal" style='width: 100px;'  @click='go("/server/YaoprescriptionListPic/YaoprescriptionList")'>返回</button>
                    <button class="layui-btn Return_btn" @click='initdata'>取消申请</button>
                    <button class="layui-btn Return_btn" @click='initdata'>药师审核</button>
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
            prescriptiondata: {},   // 数据
            num: '',                // 
            doctorId: '',           // 获取id
            server_msg: '系统已为您再次提醒医生',         // 取消提示语
            server_msg2:'处方申请15分钟后，才可取消申请',         // 取消提示语2
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
            self.$http.post('/shv2/recipe/recipe_look', this.$route.query, function (res) {
                console.log(res)
                if (res.code == 1) {
                    self.prescriptiondata = res.data
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
                        margin-left: 20px;
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
            >ul {
                padding: 20px 24px;
                li {
                    line-height: 35px;
                    padding-left: 20px;
                    color: #333;
                    font-size: 13px;
                    span {
                        color: #666;
                    }
                }
                li:nth-child(odd) {
                    background-color: #EEEEEE;
                }
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
