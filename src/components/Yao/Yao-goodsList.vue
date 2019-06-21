<template>
    <div id="goodsList" class="bg_f" style="height:100%">
        <p class="orderList_tit Color_black Ft-S16 Pd-T24 Pd-B24 Pd-L24">商品列表</p>
        <div class="tab_content Pd-L24 Pd-R24">
            <div class="layui-tab Pd-T24">
                <ul class="layui-tab-title">
                    <li class="layui-this" @click="tab(0)">全部（{{ goodCount.count }}）</li>
                    <li @click="tab(1)">已上架（{{ goodCount.count1 }}）</li>
                    <li @click="tab(2)">已下架（{{ goodCount.count5 }}）</li>
                    <li @click="tab(3)">已售罄（{{ goodCount.count2 }}）</li>
                    <li @click="tab(4)">待审核（{{ goodCount.count3 }}）</li>
                    <li @click="tab(5)">审核未通过（{{ goodCount.count4 }}）</li>
                    <li @click="tab(10)">批量上传失败（{{ goodCount.count6 }}）</li>
                    <p class="fr Ft-S14 Color_blue"><span class="Mg-R24 pointer" @click='data_uploading'><i class="upfile_icon"></i>批量上传</span><span class="pointer" @click="go('/jgmall/goodsList/addGoods')"><i class="add_icon"></i>新增商品</span></p>
                </ul>


                <div class="layui-tab-content">
                    <div class="screen_type Pd-B24 Mg-T14 Mg-B24" v-if='tdlast !== 10'>
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
                                        <span class="Ft-S14 selectbtn ac pointer" @click='search'>筛选商品</span><span class="Color_blue pointer Ft-S14 Mg-L24" @click='empty'>清空筛选条件</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            <div class="table_box" v-show='tdlast == 0 ? true : tdlast == 1 ? true : tdlast == 2 ? true: tdlast == 3 ? true:false'>
                <!-- <div class='table_head' v-show='multipleSelection.length' v-if='tdlast == 0? false : tdlast == 3? false : true'>
                    <span style='color: #3196FF;'>批量操作，当前选择{{ multipleSelection.length }}条信息</span>
                    <div v-show='tdlast == 2 ? true:false'><el-button type="primary" size='mini' >上架</el-button></div>
                    <div v-show='tdlast == 1 ? true:false'><el-button type="primary" size='mini' >下架</el-button></div>
                </div> -->
                   <el-table
                    :data="goodList"
                    :row-style='styleColor'
                    key='shop'
                    @selection-change="handleSelectionChange"
                    style="width: 100%;height: 515px;overflow: auto;" :header-cell-style='styleObj' >
                        <el-table-column
                        type="selection"
                        label="全选"
                        width="80" align='center'>
                        </el-table-column>
                        <el-table-column
                            min-width="100%"
                            label="商品名称"
                           align ='center' style='width:300px!mportant;'>

                           <template slot-scope="scope">
                                <div  style='-webkit-display:flex;display:flex;align-items: center;text-align:center'>
                                    <!-- <img :src="$http.baseURL+scope.row.pic" alt="" style='width: 60px; height:60px;display:block;' > -->
                                <p style='margin-left:20px;text-align:center;color: #333;'>{{ scope.row.name }}</p>
                                </div>
                            </template>

                        </el-table-column>
                        <el-table-column
                            min-width="60%"
                            label="商品图片"
                           align ='center' style='width:300px!mportant;'>
                           <template slot-scope="scope">
                                <div style='-webkit-display:flex;display:flex;align-items: center; text-align:center;'>
                                    <img :src="$http.baseURL+scope.row.pic" alt="" style='width: 60px; height:60px;display:block;margin: 0 auto;' >
                                </div>
                            </template>

                        </el-table-column>

                        <el-table-column
                            prop="number"
                            label="商品编码" align ='center' style='width: 200px;'>
                        </el-table-column>
                        <!-- <el-table-column
                            prop="id"
                            sortable
                            min-width="50%"
                            :cell-dblclick='editSort'
                            @click.native="handleEdit($index, row)"
                            label="排序" align ='center'>
                        </el-table-column> -->
                        <el-table-column
                            prop="stock"
                            sortable
                            min-width="50%"
                            label="库存" align ='center'>
                        </el-table-column>
                        <el-table-column
                            prop="monthly"
                            sortable
                            min-width="50%"
                            label="已售" align ='center' >
                        </el-table-column>

                        <el-table-column
                            prop="money"
                            min-width="50%"
                            label="商品售价" align ='center'>
                            <template slot-scope="scope">
                                <div>
                                    <span>￥</span><span>{{ scope.row.money }}</span>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="type"
                            min-width="50%"
                            label="商品状态" align ='center'>
                            <template slot-scope="scope">
                                <div>
                                    <span v-show='scope.row.type == 1 ? true :false'>已上架</span>
                                    <span v-show='scope.row.type == 2? true :false'>已下架</span>
                                    <span v-show='scope.row.type == 3? true :false'>已售罄</span>
                                </div>
                            </template>
                        </el-table-column>
                            
                        <el-table-column
                            min-width="50%"
                            label="推荐" align ='center'>
                            <template slot-scope="scope">
                                        <el-switch
                                            v-model="scope.row.recommend"
                                            @change='tuijian(scope.row.id)'
                                            active-color="#13ce66"
                                            inactive-color="#ccc">
                                        </el-switch>
                            </template>
                        </el-table-column>
                           

                        <el-table-column
                            min-width="80%"
                            label="操作" align ='center'>

                            <template slot-scope="scope" style='display: flex;'>
                                <button class='btn' 
                                    @click="edits(scope.row)">编辑</button>
                                <button class='btn' v-if='tdlast == 0 ? true : tdlast == 1 ? true : false'
                                    @click="soldOut(scope.row)">下架</button>
                                    <button class='btn' v-if='tdlast == 2 ? true : false'
                                    @click="putaway(scope.row)">上架</button>
                                <button class='btn' 
                                @click="shows(scope.row)">更多 <i class='el-icon-caret-bottom'></i><i class='el-icon-caret-top hide' ></i></button>
                                <dl class="tdmore hide" :class="{'active':scope.row.id === numId}" >
                                    <dd class="pointer"  @click='del(scope.row)'>删除</dd>
                                    <dd class="pointer"  @click="sendgoods(scope.row.id)">记录</dd>
                                </dl>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                    

                <!-- 审核页面-->
                <div v-show="tdlast == 4 ? true : tdlast == 5 ? true : false " >   
                    
                    <el-table
                    :data="goodList"
                    :row-style='styleColor'
                    key='shenhe'
                    style="width: 100%;height: 515px;overflow: auto;" :header-cell-style='styleObj' >
                        <el-table-column
                        type="selection"
                        label="全选"
                        width="80" align='center'>
                        </el-table-column>
                        <el-table-column
                            min-width="100%"
                            nin-height = '70px'
                            prop="goodList"
                            label="商品名称"
                           align ='center' style='width:300px!mportant;'>
                           <template slot-scope="scope">
                                <div  style='-webkit-display:flex;display:flex;align-items: center;'>
                                    <img :src="$http.baseURL+scope.row.pic" alt="" style='width: 60px; height:60px;display:block;' >
                                <p style='margin-left:20px;text-align:left;color: #333;'>{{ scope.row.name }}</p>
                                </div>
                            </template>

                        </el-table-column>
                         <el-table-column
                            min-width="80%"
                            nin-height = '70px'
                            prop="goodList"
                            label="商品图片"
                           align ='center' style='width:300px!mportant;'>
                           <template slot-scope="scope">
                                <div  style='-webkit-display:flex;display:flex;align-items: center;'>
                                    <img :src="$http.baseURL+scope.row.pic" alt="" style='width: 60px; height:60px;display:block;margin:0 auto;' >
                                </div>
                            </template>

                        </el-table-column>
                        <el-table-column
                            prop="number"
                            label="商品编码" align ='center' style='width: 200px;'>
                        </el-table-column>
                        <el-table-column
                            prop="id"
                            sortable
                            min-width="50%"
                            :cell-dblclick='editSort'
                            @click.native="handleEdit($index, row)"
                            label="排序" align ='center'>
                        </el-table-column>
                        <el-table-column
                            prop="stock"
                            sortable
                            min-width="50%"
                            label="库存" align ='center'>
                        </el-table-column>

                        <el-table-column
                            prop="money"
                            min-width="50%"
                            label="商品售价" align ='center'>
                            <template slot-scope="scope">
                                <div>
                                    <span>￥</span><span>{{ scope.row.money }}</span>
                                </div>
                            </template>
                        </el-table-column>

                            <el-table-column
                            prop="examine"
                            min-width="50%"
                            label="审核" align ='center'>
                                <template slot-scope="scope">
                                    <div style='color: red;font-size:14px' v-if='scope.row.examine == 2 ? true : false'>
                                     未通过 <i class="el-icon-warning"></i>
                                    </div>
                                    <div v-if='scope.row.examine == 0 ? true : false'>待审核</div>
                                    <div v-if='scope.row.examine == 1 ? true : false'>审核通过</div>
                                </template>
                            </el-table-column>

                        <el-table-column
                            min-width="80%"
                            prop="examine"
                            label="操作" align ='center'>

                            <template slot-scope="scope" style='display: flex;'>
                                <div v-if='scope.row.examine == 0 ? true : false'>
                                    审核中，无法操作
                                </div>
                                <div v-else>
                                    <button class='btn' 
                                        @click="edits(scope.row)">重新编辑</button>
                                    <button class='btn' 
                                    @click="shows(scope.row)">更多 <i class='el-icon-caret-bottom'></i><i class='el-icon-caret-top hide' ></i></button>
                                    <dl class="tdmore hide" :class="{'active':scope.row.id === numId}" >
                                        <dd class="pointer"  @click='del(scope.row)'>删除</dd>
                                        <dd class="pointer"  @click="sendgoods(scope.row.id)">记录</dd>
                                    </dl>
                                </div>
                                
                            </template>
                        </el-table-column>
                    </el-table>
                </div> 

                <!-- 批量上传失败搜索 -->
                 <div class="screen_type Pd-B24 Mg-T14 Mg-B24" v-show='tdlast == 10'>
                        <div class="layui-form-item layui-row">
                            <div class="layui-col-md4">
                                <div class="layui-inline lay_width">
                                    <label class="layui-form-label">批准文号</label>
                                    <div class="layui-input-inline">
                                        <input type="text" name="" v-model='wenNumber' autocomplete="off" class="layui-input">
                                    </div>
                                </div>
                            </div>
                            <div class="layui-col-md4">
                                <div class="layui-inline lay_width">
                                    <label class="layui-form-label">商品名称</label>
                                    <div class="layui-input-inline">
                                        <input type="text" v-model='shopName' autocomplete="off" class="layui-input">
                                    </div>
                                </div>
                            </div>
                            <div class="layui-col-md4">
                                <div class="layui-inline lay_width">
                                    <div class="layui-input-inline" style="width:100%">
                                        <span class="Ft-S14 selectbtn ac pointer" @click='search_fail(1)'>筛选商品</span><span class="Color_blue pointer Ft-S14 Mg-L24" @click='empty'>清空筛选条件</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                <!-- 批量上传失败 -->
                <div v-show="tdlast == 10 ? true : false" >   
                    <el-table
                    :data="goodList2"
                    :row-style='styleColor'
                    key='fail'
                    style="width: 100%;height: 515px;overflow: auto;" :header-cell-style='styleObj' >
                        <el-table-column
                        type="selection"
                        label="全选"
                        width="80" align='center'>
                        </el-table-column>
                        <el-table-column
                            min-width="70%"
                            nin-height='70px'
                            prop="goodList"
                            label="商品名称"
                           align ='center' style='width:300px!mportant;'>
                           <template slot-scope="scope">
                                
                                <div class='Pd-L24'  style='display:-webkit-flex;display:flex;align-items: center;' >
                                    <p style="width:60px;height:60px;min-width:60px;background-color:#EEE;">
                                        <img :src="$http.baseURL+scope.row.pic" alt="" style='width: 60px; height:60px;display:inline-block;' >
                                    </p>
                                    <p style='margin-left:20px;text-align:left;color: #333;'>{{ scope.row.name }}</p>
                                </div>
                            </template>

                        </el-table-column>
                         
                        <el-table-column
                            prop="pzwh"
                            label="批准文号" align ='center' style='width: 200px;'>
                        </el-table-column>
                        
                        <el-table-column
                            prop="stock"
                            sortable
                            min-width="50%"
                            label="库存" align ='center'>
                        </el-table-column>

                        <el-table-column
                            prop="money"
                            min-width="50%"
                            label="商品售价" align ='center'>
                            <template slot-scope="scope">
                                <div>
                                    <span>￥</span><span>{{ scope.row.money }}</span>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="fail_reason"
                            min-width="50%"
                            label="失败原因" align ='center'>
                            <template slot-scope="scope">
                                <div>
                                    <span>{{ scope.row.fail_reason }}</span>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            min-width="50%"
                            prop="examine"
                            label="操作" align ='center'>

                            <template slot-scope="scope">
                                <div>
                                    <button class='btn' @click="edits(scope.row)">完善信息</button>
                                    <button class='btn Mg-L14' @click="del_fail(scope.row)">删除</button>
                                </div>
                                
                            </template>
                        </el-table-column>
                    </el-table>
                </div> 

                    <div style='background:#fff;' v-show='goodList.length && tdlast !== 10' id='page'></div>
                    <div style='background:#fff;text-align:center;' v-show='goodList2.length && tdlast == 10' id='page2'></div>       
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
                <tbody v-if='record.length'>
                    <tr v-for="(val,index) in record" :key='index'>
                        <td>2018年11月12日 21:11:22</td>
                        <td v-text='val.person'>188****9979</td>
                        <td v-text='val.record'>商品上架</td>
                    </tr>
                </tbody>
                 <tbody v-else>
                    <tr>
                        <td colspan="3"> 暂无数据</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- 批量上传 -->
        <div id="uploading">
            <div class="uploading_title">
                <h2>批量上传</h2>
                <span v-if='!uploadcsv'><a href="/file/drug.csv" download="云医康智慧药房药品批量导入模板.csv">下载表格</a></span>
                <span v-if='uploadcsv'><a href="/file/云医康智慧药房药品批量导入模板.csv" download="云医康智慧药房药品批量导入模板.csv">下载表格</a></span>
            </div>
            <div class="uploading_msg">
                <p>批量上传注意事项：</p>
                <div class="msg_right">
                    <p>上传表格推荐*.csv格式；<br/>
                    上传表格字段包括：类别、名称、批准文号、零售价、库存、是否处方药；<br/>
                    请保证字段名称一致(如下图)，否则上传失败，或直接下载表格</p>
                    <div class="table_box">
                        <img src="../../common/image/icon/pic_sl@2x.png" alt="">
                    </div>
                </div>
            </div>
            <div class="Pd-L40" style='height:20px;'>
                <p v-show='flag'>
                    <span>上传文件：</span>
                    <span style='color:#3196FF;'>{{ excelfile.name }}</span>
                </p>
            </div>
            <p class="clear">
                <span ><input type="file" @change="up_files($event)" id='up_file'  accept=".csv" class="hide"><label for='up_file' class="cancel pointer" >选择文件</label></span>
                <span >
                    <!-- <button :class="{'send pointer': flag}" @click='beforeUploadFile'>确认上传</button> -->
                    <el-button type="primary" :class="{'send pointer': flag}" @click='beforeUploadFile' :disabled="disabled" :loading="disabled">确认上传</el-button>
                </span>
            </p>
        </div>
        <!-- 上传中 loding -->
        <div id="uploading_loding" class="hide">
            <el-progress :text-inside="true" :stroke-width="26" :percentage="lodings"></el-progress>
            <p>上传中{{ lodings }}%，请勿关闭窗口</p>
        </div>
        <!-- 上传失败 loding -->
        <div id="uploading_defeated" class="hide">
            <el-progress :text-inside="true" :stroke-width="26" :percentage="lodings" :color="customColor"></el-progress>
            <p><i>!</i>上传失败，请重新上传</p>
            <span ><button class="pointer" @click='close_shade'>我知道了</button></span>
        </div>
        <!-- 上传结果, 缺图 -->
        <div id="uploading_success" class="hide">
            <div v-if='noimg.length'>
                <p class="uploading_success_title">药品库未匹配到药品图片{{ noimg.length }}条，请手动添加</p>
                <div class="uploading_success_file">
                    <div class="file_box">
                        <ul v-for='(val,i) in noimg' :key="i+'_33'" >
                            <li><span>{{ val[0] }}</span></li>
                            <li>{{ val[2] }}</li>
                            <li><img class="pic_img" src="" alt=""></li>
                            <li><input class="img_file" @change="upFileImg($event, i)" style='display:none;' type="file" :id="'files'+i" /><label class="pointer" :for="'files'+i" >手动添加</label></li>
                        </ul>
                    </div>
                </div>
                <p v-if='existNum' class="Color_red Mg-T10">{{ existNum }}条药品信息已存在</p>
                <p class="Color_red Mg-T5">药品库未匹配到药品<span v-text='(uploadNum+noparamsNum)'></span>条，请稍后在批量上传失败列表中完善药品信息</p>
                <!-- <p class="Mg-T5 Color_red" >上传失败{{noparamsNum}}条商品信息！</p> -->
                <p class="uploading_success_msg Mg-T5">上传成功<span v-text='succNum'></span>条商品信息！</p>
                <span style="display:block;text-align:right;">
                    <el-button type="primary" class="pointer" @click='uploadPic' :disabled="disabledPic"  :loading="disabledPic">下一步</el-button>
                </span>
            </div>
            <div v-if='!noimg.length'>
                <div style='height:250px;'>
                    <p v-if='existNum' class="Pd-T24 Color_red" >{{ existNum }}条药品信息已存在</p>
                    <p v-if='uploadNum' class="Pd-T24 Color_red" >药品库未匹配到药品<span v-text='(uploadNum+noparamsNum)'></span>条，请稍后在批量上传失败列表中完善药品信息</p>
                    <p v-if='succNum' class="Pd-T24 Color_red" >上传成功{{succNum}}条商品信息！</p>
                    <!-- <p v-if='noparamsNum' class="Pd-T24 Color_red" >上传失败{{noparamsNum}}条商品信息！</p> -->
                </div>
                <span style="display:block;text-align:right;">
                    <el-button type="primary" class="pointer" @click='uploadYes' :disabled="disabledPic"  :loading="disabledPic">下一步</el-button>
                </span>
            </div>
            
        </div>
        <!-- 上传分类 -->
        <div id='uploading_classify'>
            <div class="uploading_classify_box">
                <ul v-if='stypeNav.length'>
                    <li v-for='(val,i) in stypeNav' :key='i+"_99"' >{{ val }}</li>
                </ul>
                <ul v-if='!stypeNav.length'>
                    <li>未上传分类</li>
                </ul>
            </div>
            <span><button class="pointer" @click='close_shade'>完成导入</button></span>
        </div>
    </div>
