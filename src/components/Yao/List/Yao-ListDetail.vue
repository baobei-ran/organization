<template>
    <div id="orderListDetail" style="height:100%">
        <div class="layui-row layui-col-space22 head_msg">
            <div class="layui-col-md8">
                <div class="bg_f" style="border-radius:3px;">
                    <p class="orderList_tit Color_black Ft-S16 Pd-T24 Pd-B24 Pd-L24 Mg-B24">订单详情</p>
                    <div class="layui-row order_datail  Pd-L24 Pd-R24">
                        <div class="layui-col-md6 layui-col-sm6">
                            <table>
                                <tr>
                                    <td>订单编号</td>
                                    <td v-text="detailList.list.number">201923332211222</td>
                                </tr>
                                <tr>
                                    <td>下单时间</td>
                                    <td>{{ detailList.list.addtime | moment }}</td>
                                </tr>
                                <tr>
                                    <td>订单类型</td>
                                    <td>{{ detailList.list.stypename }}</td>
                                </tr>
                                <tr v-show="detailList.list.distribution==1">
                                    <td>下单用户</td>
                                    <td>
                                        <span>{{ detailList.list.uname }}</span>
                                        <span>{{ detailList.list.rphone }}</span>
                                    </td>
                                </tr>
                                <tr v-show="detailList.list.distribution==2">
                                    <td>开具医生</td>
                                    <td>{{ detailList.list.dname }}</td>
                                </tr>
                                <tr>
                                    <td>配送公司</td>
                                    <td v-text="detailList.list.distribution==1?'快递发货':detailList.list.distribution==2?'门店自提':''">快递</td>
                                </tr>
                                 <tr>
                                    <td>支付方式</td>
                                    <td v-text="detailList.list.type==1?'支付宝':detailList.list.type==2?'微信': detailList.list.type==3?'银行卡':detailList.list.type==4?'鲁医通':'待付款'">微信支付</td>
                                </tr>
                            </table>
                        </div>
                        <div class="layui-col-md6 layui-col-sm6" v-show="detailList.list.distribution==2">
                            <table>
                                <tr>
                                    <td width="80px">处方编号</td>
                                    <td>
                                        <span>{{ detailList.list.durnumber }}</span>
                                        <span v-show="detailList.list.reid" @click='lookoverCf(detailList.list.reid)' class="Color_blue Ft-S12 pointer Mg-L10">查看原始处方 <img src="../../../common/image/icon/icon_ck.png" alt="" /></span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>下单用户</td>
                                    <td v-text="detailList.list.uname">张三</td>
                                </tr>
                            </table>
                        </div>
                        <div class="layui-col-md6 layui-col-sm6" v-show="detailList.list.distribution==1">
                            <table>
                                <tr>
                                    <td width="60px">收货人</td>
                                    <td v-text="detailList.list.rname">琳娜</td>
                                </tr>
                                <tr>
                                    <td>电话</td>
                                    <td v-text="detailList.list.rphone">122****4221</td>
                                </tr>
                                <tr>
                                    <td>收货地址</td>
                                    <td v-text="detailList.list.raddress">北京市丰台区三环新城6号院8号楼2单元192</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="layui-col-md4 head_right">
                <div class="bg_f Pd-L24" style="border-radius:3px;">
                    <p class="orderList_tit Color_black Ft-S16 Pd-T24 Pd-B24 Mg-B24">订单状态</p>
                    <!--1、 快递发货 -->
                    <div class="order_logistics"  v-show="detailList.list.distribution==1" >

                        <div class="Pd-L24 Pd-R24 Pd-B24 logistics" v-show="detailList.list.status == 4" >
                            <p class="Color_blue Ft-S18 Pd-B12">已发货</p>
                            <div class="Mg-T24 order_logistics2">
                                <ul class="layui-timeline">
                                    <li class="layui-timeline-item" v-for="ar in 2">
                                        <i class="layui-timeline-axis"></i>
                                        <div class="layui-timeline-content layui-text" style="position:relative;top:-18px">
                                            <p class="Color_black Ft-S14 Overflow1">山东济南天桥集散中心-已发往-山东济南转运中心</p>
                                            <time class="Color_gray6 Ft-S12">2018-12-15 20:00:08</time>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div class="Pd-B24 logistics1" v-show="detailList.list.status == 2 || detailList.list.status == 3">
                            <ul>
                                <li><b class="Color_red">*</b>快递公司：<el-input  v-model="commpany" style="width: 200px;" ></el-input></li>
                                <li class="Mg-T24">
                                    <b class="Color_red">*</b>快递单号：<el-input v-model="logistics_number" style="width: 200px;" ></el-input>
                                    <button class="btn1 pointer fr Mg-R24" @click="sendup">发货</button>
                                </li>
                                <li v-show="isTxt" class="Color_red Ft-S12" style="padding-left: 75px;margin-top: 10px;" >请填写快递公司/快递单号</li>
                            </ul>
                            <p class="ar Mg-T24">
                                <button class="btn3 pointer" @click="dialogVisible = true">修改收货地址</button>
                            </p>
                        </div>
                        <div class="logistics1" v-show="detailList.list.status == 1">
                            <div class="Color_blue Ft-S18 Pd-B24">订单未支付</div>
                        </div>
                        <div class="logistics1" v-show="detailList.list.status == 5">
                            <div class="Color_blue Ft-S18 Pd-B24">交易成功</div>
                        </div>
                        <div class="logistics1" v-show="detailList.list.status == 6">
                            <div class="Color_blue Ft-S18 Pd-B24">订单关闭</div>
                            <p class="Mg-T24">
                                {{ detailList.list.quit_type }}
                            </p>
                        </div>
                    </div>

                    <!-- 2、 自提核销 -->
                    <div class="order_logistics"  v-show="detailList.list.distribution==2">
                        <div v-show="detailList.list.status == 1">
                            <div class="Color_blue Ft-S18 Pd-B24">订单未支付</div>
                        </div>
                        <div class="logistics_del" v-show="detailList.list.status == 2 || detailList.list.status == 3">
                            <p class="Color_blue Ft-S16">买家已付款，待核销（等待用户自取）</p>
                            <p class="Mg-T24">
                                <span>核销码：</span>
                                <el-input class="input_text" v-model="user_code" ></el-input>
                                <el-button size='mini' @click='delCode' type="primary">核销</el-button>
                            </p>
                            <p v-show='false' style="margin-top: 10px;font-size: 12px;" class="Mg-L60 Color_red">患者处方未审核！<br />请前往“服务—患者处方审核”模块中，审核处方</p>
                        </div>
                        <div class="Pd-B24" v-show="detailList.list.status == 6">
                            <p class="Color_blue Ft-S18 Pd-B24">订单关闭</p>
                            <p class="Mg-B20 Ft-S14"><span class="Color_gray6" v-text='detailList.list.quit_type'>处方审核拒绝，订单已退款！</span></p>
                        </div>
                        <div class="Pd-B24" v-show="detailList.list.status == 5">
                            <p class="Color_blue Ft-S18 Pd-B24">订单已完成</p>
                            <p class="Mg-B20 Ft-S14"><span class="Color_gray6">自提码：</span><span class="Color_black">{{ detailList.express?detailList.express.code:'' }}</span></p>
                            <p class="Ft-S14" style="margin-bottom:86px"><span class="Color_gray6">自提码已核销</span></p>
                        </div>                        
                    </div>

                </div>
            </div>
        </div>
        <div class="tab_content">
            <div class="layui-tab Pd-T24">
                <div class="layui-tab-content Pd-T24 Pd-B24 Pd-L24 Pd-R24 bg_f">
                    <table class="layui-table" lay-skin="nob">
                        <thead>
                            <tr class="Color_black table_headtr ac">
                                <td>商品编码</td>
                                <td>商品名称</td>
                                <td>厂家</td>
                                <td>单价</td>
                                <td>数量</td>
                                <td>总价</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="ac" v-for='(val, i) in detailList.data' :key='i'>
                                <td>
                                    {{ val.gnumber }}
                                </td>
                                <td>
                                    <img style="width: 40px; height: 40px;" :src="val.img?$http.baseURL+val.img:''" alt=""/>
                                    <span>{{ val.name }}</span>
                                </td>
                                <td>
                                    {{ val.cj }}
                                </td>
                                <td>¥{{ val.money }}</td>
                                <td>x{{ val.num }}</td>
                                <td>¥<span>{{ (val.money*val.num) | zjTotal }}</span></td>
                            </tr>
                        </tbody>
                        <tbody v-show="!detailList.data.length">
                            <tr class="ac">
                                <td colspan="6">无数据</td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="ar Mg-T24">
                        <p class="Mg-B24 Color_gray6 Ft-S14"><span class="Mg-R30">商品总计：¥{{detailList.total}}</span>
                            <span class="Mg-R30">运费：¥{{detailList.freight}}</span>
                            <span class="Mg-R30">优惠：¥{{detailList.discounts}}</span>
                            <span>订单总额：¥{{detailList.pay_money}}</span></p>
                        <p><span class="Ft-S14">实付款：</span><span class="Ft-S14 Color_blue Fw700">¥</span><span class="Fw700 Ft-S24 Color_blue">{{detailList.pay_money}}</span></p>
                    </div>

                </div>
            </div>
        </div>
        <div class="orderlog bg_f Pd-L24 Pd-R24 Mg-T24">
            <p class="orderList_tit Color_black Ft-S16 Pd-T24 Pd-B24 Pd-L24 Mg-B24">订单日志</p>
            <table class="layui-table ac" lay-even lay-skin="nob">
                <thead>
                    <tr>
                        <th class="ac">操作人</th>
                        <th class="ac">操作</th>
                        <th class="ac">时间</th>
                        <th class="ac">备注</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="val in detailList.order_log">
                        <td v-text="val.name">188****9979</td>
                        <td v-text="val.status==1?'待付款': val.status==2?'已付款':val.status==3?'未发货':val.status== 4?'已发货': val.status==5?'交易成功':val.status== 6?'交易关闭':''">已评价</td>
                        <td>{{val.addtime|moment}}</td>
                        <td v-text="val.remarks?val.remarks:'无'">无</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <p class="ac Mg-T24 goback" @click="go('/jgmall/List')"><button class="pointer">返回</button></p>
        

        <el-dialog title="修改收货地址" :visible.sync="dialogVisible"  width="560px" >
            <div id="exitaddress" >
                <table width="100%">
                    <tr>
                        <td class="Color_black Ft-S16" width="90px"><span class="Color_red">*</span>收货人</td>
                        <td><input type="text" v-model="sname" /> </td> </tr> <tr>
                        <td class="Color_black Ft-S16"><span class="Color_red">*</span>电话</td>
                        <td><input type="text" v-model="sphone"></td>
                    </tr>
                    <tr>
                        <td class="Ft-S16 Color_black"><span class="Color_red">*</span>所在区域</td>
                        <td>
                            <el-select style="width: 120px;" @change='city($event)' v-model="provinceVal" placeholder="请选择">
                                <el-option
                                v-for="item in provinceList"
                                :key="item.aid"
                                :label="item.aname"
                                :value="item.aid+','+item.aname">
                                </el-option>
                            </el-select>
                            <el-select style="width: 120px;" @change="area($event)" v-model="cityVal"  placeholder="请选择">
                                <el-option
                                v-for="item in cityList"
                                :key="item.aid"
                                :label="item.aname"
                                :value="item.aid+','+item.aname">
                                </el-option>
                            </el-select>
                            <el-select  style="width: 120px;" v-model='areaVal'  placeholder="请选择">
                                <el-option
                                v-for="item in areaList"
                                :key="item.aid"
                                :label="item.aname"
                                :value="item.aid+','+item.aname">
                                </el-option>
                            </el-select>
                        </td>
                    </tr>
                    <tr>
                        <td class="Color_black Ft-S16">
                            <div><span class="Color_red">*</span>详细地址</div>
                        </td>
                        <td><textarea style="" v-model="saddress"></textarea></td>
                    </tr>
                </table>
                <p class="clear Mg-T24">
                    <span class="fl"><button @click='dialogVisible = false' class="cancel pointer">取消</button></span>
                    <span class="fr"><button @click='ClickSubmit' class="send pointer">提交</button></span>
                </p>
            </div>
        </el-dialog>

        <!-- 处方缩略图 -->
        <el-dialog
            title=""
            :visible.sync="iscfPic"
            width="660px"
            :before-close="handleClose">
                <v-cf v-if="iscfPic" :id="id" :isReject='isReject' />
        </el-dialog>
        
    </div>
