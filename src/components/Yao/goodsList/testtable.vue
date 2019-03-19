<template>
    <div id="goodsList" class="bg_f" style="height:100%">
        <p class="orderList_tit Color_black Ft-S16 Pd-T24 Pd-B24 Pd-L24">商品列表</p>
        <div class="tab_content Pd-L24 Pd-R24">
            <div class="layui-tab Pd-T24">
                <ul class="layui-tab-title">
                    <li class="layui-this" @click="tab(0)">全部（{{ goodCount.count }}）</li>
                    <li @click="tab(1)">已上架（{{ goodCount.count1 }}）</li>
                    <li @click="tab(2)">已下架（{{ goodCount.count2 }}）</li>
                    <li @click="tab(3)">审核（{{ goodCount.count4 }}）</li>
                    <p class="fr Ft-S14 Color_blue"><span class="Mg-R24 pointer"><i class="upfile_icon"></i>批量上传</span><span class="pointer" @click="go('/jgmall/goodsList/addGoods')"><i class="add_icon"></i>新增商品</span></p>
                </ul>


                <div class="layui-tab-content">
                    <div class="screen_type Pd-B24 Mg-T14 Mg-B24">
                        <div class="layui-form-item layui-row">
                            <div class="layui-col-md4">
                                <div class="layui-inline lay_width">
                                    <label class="layui-form-label">商品编号</label>
                                    <div class="layui-input-inline">
                                        <input type="text" name="" v-model='number' autocomplete="off" class="layui-input">
                                    </div>
                                </div>
                            </div>
                            <div class="layui-col-md4">
                                <div class="layui-inline lay_width">
                                    <label class="layui-form-label">商品名称</label>
                                    <div class="layui-input-inline">
                                        <input type="text" v-model='name' autocomplete="off" class="layui-input">
                                    </div>
                                </div>
                            </div>
                            <div class="layui-col-md4">
                                <div class="layui-inline lay_width">
                                    <div class="layui-input-inline" style="width:100%">
                                        <span class="Ft-S14 selectbtn ac pointer" @click='goodLists(1)'>筛选订单</span><span class="Color_blue pointer Ft-S14 Mg-L24" @click='empty'>清空筛选条件</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    




                   <el-table
                    :data="tableData"
                    :row-style='styleColor'
                    :span-method='colspan'
                    border
                    style="width: 100%;height: 515px;overflow: auto;" :header-cell-style='styleObj' >
                        <el-table-column
                        type="selection"
                        label="全选"
                        width="80" align='center'>
                        </el-table-column>
                        <el-table-column
                            prop="id"
                            label="商品名称"
                           align ='center' style='width:300px!mportant;'>

                           <template slot-scope="scope" style='display:flex;'>
                                <img src="../../../common/image/pages/account/icon_sj.png" alt="" style='width: 50px; height:50px;display:block;' >
                                <p>撒娇成就大师看得出几十块的看电视剧斯柯达深刻的思考呢是的</p>
                            </template>

                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="商品编码" align ='center'>
                        </el-table-column>
                        <el-table-column
                            prop="amount1"
                            sortable
                            :cell-dblclick='editSort'
                            @click.native="handleEdit($index, row)"
                            label="排序" align ='center'>
                        </el-table-column>
                        <el-table-column
                            prop="amount2"
                            sortable
                            label="库存" align ='center'>
                        </el-table-column>
                        <el-table-column
                            prop="amount3"
                            sortable
                            label="已售" align ='center'>
                        </el-table-column>
                        <el-table-column
                            prop="amount3"
                            label="商品售价" align ='center'>
                        </el-table-column>

                            <!-- <el-table-column
                            prop="amount3"
                            label="审核" align ='center' v-show='true'>
                            </el-table-column> -->

                        <el-table-column
                            prop="amount3"
                            label="操作" align ='center'>

                            <template slot-scope="scope" style='display: flex;'>
                                <button class='btn' 
                                    @click="edits(scope.row)">编辑</button>
                                <button class='btn' 
                                    @click="soldOut(scope.row)">下架</button>
                                <button class='btn' 
                                @click="shows(scope.row)">更多 <i class='el-icon-caret-bottom'></i><i class='el-icon-caret-top hide' ></i></button>
                                <dl class="tdmore hide" :class="{'active':scope.row.id === numId}" >
                                    <dd class="pointer"  @click='del(scope.row)'>删除</dd>
                                    <dd class="pointer"  @click="sendgoods(scope.row.id)">记录</dd>
                                </dl>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div id='page'></div>
                            
                </div>
            </div>
        </div>
        <div id="sendgoods" class="hide Pd-L40 Pd-R40 ac" style="height:330px;overflow-y:auto">
            <table width="100%">
                <tr style="border-bottom:1px solid #ddd">
                    <td class="Color_black Ft-S16" width="33.3%">时间</td>
                    <td class="Color_black Ft-S16" width="33.3%">操作人</td>
                    <td class="Color_black Ft-S16">记录</td>
                </tr>
                <tr v-for="(val,index) in record" :key='index'>
                    <td>2018年11月12日 21:11:22</td>
                    <td v-text='val.person'>188****9979</td>
                    <td v-text='val.record'>商品上架</td>
                </tr>
            </table>
        </div>
    </div>
