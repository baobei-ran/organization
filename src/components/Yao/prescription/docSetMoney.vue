<template>
    <!-- 开通处方 -->
    <div class="perscription Pd-B40">
        
        <div class="perscription_msg bg_f" >
            <h2 :class="{'h2-title':!tilteMsg }"><span class="pointer" @click='btnServeMsg'>服务说明</span></h2>
            <transition name='fade'>
                <div class="perscription_title" v-show='tilteMsg'>
                    <div class="perscription_msg_box" >
                        <div>
                            <p>医生将为患者推荐药店药品，其中包括处方用药及建议用药。</p>
                            <p>建议用药： 医生将根据患者症状，推荐药品清单，患者支付后，将前往药店取药。<br/>
                                处方用药： 医生将根据患者病情，开具电子处方，处方中选择药店的药品，药店药师需在  “服务-患者处方审核”  模块中审核处方，患者购买后将前往药店取药。</p>
                            <p>
                                为激励医生推荐本店药品，药店可为医生设定佣金，在患者的购买订单完结（核销自提码）后，将佣金金额转入医生账户，佣金比例由药店自行设定。佣金比例，及药店药品种类是否丰富，将影响医生选择药店的合作意向。
                            </p>
                        </div>
                        <span class="show_btn pointer" @click='btnServeMsg'><img src="../../../common/image/icon/icon_sq.png" alt=""></span>
                    </div>
                </div>
             </transition>
        </div>

        <!-- 设置 -->
    <div class="prescription_box" >
        <div class="file_download Mg-T24 bg_f">
            <p class="Color_black Ft-S16 Pd-T24 Pd-B24 Pd-L24">请选择返佣类型</p>
            <div class="content_box Pd-L24 Pd-R24 Mg-T20">
                <ul class="radio">
                    <li>
                        <el-radio v-model="moneyType" label="1"><span>订单满额返佣 <i style="color: #666;font-size: 14px;">（设定返佣比例，根据患者支付的订单金额，为医生返佣）</i></span> </el-radio>
                    </li>
                    <li>
                        <el-radio v-model="moneyType" label="2">药品类型返佣 <span style="color: #666;font-size: 14px;">（根据处方药与非处方药，设定返佣比例）</span></el-radio>
                    </li>
                </ul>
                <div class="setMoney Mg-T20" v-show="moneyType == 1">
                    <p>订单满额返佣</p>
                    <div class="setMoney-input">
                        <dl>
                            <dt>
                                <span class="Mg-R24">订单最低金额设定</span>
                                <span v-show='isSetting' class='number'>{{ moneyVal }}</span>
                                <input v-show='isNotSetting' class="money-number" type='text' :change="check_price()" maxLength='11' style="width: 200px;" v-model="moneyVal" /> 元
                                <b>（低于此金额，医生推荐的药品订单将不会产生佣金）</b>
                            </dt>
                            <dd>
                                <span v-show="!isSetting && moneyVal > 199.99" class="Color_red Ft-S12">设定金额过高，将不利于医生推荐药品，请合理设定</span>
                            </dd>
                        </dl>
                        <dl class="Mg-T24">
                            <dt>
                                <span class="Mg-R24"><i class="Color_red">*</i>返佣比例设定</span>
                                <span v-show='isSetting' class='number'>{{ moneyRatio }}</span>
                                <el-input v-show='isNotSetting' type='number' style="width: 200px;" v-model="moneyRatio" ></el-input> %
                                <b>（患者支付的订单金额*返佣比例=医生所得佣金）</b>
                            </dt>
                            <dd>
                                <span v-show="!isSetting && moneyRatio > 0 && (moneyRatio < 1 || moneyRatio > 100)" class="Color_red Ft-S12">返佣比例，不可低于1%，也不可超过100%</span>
                            </dd>
                        </dl>
                    </div>
                </div>
                <div class="drugMoney" v-show="moneyType == 2" >
                    <p>药品类型返佣</p>
                    <div class="setMoney-input">
                        <dl>
                            <dt>
                                <span class="Mg-R24">处方药返佣比例</span>
                                <span v-show='isSetting' class='number'>{{ drug_rx }}</span>
                                <el-input v-show='isNotSetting' type='number' style="width: 200px;" v-model="drug_rx" ></el-input> %
                            </dt>
                            <dd>
                                <span v-show="drug_rx > 0 && ( drug_rx <1 || drug_rx >100 )" class="Color_red Ft-S12">返佣比例，不可低于1%，也不可超过100%</span>
                            </dd>
                        </dl>
                        <dl class="Mg-T24">
                            <dt>
                                <span class="Mg-R24">非处方药返佣比例</span>
                                <span v-show='isSetting' class='number'>{{ drug_otc }}</span>
                                <el-input v-show='isNotSetting' type='number' style="width: 200px;" v-model="drug_otc" ></el-input> %
                            </dt>
                            <dd>
                                <span v-show="drug_otc > 0 && (drug_otc<1 || drug_otc>100)" class="Color_red Ft-S12">返佣比例，不可低于1%，也不可超过100%</span>
                            </dd>
                        </dl>
                    </div>
                </div>
                <div class="white"></div>
            </div>
        </div>

        <div class="btns" v-show='isBtn'>
            <el-button class="border_blue" @click='handleCancel' plain>取消</el-button>
            <button class="layui-btn layui-btn-normal" @click='clickShowShade' >保存</button>
        </div>
        <div class="btns" v-show='isBtnReset'>
            <el-button class="border_blue" @click='go("/server/Yaodoctorprescription")' plain>返回</el-button>
            <button class="layui-btn layui-btn-normal" @click='handleClickReset' >修改</button>
        </div>
    </div>
        
        <!-- 弹框 -->
        <el-dialog  title="" :visible.sync="dialogVisible"  width="500px" >
            <div class="shade-box">
                <div class="shade-title">
                    <h2 class="Ft-S16">订单满额返佣示例</h2>
                    <p class="Mg-T24 Ft-S14">医生为患者推荐药店药品，患者支付的订单金额超过100元，将为医生返佣；
                        若患者支付订单金额为2000元，将为医生返佣<i class="Color_red">2000*5%=100元</i>
                    </p>
                </div>
                <div class="ac shade-msg Ft-S18">
                    是否确认保存？
                </div>
                <div class="shade-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" :loading="isdisabled" @click="submit">确 定</el-button>
                </div>
            </div>
        </el-dialog>
        
        <!-- 弹框2 -->
        <el-dialog  title="" :visible.sync="drugView"  width="500px" >
            <div class="shade-box">
                <div class="shade-title">
                    <h2 class="Ft-S16">药品类型返佣示例</h2>
                    <p class="Mg-T24 Ft-S14">医生为患者推荐药店药品，若患者支付的订单金额为200元</p>
                    <p class="Ft-S14">其中处方药品金额为100元，将为医生返佣<i class="Color_red">100*5%=5元</i></p>
                    <p class="Ft-S14">其中非处方药品金额为100元，将为医生返佣<i class="Color_red">100*10%=10元</i></p>
                    <p class="Mg-T24 Ft-S14">此订单为医生返佣金额为<i class="Color_red">5+10=15元</i></p>
                </div>
                <div class="ac shade-msg Ft-S18">
                    是否确认保存？
                </div>
                <div class="shade-footer">
                    <el-button class="btn-blue" @click="drugView = false">取 消</el-button>
                    <el-button type="primary" :loading="isdisabled" @click="submit">确 定</el-button>
                </div>
            </div>
        </el-dialog>
       
    </div>
