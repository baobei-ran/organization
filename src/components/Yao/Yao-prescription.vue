<template>
    <div id="yaoPrescription">
        <div class="orderList_msg">
            <div class="pass_test" >
                <span>服务说明</span>
                <div :class="{'show_msg':tests}">
                    <p>云医康合作医生服务上线了，药店可选择云医康平台医生并申请合作，医生可为合作药店开具线上处方，增加药店的药品经营范围；合作医生在问诊过程中，若患者需要相应的药品治疗，医生可向患者推荐药店的药品。</p>
                    <p>药店可为店铺商品，设定佣金比例，医生向患者推荐药品，患者支付后，将按此比例向医生支付佣金，医生也将根据佣金比例范围及处方需求数量，选择是否与药店进行合作。</p>
                    <button class="pointer" @click='cancelTest'></button>
                </div>
            </div>
        </div>

         <div class="tab_content Pd-L24 Pd-R24">
            <div class="layui-tab">
                <ul class="layui-tab-title">
                    <li class="layui-this" @click="tab(1)">合作中医生</li>
                    <li @click="tab(2)">申请记录</li>
                    <li @click="tab(3)">合作终止记录</li>
                </ul>
                <div class="layui-tab-content">
                    <!-- 1 -->
                    <div class="layui-tab-item layui-show">
                        <table class="layui-table" lay-skin="">
                            <thead>
                                <tr class="Color_black table_headtr ac">
                                    <td class="firstheadtd">序号</td>
                                    <td>医生姓名</td>
                                    <td>职称</td>
                                    <td>科室</td>
                                    <td>执业医院</td>
                                    <td>合作时间</td>
                                    <td>开具处方数量</td>
                                    <td>操作</td>
                                </tr>
                            </thead>
                            <tbody v-if='tableList.length'>
                                <tr class="table_con Color_black ac" v-for='(val,i) in tableList' :key='i'>
                                    <td>{{ i+1 }}</td>
                                    <td>{{ val.true_name }}
                                        <img v-if='val.type == 1' style="width:40px;height:14px;" src="../../common/image/icon/icon_tzz.png" alt="">
                                    </td>
                                    <td>{{ val.gname }}</td>
                                    <td>{{ val.department_name }}</td>
                                    <td>{{ val.hospital_name }}</td>
                                    <td>{{ val.agree_time | moment }}</td>
                                    <td>{{ val.count }}</td>
                                    <td>
                                        <span class="pointer Ft-S14 Color_blue al" style="width:80px;margin:0 auto" @click="doc_detail(val.id,val.did)">查看</span>
                                    </td>
                                </tr>
                            </tbody>
                            <tbody v-else>
                                <tr class="table_con Color_black ac" >
                                    <td colspan='7'>暂无数据</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!-- 2 -->
                    <div class="layui-tab-item">
                        <table class="layui-table" lay-skin="">
                            <thead>
                                <tr class="Color_black table_headtr ac">
                                    <td class="firstheadtd">序号</td>
                                    <td>医生姓名</td>
                                    <td>职称</td>
                                    <td>科室</td>
                                    <td>执业医院</td>
                                    <td>申请方</td>
                                    <td>申请时间</td>
                                    <td>操作</td>
                                </tr>
                            </thead>
                            <tbody v-if='tableList.length'>
                                <tr class="table_con Color_black ac" v-for='(val,i) in tableList' :key='i'>
                                    <td>{{ i+1 }}</td>
                                    <td>{{ val.true_name }}
                                        <!-- <img v-if='val.type == 1' style="width:40px;height:14px;" src="../../common/image/icon/icon_tzz.png" alt=""> -->
                                    </td>
                                    <td>{{ val.gname }}</td>
                                    <td>{{ val.department_name }}</td>
                                    <td>{{ val.hospital_name }}</td>
                                    <td><span v-text='val.initiative == 1?"医生":"药店"'></span></td>
                                    <td>{{ val.addtime | moment }}</td>
                                    <td>
                                        <span v-if='val.status_s == 1' class="pointer Ft-S14 Color_blue al" style="width:80px;margin:0 auto" @click="success_cooperation(12)">同意合作</span>
                                        <span v-if='val.status_s == 0' class="pointer Ft-S14 al" :id="'hover_tips'+i" style="width:80px;margin:0 auto;color:#666;" 
                                            @mouseover="shows('hover_tips'+i+'')" @mouseout='hide_tips'>等待医生同意</span>
                                        <!-- <span class="Ft-S14 al" style="width:80px;margin:0 auto;color:#666;" >已合作</span> -->
                                    </td>
                                </tr>
                            </tbody>
                            <tbody v-else>
                                <tr class="table_con Color_black ac" >
                                    <td colspan='7'>暂无数据</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!-- 3 -->
                    <div class="layui-tab-item">
                        <table class="layui-table" lay-skin="">
                            <thead>
                                <tr class="Color_black table_headtr ac">
                                    <td class="firstheadtd">序号</td>
                                    <td>医生姓名</td>
                                    <td>职称</td>
                                    <td>科室</td>
                                    <td>执业医院</td>
                                    <td>合作终止方</td>
                                    <td>合作终止时间</td>
                                    <td>操作</td>
                                </tr>
                            </thead>
                            <tbody v-if='tableList.length'>
                                <tr class="table_con Color_black ac" v-for='(val,i) in tableList' :key='i'>
                                    <td>{{ i+1 }}</td>
                                    <td>{{ val.true_name }}
                                        <!-- <img style="width:40px;height:14px;" src="../../common/image/icon/icon_tzz.png" alt=""> -->
                                    </td>
                                    <td>{{ val.gname }}</td>
                                    <td>{{ val.department_name }}</td>
                                    <td>{{ val.hospital_name }}</td>
                                    <td><span v-text='val.revoke_state == 1?"医生":"药店"'></span></td>
                                    <td>{{ val.revoke_time | moment }}</td>
                                    <td>
                                        <span class="pointer Ft-S14 Color_blue al" style="width:80px;margin:0 auto" @click="doc_detail_zhi(val.id, val.did)">查看</span>
                                    </td>
                                </tr>
                            </tbody>
                            <tbody v-else>
                                <tr class="table_con Color_black ac" >
                                    <td colspan='7'>暂无数据</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                   



                    <div id="page" v-show='tableList.length' class="ac Mg-T30"></div>
                </div>
            </div>
        </div>



        
        <!-- <div  class="bg_f"  style="height:100%">
        <p class="orderList_tit Color_black Ft-S16 Pd-T24 Pd-B24 Pd-L24">
            <span>处方单医生列表</span>
            <span class="btn_r">
                <button class="layui-btn layui-btn-normal" @click='go("/server/Yaodoctorprescription/addApply")'>处方单申请</button> 
                <button class="layui-btn layui-btn-normal" :disabled='doctorNum' :class="{'layui-btn-disabled':doctorNum}" @click='outApply'>选择处方单医生</button>
            </span>
        </p>
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
                                    <div class="dis_f dis_js">
                                        <p class="pointer Ft-S14 Color_blue al"  @click="delcode(val)">处方记录</p>
                                        <p class="pointer Ft-S14 Color_blue al"  v-if='val.type == 2' @click="sendgoods(val)">申诉解除关联</p>
                                        <p class="pointer Ft-S14 al"  v-if='val.type == 1'>解除关联申诉中</p>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                        <tbody v-else>
                            <tr class="table_con Color_black ac" >
                                <td colspan='6'>暂无相关数据！<span @click='outApply' class="btns">选择处方单医生</span>后可进行处方单申请</td>
                            </tr>
                        </tbody>
                    </table>
                    <div id="page" v-show='tableList.length > 10' class="ac Mg-T30"></div>
                </div>
            </div>
        </div>

        <div id="sendgoods" class='hide'>
            <div class="txt">
                <p>申请解除关联后，云医康客户会</p>
                <p>24小时内与您联系！</p>
            </div>
            <p class="clear">
               <button class="layui-btn layui-btn-normal" @click='cancel'>确定</button>
            </p>
        </div>
       
    </div> -->


    <!-- 同意合作已达上限提示 -->
        <div id="sendgoods_shade" class="hide">
            <h2>服务提示</h2>
            <div class="txt">
                <p>当前合作医生数量已达上限</p>
                <p>不可同意合作</p>
            </div>
            <p class="clear">
               <button class="layui-btn layui-btn-normal" @click='cancel'>好的</button>
            </p>
        </div>
    </div>