</template>
<script>
// import jschardet from "jschardet"
// import iconv from "iconv-lite"
// import encoding from "encoding"
export default {
    name: 'goodsList',
    data() {
        return {
            styleObj: {
                'background':'#DAE9FF',
                'color': '#333',
            },
            
            num: false,     // 是否全选
            showA: true, // 
            numId: 0,   // id
            tdlast: 0,  
            type: '',       // 商品状态
            more1: false,
            goodList: [],    // 列表数据
            goodCount: '',   // 数量
            page: 1,    
            limit: 10,
            examine: '1',    // 审核状态
            name: '',       // 商品名称
            number: '',     // 商品编号
            record: [],      // 记录列表
            tabShen: true,   // 审核
            multipleSelection: [],   // 选中的值进行保存
            flag: false,             // 确认上传按钮
            lodings: 0,
            customColor: '#F09F88',
            excelfile: '',          // 批量上传的数据流
            goodList2: [],          // 批量失败列表
            wenNumber: '',  // 批量失败搜索- 批准文号
            shopName: '',   // 批量失败搜索 - 商品名称
            disabled: false,    // 批量上传按钮控制
            timer: '',          // 上传动画定时器
            uploadNum: 0,       // 图片未匹配数量,需要上传的数量
            succNum: 0,         // 上传成功数量
            noimg: [],          // 缺少图片数据
            stypeNav: [],        // 上传后的分类
            disabledPic: false,   // 图片上传的按钮
            existNum: 0,          // 已存在数量
            noparamsNum: 0,       // 上传失败数量
            uploadcsv: false,    
        }
    },
    mounted() {
        this.isIE()
    },
    
    activated () {
       this.goodLists(1)
       if(this.tdlast == 10) {
           this.search_fail(1)
       }
    },
    methods: {
        //点击排序
        handleEdit(index, row) {
            this.showEdit[index] = true;
            this.showBtn[index] = true;
            this.$set(this.showEdit,row,true)
            this.$set(this.showBtn,row,true)
        },
        // 排序
        editSort (row, column, cell, event) {
            // console.log(row, column, cell, event)
        },
        isIE () { // 是否ie?
            var _this = this;
            if (!!window.ActiveXObject || "ActiveXObject" in window) {
                _this.uploadcsv = true;
            } else {
                _this.uploadcsv = false;
            }
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


    handleSelectionChange(val) {    // 全选
        if (val.length) {
            this.multipleSelection = val;
            this.num = true
        } else {
            this.multipleSelection = val;
            this.num = false
        }
        
      },


        search () { // 搜索
            var _this = this;
            layui.use('layer', function(){
            var layer = layui.layer;
                if (!_this.number && !_this.name) {
                    layer.msg('请输入要搜索的内容');
                    return;
                }
                _this.goodLists(1)
            });   
            

        },

        tab(num) {  // 选项卡
            this.tdlast = num
            this.name = '';
            this.number = '';
            this.wenNumber = '';
            this.shopName = '';
            if (num == 10) {
                this.goodList = []
                this.search_fail(1)
                return false;
            }
            this.type = num == 0 ? '': num == 4 ? '': num == 5 ? '':num;
            this.examine = num == 4 ? 0 : num == 5 ? 2 : 1;
            this.goodList2 = []
            this.page = 1
            this.goodLists(1)
            if (num == 1) {
                this.multipleSelection = []
            } else {
                this.multipleSelection = []
            }
            
        },
        goodLists(n) {    // 数据 和 搜索
            var _this = this;
            layui.use(['layer', 'form'], function(){
                var layer = layui.layer;
                var form = layer.form;
                var obj = {type: _this.type,examine: _this.examine,name: _this.name, number: _this.number, page: _this.page, limit: _this.limit}
                console.log(obj)
                _this.$http.post('/shv2/goods/index', obj, function (res) {
                    console.log(res)
                    if(res.code == 1) {
                        _this.goodCount = res;
                        _this.goodList = res.data;
                        if (n == 1) {
                             _this.initdata(res.num) // 传递总数
                        }
                    } else {
                        _this.goodList = []
                        _this.initdata(0) 
                    }
                }, function (err) { console.log(err)})
            });
        },
        initdata(total) {  // 分页
            console.log(total)
            var _this = this;
            layui.use(['layer','laypage'], function () {
                var layer = layui.layer;
               var laypage = layui.laypage
                //完整功能
                laypage.render({
                    elem: 'page'
                    ,count: total
                    ,layout: [ 'prev', 'page', 'next', 'skip']
                    ,jump: function(obj, first){
                        if(!first){
                            _this.page = obj.curr
                            _this.goodLists(obj.curr) // /得到当前页，以便向服务端请求对应页的数据
                        }
                    }
                });
            })
        },
        tuijian (id) {    // 推荐是否开启
            var _this = this;
            console.log(id)
            layui.use('layer', function(){
            var layer = layui.layer;
            _this.$http.post('/shv2/goods/recommend', {id:id}, function (res) {
                console.log(res)
                if (res.code == 1) {
                    layer.msg(res.msg, { icon:1});
                } else if(res.code == 3) {
                    layer.msg(res.msg, { icon:2, time: 2000});
                    setTimeout(()=> {
                        _this.goodLists(_this.page)
                    }, 1000)
                } else {
                    layer.msg(res.msg, { icon:2});
                }
            }, function (err) { console.log(err)})
            }); 
        },
        edits(data) { // 编辑
            var { id } = data
            // console.log(id)
            this.go('/jgmall/goodsList/editGoods?id='+id)
        },
        shows(data) { // 更多
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
            // console.log(id)
            var _this = this;
            _this.record = '';  // 每次查看前，先进行一次清空数据
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
            this.wenNumber = '';
            this.shopName = '';
            this.goodLists(1)
            if(this.tdlast == 10) {
                this.search_fail(1)
            }
        },

        putaway (data) {    // 上架
            // console.log(data)
            var { id } = data;
            var _this = this;
            layui.use('layer', function(){
            var layer = layui.layer;
                _this.$http.post('/shv2/goods/goods_set', { id: id, type: 4 }, function (res) {
                    console.log(res)
                    if (res.code == 1) {
                        layer.msg(res.msg)
                    } else {
                        layer.msg(res.msg);
                    }
                }, function (err) { console.log(err)})
            
            });  
        },



    //////////////////////////////////////////////////////////////////////////////

        data_uploading () {  // 批量上传
            var _this = this;
            _this.lodings = 0
            _this.uploadNum = 0
            _this.stypeNav = []
            _this.noparamsNum = 0
            _this.succNum = 0
            _this.noimg = []
            layui.use(["layer"], function () {
                var layer = layui.layer;
                var $ = layui.jquery;
                _this.$http.get('/shv2/store/default_store', {}, function (res) {
                    console.log(res)
                    if (res.code == 1) {
                        layer.open({
                            type: 1,
                            shade: 0.2,
                            shadeClose: true,
                            closeBtn: 1,
                            title: "",
                            content: $("#uploading"),
                            area: ["800px", "440px"],
                            cancel: function () { 
                            },
                        });
                        $(".layui-layer-title").css({
                            height: "50px",
                            background: "#ECF2FB",
                            "line-height": "50px",
                            fontSize: '18px'
                        });
                        $(".layui-layer-setwin").css("top", "19px");
                    } else {
                        layer.msg('开启店铺失败，请联系平台人员',{icon:0})
                    }
                }, function (err) {})
                
            });
        },
        beforeUploadFile () {   // 批量提交
            var _this = this;
            layui.use('layer', function(){
                var layer = layui.layer;
                if (!_this.excelfile) {
                     layer.msg('请选择csv文件格式上传',{icon:0})
                    return;
                }
                if (_this.excelfile.name.lastIndexOf('.csv') == -1) {
                    layer.msg('请上传csv文件格式',{icon:0})
                    return ;
                }

                // 解析 csv 文件内容
                // var file = _this.excelfile;
                // var Papa = require('../../../static/papaparse.min.js')
                // if (file) {
                //     var allResults=[];
                //     var arr = []
                //     var reader = new FileReader();
                //     reader.readAsBinaryString(file);
                //     reader.onload = event => {
                //         var buf = event.target.result;
                //         var encodeType = jschardet.detect(buf).encoding;
                //         if (encodeType !== "UTF-8") {
                //         buf = encoding.convert(buf, "utf8", encodeType);
                //         }
                //         iconv.skipDecodeWarning = true;
                //         var text = iconv.decode(buf, "utf8");
                //         Papa.parse(text, {
                //             encoding: "UTF-8",
                //             complete: results => {
                //             for(var y=0;y<results.data.length;y++){
                //                 // es6合并数组的语法
                //                 allResults=[...allResults,results.data[y]]
                //             }
                //             //打印拿到的最终数据
                //             arr = allResults[0]
                //             console.log(arr)
                //             var testArr = ["分类", "名称", "零售价", "库存", "批准文号", "是否处方药"]
                //             if ( arr == undefined || arr.length !== 6 ) {
                //                 layer.msg('文件上传格式不符合要求', {icon:0})
                //                 return false;
                //             } else {
                //                 flag()
                //             }
                //             }
                //         }
                //         )
                //     }
                // }
                
                
               if (_this.excelfile) {
                    _this.disabled = true;
                    var formdata = new FormData();
                    formdata.append("file", _this.excelfile);
                    _this.data_loding()
                    var onUploadProgress = function (e) {
                           //属性lengthComputable主要表明总共需要完成的工作量和已经完成的工作是否可以被测量
                           //如果lengthComputable为false，就获取不到e.total和e.loaded
                           if (e.lengthComputable) {
                               var rate = e.loaded / e.total;  //已上传的比例
                               rate = Number((rate *100).toFixed(0))
                                console.log(rate)
                               if (rate < 100) {
                                   _this.lodings = rate
                                //    _this.data_loding()
                                   //这里的进度只能表明文件已经上传到后台，但是后台有没有处理完还不知道
                                   //因此不能直接显示为100%，不然用户会误以为已经上传完毕，关掉浏览器的话就可能导致上传失败
                                   //等响应回来时，再将进度设为100%
                                //    vm.uploadRate = rate;
                                //    vm.uploadStyle.width = (rate *100).toFixed(2)+ '%';
                               }
                        }
                    }
                    _this.$http.uploadFile('/shv2/goods/toup', formdata, onUploadProgress, function (res) {
                        console.log(res)
                        _this.disabled = false;
                        if (res.code == 1) { // 上传成功
                            var tr = setTimeout(() => {
                                clearInterval(tr)
                                if (res.data.stype) {
                                    _this.stypeNav = res.data.stype
                                } else {
                                    _this.stypeNav = []
                                }
                                if (res.data.upload && res.data.upload.length >= 1) {
                                    _this.uploadNum = res.data.upload.length
                                } else {
                                    _this.uploadNum = 0
                                }
                                if (res.data.noparams && res.data.noparams.length >= 1) {
                                        _this.noparamsNum = res.data.noparams.length
                                } else {
                                    _this.noparamsNum = 0
                                }
                                if (res.data.succ && res.data.succ.length >= 1) {
                                    _this.succNum = res.data.succ.length
                                } else {
                                    _this.succNum = 0
                                }
                                if (res.data.exist && res.data.exist.length >=1) {
                                    _this.existNum = res.data.exist.length
                                } else {
                                    _this.existNum = 0
                                }
                                if (res.data.noimg && res.data.noimg.length >= 1) {
                                    _this.noimg = res.data.noimg
                                } else {
                                    _this.noimg = []
                                }
                                
                            }, 1000)
                        } else if (res.code == 2) { // 上传失败
                            if (_this.timer) {
                               clearInterval(_this.timer)
                            }
                            layer.closeAll('page')
                            layer.msg(res.msg,{icon: 0});
                            _this.disabled = false
                        } else {
                            if (_this.timer) {
                               clearInterval(_this.timer)
                            }
                            layer.closeAll('page')
                            layer.msg(res.msg,{icon: 0});
                            _this.disabled = false
                        }
                    }, function (err) {})
                }
            }); 
        },
        data_loding () { // 上传进度弹框
            var _this = this;
            layui.use(["layer"], function () {
                var layer = layui.layer;
                layer.closeAll('page')
                var $ = layui.jquery;
                layer.open({             
                    type: 1,
                    shade: 0.2,
                    shadeClose: false,
                    closeBtn: 0,
                    title: '',
                    content: $("#uploading_loding"),
                    area: ["500px", "160px"],
                    end: function () {
                        clearInterval(_this.timer)
                    }
                });
            });
           _this.timer = setInterval(() => {
                if(_this.lodings >= 100) {
                    _this.uploadcsv = false;
                    _this.upload_result()
                    _this.goodLists(1)
                    _this.search_fail(1)
                    clearInterval(_this.timer)
                } else {
                    _this.submitUploadding();
                }
           }, 2000)
            
        },
         upload_result () {  // 上传结果，缺图
                layui.use(["layer"], function () {    
                var layer = layui.layer;
                var $ = layui.jquery;
                layer.closeAll('page')
                layer.open({
                    type: 1,
                    shade: 0.2,
                    shadeClose: true,
                    closeBtn: 1,
                    title: '上传结果',
                    content: $("#uploading_success"),
                    area: ["700px", "460px"], 
                });
                $(".layui-layer-title").css({
                    height: "50px",
                    background: "#E7F3FF",
                    "line-height": "50px",
                    fontSize: '18px',
                    padding: '0 80px 0 40px'
                });
                $(".layui-layer-setwin").css("top", "19px");
            });
        },
        submitUploadding () { // 上传进度
            var _this = this;
            this.$http.post('/shv2/goods/getnum', {}, function (res) {
                console.log(res)
                if (res.code == 1) {
                    _this.lodings = Number(((res.num/res.total)*100).toFixed(0))
                } else {
                    clearInterval(_this.timer)
                    _this.upload_err()
                }
            }, function (err) {})
        },
        upFileImg (e, i) {  // 缺图图片预览
            var pic = $('.pic_img');
            $.each(pic, function (j, img) {
                if (i == j) {
                        //将图片文件转成Base64
                    var f = e.target.files[0]
                    var reader = new FileReader();
                    reader.readAsDataURL(f)
                    reader.onload = function(e) {
                        img.src = this.result
                        img.style='background: #fff;'
                    }
                }
            });
        },
        upload_classify () {  // 上传后的分类
            layui.use(["layer"], function () {
                var layer = layui.layer;
                var $ = layui.jquery;
                layer.closeAll('page')
                layer.open({
                    type: 1,
                    shade: 0.2,
                    shadeClose: false,
                    closeBtn: 1,
                    title: '上传分类确认',
                    content: $("#uploading_classify"),
                    area: ["700px", "276px"],
                });
                $(".layui-layer-title").css({
                    height: "50px",
                    background: "#E7F3FF",
                    "line-height": "50px",
                    fontSize: '18px',
                    padding: '0 80px 0 40px'
                });
                $(".layui-layer-setwin").css("top", "19px");
            });
        },
        
        upload_err () { // 上传失败弹框
            layui.use(["layer"], function () {    
                var layer = layui.layer;
                layer.closeAll('page');
                var $ = layui.jquery;
                layer.open({
                    type: 1,
                    shade: 0.2,
                    shadeClose: false,
                    closeBtn: 0,
                    title: '',
                    content: $("#uploading_defeated"),
                    area: ["500px", "230px"],
                });
            });
        },
        close_shade () {  // 关闭弹框
            layui.use(["layer"], function () {
                var layer = layui.layer;
                layer.closeAll();
            })
            this.stypeNav = []
        },

        up_files (e) {   // 获取文件
        var _this = this;  
        console.log(e.currentTarget.files[0])
        var file = e.currentTarget.files[0];
        this.excelfile = file
            if(_this.excelfile) {
                _this.flag = true
            }
        },
        search_fail (n) { // 批量上传失败的搜索 和 列表数据
            var _this = this;
            console.log(_this.page)
            var obj = { pzwh: this.wenNumber, name: this.shopName, page: n, limit: _this.limit }
            console.log(obj)
            this.$http.post('/shv2/goods/upload_fail', obj, function (res) {
                console.log(res)
                if (res.code == 1) {
                    _this.goodList2 = res.data.data
                    if (n == 1) {
                        _this.initdata2(res.data.count)
                    }
                } else {
                    _this.goodList2 = []
                }
            }, function (err) { console.log(err)})
        },
        initdata2(total) {  // 批量上传失败列表分页
            console.log(total)
            var _this = this;
            layui.use(['layer','laypage'], function () {
                var layer = layui.layer;
               var laypage = layui.laypage
                //完整功能
                laypage.render({
                    elem: 'page2'
                    ,count: total
                    ,layout: [ 'prev', 'page', 'next', 'skip']
                    ,jump: function(obj, first){
                        if(!first){
                            _this.page = obj.curr
                            _this.search_fail(obj.curr)
                        }
                    }
                });
            })
        },
        uploadYes () {
            this.upload_classify()
        },
        uploadPic () {  // 批量上传图片
            var _this = this;
            var fromdata = new FormData();
            var imgFiles = $('.img_file');
            var arr = []
            for (var i = 0; i < _this.noimg.length; i++) {
                $.each(imgFiles[i].files, function (j, file) {
                    arr.push(_this.noimg[i][2])
                    fromdata.append('picarr[]', file)
                    console.log(_this.noimg[i][2])
                    console.log(file)
                });
            }
            console.log(arr)
            fromdata.append('pzwh', arr)
            this.disabledPic = true
            layui.use('layer', function(){
                var layer = layui.layer;
                _this.$http.upload('/shv2/goods/uploadImg', fromdata, function (res) {
                    console.log(res)
                    if (res.code == 0) {
                        _this.disabledPic = false
                        layer.msg('请完善信息', {icon: 2})
                    } else if (res.code == 1) {
                        _this.upload_classify()
                        _this.disabledPic = false
                    } else {
                        _this.disabledPic = false
                        layer.msg(res.msg, {icon: 2})
                    }
                }, function (err) { console.log(err)})
            })
        },
        del_fail (v) {  // 批量上传失败 删除
            var _this = this;
            var obj = {id: v.id }
            layui.use('layer', function(){
                var layer = layui.layer;
                _this.$http.post('/shv2/goods/upload_del', obj, function (res) {
                    if (res.code == 1) {
                        layer.msg('删除成功', { icon: 1})
                        console.log(_this.page)
                        _this.goodLists(1)
                        _this.search_fail(1)
                    } else {
                         layer.msg(res.msg, { icon:2})
                    }
                })
            })
        }



    },
    destroyed () {
        if (this.timer) {
            clearInterval(this.timer)
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
        body > tr.el-table__row {
            height: 80px;
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
    .el-table__header .has-gutter tr th.el-table_1_column_2 > .cell {
        display: flex;
    }
    .hide {
        display: none;
    }
    .table_box {
        position: relative;
    }
    .table_head {
        position: absolute;
        z-index: 99;
        width: 90%;
        right: 5px;
        background-color: #DAE9FF;
        padding: 14px 30px 14px 0;
        -webkit-display: flex;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
}


.tdmore {
    position: absolute;
    z-index: 666;
    height: 86px;
    width: 100px;
    right: 0px;
    top: 45px;
    border: 1px solid #dddddd;
    margin-top: 10px;
    background-color: #fff;
    z-index: 100;
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
        margin-top: 5px;
        padding-bottom: 10px;
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
        background: #fff;
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
                        td {
                            border:0;
                        }
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

    #uploading_loding {
        background-color: #FFF;
        display: none;
        padding: 46px 60px;
        p {
            margin-top: 20px;
            text-align: center;
            font-size: 16px;
            color: #3196FF;
        }
    }

    #uploading_defeated {
        background-color: #FFF;
        display: none;
        padding: 46px 60px 0;
        p {
            margin-top: 20px;
            text-align: center;
            font-size: 16px;
            color: #FF2828;
            > i {
                font-style: normal;
                display: inline-block;
                width: 17px;
                height: 17px;
                border-radius: 100%;
                border: 1px solid #FF2828;
                color: #FF2828;
                line-height: 16px;
                font-size: 12px;
                margin-right: 5px;
            }
        }
        span {
            display: block;
            text-align: center;
            margin-top: 40px;
            button {
                width: 140px;
                height: 44px;
                background-color: #3196FF;
                color: #FFF;
                border:0;
                -webkit-border-radius: 4px;
                -ms-border-radius: 4px;
                border-radius: 4px;
            }
        }
    }

    #uploading_success {   // 上传结果
        width: 100%;
        padding: 0 40px;
        .uploading_success_title {
            color: #FF2929;
            font-size: 14px;
            padding: 20px 0px 14px;
        }
        .uploading_success_file {
            height: 200px;
            overflow: auto;
            border: 1px solid #E6E6E6;
            .file_box {
                width: 100%;
                padding: 10px 0;
                > ul {
                    width: 100%;
                    overflow: hidden;
                    li {
                        float: left;
                        height: 46px;
                        line-height: 46px;
                        font-size: 14px;
                        color: #666;
                        margin: 0 7px;
                        > img {
                            width: 32px;
                            height: 34px;
                            display: block;
                        }
                    }
                    li:nth-child(3) {
                        width: 32px;
                        height: 34px;
                        background:url('../../common/image/icon/icon_pic@2x.png') no-repeat;
                        background-size: contain;
                    }
                    li:last-child {
                        color: #3196FF;
                    }
                }
            }
        }
        .uploading_success_msg {
            padding: 0px 0px 10px;
            color: #333;
            font-size: 14px;
        }
        >span {
            display: block;
            text-align: right;
            button {
                width: 130px;
                height: 40px;
                border:0;
                background-color: #3196FF;
                color: #FFF;
                -webkit-border-radius: 4px;
                -o-border-radius: 4px;
                -ms-border-radius: 4px;
                -moz-border-radius: 4px;
                border-radius: 4px
            }
        }
    }

    // 上传分类
    #uploading_classify {
        padding: 0 40px;
        display: none;
        .uploading_classify_box {
            height: 130px;
            overflow: auto;
            > ul {
                width: 100%;
                overflow: hidden;
                li {
                    float: left;
                    height: 32px;
                    padding: 0 10px;
                    text-align: center;
                    line-height: 32px;
                    background-color: #EEEEEE;
                    color: #333;
                    font-size: 14px;
                    margin: 12px 6px 0;
                    -webkit-border-radius: 4px;
                    border-radius: 4px;
                }
            }
        }
        
        >span {
            display: block;
            text-align: right;
            margin-top: 10px;
            button {
                width: 120px;
                height: 40px;
                border:0;
                background-color: #3196FF;
                color: #FFF;
                -webkit-border-radius:4px;
                border-radius:4px;
            }
        }
    }

    // 上传
    #uploading {
    width:100%;
    display: none;
    .uploading_title {
        width: 100%;
        overflow: hidden;
        padding: 20px 40px;
        background-color: #E7F3FF;
        h2 {
            font-size: 18px;
            color: #333;
            float: left;
        }
        span {
            float: left;
            color: #3196FF;
            display: block;
            line-height: 24px;
            margin-left:20px;
            padding-left: 25px;
            cursor: pointer;
            background: url('../../common/image/icon/icon_xzbg.png') no-repeat left center;
            a {
                color: #3196FF;
            }
        }
    }
    .uploading_msg {
        width: 100%;
        padding: 14px 40px;
        overflow: hidden;
       > p {
            float: left;
            color: #666;
            font-size: 14px;
        }
        .msg_right {
            float: left;
            >p {
                color: #333;
                font-size: 14px;
                line-height: 22px;
            }
            .table_box {
                margin-top: 10px;
                img {
                    max-width: 100%;
                }
            }
            
        }
    }
    .clear {
        width: 100%;
        text-align: right;
        padding: 0 42px;
    }
    button {
        width: 120px;
        height: 40px;
        -webkit-border-radius: 4px;
        border-radius: 4px;
        border: none;
        font-size: 15px;
        margin-left: 24px;
        color: #fff;
        background-color: #CCCCCC;
    }
    .cancel {
        border: 1px solid #128dff;
        color: #FFF;
        width: 120px;
        height: 40px;
        -webkit-border-radius: 4px;
        border-radius: 4px;
        text-align: center;
        font-size: 15px;
        line-height: 40px;
        background: #3196FF;
        display: inline-block;
    }
    .send {
        background: #128dff;
    }
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
