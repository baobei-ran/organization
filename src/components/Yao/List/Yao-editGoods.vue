<template>
    <div id="editGoods" style="height:100%">
        <p class="Color_black Ft-S16 Pd-T24 Pd-B24 Pd-L24 Pd-R24 clear bg_f"><span class="fl">创建商品/增加商品</span>
        <span class="fr onbtn pointer">
            <el-button type="primary" :loading="disabled" :disabled='disabled' style='vertical-align: top;'  class="layui-btn site-demo-layedit rightBtn btn_preserve" data-type='content'>保存</el-button>
        </span><span class="fr cancelbtn Mg-R24 pointer" @click='back'>取消</span></p>
        <!-- <div class="Pd-L24" style="width: 350px;height:40px;">
            <el-input placeholder="请输入批准文号搜索" v-model="searchVal" disabled class="input-with-select">
                <el-button slot="append" @click='searchdata' disabled icon="el-icon-search"></el-button>
            </el-input>
        </div> -->
        <div class="layui-row layui-col-space22 head_msg">
            <div class="layui-col-md8">
                <div class="bg_f Mg-B24">
                        <p class="orderList_tit Color_black Ft-S16 Pd-T24 Pd-B24 Pd-L24" >
                        商品信息
                        </p>
                        

                    <div class="layui-row order_datail  Pd-L24 Pd-R24">
                        <div class="layui-col-md12 layui-col-sm12">
                            <form class="layui-form" action="">
                                <table>
                                    <tr>
                                        <td style="width: 90px;">商品分类</td>
                                        <td>
                                            <div class="layui-input-inline" style="width:200px">
                                                <el-select v-model='classId' placeholder="请选择分类" >
                                                    <el-option
                                                    v-for="item in className"
                                                    :key="item.id"
                                                    :label="item.name"
                                                    :value="item.id">
                                                    </el-option>
                                                </el-select>
                                            </div>
                                        </td>
                                    </tr>
                                    
                                    <tr>
                                        <td><span class="Color_red">*</span>商品名称</td>
                                        <td>
                                            <div style="max-width:200px">
                                                <input type="text" name="title" v-model='name' required lay-verify="required" placeholder="" autocomplete="off" class="layui-input">
                                            </div>
                                        </td>
                                    </tr>
                                    <!-- <tr>
                                        <td>商品副标题</td>
                                        <td>
                                            <div style="max-width:500px">
                                                <input type="text" name="title" v-model='ftitle' required lay-verify="required" placeholder="" autocomplete="off" class="layui-input">
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="Pd-B20">商品标签</td>
                                        <td>
                                            <div style="max-width:500px;margin-top: 10px;">
                                                <input type="text" name="title" v-model='labelText' required lay-verify="required" placeholder="" autocomplete="off" class="layui-input">
                                            </div>
                                            <p style="color:rgba(102,102,102,1);line-height:24px;margin-bottom: 10px;font-size:12px">每个标签请使用英文“,"分隔，用户可通过搜索标签查找是商品</p>
                                        </td>
                                    </tr> -->
                                    <tr style="height:182px;">
                                        <td style="display:inline-block;vertical-align: middle;margin-top: 15px; width:100%">
                                            <p><span class="Color_red">*</span>商品图片</p>
                                        </td>
                                        <td >
                                            <div style='margin-top: 15px;' class="layui-input-inline" id='fileList'>
                                                <!-- 主图片上传 -->
                                                <div class="layui-input-inline uploadimg Mg-R10" id='files1'>
                                                    <div><span class="Ft-S14">点击上传</span> <input id='zhuFile' type="file" class="pointer" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg" /></div>
                                                    <img style='width: 145px;height: 147px;border-radius: 4px;' ref='zhuImg' id='zhuImg' src="" alt="">
                                                    <label class="zhuFileLabel" for="zhuFile">重新上传</label>
                                                </div>

                                            </div>
                                            <p class="layui-input-inline Ft-S12 Color_gray6 Mg-T24" style="vertical-align: bottom;">（商品主图） 建议尺寸:750*750</p>
                                        </td>
                                    </tr>
                                </table>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div class="layui-col-md4 head_right">
                <div class="bg_f">
                    <p class="orderList_tit Color_black Ft-S16 Pd-T24 Pd-B24 Pd-L24 Mg-B24">上架设置</p>
                    <form class="layui-form" action="">
                        <div class="layui-form-item">
                            <label class="layui-form-label">上架状态</label>
                            <div class="layui-input-block">
                                <input type="radio" name="gtype" value="1" title="立即上架"  checked>
                                <input type="radio" name="gtype" value="2" title="暂不上架">
                            </div>
                        </div>
                        <div class="layui-form-item">
                            <label class="layui-form-label">限购设置</label>
                            <div class="layui-input-block">
                                <input type="text" name="title" required lay-verify="required" disabled placeholder="暂时无法使用此功能" autocomplete="off" class="layui-input">
                            </div>
                        </div>
                        <div class="layui-form-item">
                            <label class="layui-form-label">满减设置</label>
                            <div class="layui-input-block">
                                <input type="text" name="title" required lay-verify="required" disabled placeholder="暂时无法使用此功能" autocomplete="off" class="layui-input">
                            </div>
                        </div>
                        <div class="layui-form-item">
                            <label class="layui-form-label">添加标签</label>
                            <div class="layui-input-block">
                                <input type="text" name="title" required lay-verify="required" disabled placeholder="暂时无法使用此功能" autocomplete="off" class="layui-input">
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
                <!-- <div class="bg_f Mg-B24 Pd-L24 Pd-B12 Pd-T12">
                    <form class="layui-form" action="">
                        <table>
                            <tr>
                                <td width="40%">
                                    <span class="Mg-R30">运费设置</span>
                                    <input type="radio" name="price" value="3" title="全国包邮" checked>
                                </td>
                                <td width="40%" class="">
                                    <input type="radio" name="price" value="1" v-model='yunfei' title="默认运费" >
                                    <input style="width:100px;border:1px solid rgba(194,194,195,1);height:36px;padding-left:10px" :disabled='!yunfei'
                                        onkeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))"
                                     v-model='setPrice' type="number" placeholder="¥">
                                </td>
                            </tr>
                        </table>
                    </form>
                </div> -->
                <div class="bg_f Mg-B24">
                    <p class="orderList_tit Color_black Ft-S16 Pd-T24 Pd-B24 Pd-L24">商品属性</p>
                    <div class="layui-row order_datail  Pd-L24 Pd-R24">
                        <div class="layui-col-md12 layui-col-sm12">
                            <form class="" action="">
                                <table width="100%">
                                   
                                    <tr>
                                        <td ><span class="Color_red">*</span>处方/非处方</td>
                                        <td>
                                            <el-radio v-model="recipe" label="1" >处方药</el-radio>
                                            <el-radio v-model="recipe" label="2">非处方药</el-radio>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>剂型</td>
                                        <td>
                                            <div class="searchbrand" style="width: 250px;height:40px;">
                                                <el-input placeholder="请输入剂型搜索" @input='search_Val' v-model="brandVal" class="input-with-select">
                                                    <el-button slot="append" @click='search_brand' icon="el-icon-search"></el-button>
                                                </el-input>
                                                <ul id='minSelect' v-show='brand.length'>
                                                    <li v-for="(val, i) in brand" :key='i+"_11"' @click='getVal(val)'>{{ val }}</li>
                                                </ul>
                                            </div>
                                            <!-- <div style="width: 250px;height:40px;">
                                                <el-input placeholder="请输入剂型搜索" v-model="brandVal" class="input-with-select">
                                                    <el-button slot="append" @click='search_brand' icon="el-icon-search"></el-button>
                                                </el-input>
                                            </div> -->
                                        </td>
                                    </tr>
                                    <tr class="trTxt">
                                        <td><span class="Color_red">*</span>通用名称</td>
                                        <td>
                                           
                                            <input type="text" name="title" v-model='dname' required lay-verify="required" placeholder="" autocomplete="off" class="layui-input">
                                          
                                        </td>
                                        <td><span class="Color_red">*</span>用法用量</td>
                                        <td>
                                             <input type="text" name="title" v-model='dose' required lay-verify="required" placeholder="" autocomplete="off" class="layui-input">
                                            
                                        </td>
                                    </tr>
                                    <tr class="trTxt">
                                        <td>药品性状</td>
                                        <td class="Pd-B12">
                                             <input type="text" name="title" v-model='properties' required lay-verify="required" placeholder="" autocomplete="off" class="layui-input">
                                        </td>
                                        <td>不良反应</td>
                                        <td class="Pd-B12">
                                             <input type="text" name="title" v-model='untoward_effect' required lay-verify="required" placeholder="" autocomplete="off" class="layui-input">
                                        </td>
                                    </tr>
                                    <tr class="trTxt">
                                        <td><span class="Color_red">*</span>包装规格</td>
                                        <td class="Pd-B12">
                                             <input type="text" name="title" v-model='package' required lay-verify="required" placeholder="" autocomplete="off" class="layui-input">
                                        </td>
                                        <td>储藏条件</td>
                                        <td class="Pd-B12">
                                             <input type="text" name="title" v-model='storage' required lay-verify="required" placeholder="" autocomplete="off" class="layui-input">
                                        </td>
                                    </tr>
                                    <tr class="trTxt">
                                        <td>药品成分</td>
                                        <td class="Pd-B10">
                                             <input type="text" name="title" v-model='ingredient' required lay-verify="required" placeholder="" autocomplete="off" class="layui-input">
                                        </td>
                                        <td>用药禁忌</td>
                                        <td class="Pd-B10">
                                             <input type="text" name="title" v-model='contraindication' required lay-verify="required" placeholder="" autocomplete="off" class="layui-input">
                                        </td>
                                    </tr>
                                    <tr class="trTxt">
                                        <td>药理作用</td>
                                        <td>
                                             <input type="text" name="title" v-model='attending_functions' required lay-verify="required" placeholder="" autocomplete="off" class="layui-input">
                                        </td>
                                        <td>注意事项</td>
                                        <td>
                                             <input type="text" name="title" v-model='cautions' required lay-verify="required" placeholder="" autocomplete="off" class="layui-input">
                                        </td>
                                    </tr>
                                    
                                    <tr class="trTxt">
                                        <td>相互作用</td>
                                        <td>
                                             <input type="text" name="title" v-model='interaction' required lay-verify="required" placeholder="" autocomplete="off" class="layui-input">
                                        </td>
                                        <td><span class="Color_red">*</span>有效期</td>
                                        <td>
                                             <input type="text" name="title" v-model='uselife' required lay-verify="required" placeholder="" autocomplete="off" class="layui-input">
                                        </td>
                                    </tr>
                                    <tr class="trTxt">
                                        <td><span class="Color_red">*</span>生产厂商</td>
                                        <td>
                                            <input type="text" name="title" v-model='enterprise' required lay-verify="required" placeholder="" autocomplete="off" class="layui-input">
                                        </td>
                                        <td><span class="Color_red">*</span>适应症</td>
                                        <td>
                                            <input type="text" name="title" v-model='adapt' required lay-verify="required" placeholder="" autocomplete="off" class="layui-input">
                                        </td>
                                    </tr>
                                    <tr class="trTxt">
                                        <td><span class="Color_red">*</span>批准文号</td>
                                        <td>
                                            <input type="text" name="title" v-model='code' disabled required lay-verify="required" placeholder="" autocomplete="off" class="layui-input">
                                        </td>
                                        <td></td>
                                        <td>
                                            <!-- <input type="text" name="title" v-model='adapt' required lay-verify="required" placeholder="" autocomplete="off" class="layui-input"> -->
                                        </td>
                                    </tr>
                                </table>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="bg_f Mg-B24">
                    <p class="orderList_tit Color_black Ft-S16 Pd-T24 Pd-B24 Pd-L24">价格库存</p>
                    <div class="layui-row order_datail  Pd-L24 Pd-R24">
                        <div class="layui-col-md12 layui-col-sm12">
                            <form class="layui-form" action="">
                                <table width="100%">
                                    <tr>
                                        <td width="90px"><span class="Color_red">*</span>商品售价</td>
                                        <td>
                                            <div style="width:250px;">
                                                <input type="number" name="title" v-model='money' required lay-verify="required" placeholder="￥" autocomplete="off" class="layui-input">
                                            </div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td><span class="Color_red">*</span>设置库存</td>
                                        <td>
                                            <div style="width:250px;" class="fl">
                                                <!-- <el-input
                                                    placeholder=""
                                                    v-model="repertory"
                                                    :disabled="hand">
                                                </el-input> -->
                                                <input type="number" name="title" v-model='repertory' required lay-verify="required" placeholder="" autocomplete="off" class="layui-input">
                                            </div>
                                            <!-- <div class="fl Mg-L10" style="line-height:36px"><input type="checkbox" name="xx" lay-filter="check" lay-skin="primary" title="不限库存"></div> -->
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>商品货号</td>
                                        <td>
                                            <div style="width:250px;">
                                                <input type="text" name="title" v-model='shopnumber' required lay-verify="required" disabled autocomplete="off" class="layui-input">
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="bg_f Mg-B24 Pd-T20 Pd-B20 Pd-L24">
                    <div class="layui-form">
                        <span class="Mg-R24">开启推荐</span>
                        <input type="radio" name="tuijian" style='font-size: 20px;' value="1" title="开启推荐" >
                        <input type="radio" name="tuijian" value="2" title="关闭推荐" checked>
                    </div>
                </div>
                <div class="bg_f Mg-B24">
                    <p class="orderList_tit Color_black Ft-S16 Pd-T24 Pd-B24 Pd-L24">详情内容</p>
                    <div class="layui-row order_datail  Pd-L24 Pd-R24">
                        <div class="layui-col-md12 layui-col-sm12">
                            <form class="layui-form" action="">
                                <table width="100%">
                                    <tr>
                                        <td style="padding-left:0px" class="Pd-B24"><textarea lay-verify="content" id="demos"></textarea></td>
                                    </tr>
                                </table>
                            </form>
                        </div>
                    </div>
                </div>
        <p class="ac Mg-T24 goback"><button class="pointer Color_blue Mg-R24" @click="back" style="background:#fff; border:1px solid rgba(49,150,255,1)">取消</button> 
            <el-button type="primary" :loading="disabled" :disabled='disabled' style='vertical-align: top;'  class="layui-btn site-demo-layedit btn_preserve" data-type='content'>保存</el-button>
        </p>
    </div>
