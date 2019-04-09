<template>
    <div id="prescriptionCheck">
        <div class="tab_content">
                <div class="layui-tab-content bg_f Pd-L24 Pd-R24">
                    <table class="layui-table" lay-skin="nob" lay-even>
                        <thead>
                            <tr class="Color_black table_headtr ac">
                                <td>处方订单号</td>
                                <td>处方单申请时间</td>
                                <td>处方单状态</td>
                                <td>发送医生</td>
                                <td>处方单编号</td>
                            </tr>
                        </thead>
                        <tbody >
                            <tr>
                                <td>csjh1229299999999</td>
                                <td>2019-09-02 11:00:00</td>
                                <td>未接单</td>
                                <td>
                                    <p>李一一 未接单</p>
                                    <p>李二二 未接单</p>
                                    <p>李三三 未接单</p>
                                    <p>李四四 未接单</p>
                                    <p>李五五 未接单</p>
                                </td>
                                <td>CDFS22333333333</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="Mg-T20 bg_f prescription">
                    <div class="orderList_tit dis_f dis_sb Pd-T20 Pd-B20 Pd-L24 Pd-R24 flex-vc">
                        <p class="Color_black Ft-S16 ">处方样式</p>
                        <div>
                            <button class="layui-btn layui-btn-normal">在线浏览打印</button>
                            <button class="layui-btn layui-btn-normal">下载处方单</button>
                        </div>
                    </div>
                    <!-- 处方单 -->
                <div class="prescription_box" ref='prescription_box'>
                    <div class="prescription_content">
                        <ul class="dis_f msg_title">
                            <li>
                                药店机构编码：<span>01122210</span>
                            </li>
                            <li>
                                处方编号：<span>——</span>
                            </li>
                            <li>
                                处方有效期：<span>——</span>
                            </li>
                        </ul>
                        <h1>云医康互联网药店电子处方</h1>
                        <div class="usermsg">
                            <ul class="dis_f">
                                <li>
                                    姓名：<span>李小小</span>
                                </li>
                                <li>
                                    性别：<span>女</span>
                                </li>
                                <li>
                                    年龄：<span>21岁</span>
                                </li>
                                <li>
                                    联系电话：<span>123****3322</span>
                                </li>
                            </ul>
                            <ul class="dis_f">
                                <li>
                                    肝功能：<span>正常</span>
                                </li>
                                <li>
                                    肾功能：<span>正常</span>
                                </li>
                                <li>
                                    过敏史：<span>无</span>
                                </li>
                                <li>
                                    备孕情况：<span>无</span>
                                </li>
                            </ul>
                            <ul>
                                <li>
                                    过往病史：<span>无</span>
                                </li>
                            </ul>
                            <ul>
                                <li>
                                    临床诊断：<span>过敏性结膜炎</span>
                                </li>
                            </ul>
                        </div>
                        <div class="drug">
                            <p class="rp">Rp : </p>
                            <ol class="dis_f">
                                <li>阿莫西林胶囊15mg*2板*盒 <span>X2</span></li>
                                <li>
                                    用法：<b>口服 每次1片 每日3片</b>
                                </li>
                            </ol>
                            <ol class="dis_f">
                                <li>阿莫西林胶囊15mg*2板*盒 <span>X2</span></li>
                                <li>
                                    用法：<b>口服 每次1片 每日3片</b>
                                </li>
                            </ol>
                            <ol class="dis_f">
                                <li>阿莫西林胶囊15mg*2板*盒 <span>X2</span></li>
                                <li>
                                    用法：<b>口服 每次1片 每日3片</b>
                                </li>
                            </ol>
                        </div>
                        <div class="message">
                            （以下空白，手写无效）
                        </div>
                        <div class="signature">
                            <ul class="dis_f flex-vc">
                                <li>
                                    处方医师：<img src="../../../common/image/pages/login/img_jgbg@2x.png" alt="">
                                </li>
                                <li>
                                    审核药师：<img src="" alt="">
                                </li>
                            </ul>
                        </div>
                        <div class="message_foot">
                            药师提示：1、请遵医嘱服药；2、请在窗口点清药品；3、发出药品不予退换
                        </div>
                    </div>
                    </div>
                </div>

                <!-- 审核未通过原因 -->
                <div class="defeated bg_f Mg-T20">
                    <p class="orderList_tit Color_black Ft-S16 Pd-T20 Pd-B20 Pd-L24">审核未通过原因</p>
                    <ul>
                        <li>李一一：<span>药量过大，且与实际病情不符，不建议服用此类药品。建议重新评估病人病情及用药。</span></li>
                        <li>李二二：<span>药量过大，且与实际病情不符，不建议服用此类药品。</span></li>
                        <li>李一一：<span>药量过大，且与实际病情不符，不建议服用此类药品。建议重新评估病人病情及用药。</span></li>
                        <li>李二二：<span>药量过大，且与实际病情不符，不建议服用此类药品。</span></li>
                        <li>李一一：<span>药量过大，且与实际病情不符，不建议服用此类药品。建议重新评估病人病情及用药。</span></li>
                        <li>李二二：<span>药量过大，且与实际病情不符，不建议服用此类药品。</span></li>
                        <li>李一一：<span>药量过大，且与实际病情不符，不建议服用此类药品。建议重新评估病人病情及用药。</span></li>
                        <li>李二二：<span>药量过大，且与实际病情不符，不建议服用此类药品。</span></li>
                    </ul>
                </div>
                <div class="prescription_btn">
                    <button class="layui-btn layui-btn-normal" @click='initdata'>药师审核</button>
                    <button class="layui-btn Return_btn" @click='go("/server/YaoprescriptionList")'>返回</button>
                </div>
        </div>
        <div id="sendgoods" class="hide">
            <div>
                <p>药师审核后不可更改，是否确认</p>
                <p>审核并添加药师电子签名？</p>
            </div>
            <p class="clear">
                <span><button class="layui-btn cancel" @click='cancel'>审核拒绝</button></span>
                <span><button class="layui-btn layui-btn-normal" @click="sendup">审核通过</button></span>
            </p>
        </div> 
    </div>
