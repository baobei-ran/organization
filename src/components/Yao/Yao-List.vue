<template>
    <div id="orderList" class="bg_f" style="height:100%">
        <p class="orderList_tit Color_black Ft-S16 Pd-T24 Pd-B24 Pd-L24">订单列表</p>
        <div class="tab_content Pd-L24 Pd-R24">
            <div class="layui-tab">
               
                <div class="layui-tab-content">
                    <div class="screen_type Pd-B24 Mg-T14">
                        <div class="layui-form-item layui-row">
                            <div class="layui-col-md3">
                                <div class="layui-inline lay_width">
                                    <label class="layui-form-label">订单编号</label>
                                    <div class="layui-input-inline">
                                        <input type="text" name="" v-model="list.number" autocomplete="off" class="layui-input" />
                                    </div>
                                </div>
                            </div>
                            <div class="layui-col-md3">
                                <div class="layui-inline lay_width">
                                    <label class="layui-form-label">订单类型</label>
                                    <div class="layui-input-inline">
                                        <el-select v-model="typeValue" placeholder="请选择">
                                            <el-option
                                                v-for="item in options"
                                                :key="item.id"
                                                :label="item.name"
                                                :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </div>
                                </div>
                            </div>
                            <div class="layui-col-md4">
                                <label class="layui-form-label order_label">下单用户姓名</label>
                                <div class="layui-input-inline">
                                    <input type="text" v-model="list.name" autocomplete="off" class="layui-input"/>
                                </div>
                            </div>
                        </div>
                        <div class="layui-form-item selecttime dis_f">
                            <div class="layui-inline">
                                <label class="layui-form-label">订单时间</label>
                                <div class="layui-input-inline" style="width:180px">
                                    <el-date-picker style="width:180px" value-format="yyyy-MM-dd" v-model="list.start_time" type="date" placeholder="选择日期"></el-date-picker>
                                    <!-- <input type="text" name="price_min" v-model="list.start_time" id="date" autocomplete="off" class="layui-input date_icon"> -->
                                </div>
                                <div class="layui-form-mid">-</div>
                                <div class="layui-input-inline" style="width:180px">
                                    <el-date-picker style="width:180px" value-format="yyyy-MM-dd" v-model="list.end_time" type="date" placeholder="选择日期"></el-date-picker>
                                    <!-- <input type="text" name="price_max" v-model="list.end_time" id="date1" autocomplete="off" class="layui-input date_icon"> -->
                                </div>
                            </div>
                            <p class="Mg-L30 Pd-L50">
                                <span class="Ft-S14 selectbtn ac pointer" @click="search">筛选订单</span>
                                <span class="Color_blue pointer Ft-S14 Mg-L24" @click='empty'>清空筛选条件</span>
                            </p>

                        </div>
                       
                    </div>
                     <ul class="layui-tab-title">
                        <li class="layui-this" @click="tab(0)">全部订单（{{headernum.count}}）</li>
                        <li @click="tab(1)">待付款（{{headernum.count1}}）</li>
                        <li @click="tab(8)">待核销（{{headernum.count4}}）</li>
                        <li @click="tab(7)">待发货（{{headernum.count2}}）</li>
                        <li @click="tab(4)">待收货（{{headernum.count3}}）</li>
                        <li @click="tab(5)">已完成（{{headernum.count5}}）</li>
                        <li @click="tab(6)">已关闭（{{headernum.count6}}）</li>
                    </ul>
                    <table class="layui-table" lay-skin="">
                        <thead>
                            <tr class="Color_black table_headtr ac">
                                <td class="firstheadtd">序号</td>
                                <td>订单信息</td>
                                <td>订单类型</td>
                                <td>下单用户</td>
                                <td>收货信息</td>
                                <td>订单状态</td>
                                <td>金额信息</td>
                                <td>操作</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="table_con Color_black" v-for="(val,index) in tableList" :key='index'>
                                <td class="ac" v-text="index+1"></td>
                                <td>
                                    <p>订单编号：<span>{{ val.number }}</span><img :data-clipboard-text='val.number' v-show='val.number' @mouseenter="copy(index)" @click='copy(index)' style="width: 19px;" class="pointer copy_text" src='../../common/image/icon/icon_copy@2x.png' alt='' /></p>
                                    <p class="Mg-T10">下单时间：{{ val.addtime }}</p>
                                </td>
                                <td>
                                    <p v-text='val.order_type == 1?"医生推荐订单":val.order_type == 2?"平台商城订单":""'></p>
                                    <p v-show="val.order_type == 1" class="Mg-T10">推荐医生：{{ val.dname }}</p>
                                </td>
                                <td>
                                    <p>{{ val.uname }}</p>
                                    <p class="Mg-T10">{{ val.uphone }}</p>
                                </td>
                                <td class="ac">
                                    配送方式：<span v-text='val.distribution == 1?"物流发货":val.distribution == 2?"门店自提":""'></span>
                                    <p v-show="val.distribution == 1">收货人：{{ val.rname }}</p>
                                    <p v-show="val.distribution == 1">联系方式：{{ val.rphone }}</p>
                                </td>
                                <td class="ac">
                                    <p>{{ val.pay }}</p>
                                    <p class="Mg-T10">{{ val.express }}</p>
                                    <p class="Mg-T10">{{ val.order }}</p>
                                </td>
                                <td>
                                    <p>总金额：{{ val.money }}</p>
                                    <p class="Mg-T10">支付方式：{{ val.type }}</p>
                                </td>
                                <td>
                                    <p v-show='val.status == 8' class="pointer Ft-S14 Color_blue al" @click="delcode(val.number)">核销自提码</p>
                                    <p v-show="val.rx == 1" class="pointer Ft-S14 Mg-T10 Color_blue al" @click="ClickCfdetail(val.reid)">查看原始处方</p>
                                    <div>
                                        <p class="pointer Ft-S14 Mg-T10 Color_blue al" @click="godetail(val.number)">查看详情</p>
                                        <p v-show='val.status == 7' class="pointer Ft-S14 Mg-T10 Color_blue al" @click="sendgoods(val.number)" >发货</p>
                                    </div>
                                    
                                </td>
                            </tr>
                        </tbody>
                        <tbody v-show="!tableList.length">
                            <tr class="table_con Color_black ac" >
                                <td colspan='8'>暂无数据</td>
                            </tr>
                        </tbody>
                    </table>
                    <div id="page" v-show='tableList.length' class="ac Mg-T30"></div>
                </div>
            </div>
        </div>
        <!-- 发货 -->
        <div id="sendgoods" class="hide shadeStyle">
            <table width="100%">
                <tr>
                    <td class="Color_black Ft-S16" width="90px"><span class="Color_red">*</span>配送公司</td>
                    <td><input type="text" v-model="company" /></td>
                </tr>
                <tr>
                    <td class="Color_black Ft-S16"><span class="Color_red">*</span>物流单号</td>
                    <td><input type="text" v-model="logistics_number" /></td>
                </tr>
            </table>
            <p class="clear">
                <span class="fl"><button class="cancel pointer" @click='cancel'>取消</button></span>
                <span class="fr"><button class="send pointer" @click="sendup">发货</button></span>
            </p>
        </div>
        <!-- 核销 -->
        <div class="hide delcode shadeStyle">
            <table width="100%" class="Mg-T50">
                <tr>
                    <td class="Color_black Ft-S16" width="90px">自提码</td>
                    <td>
                        <input type="text"  v-model="code"/>
                        <!-- <p class="Color_red Ft-S12" style="position:absolute; z-index:100;margin-top:5px"><i class="tan_icon"></i>核销码不存在</p> -->
                    </td>
                </tr>
            </table>
            <p class="clear">
                <span class="fl"><button class="cancel pointer" @click='cancel'>取消</button></span>
                <span class="fr"><button @click='delcodeApi' class="send pointer">确认</button></span>
            </p>
        </div>
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
import Clipboard from 'clipboard';
var Cfdetails = () => import('./recipes/childrenRecipe');
export default {
    name: 'yaoList',
    components: {
        'v-cf': Cfdetails
    },
    data() {
        return {
            tdlast: 0,
            list: {
                status: 0,
                number: '',
                name: '',
                start_time: '',
                end_time: '',
                page: 1,
                limit: 10
            },
            tableList: [],
            headernum: '',
            company: '',
            logistics_number: '',
            number: '',
            typeValue: '全部',  // 订单类型
            options: [{id: '', name: '全部'},{ id: 1, name: '医生推荐订单' }, { id: 2, name: '平台商城订单' }],        // 订单类型列表
            code: '',           // 核销码
            strNumber: '',      // 核销订单号
            page: 1,
            id: 0,          
            iscfPic: false,
            isReject: Number(0),
        }
    },
    activated () {
        this.tab(this.tdlast)
    },
    methods: {
        tab(type) {
            if(this.tdlast !== type) {
                this.page = 1
                this.typeValue = ''
                this.list.number = ''
                this.list.name= ''
                this.list.start_time= ''
                this.list.end_time= ''
            }
            this.tdlast = type;
            this.initdata(type, 1)
        },
        initdata(type, num) {   // 数据
            var _this = this;
            layui.use(["laypage", "layer", "element"], function () {
                var element = layui.element;
                var oDate1 = new Date(_this.list.start_time);
                var oDate2 = new Date(_this.list.end_time);
                if (oDate1.getTime() > oDate2.getTime()) {
                    layer.msg('开始时间不能大于结束时间', { icon: 2 });
                    return
                }
                _this.list.page = _this.page
                _this.list.status = type;
                _this.list.type = _this.typeValue;
                _this.$http.post('/shv2/goodsorder/index', _this.list, function (res) {//
                    console.log(res)
                    _this.headernum = res;
                    if (res.code == 1) {
                        _this.tableList = res.data;
                        if (num == 1) {
                            switch (_this.tdlast) {//分页
                                case 0: _this.pageFun(res.count); break;
                                case 1: _this.pageFun(res.count1); break;
                                case 4: _this.pageFun(res.count3); break;
                                case 5: _this.pageFun(res.count5); break;
                                case 6: _this.pageFun(res.count6); break;
                                case 7: _this.pageFun(res.count2); break;
                                case 8: _this.pageFun(res.count4); break;
                            }
                        }
                    } else {
                        _this.tableList = false;
                        _this.pageFun(0)
                    }
                }, function (err) { console.log(err) });

            });
        },
        pageFun(total) {    // 分页
            var _this = this;
            layui.use(["laypage", "layer", "element"], function () {
                var element = layui.element;
                var laypage = layui.laypage;
                laypage.render({
                    elem: "page", //注意，这里的 test1 是 ID，不用加 # 号
                    count: total, //数据总数，从服务端得到
                    limit: 10, //每页条数
                    curr: _this.page,
                    layout: ["prev", "page", "next", "skip"],
                    groups: 4,
                    jump: function (obj, first) {
                        if (!first) {
                            _this.page = obj.curr;
                            _this.initdata(_this.tdlast, obj.curr)
                        }
                    }
                });
            });
        },
        search() {  // 搜索
            this.initdata(this.tdlast, 1)
        },
        godetail(number) {    // 查看详情
            this.go('/jgmall/List/listDetail?number='+number)
        },
        delcode(int) { // 核销弹框
            this.strNumber = int
            layui.use(["layer"], function () {
                var layer = layui.layer;
                var $ = layui.jquery;
                layer.open({
                    type: 1,
                    shade: 0.2,
                    shadeClose: true,
                    closeBtn: 1,
                    title: "",
                    content: $(".delcode"),
                    area: ["500px", "300px"],
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
        delcodeApi () { // 核销接口
            var _this = this;
            
            layui.use(["layer"], function () {
                var layer = layui.layer;
                if(!_this.code) {
                    layer.msg('请输入自提码', {icon: 2})
                    return;
                }
                _this.$http.post('/shv2/goodsorder/code_check_submit', { number: _this.strNumber,code: _this.code }, function (res) {
                    console.log(res)
                    if (res.code == 1) {
                        layer.closeAll('page')
                        layer.msg('核销成功', {icon: 1})
                    } else {
                        layer.msg(res.msg, {icon: 2})
                    }
                }, function (err ) { console.log (err) })
            })
        },
        sendgoods(num) {    // 发货
            this.number = num;
            layui.use(["layer"], function () {
                var layer = layui.layer;
                var $ = layui.jquery;
                layer.open({
                    type: 1,
                    shade: 0.2,
                    shadeClose: true,
                    closeBtn: 1,
                    title: "订单发货",
                    content: $("#sendgoods"),
                    area: ["560px", "340px"],
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
        sendup() {  // 发货
            var _this=this;
            layui.use(["layer"], function () {
                var layer = layui.layer;
                if (!_this.number) {
                    layer.msg('订单号为空')
                    return;
                }
                if (!_this.company) {
                    layer.msg('请填写物流公司')
                    return;
                }
                if (!_this.logistics_number) {
                    layer.msg('请填写物流单号')
                    return;
                }
                _this.$http.post('/shv2/goodsorder/order_delivery', { number: _this.number, company: _this.company, logistics_number: _this.logistics_number }, function (res) {
                    if(res.code==1){
                        layer.closeAll();
                        layer.msg(res.msg);
                    }
                }, function () {

                });
            })
        },  
        cancel () {     // 取消关闭弹框
            layui.use('layer', function(){
            var layer = layui.layer;
                layer.closeAll();
            }); 
        },
        empty() {   // 清空
            this.typeValue = '';
            this.list.number = '';
            this.list.name= '';
            this.list.start_time= '';
            this.list.end_time= '';
            this.initdata(this.tdlast, 1);
        },
        handleClose () {
            this.iscfPic = false
        },
        ClickCfdetail(id) { // 查看处方
            if (!id) {
                this.$message.error('处方id不存在，无法进行查看')
                return;
            }
            this.id = Number(id)
            this.iscfPic = true
        },
        copy(i) {
            var _this = this;
            var dom = document.getElementsByClassName('copy_text');
            var clipboard = new Clipboard(dom[i]);
            clipboard.on("success", e => {
                _this.$message.success("复制成功");
                // 释放内存
                clipboard.destroy();
            });
            clipboard.on("error", e => {
                // 不支持复制
                _this.$message.error('该浏览器不支持自动复制');
                // 释放内存
                clipboard.destroy();
            });
                
            
        }
    }
}
</script>

<style scoped lang="less">
#orderList {
    .orderList_tit {
        border-bottom: 1px solid #e6e6e6;
    }
    input:hover,
    input:focus {
        border: 1px solid #c2c3c3;
    }
    .screen_type {
        .layui-form-item {
            .lay_width {
                width: 100%;
                .layui-form-label {
                    width: 80px;
                    padding: 7px 10px 7px 0px;
                }
                .layui-input-inline {
                    width: 65%;
                    input {
                        width: 200px;
                        height: 34px;
                    }
                }
            }
            .order_label {
                width: 110px;
                padding-left: 0;
            }
        }
        .selecttime {
            .layui-inline {
                .layui-form-label {
                    padding: 7px 10px 7px 0px;
                }
            }
        }
        .selectbtn {
            display: inline-block;
            color: #fff;
            background: #3196ff;
            width: 100px;
            height: 34px;
            line-height: 34px;
            border: none;
            border-radius: 4px;
        }
    }
    .tab_content {
        .layui-tab {
            .layui-tab-title {
                font-size: 16px;
                color: #666666;
                .layui-this {
                    color: #128dff;
                    background: #fff;
                }
                .layui-this:after {
                    color: #128dff;
                    border-top: 2px solid #128dff;
                }
            }
        }
        .layui-tab-content {
            padding-left: 1px;
            padding-right: 1px;
            .layui-table {
                
                .table_headtr {
                    height: 50px;
                    background: #dae9ff;
                    td {
                        font-size: 16px;
                        border: 0;
                    }
                    .firstheadtd {
                        position: relative;
                    }
                }
                tbody {
                    tr:nth-child(even) {
                        background-color: #E5F0FF;
                    }
                    .table_con {
                        background: #fff;
                        
                        td {
                            padding: 12px 0px 12px 30px;
                            font-size: 14px;
                            border:0;
                        }
                    }
                }
            }
        }
    }
}
.shadeStyle {
    padding-left: 53px;
    padding-right: 53px;

    table {
        margin-top: 27px;
        tr {
            height: 64px;
            td {
                input {
                    width: 100%;
                    height: 40px;
                    padding-left: 10px;
                    border-radius: 3px;
                }
                input,
                input:hover,
                input:focus {
                    border: 1px solid #c2c3c3;
                }
                .tan_icon {
                    background: url(../../common/image/icon/icon_hxcw.png)
                        no-repeat;
                    width: 13px;
                    height: 13px;
                    display: inline-block;
                    position: relative;
                    z-index: 66;
                    top: 2px;
                    margin-right: 4px;
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
        margin-top: 46px;
    }
    .cancel {
        border: 1px solid #128dff;
        color: #128dff;
        background: #fff;
    }
    .send {
        color: #fff;
        background: #128dff;
    }
}
</style>
