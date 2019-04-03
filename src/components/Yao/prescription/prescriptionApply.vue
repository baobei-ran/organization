<template>
    <div id="orderList" class="bg_f" style="height:100%">
        <p class="orderList_tit Color_black Ft-S16 Pd-T24 Pd-B24 Pd-L24">处方单申请</p>
        <div class="tab_content Pd-L24 Pd-R24">
            <div class="layui-tab Pd-T20">
               
                <div class="layui-tab-content" style="height:100%">
                    <div class="screen_type Pd-B24 Mg-B24">
                        <div class="layui-form-item layui-row dis_f layui-col-md10">
                            <div class="layui-inline layui-col-md3 lay_width">
                                <label class="layui-form-label">医生执业医院</label>
                                <div class="layui-input-inline" >
                                    <input type="text" name="" v-model="list.name" autocomplete="off" class="layui-input">
                                </div>
                            </div>
                            <div class="layui-inline layui-col-md3 lay_width">
                                <label class="layui-form-label">医生姓名</label>
                                <div class="layui-input-inline" >
                                    <input type="text" name="" v-model="list.true_name" autocomplete="off" class="layui-input">
                                </div>
                            </div>
                            <div class="layui-inline layui-col-md3 lay_width">
                                <label class="layui-form-label">医生职称</label>
                                <div class="layui-input-inline" >
                                    <input type="text" name="" v-model="list.grade" autocomplete="off" class="layui-input">
                                </div>
                            </div>
                        </div>
                        <div class="layui-form-item layui-col-md12 selecttime layui-row dis_f">
                            <div class="layui-inline layui-col-md3">
                                <label class="layui-form-label">服务时间段</label>
                                <div class="layui-input-inline" style="width:180px">
                                    <input type="text" name="price_min" placeholder="" v-model="list.ktime" id="date" autocomplete="off" class="layui-input ">
                                </div>
                            </div>
                            <div  class="layui-inline layui-col-md3">
                                <label class="layui-form-label">当前距离</label>
                                <div class="layui-input-inline" style="width:180px">
                                    <input type="text" name="price_max" placeholder="" v-model="list.dis" id="date1" autocomplete="off" class="layui-input">
                                </div>
                            </div>
                            <p class="Mg-L30 Pd-L50 layui-col-md4">
                                <span class="Ft-S14 selectbtn ac pointer" @click="search">筛选</span>
                                <span class="Color_blue pointer Ft-S14 Mg-L24" @click='empty'>清空筛选条件</span>
                            </p>
                        </div>
                        
                    </div>
                    <table class="layui-table" lay-skin="">
                        <thead>
                            <tr class="Color_black table_headtr ac">
                                <td class="firstheadtd">序号</td>
                                <td>医生姓名</td>
                                <td>医生职称</td>
                                <td>医生执业医院</td>
                                <td>服务时间段</td>
                                <td>当前距离</td>
                                <td>操作</td>
                            </tr>
                        </thead>
                        <tbody v-if='tableList.length'>
                            <tr class="table_con Color_black ac" v-for="(val,index) in tableList" :key='index'>
                                <td>{{ index+1 }}</td>
                                <td>{{ val.true_name }}</td>
                                <td>{{ val.gname }}</td>
                                <td>{{ val.hospital_name }}</td>
                                <td>{{ val.busktime }} - {{ val.busjtime }} </td>
                                <td>{{ val.distince }}m</td>
                                <td class='dis_f dis_js'>
                                    <div>
                                        <p class="pointer Ft-S14 Color_blue al" v-show='val.type == 1' @click="delcode(val.did, 1)">申请合作</p>
                                        <p class="pointer Ft-S14 Color_blue al" v-show='val.type == 2' @click="delcode(val.did, 2)">开启合作</p>
                                        <p class="Ft-S14 al" style="display:none;">申请中</p>
                                        <p class="Ft-S14 al" style="display:none;">已合作</p>
                                    </div>
                                    <div>
                                        <p class="pointer Ft-S14 Color_blue al" style="display:none;" v-show='val.type == 3' @click="">申诉解除关联</p>
                                        <p class="Ft-S14 al" style="display:none;">解除关联申诉中</p>
                                        <p class="Ft-S14 al" style="">申诉解除关联</p>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                        <tbody v-else>
                            <tr class="table_con Color_black ac" >
                                <td colspan='7'>暂无数据</td>
                            </tr>
                        </tbody>
                    </table>
                    <div id="page" v-show='tableList.length' class="ac Mg-T30"></div>
                </div>
            </div>
        </div>
        <div id="sendgoods" class="hide">
            <table width="100%">
                <tr>
                    <td class="Color_black Ft-S16" width="90px"><span class="Color_red">*</span>配送公司</td>
                    <td><input type="text" v-model="company"></td>
                </tr>
                <tr>
                    <td class="Color_black Ft-S16"><span class="Color_red">*</span>物流单号</td>
                    <td><input type="text" v-model="logistics_number"></td>
                </tr>
            </table>
            <p class="clear">
                <span class="fl"><button class="cancel pointer" @click='cancel'>取消</button></span>
                <span class="fr"><button class="send pointer" @click="sendup">发货</button></span>
            </p>
        </div>
       
    </div>
