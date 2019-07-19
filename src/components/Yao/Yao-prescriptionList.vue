<template>
    <div id="orderList" class="bg_f" style="height:100%">
        <div class="orderList_tit Color_black Ft-S16 Pd-T24 Pd-B24 Pd-L24">
            <p><span>服务说明</span></p>
        </div>

        <div class="screen_type Pd-B14 Mg-T14  dis_f">
            <div class="layui-form-item selecttime dis_f">
                <div class="layui-inline">
                    <label class="layui-form-label">处方申请时间</label>
                    <div class="layui-input-inline" style="width:160px">
                        <el-date-picker style="width:160px;"
                            v-model="list.ktime"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="选择开始日期">
                        </el-date-picker>
                    </div>
                    <div class="layui-form-mid">-</div>
                    <div class="layui-input-inline" style="width:160px">
                        <el-date-picker style="width:160px;"
                            v-model="list.jtime"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="选择结束日期">
                        </el-date-picker>
                    </div>
                </div>
                <div class="layui-inline lay_width">
                    <label class="layui-form-label">处方需求单号</label>
                    <div class="layui-input-inline" style="width:160px">
                        <input type="text" v-model="list.number" autocomplete="off" class="layui-input">
                    </div>
                </div>
                <div class="layui-inline Mg-L10 lay_width">
                    <label class="layui-form-label">患者姓名</label>
                    <div class="layui-input-inline" style="width:160px">
                        <input type="text" v-model="list.name" autocomplete="off" class="layui-input">
                    </div>
                </div>
                <p class="Pd-L15">
                    <span class="Ft-S14 selectbtn ac pointer" @click="search">筛选</span>
                    <span class="Color_blue pointer Ft-S14 Mg-L24" @click='empty'>清空筛选条件</span>
                </p>

            </div>
        </div>

        <div class="tab_content Pd-L24 Pd-R24">
            <div class="layui-tab">
                <div class="layui_navs">
                    <ul class="layui-tab-title">
                        <li class="layui-this" @click="tab(1)">等待中（{{ recipeCount.type1 }}）</li>
                        <li @click="tab(2)">待审核（{{ recipeCount.type2 }}）</li>
                        <li @click="tab(3)">已开具（{{ recipeCount.type3 }}）</li>
                        <li @click="tab(4)">开具失败（{{ recipeCount.type4 }}）</li>
                    </ul>
                    <span class="btn_r">
                        <button class="layui-btn background_white layui-btn-normal"  @click='go("/server/YaoprescriptionListPic/prescriptionSetting")'>处方设置</button>
                        <button class="layui-btn layui-btn-normal" @click='go("/server/YaoprescriptionListPic/addApply")'>处方单申请</button> 
                    </span>
                </div>
                <div class="layui-tab-content">
                    <!-- 等待 和 开具失败 -->
                    <div v-show='tabStatus == 1? true: tabStatus == 4? true: false'>
                        <table class="layui-table" lay-skin="">
                            <thead>
                                <tr class="Color_black table_headtr ac">
                                    <td class="firstheadtd">序号</td>
                                    <td>处方订单号</td>
                                    <td>处方单申请时间</td>
                                    <td>患者姓名</td>
                                    <td>申请医生</td>
                                    <td>操作</td>
                                </tr>
                            </thead>
                            <tbody v-if='tableList.length'>
                                <tr class="table_con Color_black ac" v-for='(val,i) in tableList' :key='i'>
                                    <td>{{ i+1 }}</td>
                                    <td>{{ val.number }}</td>
                                    <td>{{ val.creatime | moment }}</td>
                                    <td>{{ val.user }}</td>
                                    <td style='width:280px;'>
                                        <div class="doctor">
                                            <ul v-for='(st, index) in val.state' :key='index+"_1"'>
                                                <li v-if='st.status == 1'><span>{{ st.true_name }}</span> <span>未接单</span></li>
                                                <li v-if='st.status == 2'><span>{{ st.true_name }}</span> <span>已接单</span></li>
                                                <li v-if='st.status == 3'><span>{{ st.true_name }}</span> <span>已拒绝</span><span class="docMsg">（{{ st.remark }}</span><b>）</b></li>
                                                <li v-if='st.status == 4'><span>{{ st.true_name }}</span> <span>处方开具超时</span></li>
                                                <li v-if='st.status == 5'><span>{{ st.true_name }}</span> <span>已开具</span></li>
                                            </ul>
                                        </div>
                                    </td>
                                    
                                    <td>
                                        <p class="pointer Ft-S14 Color_blue al" style="width:80px;margin:0 auto" @click="godetail(val.id)">查看详情</p>
                                        <!-- <p class="pointer Ft-S14 Color_blue al" style="width:80px;margin:0 auto" @click="del(val.id)">删除</p>
                                        <p class="pointer Ft-S14 Color_blue al" style="width:80px;margin:0 auto" v-if='val.status == 4' @click="delcode(val.id)">再次提交</p>
                                        <p class="Ft-S14 al" style="width:80px;margin:0 auto" v-else>再次提交</p> -->
                                    </td>
                                </tr>
                            </tbody>
                            <tbody v-else>
                                <tr class="table_con Color_black ac" >
                                    <td colspan='6'>暂无数据</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <!-- 待审核和已开具 -->
                    <div v-show='tabStatus == 2? true: tabStatus == 3? true: false'>
                        <table class="layui-table" lay-skin="">
                            <thead>
                                <tr class="Color_black table_headtr ac">
                                    <td class="firstheadtd">序号</td>
                                    <td>处方需求单号</td>
                                    <td>处方申请时间</td>
                                    <td>患者姓名</td>
                                    <td>开具医生</td>
                                    <td>处方编号</td>
                                    <td>处方状态</td>
                                    <td>操作</td>
                                </tr>
                            </thead>
                            <tbody v-if='tableList.length'>
                                <tr class="table_con Color_black ac" v-for='(val,i) in tableList' :key='i+"_2"'>
                                    <td>{{ i+1 }}</td>
                                    <td>{{ val.number }}</td>
                                    <td>{{ val.creatime | moment }}</td>
                                    <td>{{ val.user }}</td>
                                    <td>{{ val.doc_name }}</td>
                                    <td>{{ val.order_code }}</td>
                                    <td>
                                        <ul>
                                            <li v-show='val.status == 3 && val.flag == 0'>处方已开具，等待药师审核</li>
                                            <li v-show='val.status == 3 && val.flag == 1'>药师已审核</li>
                                            <li v-show='val.status == 5'>处方已过期</li>
                                            <li v-show='val.status == 3 && val.flag == 2'>药师审核未通过</li>
                                        </ul>
                                    </td>
                                    <td>
                                        <span class="pointer Ft-S14 Color_blue al"  @click="godetail(val.id)">查看详情</span>
                                        <span class="pointer Ft-S14 Color_blue al Mg-L10" v-if='tabStatus == 2'  @click="yao_set(val.id)">药师审核</span>
                                    </td>
                                </tr>
                            </tbody>
                            <tbody v-else>
                                <tr class="table_con Color_black ac" >
                                    <td colspan='8'>暂无数据</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    
                    <div id="page" v-show='tableList.length' class="ac Mg-T30"></div>
                </div>
            </div>


            <!-- <div class="yalui_btn"><button class="layui-btn layui-btn-normal">返回</button></div> -->
        </div>



         <div id="sendgoods_price" class="hide">
            <h2>服务提示</h2>
            <p>鲁医通账户余额不足，请充值后再试</p>
            <div>
                <button class="layui-btn layui-btn-normal" @click='cancel'>好的</button> 
            </div>
        </div> 
        
       
        <!-- <div id="sendgoods" class="hide delcode">
            <ul class="Pd-T14 Pd-B14 kuang">
                <li class="title">
                    <label>请选择医生</label>
                </li>
                <li class="dis_f flex_w dis_js">
                    <div>
                        <el-checkbox v-model="checkAll" @change="handleCheckAllChange" >全选</el-checkbox>
                    </div>
                    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                            <el-checkbox v-for="(city,i) in doctorList" :label="city" :key="i">{{city.true_name}}</el-checkbox>
                    </el-checkbox-group>
                </li>
            </ul>
            <p class="clear">
                <span class="fl"><button class="cancel pointer" @click='cancel'>取消</button></span>
                <span class="fr"><button class="send pointer" @click='outdoctor'>确认提交</button></span>
            </p>
        </div> -->

        <!-- 审核 -->
        <div id="sendgoods_shen" class="hide">
            <h2>药师审核</h2>
            <p>药师审核后不可修改，并添加药师电子签名</p>
            <ul>
                <li>
                    <span>审核结果</span>
                    <el-radio v-model="radioVal" label="1">审核通过</el-radio>
                    <el-radio v-model="radioVal" label="2">审核拒绝</el-radio>
                </li>
                <li>
                   <span> 审核说明</span>
                   <textarea v-model='txt' placeholder="请填写审核说明"></textarea>
                </li>
            </ul>
            <p class="clear">
                <span><button class="layui-btn cancel" @click='cancels'>取消</button></span>
                <span><button class="layui-btn layui-btn-normal" @click="yaoAudit">保存</button></span>
            </p>
        </div> 

    </div>
