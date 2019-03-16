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
                    
                    
                        
                        
                   
                    
                    <table class="layui-table layui-form" id='demo' lay-filter="test" lay-skin="nob" lay-event='aa' style='text-align:center;'>
                        <thead>
                            <tr class="table_headtr" >
                                
                                <th lay-data="{field:'city', type:'checkbox',align:'center', title: '全选', width:80}">全选</th>
                                <th lay-data="{field:'username',align:'center',width:200}">商品名称</th>
                                <th lay-data="{field:'sex',align:'center',minWidth:250,}">商品编码</th>
                                <th lay-data="{field:'id', sort: true,align:'center',edit:true,minWidth:80}">排序</th>
                                <th lay-data="{field:'sign', sort: true,align:'center',minWidth:100}">库存</th>
                                <th lay-data="{field:'experience', sort: true,align:'center',minWidth:80}">已售</th>
                                <th lay-data="{field:'score',align:'center',minWidth:90}">商品售价</th>
                                <!-- <th lay-data="{field:'wealth',align:'center',width: '100'}" >审核状态</th> -->
                                <th lay-data="{field:'right',align:'center',width:260,toolbar: '#toolBar'}">操作</th>
                                
                            </tr>
                            <!-- <tr style="width: 100%;">
                                <td lay-data="{field:'city', type:'checkbox',align:'center', title: '全选', width:80}">全选</td>
                                <td style='color: #3196FF!important;' id='checkeds' colspan="6">批量操作，当前选择8条信息</td>
                            </tr> -->
                        </thead>
                        <tbody>
                            <tr v-for="(val, index) in goodList" :key='index'>
                                <td>
                                    <div class="layui-form-item">
                                        <input type="checkbox" name="like1[write]" lay-skin="primary" title="全部" checked="">
                                    </div>
                                </td>
                                <td>
                                    <img class='imgList' :src="$http.baseURL+val.pic" alt="">
                                    <span style="display:inline-block;width:243px; text-align:left" class="Mg-L16" v-text="val.name">OTC（非处方药）同仁堂药业 益安宁丸112丸*3瓶宁丸112丸*3瓶</span>
                                </td>
                                <td v-text='val.number'>32143</td>
                                <td v-text="val.id">33</td>
                                <td v-text='val.stock'>43214</td>
                                <td v-text='val.monthly'>32143</td>
                                <td v-text='val.money'>321432</td>
                                <!-- <td>未通过</td> -->
                                <td>
                                   <div id='toolBar' style="z-index: 9999;">
                                        <span class="pointer Color_blue Mg-R20" lay-event="edit" @click='edits(val.id)'>编辑</span>
                                        <span class="pointer Color_blue Mg-R20" lay-event="xia">下架</span>
                                        <span class="pointer Color_blue moreafter" id='more' :class="more1?'moreafterup':'moreafter'" lay-event="more"><span>更多</span></span>
                                        <dl class="tdmore hide" :class="{'active':val.id === numId}">
                                            <dd class="pointer" lay-event="del" @click='del(val.id, 3)'>删除</dd>
                                            <dd class="pointer" lay-event="record" @click="sendgoods(val.id)">记录</dd>
                                        </dl>
                                   
                                  </div>
                                    
                                </td>
                            </tr>
                        </tbody>
                    </table>
                   
                            
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
    },
    methods: {
        


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
                            _this.initdata(res.count) 
                        }
                    } else {
                        _this.initdata(0) 
                    }
                }, function (err) { console.log(err)})
            });
        },
        initdata(total) {  // table 表格
            var _this = this;
            this.$nextTick(() => {
            layui.use(['table', 'form'], function () {
                var table = layui.table;
               var form = layui.form;
               
                table.init('test',
                 {
                    height: 515 //设置高度
                    , limit: total, //注意：请务必确保 limit 参数（默认：10）是与你服务端限定的数据条数一致
                    page: {
                        layout: ['prev', 'page', 'next', 'skip']
                    },
                    done: function (res, curr, count) {
                        $('thead tr').css({ 'background-color': '#dae9ff', 'height': '50px' });
                        $('.layui-table-header').css({ 'border-width': '0px 0px 10px', 'border-color': '#fff' });
                        $('.layui-table-view').css({ 'border-width': '0px 0px 0px' });
                        $('.layui-table-body').css({ 'border': '1px solid #ddd' });
                        $('.layui-table-body>table td').css({ 'height': '100px' });
                        $('.layui-table-box').css({ 'overflow': 'visible' });
                        $('.layui-table-grid-down').css({ 'display': 'none' });
                        $('.layui-table-tips-main').css({ 'display': 'none' });
                        $('.layui-table-tips-c').css({ 'display': 'none' });
                        $('.layui-table-cell').css({ 'overflow': 'auto!important' })

                    }
                });
                table.on('sort(test)', function (obj) { //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
                    $('thead tr').css({ 'background-color': '#dae9ff', 'height': '50px' });
                    $('.layui-table-header').css({ 'border-width': '0px 0px 10px', 'border-color': '#fff' });
                    $('.layui-table-view').css({ 'border-width': '0px 0px 0px' });
                    $('.layui-table-body').css({ 'border': '1px solid #ddd' });
                    $('.layui-table-body>table td').css({ 'height': '100px' });
                    $('.layui-table-box').css({ 'overflow': 'visible' })
                    $('.layui-table-grid-down').css({ 'display': 'none' });
                    $('.layui-table-tips-main').css({ 'display': 'none' });
                    $('.layui-table-tips-c').css({ 'display': 'none' });
                });
                table.on('checkbox(test)', function (obj) {
                    // console.log(obj.checked); //当前是否选中状态
                    // console.log(obj.data); //选中行的相关数据
                    // console.log(obj.type); //如果触发的是全选，则为：all，如果触发的是单选，则为：one
                    $('.layui-form-checked[lay-skin=primary] i').attr('class', 'layui-icon layui-icon-ok checkedbox1')
                });
                
                // 编辑、删除、更多操作
                table.on('tool(test)', function(obj){
                    // console.log(obj.data.id)     //  获取id
                    switch(obj.event) {
                        case "more":
                        
                            _this.numId = obj.data.id
                            _this.more1 = !_this.more1
                            $('.active').show()
                            
                        break;
                        case 'xia': _this.soldOut(obj.data.id, 2); break;
                        case 'edit': _this.edits(obj.data.id); break;
                        case 'del': _this.del(obj.data.id, 3); break;
                        case 'record': _this.sendgoods(obj.data.id); break;
                    }
                });
                form.render()
                table.render()
            })
            });
           
        },
        edits(id) { // 编辑
            console.log(id)
            this.go('/jgmall/goodsList/addGoods?id='+id)
        },
        shows(id) { // 更多
            var _this = this;
            layui.use(['layer','form'], function(){
                var layer = layui.layer;
                var form = layui.form;
                _this.numId = id
                _this.showA = !_this.showA
                form.render()
            });
           
        },
        soldOut(id, num) {  // 下架
            // console.log(id, num)
            var _this = this;
            layui.use('layer', function(){
            var layer = layui.layer;
            _this.$http.post('/shv2/goods/goods_set', {id: id, type: num}, function (res) {
                // console.log(res)
                layer.msg(res.msg);
            }, function (err) { console.log(err) })
            
            });  
        },
        del (id, num) { // 删除商品
            var _this = this;
             layui.use('layer', function(){
                var layer = layui.layer;
                _this.$http.post('/shv2/goods/goods_set', {id: id, type: num}, function (res) {
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
<style>
tbody tr > td:nth-child(2) div {
    height: 100px;
    display: flex;
    align-items: center;
}

tbody tr > td:nth-child(4) div {
    display: inline-block;
    /* width: 50px; */
    height: 27px;
    border: 1px solid #aaaaaa;
}
tbody tr > td:nth-child(8) div {
    overflow: visible;
}
.tdmore {
    position: absolute;
    z-index: 666;
    height: 86px;
    width: 100px;
    right: 40px;
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
                        background: url(../../common/image/icon/icon_fh.png)
                            no-repeat;
                    }
                    .add_icon {
                        width: 16px;
                        height: 16px;
                        background: url(../../common/image/icon/icon_xzsp.png)
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

.imgList {
    width: 70px;
    height: 70px;
}
.layui-table thead tr #checkeds {
    color: #3196FF!important;
}

</style>