</template>
<script>
export default {
    name: 'editGoods',
    data() {
        return {
            yunfei: false, // 默认运费改变
            hand: false, // 不限库存的按钮
            id: '', // 商品id
            name: '',   // 商品名称	
            className: [],      // 商品分类列表
            classId: '',        // 选择商品分类id
            zPic: '',            //  商品主图片
        
                // start 已下为单选按钮群
            gtype: 1,           //  选择上架还是下架参数
            recipe: '1',         //  是否处方
            
            // end
            dname: '',          // 通用名称
            dose: '',           // 用法用量
            properties: '',      //  药品性状
            untoward_effect: '',          // 不良反应	
            package: '',         //  包装规格
            storage: '',       // 储藏条件
            ingredient: '',      //  药品成分
            contraindication: '', // 用药禁忌
            attending_functions: '', // 药理作用
            cautions: '',           // 注意事项
            code: '',               // 批准文号
            enterprise: '',         // 生产企业
            interaction: '',        // 相互作用
            uselife: '',            // 有效期
            adapt: '',              // 适应症
            money: '',              //  商品售价
            repertory: '',          // 设置库存
            details: '',            //  详情内容
            recommend: '2',         // 推荐商品 
           
            
            disabled: false,     // 按钮控制
            searchVal: '',       // 批准文号搜索值
            brandVal: '',        // 剂型搜索值
            brand: [],           // 剂型数组
            shopnumber: '',      // 货号
            timer: '',           // 搜索剂型时间
        }
    },
    
    mounted() {
        this.id = this.$route.query.id
        this.addList();
        this.editGoodsInfo(this.$route.query.id)
        $(document).bind("click",function(){
            $("#minSelect").css("display","none");
        })
    },
    methods: {  
        search_Val () {
            if (this.brandVal == '') {
                return;
            } 
            clearTimeout(this.timer)
            this.timer = setTimeout(() => {
                this.search_brand()
            }, 800)
        },
        getVal(val) {
            this.brandVal = val
            this.brand = []
        },
        addList() { // 获取商品添加信息
            var _this = this;
            layui.use('form', function(){
                var form = layui.form;
                _this.$http.post('/shv2/goods/goods_type', {}, function (res) {  // 商品分类
                // console.log(res)
                if (res.code == 1) {
                    _this.className = res.data;
                }
                
            }, function (err) { console.log(err)})
            form.on('checkbox(check)', function(data){
                _this.hand = data.elem.checked; //是否被选中，true或者false
            });   
            form.on('radio', function(data){    // 监听 单选按钮
			    // console.log(data.elem.name);         //得到radio原始DOM对象
                // console.log(data.value);        //被点击的radio的value值
                switch(data.elem.name) {
                    case 'gtype': _this.gtype = data.value;  break;
                    case 'recipe': _this.recipe = data.value; break;
                    case 'pack': _this.pack = data.value; break;
                    case 'type': _this.type = data.value; break;
                    case 'price': _this.freight = data.value; 
                            if (_this.freight == 1) {
                                _this.yunfei = true
                            } else {
                                 _this.yunfei = false
                            }
                    ; break;
                    case 'tuijian': _this.recommend = data.value; break;
                }
            });  
            
            $('#zhuFile').on('change', function () {    // 主图为封面
                $('#zhuImg').attr('src', window.URL.createObjectURL(this.files[0]))
                $('#zhuImg').prev().hide()
                $('#zhuImg').next().show()
                 $.each($('#zhuFile')[0].files, function (i, file) {
                    _this.zPic = file
                })
            })
           
        });

           
            
        },
        back () {   // 取消返回
            this.$router.back();
        },
        obsubmit() {    // 添加商品、保存
            var _this = this;
            console.log(this.details)
            var formdata = new FormData();
            layui.use(['layer','form'], function(){
            var layer = layui.layer;
            var form = layui.from;
            
            // if (!_this.classId) {
            //     layer.msg('请选择商品分类')
            //     return
            // }
            if(!_this.name) {
                layer.msg('请输入商品名称')
                return false
            } 
            else if (!_this.zPic) {
                layer.msg('请上传商品图片')
                return
            } else if (!_this.dname) {
                layer.msg('请输入通用名称')
                return
            } else if (!_this.dose) {
                layer.msg('请输入用法用量')
                return
            } 
            // else if (!_this.properties) {
            //     layer.msg('请输入药品性状')
            //     return
            // } 
            // else if (!_this.untoward_effect) {
            //     layer.msg('请输入不良反应')
            //     return
            // }
             else if (!_this.package) {
                layer.msg('请输入包装规格')
                return
            } 
            // else if (!_this.storage) {
            //      layer.msg('请输入储藏条件')
            //     return
            // } else if (!_this.ingredient) {
            //     layer.msg('请输入药品成分')
            //     return
            // } else if (!_this.contraindication) {
            //     layer.msg('请输入用药禁忌')
            //     return
            // } else if (!_this.attending_functions) {
            //     layer.msg('请输入药理作用')
            //     return
            // } else if (!_this.cautions) {
            //     layer.msg('请输入注意事项')
            //     return
            // } 
            // else if (!_this.interaction) {
            //     layer.msg('请输入相互作用')
            //     return
            // } 
            // else if (!_this.code) {
            //     layer.msg('请输入批准文号')
            //     return
            // } 
            else if (!_this.enterprise) {
                layer.msg('请输入生产厂商')
                return
            } else if (!_this.uselife) {
                layer.msg('请输入有效期')
                return
            } else if (!_this.adapt) {
                layer.msg('请输入适应症')
                return
            } else if (!_this.money || _this.money < 0.01) {
                layer.msg('请输入商品价格')
                return
            } 
            
            if (!_this.repertory ||  _this.repertory < 1) {
                layer.msg('请输入库存')
                return
            } 
            // else if (!_this.details) {
            //     layer.msg('请输入详情内容')
            //     return
            // }
                _this.disabled = true;
                var time = setTimeout(function () {
                    _this.disabled = false
                }, 3000)
                
                
                formdata.append("id", _this.id);
                formdata.append("tid", _this.classId);   // 商品分类
                formdata.append('name', _this.name);  // 商品名称
                formdata.append('pic', _this.zPic);  // 商品图片
                if (_this.recipe == 1) {   // 处方状态
                    formdata.append('cfy', '处方'); 
                } else {
                    formdata.append('cfy', '非处方'); 
                }
                formdata.append("ypzt", _this.brandVal); // 剂型
                formdata.append('pzwh', _this.code)  // 批准文号
                formdata.append('mc', _this.dname); // 通用名称
                formdata.append('yfyl', _this.dose); // 用法用量
                formdata.append('xz', _this.properties); //  药品性状
                formdata.append('blfy', _this.untoward_effect); // 不良反应	
                formdata.append('gg', _this.package);  //  包装规格
                formdata.append('zc', _this.storage); // 储藏条件
                formdata.append('cf', _this.ingredient); //  药品成分
                formdata.append('jj', _this.contraindication); // 用药禁忌
                formdata.append('ylzy', _this.attending_functions); // 药理作用
                formdata.append('zysx', _this.cautions)      // 注意事项
                formdata.append('gc', _this.enterprise) // 生产企业
                formdata.append('xhzy', _this.interaction) // 相互作用
                formdata.append('yxq', _this.uselife)  // 有效期
                formdata.append('money', _this.money) // 商品价格
                formdata.append('syz', _this.adapt)  // 适应症
                formdata.append('stock', _this.repertory)  // 库存
                formdata.append('recommend', _this.recommend)  //  推荐商品
                formdata.append('details', _this.details)     // 内容
                formdata.append('type', _this.gtype)     // 1.立即上架 2.暂不上架
               
                
                
                _this.$http.upload('/shv2/goods/up_goods', formdata, function (res) {
                    console.log(res)
                    if (res.code == 1) {
                        layer.msg(res.msg, { icon:1, time: 1500})
                        setTimeout(()=> {
                            _this.go('/jgmall/goodsList')
                        }, 1500)
                    } else {
                        layer.msg(res.msg, { icon:2 });
                    }
                }, function (err) { console.log(err);})
               
            }); 
            
        },

        searchdata () { // 批准文号搜索
           var _this = this;
            layui.use('layer', function(){
                var layer = layui.layer;
                if(!_this.searchVal) {
                    // layer.msg('请输入批准文号搜索', {icon:0});
                    return;
                }
                _this.$http.post('/shv2/goods/goods_attr', {pzwh: _this.searchVal }, function (res) {
                    console.log(res)
                    if (res.code == 1) {
                        _this.searchDataVal(res.data)
                    } else {
                        layer.msg('未匹配到数据', {icon:0});
                    }
                }, function (err) { console.log(err)})
                
            });  
        },
        searchDataVal (data) {
            var _this = this;
                _this.name = data.mc    // 商品名称
                _this.zPic = data.img    // 商品图片
                if (_this.zPic) {
                    _this.$refs.zhuImg.src = _this.$http.baseURL+_this.zPic
                }
                if (data.cfy == '处方药') {  // 处方状态
                    _this.recipe = '1'
                } else {
                    _this.recipe = '2'
                }
                console.log( _this.recipe)
                
                _this.brandId = data.ypzt // 剂型
                _this.code = data.pzwh   // 批准文号
                _this.dname = data.mc   // 通用名称
                _this.dose = data.yfyl  // 用法用量
                _this.properties= data.xz //  药品性状
                _this.untoward_effect = data.blfy // 不良反应	
                _this.package = data.gg   //  包装规格
                _this.storage = data.zc   // 储藏条件
                _this.ingredient = data.cf  //  药品成分
                _this.contraindication = data.jj    // 用药禁忌
                _this.attending_functions = data.ylzy  // 药理作用
                _this.cautions = data.zysx          // 注意事项
                _this.enterprise = data.gc          // 生产企业
                _this.interaction = data.xhzy       // 相互作用
                _this.uselife = data.yxq            // 有效期
                _this.adapt = data.syz              // 适应症
                _this.money = data.money            // 商品价格
                _this.repertory = data.stock        // 库存
                _this.recommend = data.recommend    //  推荐商品
                _this.details = data.details        // 内容
        },
        search_brand () { // 剂型搜索
            var _this = this;
            _this.brand = []
            layui.use('layer', function(){
                var layer = layui.layer;
                if (!_this.brandVal) {
                    layer.msg('请输入内容搜索', {icon:0})
                    return;
                }
                _this.$http.post('/shv2/goods/goods_ypzt', { ypzt: _this.brandVal }, function (res) {
                    console.log(res)
                    if (res.code == 1) {
                        _this.brand = res.data
                    } else {
                        layer.msg(res.msg);
                    }
                }, function (err) {})
                
            });
        },

        // 编辑页

        editGoodsInfo (id) {  // 编辑 根据 id 获取商品详情
            var _this = this;
            _this.$http.post('/shv2/goods/goods_info', {id: id}, function (res) {
                console.log(res)
                if (res.code == 1) {
                    _this.editData(res.data)
                } else {

                }
            }, function (err) {})
        },
        editData (data) { // 把数据渲染页面上
            var _this = this;
                _this.name = data.mc    // 商品名称
                _this.zPic = data.pic    // 商品图片
                if (_this.zPic) {
                    _this.$refs.zhuImg.src = _this.$http.baseURL+_this.zPic
                }
                if (data.cfy == '处方药') {  // 处方状态
                    _this.recipe = '1'
                } else {
                    _this.recipe = '2'
                }
                console.log( _this.recipe)
                _this.classId = data.tid  // 商品分类
                _this.name = data.name
                _this.brandId = data.ypzt // 剂型
                _this.code = data.pzwh   // 批准文号
                _this.searchVal = data.pzwh
                _this.dname = data.mc  // 通用名称
                _this.dose = data.yfyl  // 用法用量
                _this.properties= data.xz //  药品性状
                _this.untoward_effect = data.blfy // 不良反应	
                _this.package = data.gg   //  包装规格
                _this.storage = data.zc   // 储藏条件
                _this.ingredient = data.cf  //  药品成分
                _this.contraindication = data.jj    // 用药禁忌
                _this.attending_functions = data.ylzy  // 药理作用
                _this.cautions = data.zysx          // 注意事项
                _this.enterprise = data.gc          // 生产企业
                _this.interaction = data.xhzy       // 相互作用
                _this.uselife = data.yxq            // 有效期
                _this.adapt = data.syz              // 适应症
                _this.money = data.money            // 商品价格
                _this.repertory = data.stock        // 库存
                _this.recommend = data.recommend    //  推荐商品
                _this.details = data.details        // 内容
                _this.shopnumber = data.number
                _this.layeditdata()
        },
        layeditdata() {    // 建立富文本编辑器
            var _this = this;
            for (var i=0; i<$('input[name=tuijian]').length; i++) {
                if ($('input[name=tuijian]')[i].value == _this.recommend) { // 是否推荐
                    $('input[name=tuijian]')[i].checked = true
                } else {
                    $('input[name=tuijian]')[i].checked = false
                }
                if($('input[name=gtype]')[i].value == _this.gtype) {    // 上架状态
                    $('input[name=gtype]')[i].checked = true
                } else {
                    $('input[name=gtype]')[i].checked = false
                }
            }
            layui.use(["layer", "element", "form", "layedit", 'jquery'], function () {
                var element = layui.element;
                var form = layui.form;
                
                var layedit = layui.layedit,
                    $ = layui.jquery;
                var index = layedit.build('demos',{
                    height:'160px',
                    tool: [
                        'strong' //加粗
                        ,'italic' //斜体
                        ,'underline' //下划线
                        ,'del' //删除线
                        ,'|' //分割线
                        ,'left' //左对齐
                        ,'center' //居中对齐
                        ,'right' //右对齐
                        ,'link' //超链接
                        ,'unlink' //清除链接
                        ,'face' //表情
                    ]
                }); //建立编辑器
                form.verify({
                    content: function(value) { 
                        return layedit.sync(index);
                    }
                })
                $('.btn_preserve').on('click', function(){
                    var type = $(this).data('type');
                    active[type] ? active[type].call(this) : '';
                    _this.obsubmit()
                });
                //编辑器外部操作
                var active = {
                    content: function(){
                        _this.details = layedit.getContent(index); //获取编辑器内容
                    },
                    text: function(){
                        console.log(layedit.getText(index)); //获取编辑器纯文本内容
                    }
                    ,selection: function(){
                        console.log(layedit.getSelection(index));
                    }
                };

               var ti = setTimeout(() => {
                    if (_this.details) {    // 赋值失败
                        layedit.setContent(index, _this.details);
                    }
                    clearTimeout(ti)
               }, 1000)
                   
                form.render()//防止渲染失败
            });
        },
    }
}
</script>
<style>
.el-radio__inner {
    width: 18px;
    height: 18px;
    border: 1px solid #ccc;
}
</style>

