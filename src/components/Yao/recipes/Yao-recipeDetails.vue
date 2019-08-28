<template>
<!-- 处方详情页 -->
    <div id="prescriptionCheck">
        <div class="tab_content">
            <!-- 1、待审核,已审核 -->
                <div class="prescriptionCheck_head dis_f Pd-L24 Pd-R24" v-show='isStatus'>
                    <h1>处方详情</h1>
                    <img src="../../../common/image/icon/icon_ddsh@2x.png" alt="" />
                    <span>
                        {{ recipeMsg }}
                        <b v-show="prescriptiondata.order_status == 5">（患者已支付）</b>
                    </span>
                </div>
                <!-- 2、 orange -->
                 <div class="prescriptionCheck_header dis_f Pd-L24 Pd-R24" v-show="isStatusErr" >
                    <h1>处方详情</h1>
                    <img src="../../../common/image/icon/icon_cfygq@2x.png" alt="" />
                    <span>
                        {{ recipeMsg }}
                        <b v-show="prescriptiondata.order_status == 5">（患者已支付）</b>
                    </span>
                </div>
                              
                <div class="Mg-T20 prescription">
                    <div class="prescription_msg bg_f">
                        <p class="orderList_tit Color_black Pd-T20 Pd-B20 Pd-L24 Pd-R24 Ft-S16 ">处方单信息 <span class="check-min-pic" @click='isView = true'>查看处方缩略图 <img src="../../../common/image/icon/icon_ck.png" alt="" /></span> </p>
                        <div>
                            <ul>
                                <li><span>处方单编号</span><span>{{ prescriptiondata.number }}</span></li>
                                <li><span>处方生成时间</span><span>{{ prescriptiondata.start_time | moment }}</span></li>
                                <li><span>处方失效时间</span><span >{{ prescriptiondata.undue_time | moment }}</span></li>
                            </ul>
                            <ul>
                                <li><span>开具医生</span><span>{{ prescriptiondata.true_name }}
                                    <img v-show="prescriptiondata.state == 2" src='../../../common/image/icon/bq_hzz.png' alt='' />
                                    </span></li>
                                <li><span>医院</span><span>{{ prescriptiondata.hospital_name }}</span></li>
                                <li><span>商品订单编号</span><span class="tag-read" :data-clipboard-text='prescriptiondata.order_code'>{{ prescriptiondata.order_code }} <img v-show="prescriptiondata.order_code" data-clipboard-target=".tag-read"  style="width: 20px;" class="pointer" @mouseenter="copy"  @click='copy' src="../../../common/image/icon/icon_copy@2x.png" alt="" /></span></li>
                            </ul>
                        </div>
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
                                    <label>患者性别</label><span v-text="prescriptiondata.sex == 1? '男':'女'"></span>
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
                            <ol>
                                <li>
                                    <label>患者主诉</label><span>{{ prescriptiondata.opinion }}</span>
                                </li>
                            </ol>
                            <ol>
                                <li>
                                    <label>诊断结果</label><span>{{ prescriptiondata.result }}</span>
                                </li>
                            </ol>
                        </div>
                    </div>
                    </div>

                     <!-- 药品信息  -->
                    <div class="drug Mg-T24 bg_f" >
                            <p class="orderList_tit Color_black Pd-T20 Pd-B20 Pd-L24 Pd-R24 Ft-S16 ">药品信息</p>
                            <ol>
                                <li v-for='(val,i) in eat' :key='i' class="dis_f">
                                    <img :src="$http.baseURL+val.img" alt="" />
                                    <dl>
                                        <dt>
                                            <div>
                                                <label>{{ val.name }} <b>（{{ val.gg }}）</b></label>
                                            </div>
                                            <div class="dis_f">
                                                <span>{{ val.company }}</span>
                                                <span v-if='val.money'><i style="font-size: 12px;">¥</i>{{ val.money }}</span>
                                                <span>×{{ val.num }}</span>
                                            </div>
                                        </dt>
                                        <dd><label>用法：</label><span>{{ val.usage }}</span></dd>
                                    </dl>
                                </li>
                            </ol>
                        </div>
                </div>                  
                

                <!-- 审核信息 -->
                <div class="doc_msg ">
                    <p class="Pd-B24 Pd-T20 Pd-L24 Color_black Ft-S16">审核信息</p>
                    <ul v-show="prescriptiondata.drug_autdit == 0">
                         <li>处方未审核</li>
                    </ul>
                    <ul v-show="prescriptiondata.drug_autdit !== 0">
                       
                        <li>
                            <div>
                                <p><label>审核药师</label><span>{{ prescriptiondata.yname }}</span></p>
                                <p><label>审核时间</label><span>{{ prescriptiondata.drug_audit_time | moment }}</span></p>
                            </div>
                        </li>
                        <li>
                            <label>审核结果</label><span v-text='prescriptiondata.drug_autdit == 1? "审核通过": prescriptiondata.drug_autdit == 2? "审核拒绝": ""'></span>
                        </li>
                        <li>
                            <label>审核描述</label><span>{{ prescriptiondata.drug_audit_reason }}</span>
                        </li>
                    </ul>
                </div>
               

                <!-- 底部按钮 -->
                <div class="prescription_btn">
                    <button class="layui-btn layui-btn-normal" style='width: 100px;'  @click='Returns'>返回</button>
                    <button class="layui-btn Return_btn" v-show="prescriptiondata.drug_autdit == 0 && prescriptiondata.p_status == 1" @click='ClickmodelAudit'>处方审核</button>
                </div>
        </div>

        <!-- 处方缩略图 -->
        <el-dialog
            title=""
            :visible.sync="isView"
            width="660px"
            :before-close="handleClose">
                <v-cf v-if="isView" :id="id" :isReject='isReject' />
        </el-dialog>
        <!-- 审核弹框 -->
        <div id="sendgoods_shen" class="hide">
            <h2>药师审核</h2>
            <p>药师审核后不可修改，并添加药师电子签名</p>
            <ul>
                <li>
                    <span>审核结果</span>
                    <el-radio v-model="radioVal" label="1">审核通过</el-radio>
                    <div class="on-msg">
                        <el-radio v-model="radioVal" label="2">审核拒绝</el-radio>
                        <span>（患者已支付订单，处方审核拒绝将自动为患者退款）</span>
                    </div>
                </li>
                <li>
                   <span> 审核说明</span>
                   <textarea v-model='txt' placeholder="请填写审核说明"></textarea>
                </li>
            </ul>
            <p class="clear">
                <span><button class="layui-btn cancel" @click='cancels'>取消</button></span>
                <span>
                    <el-button type="primary" @click="handleClickAudit" :loading="disabled">保存</el-button>
                </span>
            </p>
        </div> 
    </div>