</template>
<script>
export default {
    name: 'prescriptionCheck',
    data() {
        return {
            
        }
    },
    mounted() {
       console.log(this.$route)
       this.datadetail()
    },
    methods: {
        datadetail () {
            let self = this;
            self.$http.post('/shv2/recipe/recipe_look', this.$route.query, function (res) {
                console.log(res)
            }, function (err) {})
        },
        initdata() {    // 审核调取弹框
            var self = this;
           layui.use(["layer"], function () {
                var layer = layui.layer;
                var $ = layui.jquery;
                layer.open({
                    type: 1,
                    shade: 0.4,
                    shadeClose: true,
                    closeBtn: 1,
                    title: "审核",
                    content: $("#sendgoods"),
                    area: ["400px", "300px"],
                    cancel: function () { }
                });
                $(".layui-layer-title").css({
                    height: "50px",
                    background: "#ECF2FB",
                    "line-height": "50px",
                    fontSize: '18px'
                });
                $(".layui-layer-setwin").css("top", "19px");
            });
        },
        sendup () {     // 审核通过

        },
        cancel () { // 审核拒绝
            layui.use('layer', function(){
            var layer = layui.layer;
                layer.closeAll();
            }); 
        }
      
    }
}
</script>

<style scoped lang="less">
#prescriptionCheck {
    .layui-table[lay-even] tr:nth-child(even) {
        background-color: #e5f0ff;
    }
    .tab_content {
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
                    }
                }
            }
        }

        .prescription {
            width:100%;
            .orderList_tit {
                border-bottom: 1px solid #F1F2F9;
            }
            .prescription_box {
                padding: 20px;
            .prescription_content {
                padding: 30px 50px;
                border:1px solid #C2C2C3;
                .msg_title {
                    li {
                        width: 30%;
                    }
                }
                h1 {
                    padding: 30px 0;
                    text-align: center;
                    font-size: 18px;
                    color: #333;
                    font-weight: 550;
                    letter-spacing:5px;
                }
                .usermsg {
                    border-bottom: 1px solid #666;
                    >ul {
                        padding-bottom: 24px;
                        li {
                            width: 22%;
                            font-size: 14px;
                            font-weight: 520;
                        }
                    }
                }
                .drug {
                    
                    .rp {
                        font-weight: 550;
                       padding: 24px 0;
                    }
                    >ol {
                        padding: 0 50px;
                        >li {
                            width: 30%;
                            line-height: 50px;
                            >span {
                                margin-left: 30px;
                            }
                            >b {
                                font-weight: 500;
                            }
                        }
                    }
                }
                .message {
                    text-align: center;
                    margin-top: 60px;
                    margin-bottom: 12px;
                    font-size: 12px;
                }
                .signature {
                    > ul {
                        li {
                            width: 50%;
                            >img {
                                max-width: 100px;
                            }
                        }
                    }
                }
                .message_foot {
                    margin-top: 20px;
                }
            }
        }

        }

        .defeated {
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
        >div {
            text-align: center;
            padding: 50px 0;
            p {
                line-height: 30px;
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