<style scoped lang="less">
#editGoods {
    .rightBtn {
        vertical-align: top; 
        background:rgba(49,150,255,1);
        border-radius:4px;
        height: 32px;
        line-height: 32px;
        border: 1px solid #3196ff;
        color: #fff;
    }
    input {
        border: 1px solid rgba(194, 194, 195, 1);
    }
    .addangument {
        display: inline-block;
        width: 280px;
        height: 30px;
        border: 1px solid rgba(49, 150, 255, 1);
        border-radius: 4px;
        text-align: center;
        line-height: 30px;
    }
    .onbtn {
        width: 70px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        background: rgba(49, 150, 255, 1);
        border-radius: 4px;
        color: #fff;
        font-size: 16px;
    }
    .cancelbtn {
        color: #3196ff;
        border: 1px solid #3196ff;
        width: 70px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        background: #fff;
        border-radius: 4px;
        font-size: 16px;
    }
    .orderList_tit {
        border-bottom: 1px solid #e6e6e6;
    }
    .head_msg {
        .head_right {
            .bg_f {
                height: 516px;
                .layui-form-label {
                    width: 100px;
                }
                .layui-input-block {
                    width: 65%;
                }
            }

            ::-webkit-scrollbar {
                width: 4px;
                // height: 50px;
                background-color: #fff;
            }

            ::-webkit-scrollbar-track {
                border-radius: 4px;
                background-color: #fff;
            }

            ::-webkit-scrollbar-thumb {
                border-radius: 4px;
                -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
                background-color: #e6e6e6;
            }
        }
    }
    .order_datail {
        padding-bottom: 12px;
        table {
            margin-top: 12px;
            width: 100%;
            tr {
                height: 60px;
                td {
                    font-size: 14px;
                }
                td:first-child {
                    color: #666;
                    text-align: right;
                    padding-right: 20px;
                }
                td:last-child {
                    color: #333;
                    .uploadimg {
                        width: 150px;
                        height: 150px;
                        margin: 3px 0;
                        text-align: center;
                        position: relative;
                        border: 1px dashed #c2c2c2;
                        border-radius: 4px;
                        input {
                            width: 158px;
                            height: 158px;
                            opacity: 0;
                            position: absolute;
                            left: 0px;
                            z-index: 3;
                        }
                        span {
                            display: block;
                            width: 158px;
                            height: 158px;
                            padding-top: 100px;
                            background: url(../../../common/image/pages/account/icon_pic.png)
                                no-repeat center 44px;
                            position: absolute;
                            z-index: 0;
                            left: 0px;
                            color: #c2c2c2;
                        }
                        p {
                            margin-top: 168px;
                        }
                        p:last-child {
                            margin-top: 0px;
                        }
                    }
                }
            }
            tr.trTxt {
                width: 100%;
                td:first-child, td:nth-child(3) {
                    width: 80px;
                    text-align: right;
                    padding-right: 20px;
                }
                td:last-child, td:nth-child(2) {
                    width: 40%;
                    padding: 12px 0;
                    input {
                        width: 100%;
                    }
                }
            }
        }
    }

    .goback {
        margin-bottom: 98px;
        button {
            width: 100px;
            height: 36px;
            background: rgba(49, 150, 255, 1);
            border-radius: 4px;
            border: none;
            font-size: 16px;
            color: #fff;
        }
    }
}

