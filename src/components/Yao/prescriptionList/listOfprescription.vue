<template>
<!-- 处方列表 -->
    <div id="orderList" class="bg_f" style="height:100%">
        <p class="orderList_tit Color_black Ft-S16 Pd-T24 Pd-B24 Pd-L24">申请合作医生</p>
        <div class="tab_content Pd-L24 Pd-R24">
            <div class="layui-tab Pd-T20 ">
               
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
                                <label class="layui-form-label">医生科室</label>
                                <div class="layui-input-inline" >
                                    <input type="text" name="" v-model="list.true_name" autocomplete="off" class="layui-input">
                                </div>
                            </div>
                            <div class="layui-inline layui-col-md3 lay_width">
                                <label class="layui-form-label">医生姓名</label>
                                <div class="layui-input-inline" >
                                    <input type="text" name="" v-model="list.true_name" autocomplete="off" class="layui-input">
                                </div>
                            </div>
                            <!-- <div class="layui-inline layui-col-md3 lay_width">
                                <label class="layui-form-label">医生职称</label>
                                <div class="layui-input-inline" >
                                    <el-select v-model="list.grade" placeholder="请选择">
                                        <el-option
                                        v-for="item in doctorType"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                        </el-option>
                                    </el-select>
                                </div>
                            </div> -->
                        </div>
                        <div class="layui-form-item selecttime layui-row dis_f">
                            <div class="kai_server layui-col-md4">
                                <label>开通服务</label>
                                <el-radio v-model="radioVal" label="1">电子处方</el-radio>
                                <el-radio v-model="radioVal" label="2">线下门诊</el-radio>
                            </div>
                            <div class="layui-inline layui-col-md4">
                                <label class="layui-form-label">服务时间段</label>
                                <div class="layui-input-inline" style="width:180px">
                                    <el-select v-model="tdlast" placeholder="请选择">
                                        <el-option
                                        v-for="item in timers"
                                        :key="item.id"
                                        :label="item.time"
                                        :value="item.id">
                                        </el-option>
                                    </el-select>
                                    <!-- <input type="text" name="price_min" placeholder="" v-model="" id="date" autocomplete="off" class="layui-input "> -->
                                </div>
                            </div>
                            <!-- <div  class="layui-inline layui-col-md3">
                                <label class="layui-form-label">当前距离</label>
                                <div class="layui-input-inline" style="width:180px">
                                    <input type="text" name="price_max" placeholder="" v-model="list.dis" id="date1" autocomplete="off" class="layui-input">
                                </div>
                            </div> -->
                            <p class="layui-col-md4">
                                <span class="Ft-S14 selectbtn ac pointer" @click="search">筛选</span>
                                <span class="Color_blue pointer Ft-S14 Mg-L24" @click='empty'>清空筛选条件</span>
                            </p>
                        </div>
                        
                    </div>
                    <table class="layui-table" lay-skin="">
                        <thead>
                            <tr class="Color_black table_headtr ac">
                                <td class="firstheadtd">序号</td>
                                <td>医生信息</td>
                                <td>执业地点距离</td>
                                <td>开通服务</td>
                                <td>处方服务时间段</td>
                                <td>服务数据</td>
                                <td>操作</td>
                            </tr>
                        </thead>
                        <tbody v-if='tableList.length'>
                            <tr class="table_con Color_black ac" v-for="(val,index) in tableList" :key='index'>
                                <td>{{ index+1 }}</td>
                                <td>
                                    <ul>
                                        <li><span>医生姓名：</span><span>李一一</span></li>
                                        <li><span>医生职称：</span><span>医师</span></li>
                                        <li><span>医生科室：</span><span>心内科</span></li>
                                        <li><span>执业医院：</span><span>山东省立医院</span></li>
                                    </ul>
                                </td>
                                <td>距离<300m </td>
                                <td>
                                    <ul>
                                        <li>合作药店</li>
                                        <li>电子处方</li>
                                        <li>线下门诊</li>
                                    </ul>
                                </td>
                                <td>
                                    <ul>
                                        <li>星期一、星期二、星期三</li>
                                        <li>星期四、星期五、星期六</li>
                                        <li>星期日、08:00-20:00</li>
                                    </ul>
                                </td>
                                <td>
                                    <ul>
                                        <li><span>患者数量：</span><span>123</span></li>
                                        <li><span>处方数量：</span><span>123</span></li>
                                        <li><span>合作药店：</span><span>223</span></li>
                                    </ul>
                                </td>
                                <td>
                                    <div class='dis_f flex_fc flex-vc'>
                                        <p class="pointer Ft-S14 Color_blue " v-show='val.state == 1' @click="delcode(val.did, 1)">申请合作</p>
                                        <!-- <p class="pointer Ft-S14 Color_blue " v-show='val.state == 4' @click="delcode(val.did, 2)">开启合作</p> -->
                                        <p class="pointer Ft-S14 Color_blue " v-show='val.state == 4' @click="yes_delcode(val.did, 2)">同意合作</p>
                                        <p class="Ft-S14 al" v-show='val.state == 2'>申请中</p>
                                        <p class="Ft-S14 al" v-show='val.state == 3'>已合作</p>
                                        <p class="Ft-S14 al" v-show='val.state == 5' >终止合作</p>
                                    </div>
                                        
                                   
                                    <!-- <div>
                                        <p class="pointer Ft-S14 Color_blue al" v-show='val.type == 2' @click="">申诉解除关联</p>
                                        <p class="Ft-S14 al" v-show='val.type == 3' >解除关联申诉中</p>
                                        <p class="Ft-S14 al" v-show='val.type == 1'>申诉解除关联</p>
                                        <p class="Ft-S14 al" v-show='val.type == 4'>终止合作</p>
                                    </div> -->
                                </td>
                            </tr>
                        </tbody>
                        <tbody v-else>
                            <tr class="table_con Color_black ac" >
                                <td colspan='6'>暂无数据</td>
                            </tr>
                        </tbody>
                    </table>
                    <div id="page" v-show='tableList.length' class="ac Mg-T30"></div>  
                    <div class="returns"><button class="layui-btn layui-btn-normal" @click="go('/server/Yaodoctorprescription')">返回</button></div>
                </div>
            </div>
        </div>

            <div id="sendgoods" class="hide">
                <p class="txt">合作申请中，请等待医生回复！</p>
                <p class="clear">
                    <span class=""><button class="send pointer" @click="cancel">确定</button></span>
                </p>
            </div>

            <!-- 申请合作弹框 -->
            <div id="sendgoods_hezuo" class="hide">
                <h2>服务提示</h2>
                <p class="txt">是否确认申请合作？</p>
                <p>医生同意后，即可达成合作<br/>申请记录中可查看合作状态</p>
                <p class="clear_btn">
                    <span><button class="send pointer" @click="cancel">取消</button></span>
                    <span ><button class="send pointer" @click="success_btn">确定</button></span>
                </p>
            </div>

            <!-- 同意合作弹框 -->
            <div id="sendgoods_yes" class="hide">
                <h2>服务提示</h2>
                <p class="txt">是否确认同意合作？</p>
                <p>达成合作后，医生可为你开具处方<br/>并为患者推荐药店药品</p>
                <p class="clear_btn">
                    <span><button class="send pointer" @click="cancel">取消</button></span>
                    <span ><button class="send pointer" @click="yes_btn">确定</button></span>
                </p>
            </div>

            <div id="sendgoods_2" class="hide">
                <p class="txt">合作成功！</p>
                <p class="clear">
                    <span class=""><button class="send pointer" @click="cancel">确定</button></span>
                </p>
            </div>
    </div>