</template>
<script>
var Cfdetails = () => import('../recipes/childrenRecipe');
export default {
    name: 'yaolistDetail',
    components: {
        'v-cf': Cfdetails
    },
    data() {
        return {
            dialogVisible: false,
            detailList: {
                data: [{
                    number: "",
                    money: "",
                    num: 1,
                    name: ""
                }],
                total: "",
                freight: "",
                discounts: "",
                pay_money: "",
                list: {
                    number: "",
                    status: 6,
                    type: null,
                    distribution: 1,
                    addtime: 1546070514,
                    order_code: "",
                    remarks: "",
                    uname: null,
                    rname: null,
                    rphone: null,
                    raddress: null
                },
                express: {
                    company: null,
                    logistics_number: null
                },
                order_log: {
                    name: "",
                    status: 1,
                    addtime: 1546070514,
                    remarks: ""
                }
            },
            commpany: '',
            logistics_number: '',
            sname: '',
            sphone: '',
            saddress: '',
            user_code: '',          // 核销码
            user_number: this.$route.query.number,  //  订单号
            provinceList: [],                       // 省
            cityList: [],                           // 市
            areaList: [],                           // 区
            provinceVal: '',                        // 选择的省
            cityVal: '',                            // 选择的市
            areaVal: '',                            // 选择的区
            isTxt: false,                           // 核销提示
            id: 0,          
            iscfPic: false,
            isReject: Number(0),
        }
    },
    mounted() {
        this.initdata();
        this.province()
    },
    methods: {
        initdata() {
            var _this = this;
            _this.$http.post('/shv2/goodsorder/detail', { number: this.user_number }, function (res) {//
                console.log(res)
                if (res.code == 1) {
                    _this.detailList = res;
                }
            }, function (err) { console.log(err) });
        },
        sendup() {//订单发货
            var _this = this;
            if (!_this.commpany) {
                _this.$message({
                    type: 'error',
                    message: '请填写快递公司'
                });
                _this.isTxt = true
                return;
            }
            if (!_this.logistics_number) {
                _this.$message({
                    type: 'error',
                    message: '请填写快递单号'
                });
                _this.isTxt = true
                return;
            }
            _this.isTxt = false
            _this.$http.post('/shv2/goodsorder/order_delivery', { number: _this.user_number, company: _this.commpany, logistics_number: _this.logistics_number }, function (res) {
                if (res.code == 1) {
                    _this.$message({
                        type: 'success',
                        message: res.msg
                    });
                    _this.initdata()
                } else {
                    _this.$message({
                        type: 'error',
                        message: res.msg
                    });
                }
            }, function (err) { console.log(err) });
        },
        delCode () {    // 核销自提码
            var _this = this;
            if (!this.user_code) {
                this.$message({
                    type: 'error',
                    message: '请输入核销码'
                });
            }
            this.$http.post('/shv2/goodsorder/code_check_submit', { number:this.user_number, code: this.user_code }, function (res) {
                console.log(res)
                if (res.code == 1) {
                    _this.$message({
                        type: 'success',
                        message: '核销成功'
                    });
                    _this.initdata()
                } else {
                    _this.$message({
                        type: 'error',
                        message: res.msg
                    });
                }
            }, function (err) { console.log(err) })
        },
        cancelShade () {     // 取消关闭弹框
            layui.use('layer', function(){
                var layer = layui.layer;
                layer.closeAll();
            }); 
        },
        ClickSubmit () {    // 修改收货地址
            var _this = this;
            var isphone = /^1(3|4|5|6|7|8|9)\d{9}$/;//手机号验证
            layui.use('layer', function(){
                var layer = layui.layer;
                if (!_this.sname) {
                    layer.msg('请输入收货人', { icon: 2 })
                    return;
                }
                if (!isphone.test(_this.sphone)) {
                    layer.msg('请输入正确收货人电话', { icon: 2 })
                    return;
                }
                if (!_this.provinceVal) {
                    layer.msg('请选择省份', { icon: 2 })
                    return;
                }
                if (!_this.cityVal) {
                    layer.msg('请选择城市', { icon: 2 })
                    return;
                }
                if (!_this.areaVal) {
                    layer.msg('请选择区/县', { icon: 2 })
                    return;
                }
                if (!_this.saddress) {
                    layer.msg('请输入收货人地址', { icon: 2 })
                    return;
                }
                var p = _this.provinceVal.split(',')[1];
                var c = _this.cityVal.split(',')[1];
                var a = _this.areaVal.split(',')[1];
                var str = p+c+a+_this.saddress;
                var obj = { number: _this.user_number, order_code: _this.detailList.list.order_code, name: _this.sname, phone: _this.sphone, address: str };
                console.log(obj)
                _this.$http.post('/shv2/goodsorder/change_address', obj, function (res) {
                    console.log(res)
                    if (res.code == 1) {
                        _this.dialogVisible = false
                        layer.msg('修改成功', { icon: 1 })
                        _this.initdata()
                    } else {
                        layer.msg(res.msg, { icon: 2 })
                    }
                }, function (err) {})
            }); 
        },
        // 获取省市区
        province () {
            var _this = this;
            _this.$http.post('/shv2/Setting/area', null, function(res) {
                if (res.code == 1) {
                    _this.provinceList = res.data
                }
            }, function (err) {})
        },
        city (v) {
            v = v.split(',')[0]
            this.cityVal = '';
            this.areaVal = '';
            this.areaList = []
            var _this = this;
            _this.$http.post('/shv2/Setting/area', { fid: v }, function(res) {
                if (res.code == 1) {
                    _this.cityList = res.data
                }
            }, function (err) {})
        },
        area (v) {
            v = v.split(',')[0]
            this.areaVal = '';
            var _this = this;
            _this.$http.post('/shv2/Setting/area', { fid: v }, function(res) {
                if (res.code == 1) {
                    _this.areaList = res.data
                }
            }, function (err) {})
        },
        lookoverCf(id) {   // 查看处方
            console.log(id)
            if (!id) {
                this.$message.error('处方id不存在，无法进行查看')
                return;
            }
            this.id = Number(id)
            this.iscfPic = true
        },
        handleClose () {
            this.iscfPic = false
        },
    },
    filters: {
        zjTotal: function (val) {
            if (!val) {
                return;
            }
            val = Number(val).toFixed(2);
            return val
        }
    }
}
</script>