</template>
<script>
import Clipboard from 'clipboard';
var Cfdetails = () => import('./childrenRecipe');
export default {
    name: 'recipeDetails',
    components: {
        'v-cf': Cfdetails
    },
    data() {
        return {
            prescriptiondata: {},   // 处方数据
            num: '',                // 
            doctorId: '',           // 获取id
            eat: [],                // 药品信息
            radioVal: '1',           // 审核的选择
            txt:'',                 // 审核说明
            recipeMsg: '', // 处方状态展示
            isView: false,
            id: Number(this.$route.query.id),     // 传给处方的id
            isReject: Number(0),// 传给处方的 是否审核拒绝的判断
            disabled: false,
            isStatus: false,
            isStatusErr: false
        }
    },
    mounted() {
        this.doctorId = this.$route.query.id
        var user = this.localstorage.get('logindata')
        this.num = user.number
        this.datadetail()
    },
    methods: {
        datadetail () { // 获取详情
            var self = this;
            self.$http.post('/shv2/Patient/patient_prescription_audit_details', { patient_id: this.$route.query.id }, function (res) {
                console.log(res)
                if (res.code == 1) {
                    self.prescriptiondata = res.data[0];
                    self.eat = res.info
                    if (self.prescriptiondata.drug_autdit == 0 && self.prescriptiondata.p_status == 1) {
                        self.recipeMsg = '处方待审核';
                        self.isStatus = true;
                        self.isStatusErr = false;
                    } else if (self.prescriptiondata.drug_autdit == 0 && self.prescriptiondata.p_status == 2) {
                        self.recipeMsg = '处方待审核，处方已过期';
                        self.isStatus = false;
                        self.isStatusErr = true
                    }
                    if (self.prescriptiondata.drug_autdit == 1 && self.prescriptiondata.p_status == 1) {
                        self.recipeMsg = '处方已审核';
                        self.isStatus = true;
                        self.isStatusErr = false;
                    } else if (self.prescriptiondata.drug_autdit == 1 && self.prescriptiondata.p_status == 2) {
                        self.recipeMsg = '处方已过期';
                        self.isStatus = false;
                        self.isStatusErr = true
                    }
                    if (self.prescriptiondata.drug_autdit == 2) {
                        self.recipeMsg = '处方审核拒绝';
                        self.isStatus = false;
                        self.isStatusErr = true
                        self.isReject = 2
                    }
                    
                } else {
                    self.prescriptiondata = {}
                }
            }, function (err) { console.log(err)})
        },
        Returns () {
            this.$router.back();
        },
        ClickmodelAudit () { // 处方审核弹框
            layui.use(["layer"], function () {
                var layer = layui.layer;
                var $ = layui.jquery;
                layer.open({
                    type: 1,
                    shade: 0.4,
                    shadeClose: true,
                    closeBtn: 0,
                    title: "",
                    content: $("#sendgoods_shen"),
                    area: ["520px", "400px"],
                    cancel: function () { }
                });
            });
        },
        handleClose () {
            this.isView = false
        },
        handleClickAudit () {  // 审核结果
            var _this = this;
            this.disabled = true;
            layui.use(["layer"], function () {
                var layer = layui.layer;
                var obj = { patient_id: _this.$route.query.id, audit_type: _this.radioVal,audit_explain: _this.txt }
                console.log(obj)
                _this.$http.post('/shv2/Patient/patient_prescription_audit', obj, function (res) {  // 审核接口
                    console.log(res)
                    _this.disabled = false;
                    if (res.code == 1) {
                        layer.closeAll('page');
                        layer.msg('审核成功', {icon:1})
                        _this.datadetail()
                        _this.txt = ''
                    } else {
                        layer.closeAll('page');
                        layer.msg( res.msg, { icon: 2})
                    }
                }, function (err) { console.log(err)})
            })
        },
        cancels () {     // 审核的 取消关闭弹框
            layui.use('layer', function(){
            var layer = layui.layer;
                layer.closeAll();
            }); 
        },
        copy() {  
            var _this = this;
            var spn = document.getElementsByClassName('tag-read')
            var clipboard = new Clipboard(spn);
            var success;
            clipboard.on('success', e => {  
                _this.$message.success("复制成功");//这里你如果引入了elementui的提示就可以用，没有就注释即可
                  // 释放内存  
                  clipboard.destroy()  
                })  
                clipboard.on('error', e => {  
                  // 不支持复制  
                  _this.$message.error('该浏览器不支持自动复制');
                  // 释放内存  
                  clipboard.destroy()  
                })  
        },
     }
    
}
</script>

