<template>
    <div id="equipmentjl" class="">
        <div class="tab_content Pd-L24 Pd-R24 bg_f">
            <div class="layui-tab">
                <div class="layui-tab-content">
                    <div class="screen_type Mg-T14 ">
                        <div class="layui-form-item layui-row">
                            <div class="layui-col-md4">
                                <div class="layui-inline lay_width">
                                    <label class="layui-form-label">申请时间</label>
                                    <div class="layui-input-block">
                                        <div class="layui-input-inline">
                                            <input type="text" name="price_min" placeholder="yyyy-MM-dd" id="date" autocomplete="off" class="layui-input">
                                        </div>
                                        <div class="layui-form-mid">-</div>
                                        <div class="layui-input-inline">
                                            <input type="text" name="price_max" placeholder="yyyy-MM-dd" id="date1" autocomplete="off" class="layui-input">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="layui-col-md1">
                                <div class="layui-input-inline">
                                    <span class="Ft-S14 selectbtn ac pointer">查询</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <table class="layui-table" lay-skin="nob" lay-even>
                        <thead>
                            <tr class="Color_black table_headtr ac">
                                <td>序号</td>
                                <td>申请设备</td>
                                <td>申请时间</td>
                                <td>操作</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="val in 10">
                                <td>0001</td>
                                <td>推车式彩超、推车式彩超、推车式彩超、推车式彩超、推车式彩超、推车式彩超、推车式彩超...</td>
                                <td>2018-09-04 01:53</td>
                                <td>
                                    <span class="Color_blue pointer" @click="eqlist">查看</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div id="page" class="ac Mg-T30"></div>
                </div>
            </div>
        </div>
        <p class="ac"><span class="Color_white Ft-S16 goback pointer" @click="go('/server/doctorParabiose')">返回</span></p>
        <div id="sendgoods" class="hide delcode">
            <div style="width: 640px;" class="Mg-T26">
                <div class="table-head ac">
                    <table>
                        <colgroup>
                            <col style="width: 80px;" />
                            <col />
                        </colgroup>
                        <thead>
                            <tr>
                                <td class="Color_black Ft-S16" width="160px">设备名称</td>
                                <td width="120px">
                                    型号
                                </td>
                                <td width="120px">价格</td>
                                <td width="80px">数量</td>
                                <td width="110px">操作</td>
                            </tr>
                        </thead>
                    </table>
                </div>
                <div class="table-body ac">
                    <table>
                        <colgroup>
                            <col style="width: 80px;" />
                            <col />
                        </colgroup>
                        <tbody>
                            <tr v-for="val in 30">
                                <td class="Color_black Ft-S16" width="160px">推车式彩超</td>
                                <td width="120px"> H2468595</td>
                                <td width="120px">50000.00</td>
                                <td width="80px">2</td>
                                <td width="110px"><span class="pointer Color_blue">删除</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <p class="ac">
                <span><button class="send pointer">返回</button></span>
            </p>
        </div>
    </div>
</template>
<script>
export default {
    name: 'equipmentjl',
    data() {
        return {
            inactive: 0
        }
    },
    mounted() {
        this.initdata()
    },
    methods: {
        initdata() {
            layui.use(["laypage", "layer", "laydate", "element"], function () {
                var element = layui.element;
                var laypage = layui.laypage;
                var laydate = layui.laydate;
                laydate.render({
                    elem: "#date" //指定元素
                });
                laydate.render({
                    elem: "#date1" //指定元素
                });
                laypage.render({
                    elem: "page", //注意，这里的 test1 是 ID，不用加 # 号
                    count: 50, //数据总数，从服务端得到
                    limit: 10, //每页条数
                    layout: ["prev", "page", "next", "skip"],
                    groups: 4,
                    // prev:
                    //     '<img src="../../common/image/pages/account/icon_left.png" style="margin-top:-3px;" alt="" />',
                    // next:
                    //     '<img src="../../common/image/pages/account/icon_right.png" style="margin-top:-3px;"  alt="" />'
                });
            });
        },
        godetail() {

        },
        select(num) {
            this.inactive = num
        },
        eqlist() {
            layui.use(["layer"], function () {
                var layer = layui.layer;
                var $ = layui.jquery;
                layer.open({
                    type: 1,
                    shade: 0.2,
                    shadeClose: true,
                    closeBtn: 1,
                    title: "医疗申请单",
                    content: $(".delcode"),
                    area: ["720px", "640px"],
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
    }
}
</script>

<style scoped lang="less">
#equipmentjl {
    .goback {
        display: inline-block;
        width: 120px;
        height: 40px;
        line-height: 40px;
        background: rgba(49, 150, 255, 1);
        border-radius: 4px;
        margin-top: 24px;
    }
    .layui-table[lay-even] tr:nth-child(even) {
        background-color: #e5f0ff;
    }
    .screen_type {
        .layui-form-item {
            .lay_width {
                width: 100%;
                .layui-form-label {
                    width: 66px;
                    padding: 9px 10px 9px 0px;
                }
                .layui-input-block{
                    margin-left:70px;
                }
                .layui-input-inline {
                    font-size: 14px;
                    input {
                        height: 38px;
                    }
                }
            }
        }
        .selectbtn {
            display: inline-block;
            color: #3196ff;
            background: #fff;
            width: 50px;
            height: 28px;
            line-height: 28px;
            border: 1px solid #3196ff;
            border-radius: 4px;
            position: relative;
            top: 5px;
        }
    }
    .tab_content {
        .layui-tab-content {
            padding-left: 1px;
            padding-right: 1px;
            .layui-table {
                outline: 1px solid rgba(221, 221, 221, 1);
                text-align: center;
                .table_headtr {
                    height: 50px;
                    background: #dae9ff;
                    td {
                        font-size: 16px;
                    }
                }
                tbody {
                    td {
                        height: 40px;
                        font-size: 14px;
                        color: #666;
                    }
                }
            }
        }
    }
    #sendgoods {
        padding-left: 40px;
        .table-head {
            padding-right: 17px;
            color: #000;
            height: 50px;
            line-height: 50px;
            font-size: 16px;
            color: #333;
            background: rgba(241, 242, 249, 1);
            border: 1px solid rgba(194, 195, 195, 1);
        }
        .table-body {
            width: 100%;
            height: 400px;
            border-left: 1px solid rgba(194, 195, 195, 1);
            border-right: 1px solid rgba(194, 195, 195, 1);
            border-bottom: 1px solid rgba(194, 195, 195, 1);
            overflow-y: scroll;
            tr {
                height: 40px;
            }
        }
        .table-head table,
        .table-body table {
            width: 100%;
        }
        .table-body table tr:nth-child(2n + 1) {
            background: rgba(241, 242, 249, 1);
        }
        button {
            width: 120px;
            height: 40px;
            border-radius: 4px;
            border: none;
            font-size: 16px;
            margin-top: 30px;
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
}
</style>