.zhuFileLabel {
    position:absolute;
     bottom: 0;
     left: 0;
     cursor: pointer;
     border-radius: 0 0 4px 4px;
     background: rgba(0,0,0,.6);
     display: block;
     width: 100%;
     color: #fff;
     line-height: 28px;
     display: none;
}
#fileList {
    display: flex;
    flex-wrap: wrap;
}


.searchbrand {
    position: relative;
    > ul {
        position: absolute;
        left: 0;
        top: 44px;
        width: 200px;
        background: #fffefe;
        border: 1px solid #e4e7ed;
        border-radius: 4px;
        padding: 10px 0;
        transition: -webkit-transform 1s ease-in-out;
        transition: transform 1s ease-in-out;
        &::before {
            content: '';
            position: absolute;
            width: 0;
            height: 0;
            border-left: 6px solid transparent;
            border-right: 6px solid transparent;
            left: 35px;
            top: -8px;
            border-bottom: 8px solid #e4e7ed;
        }
        &::after {
            position: absolute;
            content: " ";
            left: 35px;
            top: -6px;
            width:0;
            height:0;
            border-width:0 6px 6px;
            border-style:solid;
            border-color:transparent transparent #fffefe;
        }
        li {
            padding: 10px 0px 10px 20px;
            cursor: pointer;
            &:hover {
                background-color: #f5f7fa;
            }
        }
    }
}


</style>