</template>
<script>
export default {
    name: 'yaoPrescriptionList',
    data() {
        return {
            doctorList: [],             // 医生列表
            checkAll: false,            // 全选按钮操作
            checkedCities: [],          // 选择医生的数据liebaio
            doctorId: '',               // 再次提价发起，获取医生id
            list: {
                status: 1,
                number: '',
                name: '',
                ktime: '',
                jtime: '',
                limit: 10,
                page: 1
            },
            tableList: [],
            tabStatus: 1,           // tab 列表
            radioVal: '1',       // 审核状态
            txt: '',             // 审核说明
            he_id: '',           // 审核的id
            recipeCount: {},     // 获取tab的数量
            iskp: false,
        }
    },
    mounted () {
        this.tab(this.tabStatus)
        setTimeout(() => {
            this.iskp = true
        }, 1000)
    },
    activated () {
        if (this.iskp) {
            this.tab(this.tabStatus)
        }
    },
    methods: {
        tab(type) {
            this.list = {
                number: '',
                name: '',
                ktime: '',
                jtime: '',
            }
            this.tabStatus = type;
            this.initdata(type, 1)
        },
        initdata(type, num) {   // 数据
            var _this = this;
            layui.use(["laypage", "layer", "element"], function () {
                var element = layui.element;
                _this.list.page = num;
                _this.list.status = type;
                _this.list.limit = 10;
                _this.$http.post('/shv2/recipetwo/recipe_index', _this.list, function (res) { // 列表数据
                    console.log(res)
                    _this.recipeCount = res;
                    if (res.code == 1) {
                        _this.tableList = res.data;
                        if (num == 1) {
                            //分页
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
                            _this.initdata(_this.list.status, obj.curr)
                        }
                    }
                });
            });
        },
        search() {  // 搜索
          var _this = this;
          layui.use('layer', function(){
            var layer = layui.layer;
            if (_this.list.ktime && _this.list.jtime) {
                var date1 = new Date(_this.list.ktime).getTime();
                var date2 = new Date(_this.list.jtime).getTime();
                if (date1 > date2) {
                    layer.msg('开始时间不能大于结束时间', { icon: 5});
                    return false
                }
            }
            _this.initdata(_this.list.status, 1)
            
          });
           
        },
        godetail(val) {    // 查看详情
            // layui.use(["layer"], function () {    // 余额不足提示
            //     var layer = layui.layer;
            //     var $ = layui.jquery;
            //     layer.open({
            //         type: 1,
            //         shade: 0.2,
            //         shadeClose: true,
            //         closeBtn: 0,
            //         title: "",
            //         content: $("#sendgoods_price"),
            //         area: ["400px", "260px"],
            //     });
                
            // });
            this.go('/server/YaoprescriptionListPic/prescriptionCheck?id='+ val)
        },
        delcode(id) { // 再次提交弹框
            this.doctorId = id
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
                
            });
        },

        outdoctor () {  // 再次提交确认
            var _this = this;
            layui.use('layer', function(){
                var layer = layui.layer;
                if(_this.checkedCities.length <= 0) {
                    layer.msg('请选择医生',{icon: 2, time:1500});
                    return 
                }
                var formdata = new FormData();
                _this.checkedCities.map(val => {
                    formdata.append('did[]', val.did)
                })
                    formdata.append('id', _this.doctorId);
                    
                _this.$http.upload('/shv2/recipe/recipe_again', formdata, function (res) {
                    console.log(res)
                    if (res.code == 1) {
                        layer.closeAll('page');
                        layer.msg('提交成功',{icon: 1, time:1500});
                        _this.initdata(_this.status, _this.list.page)
                    }
                }, function (err) { console.log(err)})
            }); 
        },
       
        del(id) {  // 删除
          var self = this;
          layui.use('layer', function(){
            var layer = layui.layer;
            layer.confirm('删除后不可恢复，是否确定删除？', {
              btn: ['确定', '取消']
            }, function(index, layero){
              layer.closeAll('dialog');
              self.$http.post('/shv2/recipe/recipe_del',{ id:id}, function (res) {
                  console.log(res)
                  if (res.code == 1) {
                      layer.msg('删除成功', { icon:1});
                      self.tab(self.tabStatus)
                  } else {
                      layer.msg('删除失败', { icon: 2});
                  }
              }, function (err) { console.log(err)})
            }, function(index){
                // 取消的回调
            });
           
          });
            
        },  
        cancel () {     // 取消关闭弹框
            layui.use('layer', function(){
            var layer = layui.layer;
            
                layer.closeAll();
            }); 
        },
        empty() {   // 清空
           this.list = {
                number: '',
                name: '',
                ktime: '',
                jtime: '',
            }
            this.initdata(this.tabStatus, 1)
        },
        //  handleCheckAllChange(val) {     // 全选
        //     if(val) {
        //         this.checkedCities = this.doctorList 
        //     } else {
        //         this.checkedCities = [] 
        //     }
        // },
        // handleCheckedCitiesChange(value) {  // 单选
        //     if (value.length > 0) {
        //         var checkedCount = value.length;
        //         if (checkedCount == this.doctorList.length) {
        //             this.checkAll = true;
        //         } else {
        //             this.checkAll = false;
        //         }
        //     }
        // },
        
        cancels () {     // 审核的 取消关闭弹框
            layui.use('layer', function(){
            var layer = layui.layer;
                layer.closeAll();
            }); 
        },
        yao_set (id) {  // 药师审核弹框
            var self = this;
            self.he_id = id
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
                    area: ["500px", "380px"],
                    cancel: function () { }
                });
            });
        },
        yaoAudit () {  // 药师审核结果
            var _this = this;
            layui.use(["layer"], function () {
                var layer = layui.layer;
                _this.$http.post('/shv2/recipetwo/recipe_audit', { id: _this.he_id, type: _this.radioVal,text: _this.txt }, function (res) {  // 审核接口
                    console.log(res)
                    if (res.code == 1) {
                        layer.closeAll('page');
                        layer.msg('审核成功', {icon:1})
                        _this.initdata(_this.tabStatus, _this.list.page)
                        _this.txt = ''
                    } else {
                        layer.closeAll('page');
                        layer.msg('审核失败', { icon: 2})
                    }
                }, function (err) { console.log(err)})
            })
        }
    }
}
</script>