</template>
<script>
export default {
    name: 'goodsList',
    data() {
        return {
            styleObj: {
                'background':'#DAE9FF',
                'color': '#333',
            },
            tableData: [{
                id: '12987122',
                name: '商品名称',
                amount1: '商品编码',
                amount2: '3.2',
                amount3: 10,

                }, {
                id: '12987123',
                name: '王小虎',
                amount1: '165',
                amount2: '4.43',
                amount3: 12
                }, {
          id: '12987124',
          name: '王小虎',
          amount1: '324',
          amount2: '1.9',
          amount3: 9
        }, {
          id: '12987125',
          name: '王小虎',
          amount1: '621',
          amount2: '2.2',
          amount3: 17
        }, {
          id: '12987126',
          name: '王小虎',
          amount1: '539',
          amount2: '4.1',
          amount3: 15
        }],
            showA: true, // 
            numId: 0,   // id
            tdlast: 0,  // 商品状态
            more1: false,
            goodList: [],    // 列表数据
            goodCount: '',   // 数量
            page: 1,    
            limit: 10,
            examine: '',    // 审核状态
            name: '',       // 商品名称
            number: '',     // 商品编号
            record: [],      // 记录列表
            tabShen: true,   // 审核
        }
    },
    mounted() {
        // this.initdata()
        this.goodLists(1) 
        this.initdata(5) // test
    },
    methods: {
        //点击编辑
handleEdit(index, row) {
    this.showEdit[index] = true;
    this.showBtn[index] = true;
    this.$set(this.showEdit,row,true)
    this.$set(this.showBtn,row,true)
},


        handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },

        // 排序
        editSort (row, column, cell, event) {
            console.log(row, column, cell, event)
        },

    styleColor ({row, rowIndex}) { // 隔行变色
        if (rowIndex %2 == 1) {
        return { "background-color": "#E5F0FF" }
        } else {
            return { "background-color": "#FFF" }
        }
        return { 'height' : '60px' }
        console.log( rowIndex)
    },

    colspan ({ row, column, rowIndex, columnIndex }) {    // 合并行或列的计算方法
        // console.log( columnIndex )
        if (columnIndex == 1) {
           
        }
    },


        tab(num) {  // 选项卡
            this.tdlast = num
            this.goodLists(1)
        },
        goodLists(num) {    // 数据 和 搜索
            var _this = this;
            
            layui.use(['layer', 'form'], function(){
                var layer = layui.layer;
                var form = layer.form;
                _this.$http.post('/shv2/goods/index', {type: _this.tdlast,examine: _this.examine,name: _this.name, number: _this.number, page: _this.page, limit: _this.limit}, function (res) {
                    if(res.code == 1) {
                        _this.goodCount = res;
                        _this.goodList = res.data;
                        console.log(res)
                        if (num == 1) {
                            // _this.initdata(res.count) 
                        }
                    } else {
                        _this.initdata(0) 
                    }
                }, function (err) { console.log(err)})
            });
        },
        initdata(total) {  // 分页
            var _this = this;
            layui.use(['layer','laypage'], function () {
                var layer = layui.layer;
               var laypage = layui.laypage
                //完整功能
                laypage.render({
                    elem: 'page'
                    ,count: 30
                    ,layout: [ 'prev', 'page', 'next', 'skip']
                    ,jump: function(obj){
                        // console.log(obj)
                    }
                });
                
                
                
            })
           
        },
        edits(data) { // 编辑
            let { id } = data
            console.log(id)
            this.go('/jgmall/goodsList/addGoods?id='+id)
        },
        shows(data) { // 更多
            console.log(data)
            var { id } = data;
            var _this = this;
            if (_this.numId == id) {
                _this.numId = ''
            } else {
                _this.numId = id
            }
                
        },
        soldOut(data) {  // 下架
            var { id } = data;
            var _this = this;
            layui.use('layer', function(){
                var layer = layui.layer;
                _this.$http.post('/shv2/goods/goods_set', {id: id, type: 2}, function (res) {
                    // console.log(res)
                    layer.msg(res.msg);
                }, function (err) { console.log(err) })
            });  
        },
        del (data) { // 删除商品
            var _this = this;
            var { id } = data;
             layui.use('layer', function(){
                var layer = layui.layer;
                _this.$http.post('/shv2/goods/goods_set', {id: id, type: 3}, function (res) {
                    // console.log(res)
                    layer.msg(res.msg);
                }, function (err) { console.log(err) })
            })
        },
        sendgoods(id) { //  商品操作记录
            console.log(id)
            var _this = this;
            this.$http.post('/shv2/goods/goods_log', {id:id}, function (res) {
                // console.log(res)
                if(res.code == 1) {
                    _this.record = res.data
                } else {
                    console.log(res)
                }
            }, function (err) {
                console.log(err)
            })
            layui.use(["layer"], function () {
                var layer = layui.layer;
                var $ = layui.jquery;
                layer.open({
                    type: 1,
                    shade: 0.2,
                    shadeClose: true,
                    closeBtn: 1,
                    title: "记录",
                    content: $("#sendgoods"),
                    area: ["1000px", "400px"],
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
        empty() {   // 清空
            this.name = '';
            this.number = '';
        }
    }
}
</script>
<style scoped lang='less'>

#goodsList {
    .layui-tab-content .btn {
        color: #3196FF;
        margin: 0 4px;
        border: 0;
        background: none;
        cursor: pointer;
    }
    .el-table__body {
        body > tr {
            height: 60px;
        }
    }
    .el-table tr{
        height: 50px;
    }
    tbody tr > td:nth-child(4) div {
        display: inline-block;
        /* width: 50px; */
        height: 27px;
        border: 1px solid #aaaaaa;
    }
    .hide {
        display: none;
    }
}


.tdmore {
    position: absolute;
    z-index: 666;
    height: 86px;
    width: 100px;
    right: 0px;
    top: 75px;
    border: 1px solid #dddddd;
    margin-top: 10px;
    background-color: #fff;
}
.tdmore:after {
    content: "";
    border: 8px dashed transparent;
    border-bottom: 8px solid #eee;
    width: 0;
    height: 0;
    font-size: 0;
    display: inline-block;
    *display: inline;
    *zoom: 1;
    vertical-align: -3px;
    position: absolute;
    bottom: auto;
    left: 42px;
    top: -15px;
}
.tdmore dd {
    height: 43px;
    line-height: 43px;
}
.active {
    display: block!important;
}
.tdmore dd:first-child {
    border-bottom: 1px solid #dddddd;
}
.layui-table[lay-even] tr:nth-child(even) {
    background: #e5f0ff;
}
.layui-table-edit {
    height: 29px;
    border-color: #3196ff !important;
    top: 39px;
    background: #fff !important;
}
</style>

<style scoped lang="less">
#goodsList {
    #page {
        text-align:center;
        margin-top: 15px;
    }
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
                width: 100%;
                .layui-form-label {
                    width: 80px;
                    padding: 7px 10px 7px 0px;
                }
                .layui-input-inline {
                    width: 65%;
                    input {
                        height: 34px;
                    }
                }
            }
        }
        .selecttime {
            .layui-inline {
                .layui-form-label {
                    padding: 7px 10px 7px 0px;
                }
                .layui-input-inline {
                    input {
                        height: 34px;
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
                p {
                    position: relative;
                    top: 10px;
                    i {
                        display: inline-block;
                        margin-right: 5px;
                        position: relative;
                        top: 2px;
                    }
                    .upfile_icon {
                        width: 14px;
                        height: 14px;
                        background: url(../../../common/image/icon/icon_fh.png)
                            no-repeat;
                    }
                    .add_icon {
                        width: 16px;
                        height: 16px;
                        background: url(../../../common/image/icon/icon_xzsp.png)
                            no-repeat;
                    }
                }
            }
        }
        .layui-tab-content {
            padding-left: 1px;
            padding-right: 1px;
            .layui-table {
                .table_headtr {
                    height: 50px;
                    background: #dae9ff !important;
                    td {
                        font-size: 16px;
                    }
                }
                tbody {
                    outline: 1px solid rgba(221, 221, 221, 1);
                    tr {
                        td:last-child {
                            p {
                                display: inline-block;
                                width: 173px;
                                text-align: left;
                                padding-right: 20px;
                            }
                            .moreafter{
                                position: relative;
                                display: inline-block;
                                padding-right:20px;
                            }
                            .moreafter:after {
                                content: "";
                                border: 6px dashed transparent;
                                border-top: 6px solid #3196FF;
                                width: 0;
                                height: 0;
                                font-size: 0;
                                display: inline-block;
                                *display: inline;
                                *zoom: 1;
                                vertical-align: -3px;
                                position: absolute;
                                bottom: auto;
                                right: 0px;
                                top: 12px;
                            }
                            .moreafterup{
                                position: relative;
                                display: inline-block;
                                padding-right:20px;
                            }
                            .moreafterup:after {
                                content: "";
                                border: 6px dashed transparent;
                                border-bottom: 6px solid #3196FF;
                                width: 0;
                                height: 0;
                                font-size: 0;
                                display: inline-block;
                                *display: inline;
                                *zoom: 1;
                                vertical-align: -3px;
                                position: absolute;
                                bottom: auto;
                                right: 0px;
                                top: 6px;
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
        tr {
            height: 54px;
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

.imgList {
    width: 70px;
    height: 70px;
}
.layui-table thead tr #checkeds {
    color: #3196FF!important;
}



</style>
