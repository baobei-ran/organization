<template>
    <div id="orderList">
        <div class="pass_test" v-if='tests'>
            <span>您好，您的资料已审核通过！</span>
            <button class="layui-btn layui-btn-sm layui-btn-normal" @click='cancelTest'>我知道了</button>
        </div>
        <div  class="bg_f"  style="height:100%">
        <p class="orderList_tit Color_black Ft-S16 Pd-T24 Pd-B24 Pd-L24">处方单申请 <button class="layui-btn layui-btn-normal" @click='outApply'>选择处方单医生</button></p>
        <div class="tab_content Pd-L24 Pd-R24">
            <div class="layui-tab Pd-T10">
               
                <div class="layui-tab-content">
                   
                    <table class="layui-table" lay-skin="">
                        <thead>
                            <tr class="Color_black table_headtr ac">
                                <td class="firstheadtd">序号</td>
                                <td>医生姓名</td>
                                <td>医生职称</td>
                                <td>医生执业医院</td>
                                <td>服务时间段</td>
                                <td>操作</td>
                            </tr>
                        </thead>
                        <tbody v-if='tableList.length'>
                            <tr class="table_con Color_black ac" v-for="(val,index) in tableList">
                                <td v-text="index+1"></td>
                                <td v-text="val.true_name"></td>
                                <td v-text='val.gname'></td>
                                <td v-text="val.hospital_name"></td>
                                <td>{{ val.busktime }} - {{ val.busjtime }}</td>
                                <td>
                                    <div>
                                        <p class="pointer Ft-S14 Color_blue al" style="width:80px;margin:0 auto" @click="delcode(val)"><i class="seedetail_icon Mg-R5"></i>处方记录</p>
                                        <p class="pointer Ft-S14 Mg-T14 Color_blue al" style="width:80px;margin:0 auto" v-if='val.type == 2' @click="sendgoods(val)"><i class="sendhw_icon Mg-R5"></i>申诉解除关联</p>
                                        <p class="pointer Ft-S14 Mg-T14 Color_blue al" style="width:80px;margin:0 auto" v-if='val.type == 1'><i class="sendhw_icon Mg-R5"></i>解除关联申诉中</p>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                        <tbody v-else>
                            <tr class="table_con Color_black ac" >
                                <td colspan='7'>暂无相关数据！<span @click='outApply' class="btns">选择处方单医生</span>后可进行处方单申请</td>
                            </tr>
                        </tbody>
                    </table>
                    <div id="page" v-show='tableList.length > 10' class="ac Mg-T30"></div>
                </div>
            </div>
        </div>




        <div id="sendgoods" class="hide">
            <table width="100%">
                <tr>
                    <td class="Color_black Ft-S16" width="90px"><span class="Color_red">*</span>配送公司</td>
                    <td><input type="text" ></td>
                </tr>
                <tr>
                    <td class="Color_black Ft-S16"><span class="Color_red">*</span>物流单号</td>
                    <td><input type="text" ></td>
                </tr>
            </table>
            <p class="clear">
                <span class="fl"><button class="cancel pointer" @click='cancel'>取消</button></span>
                <span class="fr"><button class="send pointer" @click="sendup">发货</button></span>
            </p>
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

    </div>
</template>
<script>
export default {
    name: 'orderList',
    data() {
        return {
            tests: false,        // 审核通过提示
            tableList: [],              // 数据列表
            headernum: '',
            
        }
    },
    mounted() {
       
       this.initdata()
    },
    methods: {
        cancelTest() {  // 关闭审核通过提示
            this.tests = !this.tests
        },
        initdata() {   // 数据
            let _this = this;
            layui.use("layer", function () {
                var layer = layui.layer;
                _this.$http.post('/shv2/Recipe/recipe_doc',{}, function (res) {//
                    console.log(res)
                    if (res.code == 1) {
                       _this.tableList = res.data
                    } else {
                    }
                }, function (err) { console.log(err) });

            });
        },
        outApply () {   // 进入处方单医生页
            this.go('/server/Yaodoctorprescription/prescriptionApply')
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
                            
                        }
                    }
                });
            });
        },
       
       
        delcode(id) { // 处方记录
            var _this = this;
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
        sendgoods(val) {    // 申诉解除机构
            
            var _this = this;
            layui.use('layer', function(){
                var layer = layui.layer;
                _this.$http.post('/shv2/Recipe/recipe_docuncoil', { id: val.did}, function (res) {
                    console.log(res)
                    if (res.code == 1) {
                        layer.msg('申请成功');
                    } else {
                        layer.msg('申请失败');
                    }
                }, function (err) { console.log(err)})
                
            }); 
            // layui.use(["layer"], function () {
            //     var layer = layui.layer;
            //     var $ = layui.jquery;
            //     layer.open({
            //         type: 1,
            //         shade: 0.2,
            //         shadeClose: true,
            //         closeBtn: 1,
            //         title: "订单发货",
            //         content: $("#sendgoods"),
            //         area: ["560px", "340px"],
            //         cancel: function () { }
            //     });
            //     $(".layui-layer-title").css({
            //         height: "50px",
            //         background: "#ECF2FB",
            //         "line-height": "50px",
            //         fontSize: '18px'
            //     });
            //     $(".layui-layer-setwin").css("top", "19px");
            // });
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
      
    }
}
</script>

<style scoped lang="less">
#orderList {
    height: 100%;
    .pass_test {
        color: #3196FF;
        padding: 18px 24px;
        background: rgb(234,244,255);
        border: 1px solid #3196FF;
        margin-bottom: 20px;
    }
    .orderList_tit {
        border-bottom: 1px solid #e6e6e6;
        button {
            float: right;
            height: 30px;
            line-height: 30px;
            margin-right: 30px;
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
                    .table_con {
                        background: #fff;

                        td {
                            padding: 30px 0px;
                            font-size: 14px;
                            .btns {
                                color: #3196FF;
                                cursor: pointer;
                            }
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
