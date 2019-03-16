<template>
    <div id="adddoctorParabiose" class="Mg-T40">
        <p style="background:#FFFAD7;height:32px;color:#F0A228;line-height:32px;position:absolute;top:23px; width:96.5%;z-index:6666" class="Ft-S16 Pd-L24">提示：您当前为二甲医院，可绑定1家上级医疗机构和10家下级医疗机构</p>
        <div class="tab_content Pd-L24 Pd-R24 bg_f">
            <div class="layui-tab">
                <div class="layui-tab-content">
                    <div class="screen_type Mg-T14 ">
                        <div class="layui-form-item layui-row">
                            <div class="layui-col-md5">
                                <div class="layui-inline lay_width">
                                    <label class="layui-form-label" style="width:90px;">机构所在地</label>
                                    <select name="city" lay-verify="required" class="select_class">
                                        <option value="">请选择省</option>
                                        <option value="010">xx</option>
                                        <option value="021">xx</option>
                                        <option value="0571">xx</option>
                                    </select>
                                    <select name="city" lay-verify="required" class="select_class">
                                        <option value="">请选择市</option>
                                        <option value="010">xx</option>
                                        <option value="021">xx</option>
                                        <option value="0571">xx</option>
                                    </select>
                                    <select name="city" lay-verify="required" class="select_class">
                                        <option value="">请选择县\区</option>
                                        <option value="010">xx</option>
                                        <option value="021">xx</option>
                                        <option value="0571">xx</option>
                                    </select>
                                </div>
                            </div>
                            <div class="layui-col-md2">
                                <div class="layui-inline lay_width">
                                    <label class="layui-form-label">机构类型</label>
                                    <select name="city" lay-verify="required" class="select_class">
                                        <option value="">全部</option>
                                        <option value="010">xx</option>
                                        <option value="021">xx</option>
                                        <option value="0571">xx</option>
                                    </select>
                                </div>
                            </div>
                            <div class="layui-col-md2">
                                <div class="layui-inline lay_width">
                                    <label class="layui-form-label">机构级别</label>
                                    <select name="city" lay-verify="required" class="select_class">
                                        <option value="">全部</option>
                                        <option value="010">xx</option>
                                        <option value="021">xx</option>
                                        <option value="0571">xx</option>
                                    </select>
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
                                <td>机构名称</td>
                                <td>机构级别</td>
                                <td>医生数量</td>
                                <td>科室数量</td>
                                <td>被关联数量</td>
                                <td>平均返佣比例</td>
                                <td>机构所在地</td>
                                <td>操作</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="val in 10">
                                <td>0001</td>
                                <td>北京市同仁医院</td>
                                <td>三甲</td>
                                <td>2004</td>
                                <td>44</td>
                                <td>200</td>
                                <td>8%</td>
                                <td>山东省济南市网下区木连城街道...</td>
                                <td>
                                    <span class="Color_blue pointer">关联</span>
                                    <!-- <span class="Color_default">已关联</span> -->
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div id="page" class="ac Mg-T30"></div>
                </div>
            </div>
        </div>
        <p class="ac"><span class="Color_white Ft-S16 goback pointer" @click="go('/server/YaodrugParabiose')">返回</span></p>
    </div>
</template>
<script>
export default {
    name: 'adddoctorParabiose',
    data() {
        return {

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
        tab(num) {
            this.tdlast = num
        }
    }
}
</script>

<style scoped lang="less">
#adddoctorParabiose {
    .goback {
        display: inline-block;
        width: 120px;
        height: 40px;
        line-height: 40px;;
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
                .layui-input-inline {
                    font-size: 14px;
                    width: 120px;
                    input {
                        height: 38px;
                    }
                }
                .select_class {
                    width: 120px;
                    height: 38px;
                    border: 1px solid #ddd;
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
}
</style>
