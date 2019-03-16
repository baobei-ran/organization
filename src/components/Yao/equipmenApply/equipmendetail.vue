<template>
    <div id="equipmentdetail" class="">
        <div class="bg_f" style="width:87.7%">
            <p class="equipmentdetail_tit Pd-B24 Pd-T24 Pd-L24 Ft-S16 Mg-B24 Color_black">设备详情</p>
            <div class="clear detail_head Pd-B46 Pd-L24">
                <div class="fl silder">
                    <div class="layui-carousel" id="play" lay-filter="play">
                        <div carousel-item>
                            <div v-for="(val,index) in 10">{{index+1}}<img src="../../../common/image/pages/yi/supply_03.jpg" alt=""></div>
                        </div>
                        <p class="ar"><span class="slider_num">{{index+1}}/10</span></p>
                    </div>
                </div>
                <div class="fl Mg-L24" style="width:55%">
                    <p class="Ft-S18 Color_black Mg-B22">凯尔推车式B超 彩超</p>
                    <p class="Ft-S14 Mg-B22">
                        <table width="100%">
                            <tr>
                                <td width="50%"><span class="Color_black">产品型号：</span><span class="Color_gray6">CDAAA555A</span></td>
                                <td width="50%"><span class="Color_black">供货方式：</span><span class="Color_gray6">物流</span></td>
                            </tr>
                        </table>
                    </p>
                    <p class="Ft-S14 Mg-B22">

                        <table width="100%">
                            <tr>
                                <td width="50%"><span class="Color_black">生产品牌：</span><span class="Color_gray6">一路高歌</span></td>
                                <td width="50%"><span class="Color_black">产品价格：</span><span class="Color_orange">¥50000-¥80000</span></td>
                            </tr>
                        </table>
                    </p>
                    <p class="Ft-S14 Mg-B22"><span class="Color_black">适用范围：</span><span class="Color_gray6">医用</span></p>
                    <p class="Ft-S14 Mg-B60"><span class="Color_black">产品特点：</span><span class="Color_gray6">AAAAA</span></p>
                    <p class="Ft-S14 Pd-T20 Mg-B22">
                        <span class="Color_gray6">数量</span>
                        <el-input-number class="Mg-L36" v-model="num1" size="small" @change="handleChange" :min="1" label="描述文字"></el-input-number>
                    </p>
                    <p class="Pd-L60"><span class="addbtn Mg-L10">加入申请单</span></p>
                </div>
            </div>
            <div class="Pd-L24 Pd-R24 Pd-B24 detail_content">
                <div>
                    <p class="con_tab Mg-B24"><span>设备详情</span></p>
                    <p class="Mg-B24 Pd-L32 Pd-R32 Ft-S14 Color_black">凯尔B超—专业超声制造商。本公司大量供应KR系列全数字B超，分为：便携式B超、笔记本式B超、推车式B超、一体化B超、超导可视人流B超、兽用B超等十几个品种型号。</p>
                    <p class="Pd-L32 Mg-B24 "><img src="../../../common/image/pages/yi/1234_03.jpg" alt=""></p>
                </div>
            </div>
        </div>
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
        <ul class="aside">
            <li class="pointer" @click="eqlist"><span class="icon_num"><i class="add_num">0</i></span></li>
            <li class="pointer"><span class="icon_up"></span></li>
            <li class="pointer">
                <p>返回首页</p>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'equipmentdetail',
    data() {
        return {
            index: 0,
            num1: 1
        }
    },
    mounted() {
        this.initdata()
    },
    methods: {
        initdata() {
            var _this = this;
            layui.use(["laypage", "layer", "laydate", "element", "carousel"], function () {
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
                });
                var carousel = layui.carousel;
                carousel.on('change(play)', function (obj) {
                    _this.index = obj.index;
                });
                carousel.render({
                    elem: '#play'
                    , width: '100%' //设置容器宽度
                    , arrow: 'always', //始终显示箭头
                    indicator: 'none'
                });

            });

        },
        godetail() {

        },
        handleChange(value) {
            console.log(value);
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
<style>
.layui-carousel-arrow {
    border-radius: 0px !important;
    width: 25px;
    height: 40px;
}
.layui-carousel[lay-arrow="always"] .layui-carousel-arrow {
    left: 0px;
}
.layui-carousel[lay-arrow="always"] .layui-carousel-arrow[lay-type="add"] {
    right: 0px;
}
</style>

<style scoped lang="less">
#equipmentdetail {
    .equipmentdetail_tit {
        border-bottom: 1px solid #f1f2f9;
    }
    .detail_head {
        .silder {
            width: 380px;
            height: 382px;
            text-align: center;
            border: 1px solid #e6e6e6;
            #play {
                height: 380px !important;
                .slider_num {
                    position: relative;
                    top: -30px;
                    right: 10px;
                    background: #b1b1b1;
                    display: inline-block;
                    width: 45px;
                    height: 20px;
                    line-height: 20px;
                    border-radius: 10px;
                    text-align: center;
                    font-size: 12px;
                    color: #fff;
                }
            }
        }
        .addbtn {
            display: inline-block;
            width: 140px;
            height: 40px;
            text-align: center;
            background: rgba(49, 150, 255, 1);
            font-size: 16px;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            line-height: 40px;
        }
    }
    .detail_content {
        div {
            border: 1px solid rgba(230, 230, 230, 1);
            .con_tab {
                height: 50px;
                background: rgba(245, 245, 245, 1);
                border-bottom: 1px solid rgba(230, 230, 230, 1);
                span {
                    display: inline-block;
                    width: 140px;
                    height: 52px;
                    text-align: center;
                    line-height: 50px;
                    border-top: 2px solid #128dff;
                    border-right: 1px solid rgba(230, 230, 230, 1);
                    position: relative;
                    top: -1px;
                    background: rgba(255, 255, 255, 1);
                }
            }
        }
    }
    .aside {
        position: absolute;
        right: 60px;
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
                background: url(../../../common/image/pages/yi/icon_sqqd.png)
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
            p {
                width: 30px;
                margin: 10px auto;
            }
            .icon_up {
                display: inline-block;
                width: 36px;
                height: 36px;
                margin-top: 12px;
                background: url(../../../common/image/pages/yi/icon_zd.png)
                    no-repeat center;
            }
        }
        li:first-child {
            border-bottom: none;
        }
        li:nth-child(2) {
            border-bottom: none;
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