<style scoped lang="less">
#prescriptionCheck {
    height: 100%;
    padding-bottom: 20px;
    background-color: #F1F2F9;
    .orderList_tit {
        border-bottom: 1px solid #F1F2F9;
        .check-min-pic {
            font-size: 13px;
            color: #3196FF;
            cursor: pointer;
            margin-left: 24px;
            vertical-align: bottom;
            img {
                width: 13px;
            }
        }
    }
    .layui-table[lay-even] tr:nth-child(even) {
        background-color: #e5f0ff;
    }
    .tab_content {
        background-color: #F1F2F9;
      .prescriptionCheck_head {
            color: #3196FF;
            padding: 12px 0;
            border: 1px solid #3196FF;
            background-color: #E0E9F8;
            h1 {
                font-size: 16px;
                margin-right: 26px;
                font-weight: 540;
            }
            img {
                height: 24px;
                vertical-align: middle;
            }
            span {
                margin-top: 1px;
                vertical-align: middle;
                font-size: 15px;
                b {
                    font-weight:normal;
                    color:#666666;
                    font-size: 14px;
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
                margin-right: 26px;
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
                font-size: 15px;
                b {
                    font-weight:normal;
                    color:#666666;
                    font-size: 14px;
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
               
               > div {
                   padding: 12px 24px;
                  > ul {
                    padding: 12px 0;
                     overflow: hidden;
                        li {
                            float: left;
                            width: 33.3%;
                            color: #666;
                            span:first-child {
                                display: inline-block;
                                width: 120px;
                                text-align: right;
                                padding-right: 24px;
                            }
                            span:last-child {
                                color: #333;
                            }
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
                            width: 33%;
                            font-size: 14px;
                            font-weight: 540;
                            color: #666;
                            label {
                                width: 80px;
                                display: inline-block;
                                text-align: right;
                            }
                            span {
                                display: inline-block;
                                margin-left: 20px;
                                color: #333;
                                width: 60%;
                                vertical-align: top;
                            }
                        }
                    }
                    > ol {
                        margin-top: 24px;
                        li {
                            label {
                                display: inline-block;
                                width: 80px;
                                line-height: 24px;
                            }
                            span {
                                display: inline-block;
                                line-height: 24px;
                                width: 90%;
                                vertical-align: top;
                            }
                        }
                    }
                }
                
               
            }
        }


        .drug {
            >ol {
                width: 100%;
                padding: 0 24px 24px;
                >li {
                    width: 100%;
                    color: #333;
                    height: auto;
                    font-size: 14px;
                    margin-top: 24px;
                    font-weight: 540;
                    font-size: 14px;
                    img {
                        width: 50px;
                        height: 50px;
                    }
                    >span {
                       margin-left: 23px;
                    }
                    dl {
                        margin-left: 24px;
                        dt {
                            div {
                                display: inline-block;
                                span {
                                    margin-left: 24px;
                                }
                            }
                        }
                        dd {
                            margin-top: 9px;
                            color: #666;
                            font-size: 12px;
                            label {
                                line-height: 24px;
                            }
                            span {
                                display: inline-block;
                                width: 90%;
                                line-height: 24px;
                                vertical-align: top;
                            }
                        }
                    }
                }
            }
        }

        }

        
        .doc_msg {
            margin-top: 24px;
            overflow: hidden;
            background-color: #fff;
            > p {
                
                border-bottom: 1px solid #F1F2F9;
            }
            ul {
                padding: 12px 24px;
                li {
                    padding: 12px 0;
                    color: #666;
                    div {
                        > p {
                            display: inline-block;
                            width: 30%;
                            label {
                                display: inline-block;
                                width: 80px;
                            }
                        }
                    }
                    > label {
                        display: inline-block;
                        width: 80px;
                        line-height: 24px;
                    }
                    >span {
                        display: inline-block;
                        width: 90%;
                        vertical-align: top;
                        line-height: 24px;
                    }
                }
            }
        }
       
        .prescription_btn {
            text-align: center;
            margin-top: 20px;
            padding-bottom: 20px;
            .Return_btn {
                background: #fff;
                border: 1px solid #3196FF;
                color: #3196FF;
                margin-left: 40px;
            }
        }
 
    }
     #sendgoods_shen {
     h2 {
         text-align: center;
         padding-top: 25px;
         font-size: 18px;
     }
    
    p {
        text-align: center;
        padding: 10px 0;
        line-height: 30px;
    }
    ul {
        padding: 0 24px;
        li {
            padding: 12px 0;
            .on-msg {
                padding-left: 85px;
                margin-top: 20px;
                line-height: 20px;
                > span {
                    font-size: 12px;
                    color: #FF3C3C;
                }
            }
            span {
                color: #666;
                margin-right: 24px;
                vertical-align: top;
            }

            textarea {
                resize: none;
                width: 350px;
                height: 110px;
                padding: 12px;
                background-color: #F5F5F5;
                border:0;
            }
        }
    }
        .clear {
            text-align: center;
            width:100%;
            .cancel {
                background: #fff;
                color:#128DFF;
                border:1px solid #128DFF;
                margin-right: 20px;
            }
        }
    }

}
</style>
