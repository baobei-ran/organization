<template>
    <div id="recipeShenhe" class="bg_f" style="height:100%">
        <div class="orderList_tit Color_black Ft-S16 Pd-T24 Pd-B24 Pd-L24">
            <p class="head-title" v-show="!tilteMsg"><span @click='btnServeMsg'>服务说明</span></p>
            <transition name='fade'>
                <div class="perscription_title" v-show='tilteMsg'>
                    <p class="head-title"><span>服务说明</span></p>
                    <div class="perscription_msg_box" >
                        <div>
                            <p>药店开通处方服务后，平台医生向患者开具处方将选择药店药品，药店须由药师审核处方，患者方可购买。</p>
                            <p>请确保开通处方服务，以及线上药品种类齐全。</p>
                        </div>
                        <span class="show_btn pointer" @click='btnServeMsg'><img src="../../../common/image/icon/icon_sq.png" alt=""></span>
                    </div>
                </div>
             </transition>
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
                    <label class="layui-form-label">患者姓名</label>
                    <div class="layui-input-inline" style="width:160px">
                        <input type="text" v-model="list.name" autocomplete="off" class="layui-input">
                    </div>
                </div>
                <div class="layui-inline Mg-L10 lay_width">
                    <label class="layui-form-label">开具医生</label>
                    <div class="layui-input-inline" style="width:160px">
                        <input type="text" v-model="list.doc" autocomplete="off" class="layui-input">
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
                        <li class="layui-this" @click="tab(1)">全部（{{ recipeCount.type1 }}）</li>
                        <li @click="tab(2)">待审核（{{ recipeCount.type2 }}）</li>
                        <li @click="tab(3)">已审核（{{ recipeCount.type3 }}）</li>
                        <li @click="tab(4)">已过期（{{ recipeCount.type4 }}）</li>
                    </ul>
                </div>
                <div class="layui-tab-content">
                    
                    <div>
                        <table class="layui-table" lay-skin="">
                            <thead>
                                <tr class="Color_black table_headtr ac">
                                    <td class="firstheadtd">序号</td>
                                    <td>处方编号</td>
                                    <td>开具医生姓名</td>
                                    <td>患者姓名</td>
                                    <td>处方状态</td>
                                    <td >操作</td>
                                </tr>
                            </thead>
                            <tbody v-if='tableList.length'>
                                <tr class="table_con Color_black ac" v-for='(val,i) in tableList' :key='i'>
                                    <td>{{ i+1 }}</td>
                                    <td>
                                        <span>{{ val.number }}</span>
                                        <img style="width: 19px;" src='../../../common/image/icon/icon_copy@2x.png' alt='' />
                                    </td>
                                    <td class="doc_name">
                                        <span>王二小</span>
                                        <img src="../../../common/image/icon/bq_hzz.png" alt="" />
                                    </td>
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
                                    
                                    <td class="dis_f dis_js" style="max-width: 200px; margin: 0 auto;">
                                        <p class="pointer Ft-S14 Color_blue al"  @click="godetail(val.id)">查看详情</p>
                                        <p class="pointer Ft-S14 Color_blue al"  @click="lookover(val.id)">查看处方</p>
                                        <p v-show="tabStatus == 1 || tabStatus == 2" class="pointer Ft-S14 Color_blue al"  @click="yao_set(val.id)">审核</p>
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
                    <div id="page" v-show='tableList.length' class="ac Mg-T30"></div>
                </div>
            </div>
        </div>


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
                    <el-button type="primary" @click="yaoAudit" :loading="disabled">保存</el-button>
                </span>
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
                doc: '',
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
            tilteMsg: false,      // 服务说明显示与否
            disabled: false,      // 审核 loading 
        }
    },
    mounted () {
    
    },
    activated () {
        this.tab(this.tabStatus)
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
            if (val) {
                this.go('/server/YaoRecipeShenhe/YaoRecipeDetails?id='+ val)
            }
            
        },
        empty() {   // 清空
           this.list = {
                doc: '',
                name: '',
                ktime: '',
                jtime: '',
            }
            this.initdata(this.tabStatus, 1)
        },
        
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
                    area: ["520px", "400px"],
                    cancel: function () { }
                });
            });
        },
        yaoAudit () {  // 药师审核结果
            var _this = this;
            this.disabled = true;
            layui.use(["layer"], function () {
                var layer = layui.layer;
                _this.$http.post('/shv2/recipetwo/recipe_audit', { id: _this.he_id, type: _this.radioVal,text: _this.txt }, function (res) {  // 审核接口
                    console.log(res)
                    _this.disabled = false;
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
        },
        btnServeMsg () { // 服务说明按钮
            this.tilteMsg = !this.tilteMsg
        },
        lookover(id){ // 查看处方
            this.$alert('<span class="el-MsgBox-txt" >该处方已过期！</span>', '服务提示', {
                confirmButtonText: '确认',
                dangerouslyUseHTMLString: true,
                center: true,
                showClose: false,
                confirmButtonClass: 'el-MsgBox-btn',
            })
        },
        
    }
}
</script>

<style scoped lang="less">
.fade-enter-active, .fade-leave-active {
  transition: transform .3s ease-out;
}

.fade-enter, .fade-leave-to {
    transform: translateY(-400px);
}
#recipeShenhe {
    height: 100%;
    .orderList_tit {
        border-bottom: 1px solid #e6e6e6;
        >p {
            padding: 12px 20px;
            border: 1px dashed #ddd;
        }
        .head-title {
            display: inline;
            border-radius: 4px;
            span {
                padding-left: 32px;
                background: url('../../../common/image/icon/icon_fwsm.png') no-repeat left center;
                background-size: 20px;
                cursor: pointer;
            }
        }
        .perscription_title {
            border: 1px dashed #DDD;
            -webkit-border-radius: 8px;
            border-radius: 8px;
            padding: 20px 0 0px  24px;
            font-size: 14px;
            margin-right: 24px;
            >p {
                span {
                    background-size: 22px;
                    padding-left: 35px;
                    font-size: 16px;
                }
            }
        .perscription_msg_box {
            margin-top: 20px;
            position: relative;
            padding-bottom: 24px;
            > div {
               > h2 {
                    font-size: 16px;
                    color: #333;
                    font-weight:500;
                    padding: 20px 0;
                    padding-left: 34px;
                    background: url('../../../common/image/icon/icon_fwsm.png') no-repeat left center;
                    background-size: 22px;
                }
                p {
                    color: #666;
                    line-height: 20px;
                    margin-top: 7px;
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
                        background: url(../../../common/image/pages/account/icon_sj.png)
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
                        .doc_name {
                              img {
                                width: 40px;
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


</style>
