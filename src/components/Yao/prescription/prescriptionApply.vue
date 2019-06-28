<template>
<!-- 申请合作 -->
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
                                    <input type="text" name="" v-model="list.dep_name" autocomplete="off" class="layui-input">
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
                                <el-radio v-model="list.business" label="6">电子处方</el-radio>
                                <el-radio v-model="list.business" label="1">线下门诊</el-radio>
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
                                <td style="width:220px;">医生信息</td>
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
                                    <ul class="docMsg">
                                        <li><span>医生姓名：</span><span>{{ val.true_name }}</span></li>
                                        <li><span>医生职称：</span><span>{{ val.gname }}</span></li>
                                        <li><span>医生科室：</span><span>{{ val.department_name }}</span></li>
                                        <li><span>执业医院：</span><span>{{ val.hospital_name }}</span></li>
                                    </ul>
                                </td>
                                <td>距离<{{val.distince}}km</td>
                                <td>
                                    <ul>
                                        <li v-for='(item, i) in val.business' :key='i+"_1"'>{{ item }}</li>
                                    </ul>
                                </td>
                                <td>
                                    <p style="width: 100px; margin:0 auto;">{{ val.busdate }}</p>
                                    <span>{{ val.busktime }}</span>
                                    <span>--</span>
                                    <span>{{ val.busjtime }}</span>
                                </td>
                                <td>
                                    <ul>
                                        <li><span>患者数量：</span><span>{{ val.count_u }}</span></li>
                                        <li><span>处方数量：</span><span>{{val.count_t}}</span></li>
                                        <li><span>合作药店：</span><span>{{val.num}}</span></li>
                                    </ul>
                                </td>
                                <td>
                                    <div class='dis_f flex_fc flex-vc'>
                                        <p class="Ft-S14 al" v-show='val.type == 1'>医生已停诊</p>
                                        <p class="pointer Ft-S14 Color_blue " v-show='val.type == 2' @click="delcode(val.did, 1)">申请合作</p>
                                            <el-tooltip class="item" effect="light" placement="bottom-end" v-show='val.state == 3'>
                                                <el-button><p class="Ft-S14 al">申请合作中</p></el-button>
                                                <div slot="content">已申请该医生<br/>待医生同意后即可达成合作</div>
                                            </el-tooltip>
                                        <p class="pointer Ft-S14 Color_blue " v-show='val.type == 4' @click="yes_delcode(val.did, 2)">同意合作</p>
                                    </div>
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

            <div id="sendgoods" class="hide_box">
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
               dep_name: '',
               ktime: '',
               jtime: '',
               business: '',
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
            doc_id: '',              // 申请合作的医生 id
            doc_type: '',            // 申请合作的医生 type
            doc_id2: '',             // 同意合作的医生 id
            doc_type2: '',           // 同意合作的医生 type
            businessList:            // 开通服务列表
                [{id:1, val: '线下门诊'},
                {id:2, val: '私人医生'},
                {id:3, val: '图文问诊'},
                {id:4,val:'音频问诊'},
                {id:6, val:'电子处方'},
                {id:7, val: '在线转诊'},
                {id:8,val:'名医问答'},
                {id:9, val:'健康资讯'},
                {id:10, val:'健康讲堂'},
                {id:11, val: '诊后随访'},
                {id:12,val:'视频问诊'},
                {id:13, val:'合作药店'},],
            docTimer: [{id:1, val:'星期一'},  // 服务时间
                {id:2, val:'星期二'},
                {id:3, val:'星期二'},
                {id:4, val:'星期四'},
                {id:5, val:'星期五'},
                {id:6, val:'星期六'},
                {id:0, val:'星期日'}],
        }
    },
    mounted() {
        this.initdata(1)
        var _this = this;
        // _this.$http.post('/shv2/Recipe/recipe_doccount', {}, function (res) {
        //     console.log(res)
        //     if (res.code) {
        //         _this.teamwork = res.data.type // 获取数量
        //     }
        // }, function (err) { console.log(err)})

    },
    methods: {
        // docType () {    // 获取医生职称
        //     var _this = this;
        //     _this.$http.post('/shv2/data/doc_type', {}, function (res) {
        //         console.log(res)
        //         if (res.code == 1) {
        //             _this.doctorType = res.data.grade
        //         }
        //     }, function (err) { console.log(err)})
        // },
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
                console.log(_this.list)
                _this.$http.post('/shv2/Commonshop/recipe_list', _this.list, function (res) {//
                    console.log(res)
                    if (res.code == 1) {
                        _this.headernum = res;
                        _this.tableList = res.data;
                        _this.tableList.forEach(val => { // 处理开通的服务
                            var arr = val.business.split(','), arrList = []
                            arr = arr.filter(v => {
                                return v !== ''
                            })
                            for(var c=0;c<_this.businessList.length;c++) {
                                for (var j=0; j<arr.length;j++) {
                                    if (arr[j] == _this.businessList[c].id) {
                                        arrList.push(_this.businessList[c].val)
                                    }
                                }
                            }
                            val.business = arrList
                        })
                        _this.tableList.map(val => { // 处理星期的日期
                            var dates = val.busdate.split(','), dateArr = [];
                            for (var i =0;i<_this.docTimer.length;i++) {
                                for (var j=0; j<dates.length;j++) {
                                    if (_this.docTimer[i].id == dates[j] ) {
                                        dateArr.push(_this.docTimer[i].val)
                                    }
                                }
                            }
                            val.busdate = dateArr.join(',')
                        })
                        
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
                // if (!_this.list.name && !_this.list.true_name && !_this.list.grade && !_this.tdlast) {
                //     layer.msg('请输入要搜索的内容', { icon: 5, time: 1500});
                //     return false;
                // }
                 _this.initdata(1)
            }); 
        },
       
        delcode(id, type) { // 申请合作 提示
            var _this = this;
            _this.doc_id = id
            _this.doc_type = type
            layui.use(["layer"], function () {
                var layer = layui.layer;
                var $ = layui.jquery;
                // if (_this.teamwork > 0) {
                //     layer.msg('机构已经添加了5名医生,已达上限', { icon: 7 })
                //     return false;
                // }
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
            console.log(obj)
          layui.use(["layer"], function () {
              var layer = layui.layer;
                layer.closeAll();
                _this.$http.post('/shv2/Commonshop/hos_set', obj, function (res) {
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
                            end: function () {
                                $("#sendgoods").hide()
                            }
                        });
                        _this.initdata(_this.list.page)
                    } else if (res.code == 4) {
                        layer.msg(res.msg, { icon: 0})
                    } else {
                        layer.msg('申请失败, 请联系客服', { icon: 5})
                    }
                }, function (err) { console.log(err) })
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
            this.list.dep_name = '';
            this.tdlast = '';
            this.list.jtime = '';
            this.list.ktime = '';
            this.list.business = '';
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
                    cancel: function () {},
                    end: function () {
                        $("#sendgoods_yes").hide()
                    }
                });
            })
        },
        yes_btn () {    // 同意合作 确认
            var _this = this;
            var obj = { id: this.doc_id2, type: this.doc_type2 }
          layui.use(["layer"], function () {
              var layer = layui.layer;
                layer.closeAll();
                _this.$http.post('/shv2/Commonshop/hos_set', obj, function (res) {
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

<style lang='less'>
.el-tooltip {   //  更改 element ui的 Tooltip 提示信息的样式
    border: 0;
    background-color: inherit;
    padding: 0;
    &:hover {
        background-color: inherit;
        color: #333;
        cursor: default;
    }
}
</style>


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
                        height: 36px;
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
                                text-align: center;
                                padding-left: 20px;
                                li {
                                    height: 30px;
                                }
                            }
                            .docMsg {
                                width: 220px;
                                margin: 0 auto;
                                text-align: left;
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
    display: none;
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