</template>
<script>
export default {
    name: 'orderList',
    data() {
        return {
            tdlast: 0,
            list: {
               name: '',
               true_name: '',
               grade: '',
               ktime: '',
               jtime: '',
               dis: '',
               page: 1,
               limit: 10
            },
            tableList: '',
            headernum: '',
            company: '',
            logistics_number: '',
            number: '',
            doctorType: [],         // 医生职称
            teamwork: 0,             // 合作数量
            lng: '',
            lat:''
        }
    },
    mounted() {
        this.initdata(1)
        this.docType();
        var _this = this;
        _this.$http.post('/shv2/Recipe/recipe_doccount', {}, function (res) {
            console.log(res)
            if (res.code) {
                _this.teamwork = res.data.type
            }
        }, function (err) { console.log(err)})

        // 地图
        
        
    },
    methods: {
        docType () {    // 获取医生职称
            var _this = this;
            _this.$http.post('/shv2/data/doc_type', {}, function (res) {
                console.log(res)
                if (res.code == 1) {
                    _this.doctorType = res.data.grade
                }
            }, function (err) { console.log(err)})
        },
        initdata(num) {   // 数据
            let _this = this;
            layui.use(["laypage", "layer", "laydate", "element"], function () {
                var element = layui.element;
                var laydate = layui.laydate;
                // laydate.render({
                //     elem: "#date",
                // });
                // laydate.render({
                //     elem: "#date1",
                // });
                // var oDate1 = new Date($('#date').val());
                // var oDate2 = new Date($('#date1').val());
                // if (oDate1.getTime() > oDate2.getTime()) {
                //     layer.msg('开始时间不能大于结束时间');
                //     return
                // }
                // _this.list.start_time = $('#date').val();
                // _this.list.end_time = $('#date1').val();
                
                _this.$http.post('/shv2/Recipe/recipe_list', _this.list, function (res) {//
                    console.log(res)
                    if (res.code == 1) {
                        _this.headernum = res;
                        _this.tableList = res.data;
                        if (num == 1) {
                            _this.pageFun(res.count)
                        }
                    } else {
                        _this.tableList = false;
                        _this.pageFun(0)
                    }
                }, function (err) { console.log(err) });

            });
        },
        pageFun(total) {    // 分页
            let _this = this;
            layui.use(["laypage", "layer", "element"], function () {
                var element = layui.element;
                var laypage = layui.laypage;
                laypage.render({
                    elem: "page", //注意，这里的 test1 是 ID，不用加 # 号
                    count: total, //数据总数，从服务端得到
                    limit: 10, //每页条数
                    layout: ["prev", "page", "next", "skip"],
                    groups: 4,
                    jump: function (obj, first) {
                        if (!first) {
                            _this.list.page = obj.curr;
                            _this.initdata(obj.curr)
                        }
                    }
                });
            });
        },
        search() {  // 搜索
            this.initdata(this.tdlast, 1)
        },
       
        delcode(id, type) { // 申请合作
            var _this = this;
            layui.use(["layer"], function () {
                var layer = layui.layer;
                var $ = layui.jquery;
                if (_this.teamwork > 0) {
                    layer.msg('机构已经添加了5名医生,已达上限', { icon: 7 })
                    return false;
                }
                var obj = { id: id, type: type }
                _this.$http.post('/shv2/Recipe/recipe_alter', obj, function (res) {
                    console.log(res)
                }, function (err) { console.log(err)})


                // layer.open({
                //     type: 1,
                //     shade: 0.2,
                //     shadeClose: true,
                //     closeBtn: 1,
                //     title: "自取核销",
                //     content: $(".delcode"),
                //     area: ["500px", "300px"],
                //     cancel: function () { }
                // });
                // $(".layui-layer-title").css({
                //     height: "50px",
                //     background: "#ECF2FB",
                //     "line-height": "50px",
                //     fontSize: '18px'
                // });
                // $(".layui-layer-setwin").css("top", "19px");
            });
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
            let _this=this;
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
            this.list.true_name = '';
            this.list.name = '';
            this.list.grade = '';
            this.list.ktime = '';
            this.list.jtime = '';
            this.list.dis = '';
        }
    }
}
</script>

