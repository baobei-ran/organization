<template>
    <div id="equipmentApply" class="">
        <div class="bg_f Pd-L24 Pd-T24" style="width:87.7%">
            <div class="clear Ft-S16 Pd-B24 Pd-R24">
                <span class="fl Mg-R22">医疗设备分类：</span>
                <ul class="fl head_tab">
                    <li class="fl Mg-R32 pointer" :class="{'Color_blue':inactive==0}" @click="select(0)">全部</li>
                    <li class="fl Mg-R32 pointer" :class="{'Color_blue':inactive==1}" @click="select(1)">呼吸机</li>
                    <li class="fl Mg-R32 pointer" :class="{'Color_blue':inactive==2}" @click="select(2)">监护仪</li>
                    <li class="fl Mg-R32 pointer" :class="{'Color_blue':inactive==3}" @click="select(3)">心电图机</li>
                    <li class="fl Mg-R32 pointer" :class="{'Color_blue':inactive==4}" @click="select(4)">麻醉剂</li>
                    <li class="fl Mg-R32 pointer" :class="{'Color_blue':inactive==5}" @click="select(5)">分析仪</li>
                    <li class="fl Mg-R32 pointer" :class="{'Color_blue':inactive==6}" @click="select(6)">X射线机</li>
                    <li class="fl Mg-R32 pointer" :class="{'Color_blue':inactive==7}" @click="select(7)">超声仪器</li>
                    <li class="fl pointer" :class="{'Color_blue':inactive==8}" @click="select(8)">医用病床</li>
                </ul>
                <span class="fr head_btn pointer" @click="go('/server/equipmenApply/equipmenjl')">申请记录</span>
            </div>
            <ul class="good_list clear">
                <li class="good_list_li ac fl Mg-R24 Mg-B24" v-for="val in 15">
                    <div>
                        <img src="../../common/image/pages/yi/supply_03.jpg" width="206px" height="188px" alt="">
                    </div>
                    <p class="Mg-T16 Ft-S14 Color_black">【必利劲】推车式彩超</p>
                    <p class="Mg-T10 Ft-S14 Color_orange">￥5000.00-10000.00</p>
                    <span class="Mg-T12 adddan pointer" @click="godetail">加入申请单</span>
                </li>
            </ul>
            <div id="page" class="ac Mg-T30"></div>
        </div>
        <ul class="aside">
            <li class="pointer" @click="eqlist"><span class="icon_num"><i class="add_num">0</i></span></li>
            <li class="pointer"><span class="icon_up"></span></li>
        </ul>
        <div id="sendgoods" class="hide delcode">
            <div style="width: 720px;" class="Mg-T26">
                <div class="table-head ac">
                    <table>
                        <colgroup>
                            <col style="width: 80px;" />
                            <col />
                        </colgroup>
                        <thead>
                            <tr>
                                <td class="Color_black Ft-S16" width="150px">设备名称</td>
                                <td width="130px">
                                    型号
                                </td>
                                <td width="130px">价格</td>
                                <td width="130px">数量</td>
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
                                <td class="Color_black Ft-S16" width="150px">推车式彩超</td>
                                <td width="130px"> H2468595</td>
                                <td width="130px">50000.00</td>
                                <td width="130px">2</td>
                                <td width="110px"><span class="pointer Color_blue">删除</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <p class="ac">
                <span class="Mg-R24"><button class="cancel pointer">返回</button></span>
                <span class=""><button class="send pointer">提交</button></span>
            </p>
        </div>
    </div>
</template>
<script>
export default {
    name: 'equipmentApply',
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
        godetail(){
            this.go('/server/equipmenApply/equipmendetail')
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
                    area: ["800px", "640px"],
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
#equipmentApply {
    .aside {
        position: absolute;
        right: 20px;
        top: 60%;
        z-index: 66;
        li {
            width: 60px;
            height: 60px;
            text-align: center;
            background: #fff;
            border: 1px solid rgba(221, 221, 221, 1);
            .icon_num {
                display: inline-block;
                width: 36px;
                height: 36px;
                margin-top: 12px;
                background: url(../../common/image/pages/yi/icon_sqqd.png)
                    no-repeat center;
                position: relative;
                .add_num {
                    position: absolute;
                    top: -6px;
                    right: -4px;
                    font-style: normal;
                    display: inline-block;
                    width: 16px;
                    height: 16px;
                    line-height: 16px;
                    color: #fff;
                    font-size: 12px;
                    background: rgba(255, 0, 0, 1);
                    opacity: 0.8;
                    border-radius: 50%;
                }
            }
            .icon_up {
                display: inline-block;
                width: 36px;
                height: 36px;
                margin-top: 12px;
                background: url(../../common/image/pages/yi/icon_zd.png)
                    no-repeat center;
            }
        }
        li:first-child {
            border-bottom: none;
        }
    }
    .head_btn {
        font-size: 14px;
        color: #3196ff;
        border: 1px solid #3196ff;
        width: 80px;
        height: 28px;
        line-height: 28px;
        text-align: center;
        border-radius: 4px;
    }
    @media (max-width: 1530px) {
        .head_tab {
            li {
                margin-right: 10px !important;
            }
            li:last-child {
                margin-right: 0px !important;
            }
        }
    }
    .good_list {
        .good_list_li {
            width: 240px;
            height: 350px;
            border: 1px solid rgba(221, 221, 221, 1);
            line-height: 14px;
            div {
                text-align: center;
                padding: 24px 0px 28px;
                border-bottom: 1px solid rgba(221, 221, 221, 1);
            }
            .adddan {
                display: inline-block;
                width: 100px;
                height: 30px;
                line-height: 30px;
                background: rgba(49, 150, 255, 1);
                border-radius: 4px;
                color: #fff;
                font-size: 14px;
            }
        }
    }
    #sendgoods {
        padding-left:40px;
        .table-head {
            padding-right: 17px;
            color: #000;
            height:50px;
            line-height: 50px;
            font-size: 16px;
            color: #333;
            background:rgba(241,242,249,1);
            border:1px solid rgba(194,195,195,1);
        }
        .table-body {
            width: 100%;
            height: 400px;
            border-left:1px solid rgba(194,195,195,1);
            border-right:1px solid rgba(194,195,195,1);
            border-bottom:1px solid rgba(194,195,195,1);
            overflow-y: scroll;
            tr{
                height: 40px;
            }
        }
        .table-head table,
        .table-body table {
            width: 100%;
        }
        .table-body table tr:nth-child(2n + 1) {
            background:rgba(241,242,249,1);
        }
        button {
            width:120px;
            height:40px;
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