<style scoped lang="less">
#orderList {
    height: 100%;
    .orderList_tit {
        border-bottom: 1px solid #e6e6e6;
        >p {
            display: inline;
            padding: 10px;
            border: 1px dashed #ddd;
            border-radius: 4px;
            span {
                padding-left: 24px;
                background: url('../../common/image/icon/icon_fwsm.png') no-repeat left center;
                background-size: 20%;
            }
        }
    }
    input:hover,
    input:focus {
        border: 1px solid #c2c3c3;
    }
    .screen_type {
        padding: 0 24px;
        .layui-form-item {
            .lay_width {
                margin: 0;
                .layui-form-label {
                    width: 80px;
                    padding: 7px 10px 7px 0px;
                }
                .layui-input-inline {
                    
                    input {
                        height: 34px;
                    }
                }
            }
        }
        .selecttime {
            .layui-inline {
              .layui-form-mid {
                  margin: 0 3px;
              }
                .layui-form-label {
                    padding:0;
                    width: auto;
                    height: 36px;
                    padding-right: 7px;
                    line-height: 36px;
                }
                .layui-input-inline {
                  margin: 0;
                    input {
                        height: 36px;
                    }
                    .date_icon {
                        background: url(../../common/image/pages/account/icon_sj.png)
                            no-repeat right center;
                    }
                }
            }
        }
        .selectbtn {
            display: inline-block;
            color: #fff;
            background: #3196ff;
            width: 60px;
            height: 34px;
            line-height: 34px;
            border: none;
            border-radius: 4px;
        }
    }
    .tab_content {
        height: 100%;
        background-color: #fff;
        
        .layui-tab {
            width: 100%;
            .layui_navs {
                width: 100%;
                position: relative;
                .btn_r {
                    position: absolute;
                    right: 0;
                    top: 0;
                    margin-right: 5px;
                    button {
                        height: 33px;
                        line-height: 33px;
                    }
                    .background_white {
                        background-color: #FFF;
                        color: #3196FF;
                        -webkit-border: 1px solid #3196FF;
                        border: 1px solid #3196FF;
                        -webkit-border-radius: 4px;
                        border-radius: 4px;
                    }
                }
            }
            
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
                    }
                    .firstheadtd {
                        position: relative;
                    }
                }
                tbody {
                  border:1px solid #ddd;
                    .table_con {
                        background: #fff;

                        td {
                            padding: 15px 0px;
                            font-size: 14px;
                            border:0;
                            >p {
                            line-height: 30px;
                          }
                          .doctor {
                              
                              ul {
                                  
                                  li {
                                    text-align: center;
                                    line-height: 30px;
                                    span:first-child {
                                        display: inline-block;
                                        min-width: 50px;
                                    }
                                    .docMsg {
                                        display: inline-block;
                                        max-width: 100px;
                                        overflow: hidden;
                                        text-overflow:ellipsis;
                                        white-space: nowrap;
                                        vertical-align: middle;
                                    }
                                    b {
                                        font-weight: normal;
                                    }
                                  }
                              }
                          }
                        }
                        td:last-child {
                            p {
                              text-align: center;
                            }
                        }
                    }
                    tr:nth-child(even) {
                        background: #E5F0FF;
                    }
                }
            }
        }
    }
    .yalui_btn {
        padding-bottom: 24px;
        width: 100%;
        text-align: center;
    }
}

#sendgoods_price {
    padding-left: 53px;
    padding-right: 53px;
    text-align: center;
    h2 {
        padding: 40px 0;
        font-size: 18px;
        color: #333;
    }
    > div {
        margin-top: 50px;
        text-align: center;
        button {
            width: 100px;
        }
    }
}

 #sendgoods_shen {
     h2 {
         text-align: center;
         padding-top: 30px;
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

#sendgoods {
    padding-left: 53px;
    padding-right: 53px;
    .kuang {
        width: 100%;
        padding: 30px 0;
        li {
            text-align: center;
            font-size: 16px;
        }
        .title {
             padding-bottom: 20px;
             font-size: 18px;
        }
    }
    
    button {
        width: 120px;
        height: 36px;
        border-radius: 4px;
        border: none;
        font-size: 15px;
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