</template>
<script>
export default {
        data () {
            return {
                isNotSetting: false,     // 未设定展示
                isSetting: false,        // 已设定展示
                dialogVisible: false,
                drugView: false,
                tilteMsg: true,
                moneyType: '1',         // 根据这个字段区分选择的设置
                moneyVal: '',
                moneyRatio: '',
                drug_rx: '',
                drug_otc: '',
                isdisabled: false,      // 按钮loading
                isBtn: false,
                isBtnReset: false,      // 
                is_type: 0,
            }
        },
        created () {
            var _this = this;
            this.$http.post('/shv2/Reward/reward_flag', null, function (res) {
                console.log(res)
                if (res.code == 1) {    // 已设置
                    _this.isNotSetting = false;
                    _this.isBtn = false;
                    _this.isSetting = true;
                    _this.isBtnReset = true;
                    _this.getSettingMoneyInfo()
                } else {    // 未设置
                    _this.isSetting = false;
                    _this.isBtnReset = false;
                    _this.isBtn = true;
                    _this.isNotSetting = true;
                }
            }, function (err) {
                _this.$message.error('服务器错误，获取数据失败');
            })
        },
        methods: {
            getSettingMoneyInfo () {
                var _this = this;
                _this.$http.post('/shv2/Reward/reward_look', null, function (response) {
                    console.log(response)
                    if (response.code == 1) {
                        _this.moneyVal = response.data.full_money?response.data.full_money:0 ;
                        _this.moneyRatio = response.data.full_ratio?response.data.full_ratio:0;
                        _this.drug_rx = response.data.drug_rx?response.data.drug_rx:0;
                        _this.drug_otc = response.data.drug_otc?response.data.drug_otc:0;
                    } else { }
                }, function (err) { console.log(err) })
            },
            handleClickReset () {   // 修改按钮切换
                this.isSetting = false;
                this.isNotSetting = true;
                this.isBtn = true;
                this.isBtnReset = false;
                this.is_type = 1;
            },
            handleCancel () {
                if (this.is_type) {
                    this.isSetting = true;
                    this.isNotSetting = false;
                    this.isBtn = false;
                    this.isBtnReset = true;
                } else {
                    this.go("/server/Yaodoctorprescription")
                }
            },
            check_price: function(){ // 限制价格只能输入数字,且最多两个小数
                var price = '' + this.moneyVal;
                price = price
                    .replace(/[^\d.]/g, '')
                    .replace(/\.{2,}/g, '.') 
                    .replace('.', '$#$')
                    .replace(/\./g, '')
                    .replace('$#$', '.')
                    .replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
                if (price.indexOf('.') < 0 && price != '') {
                    price = parseFloat(price);
                }
                this.moneyVal = price;
            },
            cancels () {     // 取消关闭弹框
                layui.use('layer', function(){
                    var layer = layui.layer;
                    layer.closeAll();
                }); 
            },
            btnServeMsg () {
                this.tilteMsg = !this.tilteMsg
            },
            clickShowShade () {
                var _this = this;
                if (_this.moneyType == 1) {
                    if (!_this.moneyRatio) {
                        _this.$message({
                            type: 'error',
                             message: '请输入返佣比例设定',
                        })
                    } else if (_this.moneyRatio < 1 || _this.moneyRatio > 100) {
                        _this.$message({
                            type: 'error',
                             message: '返佣比例，不可低于1%，也不可超过100%',
                        })
                    } else {
                        this.dialogVisible = true
                    }
                } else {
                    if (!_this.drug_rx) {
                        _this.$message({
                            type: 'error',
                             message: '请输入处方药返佣比例',
                        })
                    } else if (_this.drug_rx < 1 || _this.drug_rx > 100) {
                        _this.$message({
                            type: 'error',
                             message: '返佣比例，不可低于1%，也不可超过100%',
                        })
                    } else if (!_this.drug_otc) {
                        _this.$message({
                            type: 'error',
                             message: '请输入非处方药返佣比例',
                        })
                    } else if (_this.drug_otc < 1 || _this.drug_otc > 100) {
                        _this.$message({
                            type: 'error',
                             message: '返佣比例，不可低于1%，也不可超过100%',
                        })
                    } else {
                        this.drugView = true
                    }
                }
            },
            submit () {
                var _this = this, obj;
                // obj = { type: this.moneyType, full_money: this.moneyVal, full_ratio: this.moneyRatio, drug_rx: this.drug_rx, drug_otc: this.drug_otc }
                if (this.moneyType == 1) {
                    obj = { type: this.moneyType, full_money: this.moneyVal, full_ratio: this.moneyRatio }
                } else {
                    obj = { type: this.moneyType, drug_rx: this.drug_rx, drug_otc: this.drug_otc }
                }
                this.isdisabled = true
                layui.use('layer', function(){
                    var layer = layui.layer;
                    console.log(obj)
                    if (_this.is_type) {
                        _this.$http.post('/shv2/Reward/reward_edit', obj, function (res) {
                            console.log(res)
                            _this.isdisabled = false
                            if (res.code == 1) {
                                if (_this.moneyType == 1) {
                                    _this.dialogVisible = false
                                } else {
                                    _this.drugView = false
                                }
                                layer.msg('设置成功', {icon: 1})
                                var t =setTimeout(() => {
                                    _this.$router.back()
                                    clearTimeout(t)
                                }, 1500)
                            } else {
                                layer.msg(res.msg, {icon: 2})
                            }
                        }, function (err){ 
                            layer.msg('服务器错误，无法设置', {icon: 2})
                        })
                    } else {
                        _this.$http.post('/shv2/Reward/reward_set', obj, function (res) {
                            console.log(res)
                            _this.isdisabled = false
                            if(res.code == 1) {
                                if (_this.moneyType == 1) {
                                    _this.dialogVisible = false
                                } else {
                                    _this.drugView = false
                                }
                                layer.msg('设置成功', {icon: 1})
                                var t =setTimeout(() => {
                                    _this.$router.back()
                                    clearTimeout(t)
                                }, 1500)
                            } else {
                                layer.msg(res.msg, {icon: 2})
                            }
                        }, function (err) { })
                    }
                })
            }
           
            
        }
}
</script>
<style lang='less' scoped>
.fade-enter-active, .fade-leave-active {
  transition: transform .5s ease-out;
}