<style scoped lang="less">
#orderListDetail {
    background-color: #F1F2F9;
    .orderList_tit {
        border-bottom: 1px solid #e6e6e6;
    }
    .head_msg {
        .head_right {
            ::-webkit-scrollbar {
                width: 4px;
                background-color: #fff;
            }

            ::-webkit-scrollbar-track {
                border-radius: 4px;
                background-color: #fff;
            }

            ::-webkit-scrollbar-thumb {
                border-radius: 4px;
                -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
                box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
                background-color: #e6e6e6;
            }
            .order_logistics {
                height: 245px;
                overflow-y: auto;
                padding-top: 14px;
                .layui-timeline-axis {
                    width: 10px;
                    height: 10px;
                    background: #e6e6e6;
                    color: #e6e6e6;
                    left: 0px;
                    top: 0px;
                }
                .logistics_del {
                    .input_text {
                        width: 200px;
                    }
                }
            }
            .logistics1 {
                p:first-child {
                    margin-bottom: 144px;
                }
                button {
                    font-size: 14px;
                    margin-right: 12px;
                    border-radius: 4px;
                    border: none;
                }
                .btn1 {
                    background: #3196ff;
                    color: #fff;
                    width: 60px;
                    height: 30px;
                }
                p {
                    button {
                        font-size: 14px;
                        margin-right: 12px;
                        border-radius: 4px;
                        border: none;
                    }
                    .btn1 {
                        background: #3196ff;
                        color: #fff;
                        width: 60px;
                        height: 30px;
                    }
                    .btn2 {
                        background: #3196ff;
                        color: #fff;
                        width: 120px;
                        height: 30px;
                    }
                    .btn3 {
                        background: #fff;
                        color: #3196ff;
                        border: 1px solid #3196ff;
                        padding: 6px 12px;
                    }
                }
            }
            
            @media (max-width: 1350px) {
                .logistics1 {
                    p:first-child {
                        margin-bottom: 44px;
                    }
                    button {
                        width: 80% !important;
                        position: relative;
                        left: -10% !important;
                        margin-right: 0px !important;
                        margin-bottom: 20px;
                    }
                    button:last-child {
                        margin-bottom: 0px;
                    }
                }
            }
        }
    }
    .order_datail {
        padding-bottom: 12px;
        table {
            margin-top: 12px;
            tr {
                height: 37px;
                td {
                    font-size: 14px;
                }
                td:first-child {
                    color: #666;
                    text-align: right;
                }
                td:last-child {
                    color: #333;
                    padding-left: 30px;
                }
            }
        }
    }
    .tab_content {
        .layui-tab-content {
            padding-left: 1px;
            padding-right: 1px;
            .layui-table {
                .table_headtr {
                    height: 50px;
                    background: #dae9ff;
                    td {
                        font-size: 16px;
                    }
                }
                tbody {
                    border-bottom: 1px solid #E6E6E6;
                    tr {
                        td {
                            padding: 24px 0;
                        }
                    }
                }
            }
        }
    }
    .orderlog {
        padding-bottom: 36px;
        table {
            .layui-table tbody tr:hover,
            .layui-table[lay-even] tr:nth-child(even) {
                background-color: #eee;
            }
            thead {
                tr {
                    background: #e6e6e6;
                }
            }
            th {
                text-align: center !important;
                color: #333;
                font-size: 16px;
                padding-top: 10px;
                padding-bottom: 10px;
            }
            td {
                font-size: 14px;
                padding-top: 10px;
                padding-bottom: 10px;
            }
        }
    }
    .goback {
        margin-bottom: 98px;
        button {
            width: 100px;
            height: 36px;
            background: rgba(49, 150, 255, 1);
            border-radius: 4px;
            border: none;
            font-size: 16px;
            color: #fff;
        }
    }
}

#exitaddress {
   width: 100%;
   padding-left: 12px;
    table {
        tr:last-child {
            height: 164px;
            td {
                div {
                    margin-top: -70px;
                }
            }
        }
        tr {
            height: 64px;
            td {
                textarea {
                    width: 340px;
                    height: 140px;
                    border: 1px solid #c2c2c3;
                    resize: none;
                    padding: 10px;
                    border-radius: 4px;
                }
                input {
                    width: 340px;
                    height: 40px;
                    padding-left: 10px;
                    border-radius: 3px;
                }
                input,
                input:hover,
                input:focus {
                    border: 1px solid #c2c3c3;
                }
                select {
                    width: 120px;
                    height: 40px;
                    border-radius: 4px;
                    border: 1px solid #c2c3c3;
                }
            }
        }
    }
    button {
        width: 120px;
        height: 40px;
        border-radius: 4px;
        border: none;
        font-size: 16px;
    }
    .cancel {
        border: 1px solid #128dff;
        color: #128dff;
        background: #fff;
        margin-left: 58px;
    }
    .send {
        color: #fff;
        background: #128dff;
        margin-right: 58px;
    }
}

</style>