<style scoped lang="less">
#orderList {
    height: 100%;
    .orderList_tit {
        border-bottom: 1px solid #e6e6e6;
    }
    input:hover,
    input:focus {
        border: 1px solid #c2c3c3;
    }
    .screen_type {
        border-bottom: 1px solid #e6e6e6;
        overflow: hidden;
        .layui-form-item {
            .lay_width {
                width: 100%;
                .layui-form-label {
                    width: 100px;
                    padding: 7px 10px 7px 0px;
                }
                .layui-input-inline {
                    width: 50%;
                    input {
                        height: 34px;
                    }
                }
            }
        }
        .selecttime {
            .layui-inline {
                .layui-form-label {
                    width: 100px;
                    padding: 7px 10px 7px 0px;
                }
                .layui-input-inline {
                    width: 50%;
                    input {
                        height: 34px;
                    }
                    .date_icon {
                        background: url(../../../common/image/pages/account/icon_sj.png)
                            no-repeat 150px;
                    }
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
        height: 100%;
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
            overflow: hidden;
            .layui-table {
                text-align: center;
                border: 1px solid #DDDDDD;
                .table_headtr {
                    height: 50px;
                    background: #dae9ff;
                    td {
                        font-size: 16px;
                    }
                    .firstheadtd {
                        position: relative;
                    }
                }
                tbody {
                    tr:nth-child(even) {
                        background:#E5F0FF;
                    }
                    .table_con {
                        background: #fff;

                        td {
                            padding: 18px 0px;
                            font-size: 14px;
                            border: 0;
                            .shopdetail {
                                padding: 52px 0px;
                                padding-right: 60px;
                                span:last-child {
                                    position: absolute;
                                    right: 20px;
                                }
                            }
                        }
                        td:last-child {
                            i {
                                display: inline-block;
                                width: 14px;
                                height: 14px;
                                position: relative;
                                top: 3px;
                            }
                            .seedetail_icon {
                                background: url(../../../common/image/icon/icon_ck.png)
                                    no-repeat;
                            }
                            .sendhw_icon {
                                background: url(../../../common/image/icon/icon_fh.png)
                                    no-repeat;
                            }
                            .del_icon {
                                background: url(../../../common/image/icon/icon_hx.png)
                                    no-repeat;
                                background-size: 100%;
                            }
                        }
                    }
                }
            }
        }
    }
}
#sendgoods {
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
                    background: url(../../../common/image/icon/icon_hxcw.png)
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
        width: 160px;
        height: 46px;
        border-radius: 4px;
        border: none;
        font-size: 18px;
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