</template>
<script>
export default {
    name: 'yaoPrescription',
    data() {
        return {
            tests: false,        // 审核通过提示
            tableList: [],              // 数据列表
            headernum: '',
            doctorNum: true,          // 添加的医生数量
            page: 1,
            limit: 10,
            type: 1,
            name: ''
        }
    },
    mounted() {
       this.initdata(1)
       var self = this;
    //    function doctorLength() {   // 添加了几位医生
    //       return self.$http.$post('/shv2/Recipe/recipe_doccount')
    //    }
    //   function know () {    // 通过审核，我知道了
    //       return self.$http.$post('/shv2/Recipe/recipe_check')
    //   }
    //   self.$http.all([doctorLength(), know()], function (res, res2) {
    //       console.log(res, res2)
    //        if(res.code == 1) {
    //             if (res.data.type == 1) {
    //                 self.doctorNum = true
    //             } else {
    //                 self.doctorNum = false
    //             }
    //         }

    //         if (res2.code == 1) {
    //            self.tests = res2.data.if == 0 ? true : false
    //        }
    //   })
    },
    methods: {
        tab:function (n) {  // nav切换
            this.type = n
            this.initdata(1)
        },
        initdata(n) {   // 数据
            var _this = this;
            layui.use("layer", function () {
                var layer = layui.layer;
                var obj = { page: _this.page, limit: _this.limit, type:_this.type, name: _this.name }
                _this.$http.post('/shv2/Commonshop/com_doc',obj, function (res) {//
                    console.log(res)
                    if (res.code == 1) {
                       _this.tableList = res.data
                       if (n == 1) {
                           _this.pageFun(res.count)
                       }
                    } else {
                        _this.tableList = []
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
        shows (id) { // 鼠标划入显示提示
            layui.use("layer", function () {
                var layer = layui.layer;
                layer.tips('<div class='+id+' style="color:#000;">已申请该医生,待医生同意后即可达成合作</div>', '#'+id, {
                    tips: [3, '#FFF'],
                    time: 0
                });
            });
        },
        hide_tips () {  // 鼠标移出关闭提示
            layui.use("layer", function () {
                var layer = layui.layer;
                layer.closeAll()
            });
        },
       
        doc_detail:function (id, did) {  // 合作中查看
            console.log(id, did)
            this.$router.push({ path: '/server/Yaodoctorprescription/prescriptionRecords', query: { id: id, did: did } })
        },
        doc_detail_zhi:function (id, did) {  // 合作终止查看
            console.log(id, did)
            this.$router.push({ path: '/server/Yaodoctorprescription/termination', query: { id: id, did: did } })
        },
        

        // 一下为以前的数据 //////////////////////////////////////////////////////////////////////
        cancelTest() {  // 关闭审核通过提示
            this.tests = !this.tests
            var self = this;
            // self.$http.post('/shv2/recipe/recipe_if', {}, function (res) {
            //     console.log(res)
            // }, function (err) { })
        },
        
        outApply () {   // 进入处方单医生页
            this.go('/server/Yaodoctorprescription/prescriptionApply')
        },
        
        delcode(val) { // 处方记录
           var obj = { id: val.did, busjtime: val.busjtime, busktime: val.busktime, gname: val.gname, hospital_name: val.hospital_name, true_name: val.true_name, type: val.type }
           this.$router.push({ path: '/server/Yaodoctorprescription/prescriptionRecords', query: obj })
        },
        // sendgoods(val) {    // 申诉解除机构
        //     var _this = this;
        //     console.log(val)

        //     layui.use('layer', function(){
        //         var layer = layui.layer;
        //         var $ = layui.jquery;
        //         layer.confirm('确定要解除关联吗？', {
        //         btn: ['确定', '取消'],  },
        //         function(index, layero) {
        //             layer.closeAll('dialog');
        //             jiechu()
        //         }, function(index){
                   
        //         });
                
        //         function jiechu () {
        //             _this.$http.post('/shv2/Recipe/recipe_docuncoil', { id: val.did}, function (res) {
        //                 console.log(res)
        //                 if (res.code == 1) {
        //                     Open()
        //                     _this.initdata()
        //                 } else {
        //                     layer.msg('申请失败', { icon: 5});
        //                 }
        //             }, function (err) { console.log(err)})
        //         }
                
        //         function Open () {
        //             layer.open({
        //                 type: 1,
        //                 shade: 0.2,
        //                 shadeClose: true,
        //                 closeBtn: 1,
        //                 title: '',
        //                 content: $("#sendgoods"),
        //                 area: ["400px", "300px"],
        //                 cancel: function () { }
        //             });
                    
        //         }
            
            
        //     })
        // },
         
        cancel () {     // 取消关闭弹框
            layui.use('layer', function(){
            var layer = layui.layer;
                layer.closeAll();
            }); 
        },
      
        success_cooperation () { // 同意合作,合作已达上限提示
            // layui.use('layer', function(){
            //     var layer = layui.layer;
            //         layer.open({
            //         type: 1,
            //         shade: 0.2,
            //         shadeClose: true,
            //         closeBtn: 0,
            //         title: '',
            //         content: $("#sendgoods_shade"),
            //         area: ["400px", "300px"],
            //         end:function(){
            //             $("#sendgoods_shade").hide();
            //         },
            //     });
            // }); 
            this.go('/server/Yaodoctorprescription/prescriptionApply')
        }   
    }
}
</script>

<style scoped lang="less">
#yaoPrescription {
    height: 100%;
    .orderList_msg {
        padding: 24px;
      .pass_test {
        
        padding: 24px 26px;
        background: #FFF;
        border: 1px dashed #DDDDDD;
        -webkit-border-radius:4px;
        border-radius:4px;
        margin-bottom: 20px;
        position: relative;
        span{
            color:#333;
            font-size: 18px;
            padding-left: 24px;
            background: url('../../common/image/icon/icon_fwsm.png') no-repeat left center;
            background-size: 20%;
            
        }
       >div {
            p {
                margin-top: 20px;
                color: #666666;
                line-height: 24px;
            }
            >button {
                position: absolute;
                right:0;
                bottom: 0;
                width: 40px;
                height: 40px;
                background: url('../../common/image/icon/icon_sq.png') no-repeat;
                background-size: 100% 100%;
                border:0;
                font-size: 12px;
            }
        }
        .show_msg {
            // position: absolute;
            transition: topTranform 1s;
            display: none;
        }
        }
    }
    
    .orderList_tit {
        border-bottom: 1px solid #e6e6e6;
        
        .btn_r {
            float: right;
            margin-right: 30px;
            button {
                height: 33px;
                line-height: 33px;
            }
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
                border: 1px solid #DDDDDD;
                .table_headtr {
                    height: 50px;
                    background: #dae9ff;
                    td {
                        font-size: 16px;
                        border:0;
                    }
                    .firstheadtd {
                        position: relative;
                    }
                }
                tbody {
                        tr:nth-child(even) {
                            background: #E5F0FF;
                        }
                        td {
                            padding: 20px 0px;
                            font-size: 14px;
                            border:0;
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
                }
            }
        }
    }

#sendgoods_shade {
    padding-left: 53px;
    padding-right: 53px;
    display: none;
    > h2 {
        text-align: center;
        padding-top: 30px;
        font-size: 18px;
    }
    .txt {
        padding: 40px 0;
        font-size: 15px;
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
    
}
}
@keyframes topTranform {
    50% { transform: translate3d(0, -50%, 0); }
    100% { transform: translate3d(0, -100%, 0); }
}
</style>