.fade-enter, .fade-leave-to {
    -webkit-transform: translateY(-400px);
    transform: translateY(-400px);
}
.perscription {
    height: 100%;
    overflow: auto;
    background-color: #F1F2F9;
    .perscription_msg {
        padding:24px;
        min-height: 110px;
        -webkit-border-radius:6px;
        border-radius:6px;
        position: relative;
        
         > h2 {
            position: absolute;
            top: 24px;
            left: 24px;
            font-size: 16px;
            color: #333;
            font-weight:500;
            padding: 20px 26px;
            display: inline;
            span {
                padding-left: 34px;
                background: url('../../../common/image/icon/icon_fwsm.png') no-repeat left center;
            }
            
        }
        .h2-title {
            -webkit-border-radius: 8px;
            border-radius: 8px;
            border: 1px dashed #DDD;
        }
        .perscription_title {
            border: 1px dashed #DDD;
            -webkit-border-radius: 8px;
            border-radius: 8px;
       
        .perscription_msg_box {
            margin-top: 60px;
            position: relative;
            padding: 0 24px 20px;
            > div {
               > h2 {
                    font-size: 16px;
                    color: #333;
                    font-weight:500;
                    padding: 20px 0;
                    padding-left: 34px;
                    background: url('../../../common/image/icon/icon_fwsm.png') no-repeat left center;
                }
                p {
                    color: #666;
                    line-height: 20px;
                    margin-top: 20px;
                }
            }
            .show_btn {
                position: absolute;
                right: 0;
                bottom: 0;
            }
        }
    }
    }



    .prescription_box {
        .file_download  {
            >p {
                border-bottom: 1px solid #F1F2F9;
            }
            .content_box {
                .radio {
                    li {
                        margin: 24px 0;
                    }
                }
                .setMoney {
                    padding: 24px;
                    background-color: #F6F6F6;
                    > p {
                        font-weight:bold;
                    }
                    .setMoney-input {
                        padding: 24px 24px 0;
                        dl {
                            width: 100%;
                            dt {
                                .money-number {
                                    width: 200px;
                                    height: 36px;
                                    border:1px solid #dcdfe6;
                                    padding: 0 15px;
                                }
                                span {
                                    display: inline-block;
                                    width: 120px;
                                    text-align: right;
                                }
                                .number {
                                    width: auto;
                                }
                                b {
                                    color: #808080;
                                    font-size: 13px;
                                }
                            }
                            dd {
                                margin-top: 10px;
                                height: 20px;
                                margin-left: 145px;
                            }
                        }
                    }
                }
                .drugMoney {
                    padding: 24px;
                    background-color: #F6F6F6;
                    > p {
                        font-weight: bold;
                    }
                    .setMoney-input {
                        padding: 24px 24px 0;
                        dl {
                            width: 100%;
                            dt {
                                span {
                                    display: inline-block;
                                    width: 120px;
                                    text-align: right;
                                }
                                .number {
                                    width: auto;
                                }
                            }
                            dd {
                                margin-top: 10px;
                                height: 20px;
                                margin-left: 145px;
                            }
                        }
                    }
                }
                .white {
                    height: 120px;
                }
            }
        }
    }
    .btns {
        margin-top: 24px;
        text-align: center;
        button {
            vertical-align: middle;
            margin: 0 24px;
            width: 120px;
        }
        .border_blue {
            border-color: #3196FF;
            color: #3196FF;
        }
    }

    .shade-box {
        .shade-title {
            background-color: #FAFAFA;
            padding: 20px 24px;
            border: 1px dashed #AAAAAA;
            -webkit-border-radius:3px;
            border-radius:3px;
            p {
                line-height: 25px;
            }
        }
        .shade-msg {
            padding: 40px 0;
            color: #333;
        }
        .shade-footer {
            text-align: center;
            button {
                width: 100px;
            }
            .btn-blue {
                border-color: #3196FF;
                color:#3196FF;
            }
        }
    }
}


</style>


