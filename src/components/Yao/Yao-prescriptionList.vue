<template>
    <div id="orderList" class="bg_f" style="height:100%">
        <p class="orderList_tit Color_black Ft-S16 Pd-T24 Pd-B24 Pd-L24">订单列表</p>
        <div class="tab_content Pd-L24 Pd-R24">
            <div class="layui-tab Pd-T24">
                <ul class="layui-tab-title">
                    <li class="layui-this" @click="tab(0)">全部</li>
                    <li @click="tab(1)">未接单</li>
                    <li @click="tab(2)">等待中</li>
                    <li @click="tab(3)">已开具</li>
                    <li @click="tab(4)">已拒绝</li>
                </ul>
                <div class="layui-tab-content">
                    <div class="screen_type Pd-B24 Mg-T14 Mg-B24  dis_f">
                        <div class="layui-form-item selecttime dis_f">
                            <div class="layui-inline">
                                <label class="layui-form-label">处方申请时间</label>
                                <div class="layui-input-inline" style="width:180px">
                                    <input type="text" name="price_min" placeholder="" v-model="list.ktime" id="date" autocomplete="off" class="layui-input date_icon">
                                </div>
                                <div class="layui-form-mid">-</div>
                                <div class="layui-input-inline" style="width:180px">
                                    <input type="text" name="price_max" placeholder="" v-model="list.jtime" id="date1" autocomplete="off" class="layui-input date_icon">
                                </div>
                            </div>
                            <div class="layui-inline lay_width">
                                <label class="layui-form-label">处方单编号</label>
                                <div class="layui-input-inline">
                                    <input type="text" name="" v-model="list.order_code" autocomplete="off" class="layui-input">
                                </div>
                            </div>
                            <p class=" Pd-L50">
                                <span class="Ft-S14 selectbtn ac pointer" @click="search">筛选订单</span>
                                <span class="Color_blue pointer Ft-S14 Mg-L24" @click='empty'>清空筛选条件</span>
                            </p>

                        </div>
                       
                    </div>
                    <table class="layui-table" lay-skin="">
                        <thead>
                            <tr class="Color_black table_headtr ac">
                                <td class="firstheadtd">序号</td>
                                <td>处方订单号</td>
                                <td>处方单申请时间</td>
                                <td>处方单状态</td>
                                <td>发送医生</td>
                                <td>处方单编号</td>
                                <td>操作</td>
                            </tr>
                        </thead>
                        <tbody v-if='tableList.length'>
                            <tr class="table_con Color_black ac" >
                                <td>1</td>
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
                                <td>
                                    <p class="pointer Ft-S14 Color_blue al" style="width:80px;margin:0 auto" @click="godetail()">查看详情</p>
                                    <p class="pointer Ft-S14 Color_blue al" style="width:80px;margin:0 auto" @click="del()">删除</p>
                                    <p class="pointer Ft-S14 Color_blue al" style="width:80px;margin:0 auto" @click="delcode">再次提交</p>
                                </td>
                            </tr>
                            <tr class="table_con Color_black ac" >
                                <td>1</td>
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
                                <td>
                                    <p class="pointer Ft-S14 Color_blue al" style="width:80px;margin:0 auto" @click="godetail()">查看详情</p>
                                    <p class="pointer Ft-S14 Color_blue al" style="width:80px;margin:0 auto" @click="del()">删除</p>
                                    <p class="pointer Ft-S14 Color_blue al" style="width:80px;margin:0 auto" @click="delcode">再次提交</p>
                                </td>
                            </tr>
                            <tr class="table_con Color_black ac" >
                                <td>1</td>
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
                                <td>
                                    <p class="pointer Ft-S14 Color_blue al" style="width:80px;margin:0 auto" @click="godetail()">查看详情</p>
                                    <p class="pointer Ft-S14 Color_blue al" style="width:80px;margin:0 auto" @click="del(1)">删除</p>
                                    <p class="pointer Ft-S14 Color_blue al" style="width:80px;margin:0 auto" @click="delcode">再次提交</p>
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

       
        <div id="sendgoods" class="hide delcode">
            <table width="100%" class="Mg-T50">
                <tr>
                    <td class="Color_black Ft-S16" width="90px"><span class="Color_red">*</span>核销码</td>
                    <td>
                        <input type="text">
                        <p class="Color_red Ft-S12" style="position:absolute; z-index:100;margin-top:5px"><i class="tan_icon"></i>核销码不存在</p>
                    </td>
                </tr>
            </table>
            <p class="clear">
                <span class="fl"><button class="cancel pointer" @click='cancel'>取消</button></span>
                <span class="fr"><button class="send pointer">发货</button></span>
            </p>
        </div>

    </div>
</template>
<script>
export default {
    name: 'orderList',
    data() {
        return {
            list: {
                status: 0,
                order_code: '',
                ktime: '',
                jtime: '',
                page: 1,
                limit: 10
            },
            tableList: [],
        }
    },
    mounted() {
        this.tab(0)
    },
    methods: {
        tab(type) {
            this.status = type;
            this.initdata(type, 1)
        },
        initdata(type, num) {   // 数据
            let _this = this;
            layui.use(["laypage", "layer", "laydate", "element"], function () {
                var element = layui.element;
                var laydate = layui.laydate;
                laydate.render({
                    elem: "#date",
                });
                laydate.render({
                    elem: "#date1",
                });
                var oDate1 = new Date($('#date').val());
                var oDate2 = new Date($('#date1').val());
                if (oDate1.getTime() > oDate2.getTime()) {
                    layer.msg('开始时间不能大于结束时间', { icon: 5});
                    return
                }
                _this.list.page = num;
                _this.list.status = type;
                _this.list.ktime = $('#date').val();
                _this.list.jtime = $('#date1').val();
                _this.$http.post('/shv2/recipe/recipe_index', _this.list, function (res) {//
                    console.log(res)
                    if (res.code == 1) {
                        _this.headernum = res;
                        _this.tableList = res.data;
                        if (num == 1) {
                            //分页
                            _this.pageFun(res.count)
                        }
                    } else {
                        _this.tableList = ['1'];
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
            if (!$('#date').val() && !$('#date1').val() && !_this.list.order_code) {
                layer.msg('请输入内容', { icon: 5});
                return false;
            }
            _this.initdata(_this.list.status, 1)
            
          });
           
        },
        godetail(val) {    // 查看详情
            this.go('/server/YaoprescriptionList/prescriptionCheck')
        },
        delcode() { // 核销
            layui.use(["layer"], function () {
                var layer = layui.layer;
                var $ = layui.jquery;
                layer.open({
                    type: 1,
                    shade: 0.2,
                    shadeClose: true,
                    closeBtn: 1,
                    title: "自取核销",
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
                order_code: '',
                ktime: '',
                jtime: '',
            }
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
        border-bottom: 1px solid #e6e6e6;
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
                  width: 100px;
                    padding: 7px 10px 7px 0px;
                }
                .layui-input-inline {
                  margin: 0;
                    input {
                        height: 34px;
                    }
                    .date_icon {
                        background: url(../../common/image/pages/account/icon_sj.png)
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
                            padding: 20px 0px;
                            font-size: 14px;
                            border:0;
                            >p {
                            line-height: 30px;
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