</template>
<script>
export default {
    name: 'orderList',
    data() {
        return {
            tdlast: '',             // 获取时间的id
            list: {                 // 传入的数据
               name: '',
               true_name: '',
               grade: '',
               ktime: '',
               jtime: '',
               dis: '',
               page: 1,
               limit: 10
            },
            tableList: [],
            headernum: '',
            company: '',
            logistics_number: '',
            number: '',
            doctorType: [],         // 医生职称
            teamwork: 0,             // 合作数量
            timers: [
                {id:1, time:' 00:00:00 - 06:00:00'},
                {id:2, time:' 06:00:00 - 12:00:00'},
                {id:3, time:' 12:00:00 - 18:00:00'},
                {id:4, time:' 18:00:00 - 00:00:00'},
            ],
            radioVal: '1',           // 选择服务
            doc_id: '',              // 申请合作的医生 id
            doc_type: '',            // 申请合作的医生 type
            doc_id2: '',             // 同意合作的医生 id
            doc_type2: '',           // 同意合作的医生 type
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
            var _this = this;
            var a = '00:00', b = '06:00', c = '12:00', d = '18:00'
            if (this.tdlast == 1) {
                this.list.ktime = a
                this.list.jtime = b
            } else if (this.tdlast == 2) {
                this.list.ktime = b
                this.list.jtime = c
            } else if (this.tdlast == 3) {
                this.list.ktime = c
                this.list.jtime = d
            } else if (this.tdlast == 4) {
                this.list.ktime = d
                this.list.jtime = a
            } else {
                this.list.ktime = ''
                this.list.jtime = ''
            }
            layui.use(["laypage", "layer", "laydate", "element"], function () {
                var element = layui.element;
                var laydate = layui.laydate;
                
                _this.$http.post('/shv2/Recipe/recipe_list', _this.list, function (res) {//
                    console.log(res)
                    if (res.code == 1) {
                        _this.headernum = res;
                        _this.tableList = res.data;
                        if (num == 1) {
                            _this.pageFun(res.count)
                        }
                    } else {
                        _this.tableList = [];
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
                    limit: _this.list.limit, //每页条数
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
            var _this = this;
            layui.use('layer', function(){
                var layer = layui.layer;
                if (!_this.list.name && !_this.list.true_name && !_this.list.grade && !_this.tdlast) {
                    layer.msg('请输入要搜索的内容', { icon: 5, time: 1500});
                    return false;
                }
                 _this.initdata(1)
            }); 
        },
       
        delcode(id, type) { // 申请合作
            var _this = this;
            _this.doc_id = id
            _this.doc_type = type
            layui.use(["layer"], function () {
                var layer = layui.layer;
                var $ = layui.jquery;
                if (_this.teamwork > 0) {
                    layer.msg('机构已经添加了5名医生,已达上限', { icon: 7 })
                    return false;
                }
                layer.open({
                    type: 1,
                    shade: 0.2,
                    shadeClose: true,
                    closeBtn: 0,
                    title: "",
                    content: $("#sendgoods_hezuo"),
                    area: ["400px", "280px"],
                });
                
            });
        },
       success_btn () { // 确认合作
            var _this = this;
            var obj = { id: this.doc_id, type: this.doc_type }
          layui.use(["layer"], function () {
              var layer = layui.layer;
                layer.closeAll();
                _this.$http.post('/shv2/Recipe/recipe_alter', obj, function (res) {
                    console.log(res)
                    if (res.code == 1) {
                        layer.open({
                            type: 1,
                            shade: 0.2,
                            shadeClose: true,
                            closeBtn: 1,
                            title: "",
                            content: $("#sendgoods"),
                            area: ["400px", "300px"],
                            cancel: function () {}
                        });
                        _this.initdata(_this.list.page)
                    } else {
                        layer.msg('申请失败, 请联系客服', { icon: 5})
                    }
                }, function (err) { console.log(err)})
           });
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
            this.tdlast = '';
            this.list.jtime = '';
            this.list.ktime = '';
            this.initdata(1)
        },
        yes_delcode (id, type) {  // 同意合作提示
            var _this = this;
            _this.doc_id2 = id
            _this.doc_type2 = type
            layui.use(["layer"], function () {
                var layer = layui.layer;
                layer.open({
                    type: 1,
                    shade: 0.2,
                    shadeClose: true,
                    closeBtn: 0,
                    title: "",
                    content: $("#sendgoods_yes"),
                    area: ["400px", "280px"],
                    cancel: function () {}
                });
            })
        },
        yes_btn () {    // 同意合作 确认
            var _this = this;
            var obj = { id: this.doc_id2, type: this.doc_type2 }
          layui.use(["layer"], function () {
              var layer = layui.layer;
                layer.closeAll();
                _this.$http.post('/shv2/Recipe/recipe_alter', obj, function (res) {
                    console.log(res)
                    if (res.code == 1) {
                        layer.open({
                            type: 1,
                            shade: 0.2,
                            shadeClose: true,
                            closeBtn: 1,
                            title: "",
                            content: $("#sendgoods_2"),
                            area: ["400px", "300px"],
                            cancel: function () {}
                        });
                        _this.initdata(_this.list.page)
                    } else {
                        layer.msg('同意失败, 请联系客服', { icon: 5})
                    }
                }, function (err) { console.log(err)})
           });
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
                        width: 180px;
                        height: 40px;
                    }
                }
            }
        }
        .selecttime {
            .kai_server {
                height: 40px;
                line-height: 33px;
                font-size: 15px;
                > label {
                    margin-right: 20px;
                }

            }
            .layui-inline {
                .layui-form-label {
                    width: 100px;
                    padding: 7px 10px 7px 0px;
                }
                .layui-input-inline {
                    width: 50%;
                    input {
                        height: 40px;
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
        
        overflow-y: auto;
        background: #fff;
        .layui-tab {
            background: #fff;
            
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
            overflow: auto;
            .returns {
                width:100%;
                text-align: center;
                padding-top: 20px;
                    >button {
                        padding: 0 28px;
                    }
                }
            .layui-table {
                // text-align: center;
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
                            ul {
                                text-align: left;
                                li {
                                    height: 30px;
                                }
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

    .txt {
        padding: 80px 0;
        font-size: 16px;
        color: #333;
    }
    p {
        text-align: center;
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
    }
    .send {
        color: #fff;
        background: #128dff;
    }
}

#sendgoods_hezuo {
    padding-left: 53px;
    padding-right: 53px;
    > h2 {
        text-align: center;
        font-size: 20px;
        padding: 34px 0 20px;
        color: #333;
        font-weight: 500;
    }
    > p {
        margin-top: 20px;
        text-align: center;
        color: #333333;
        font-size: 16px;
    }
    p:nth-child(3) {
        color: #808080;
        line-height: 24px;
        font-size: 13px;
    }
    .clear_btn {
        span:first-child {
            button {
                background:#FFF;
                color: #128DFF;
                margin-right: 10px;
            }
        }
        span {
            button {
               width: 120px;
                height: 40px;
                -webkit-border-radius: 4px;
                border-radius: 4px;
                border: 1px solid #128DFF;
                font-size: 16px;
                background: #128DFF;
                color: #FFF;
            }
        }
    }
}


#sendgoods_yes {
    padding-left: 53px;
    padding-right: 53px;
    > h2 {
        text-align: center;
        font-size: 20px;
        padding: 34px 0 20px;
        color: #333;
        font-weight: 500;
    }
    > p {
        margin-top: 20px;
        text-align: center;
        color: #333333;
        font-size: 16px;
    }
    p:nth-child(3) {
        color: #808080;
        line-height: 24px;
        font-size: 13px;
    }
    .clear_btn {
        span:first-child {
            button {
                background:#FFF;
                color: #128DFF;
                margin-right: 10px;
            }
        }
        span {
            button {
               width: 120px;
                height: 40px;
                -webkit-border-radius: 4px;
                border-radius: 4px;
                border: 1px solid #128DFF;
                font-size: 16px;
                background: #128DFF;
                color: #FFF;
            }
        }
    }
}

#sendgoods_2 {
    padding-left: 53px;
    padding-right: 53px;

    .txt {
        padding: 80px 0;
        font-size: 16px;
        color: #333;
    }
    p {
        text-align: center;
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
    }
    .send {
        color: #fff;
        background: #128dff;
    }
}
</style>
