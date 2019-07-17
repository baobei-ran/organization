<template>
    <div id="orderList" style="height:100%">
        <div class="bg_f">
            <p class="orderList_tit Color_black Ft-S16 Pd-T24 Pd-B24 Pd-L24">处方申请</p>
            <ul class="Pd-T14 Pd-B14 header dis_f">
                <li class="layui-input-block">
                    <label class="layui-form-label">请选择医生</label>
                     <el-checkbox v-model="checkAll" @change="handleCheckAllChange" v-show='doctorList.length'>全选</el-checkbox>
                     <span class="Color_red" v-show='!doctorList.length'>无医生， 无法生成处方</span>
                </li>
                <li>
                    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                            <el-checkbox v-for="(city,i) in doctorList" :disabled="city.type == 1" :label="city" :key="i">{{city.true_name}} <img v-show='city.type == 1' style="width:36px;height:13px;vertical-align: top;" src="../../../common/image/icon/icon_tzz.png" alt=""></el-checkbox>
                        </el-checkbox-group>
                </li>
            </ul>
        </div>
        <div class="tab_content Mg-T20 bg_f">
            <p class="orderList_tit Color_black Ft-S16 Pd-T24 Pd-B24 Pd-L24">患者信息</p>
            <div class="layui-tab Pd-L24 Pd-R30">
                <div class="layui-tab-content ">
                    <ul class="screen_type Pd-T20 Pd-B24 dis_f">
                         <li class="layui-inline Pd-L10">
                            <span class="Color_red">*</span>
                            <label>患者手机</label>
                            <div class="layui-input-inline">
                                <input type="text" name="" v-model='userPhone' autocomplete="off" class="layui-input">
                            </div>
                        </li>
                        <li class="layui-inline">
                            <span class="Color_red">*</span>
                            <label>患者姓名</label>
                            <div class="layui-input-inline">
                                <input type="text" name="" v-model='username' autocomplete="off" class="layui-input">
                            </div>
                        </li>
                        <li class="lay_width">
                            <span class="Color_red">*</span>
                            <label >性别</label>
                            <div class="layui-input-inline" >
                                <el-select v-model="sex" style="width:165px;" placeholder="请选择">
                                    <el-option
                                    v-for="item in options"
                                    :key="item.id"
                                    :label="item.val"
                                    :value="item.id">
                                    </el-option>
                                </el-select>
                            </div>
                            
                        </li>
                        <li class="lay_width Mg-L10">
                            <span class="Color_red">*</span>
                            <label >年龄</label>
                            <div class="layui-input-inline" >
                                <input type="number" name="price_max" v-model='age' autocomplete="off" class="layui-input">
                            </div>
                        </li>
                        
                       

                        
                    </ul>

                    <div class="content">
                        <ul>
                            <li>
                                <label>肝功能</label>
                                <input type="text" name="" v-model='liver' autocomplete="off" placeholder="（默认为正常）" class="layui-input">
                            </li>
                            <li>
                                <label>肾功能</label>
                                <input type="text" name="" v-model='kidney' autocomplete="off"  placeholder="（默认为正常）" class="layui-input">
                            </li>
                            <li>
                                <label>过敏史</label>
                                <input type="text" name="" v-model='allergy' autocomplete="off"  placeholder="（默认为正常）" class="layui-input">
                            </li>
                            <li>
                                <label>过往病史</label>
                                <input type="text" name="" v-model='ago' autocomplete="off"  placeholder="（默认为正常）" class="layui-input">
                            </li>
                            <li>
                                <label>备孕情况</label>
                                <input type="text" name="" v-model='yun' autocomplete="off"  placeholder="（默认为正常）" class="layui-input">
                            </li>
                            <li>
                                <label><span class="Color_red">*</span>症状</label>
                                <textarea name="desc" required class="layui-textarea"  v-model='disease' placeholder="（必填）请详细描述患者的疾病信息，医生将以此为依据判断能否开具处方" ></textarea>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="tab_content Mg-T20 bg_f ">
            <p class="orderList_tit Color_black Ft-S16 Pd-T24 Pd-B24 Pd-L24">处方药品 <span style='color: #808080;font-size: 12px;'>（可选择商城中的药品，也可以手动添加药品）</span></p>
            <div class="table_con">
                <table class="layui-table" lay-skin="">
                    <thead>
                        <tr class="ac">
                            <td class="firstheadtd"><span class="Color_red">*</span>药品名称</td>
                            <td><span class="Color_red">*</span>药品数量</td>
                            <td><span class="Color_red">*</span>用法及用量</td>
                            <td>规格</td>
                            <td>厂家名称</td>
                            <td style="width:120px;"></td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="Color_black ac" v-for='(val,i) in drugPreserveList' :key='i+"_jj"' >
                            <td>
                                {{val.name}}
                            </td>
                            <td>
                                <input type="number" name="title" v-model="val.num"  lay-verify="required" placeholder="【药品数量】" autocomplete="off" class="layui-input">
                            </td>
                            <td style="width: 200px;">
                               <span class="usages">{{val.usage}}</span>
                            </td>
                            <td>{{ val.gg }}</td>
                            <td>{{ val.cname }}</td>
                            <td class="delBtn"><span class="pointer" style="color: #F09F88;" @click='dels(i)'><img src="../../../common/image/icon/icon_sc@2x.png" alt="" />删除此商品</span></td>
                        </tr>
                        <tr class="Color_black ac" v-for='(val,i) in tablelist' :key='i' >
                            <td>
                                <input type="text" name="title" v-model='val.name' lay-verify="required" placeholder="【药品名称】" autocomplete="off" class="layui-input">
                            </td>
                            <td>
                                <input type="number" name="title" v-model="val.num"  lay-verify="required" placeholder="【药品数量】" autocomplete="off" class="layui-input">
                            </td>
                            <td>
                                <input type="text" name="title" v-model="val.usage" lay-verify="required" placeholder="【用法及用量】" autocomplete="off" class="layui-input">
                            </td>
                            <td>
                                <input type="text" name="title" v-model="val.gg" lay-verify="required" placeholder="【规格】" autocomplete="off" class="layui-input">
                            </td>
                            <td>
                                <input type="text" name="title" v-model="val.cname" lay-verify="required" placeholder="【厂家名称】" autocomplete="off" class="layui-input">
                            </td>
                            <td class="delBtn">
                                <!-- <span class="pointer" style="color: #F09F88;" @click='dels(i)'><img src="../../../common/image/icon/icon_sc@2x.png" alt="" />删除此商品</span> -->
                            </td>
                        </tr>
                    </tbody>
                    
                </table>
                <div class="addbtn">
                    <button @click='drugList'>+添加药品</button>
                </div>
            </div>
        </div>
        <p style='height: 24px;background-color: #F1F2F9;'></p>
        <div class="tab_content ">
            <div class="dis_f msgs">
                <label>药店留言</label>
                <textarea name="desc" required class="layui-textarea" v-model='shop_word'  placeholder="（选填）" ></textarea>
            </div>
        </div>
        <div class="returns">
                <button class="layui-btn" @click='returnBnt'>取消</button>
                <button class="layui-btn layui-btn-normal" @click='submitdata'>立即提交</button>
                <!-- <el-button class='Mg-L20' type="primary" :disabled='disabled' @click='submitdata' :loading="disabled">立即提交</el-button> -->
        </div>

        <!-- 添加药品弹框 -->
        <div id="addDrugLsit" class='hide'>
            <h1>添加药品 <span @click="addtabel">手动添加</span></h1>
            <ul class="dis_f">
                    <li class="layui-inline Pd-L10">
                    <label>药品名称</label>
                    <div class="layui-input-inline">
                        <input type="text" name="" style="width:200px;" v-model='drugName' autocomplete="off" class="layui-input">
                    </div>
                </li>
                <li class="layui-inline">
                    <label>厂家名称</label>
                    <div class="layui-input-inline">
                        <input type="text" name="" style="width:200px;" v-model='drugManufacturer' autocomplete="off" class="layui-input">
                    </div>
                </li>
                <li><button class="layui-btn layui-btn-normal" @click='searchDrug'>搜索</button></li>
            </ul>
            <div class="drug_table">
                <el-table
                    ref="multipleTable"
                    :data="drugData"
                    :row-style='styleColor'
                    tooltip-effect="dark"
                    style="width: 100%;"
                    :header-cell-style='styleObj'
                    highlight-current-row
                    @selection-change="handleSelectionChange"
                    >
                    <el-table-column
                    type="selection" align='center'
                    width="55">
                    </el-table-column>
                    <el-table-column align='center'
                    label="药品图片"
                    width="100">
                    <template slot-scope="scope">
                        <img style="width:60px;" :src="$http.baseURL+scope.row.pic" alt="" />
                    </template>
                    </el-table-column>
                    <el-table-column align='center'
                    prop="mc"
                    label="药品名称"
                    width="120">
                    </el-table-column>
                    <el-table-column align='center'
                    prop="gc"
                    label="厂家名称"
                    >
                    </el-table-column>
                    <el-table-column align='center'
                    label="用法用量"
                    width='250'
                    >
                    <template slot-scope="scope">
                        <p class="p_block">{{ scope.row.yfyl }}</p>
                    </template>
                    </el-table-column>
                    <el-table-column align='center'
                    prop="gg"
                    label="药品规格"
                     width="100"
                    >
                    </el-table-column>
                </el-table>
                <span class="shads"></span>
            </div>
            <div class="footBtn">
               <button type="button" class="layui-btn cancel" @click='drugCancel'>取消</button>
               <button type="button" class="layui-btn layui-btn-normal" @click="drugPreserve">保存</button>
            </div>
        </div>

        <!-- 收费提示 -->
        <el-dialog title="提示" center :visible.sync="dialogVisible" :show-close='false' width="400px" >
            <div style='padding: 20px;text-align:center;'>
                <p style="line-height: 30px;color:#333;font-size:16px;">{{ submitMsg1 }} <br/> {{ submitMsg2 }} </p>
            </div>
            <div style='width: 100%;text-align:center;margin-top: 20px;'>
                <span slot="footer" class="dialog-footer">
                    <el-button style="border: 1px solid #3196FF; color:#3196FF;margin-right:30px;" @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" :disabled='disabled' :loading="disabled" @click="submitBtn(btnType)">确 定</el-button>
                </span>
            </div>
        </el-dialog>

    </div>
</template>
<script>
// 节流函数
var delay = (function() {
var timer = 0;
 return function(callback, ms) {
 clearTimeout(timer);
 timer = setTimeout(callback, ms);
 };
})();
export default {
    name: 'addApply',
    data() {
        return {
            styleObj: {
                'background':'#DAE9FF',
                'color': '#333',
            },
            options: [{id:2, val: '男'},{id:1,val:'女'}],
            doctorList: [],             // 医生列表
            checkAll: false,            // 全选按钮操作
            checkedCities: [],          // 选择医生的数据列表
            username: '',               // 名字
            sex: '',                    // 性别
            age: '',                    // 年龄
            userPhone: '',              // 电话
            liver: '',                  // 肝功能
            kidney: '',                 // 肾功能
            allergy: '',                // "过敏史
            ago: '',                    // 过往病史
            yun: '',                    // 备孕情况
            disease: '',                // 病症
            drugArr: [],                // 药品名称
            drugNum: [],                // 药品数量
            usage: [],                  // 用法及用量
            shop_word: '',              // 药店留言
            size: 3,                    // 处方药品的列表数量
            disabled: true,             // 按钮
            tablelist: [                // 获取处方药品的数据
                {name: '', num: '', usage: '', cname: '', gg: ''},
                {name: '', num: '', usage: '', cname: '', gg: ''},
            ],
            drugData: [],               // 药品列表
            multipleDrug: [],    // 选择的药品
            drugName: '',         // 药品名称
            drugManufacturer: '', // 药品厂商
            drugPreserveList: [], // 保存的药品
            submitMsg1: '填写的的信息尚未提交',
            submitMsg2: '是否确认返回？',
            dialogVisible: false,
            btnType: 0,    
        }
       
    },
    watch: {
        //watch userPhone change
        userPhone() {
            delay(() => {
                this.searchPhone();
            }, 300);
        },
    },
    mounted() {
      var self = this;
        self.$http.post('/shv2/Recipetwo/recipe_doc', {}, function (res) {
            console.log(res)
            if (res.code == 1) {
                self.doctorList = res.data
                self.disabled = false
            }
        }, function (err) { console.log(err)})
        this.initDrug()
    },
    methods: {
        returnBnt () {
           this.submitMsg1 = '填写的的信息尚未提交'
           this.submitMsg2 = '是否确认返回？'
           this.dialogVisible = true 
           this.btnType = 0    
        },
        dels (i) {  // 删除药品
            this.drugPreserveList.splice(i, 1)
            // this.drugPreserveList = this.drugPreserveList.filter(val => {
            //     return val.id !== id
            // })
        },
        handleSelectionChange(val) {  // 选择药品添加
            console.log(val)
            this.multipleDrug = val;
        },
        styleColor ({row, rowIndex}) { // 隔行变色
            if (rowIndex %2 == 1) {
            return { "background-color": "#E5F0FF" }
            } else {
                return { "background-color": "#FFF" }
            }
        },
        initDrug () { // 获取药品信息
            var _this = this;
            var obj = {yname: this.drugName, cname: this.drugManufacturer }
            layui.use('layer', function(){
                var layer = layui.layer;
                _this.$http.post('/shv2/recipetwo/hos_store', obj, function (res){
                    console.log(res)
                    if (res.code == 1) {
                        _this.drugData = res.data
                    } else {
                        _this.drugData = []
                    }
                }, function (err) {})
            })
        },
        searchDrug () {  // 搜索药品信息
            var _this = this;
            var obj = {yname: this.drugName, cname: this.drugManufacturer }
            layui.use('layer', function(){
                var layer = layui.layer;
                _this.$http.post('/shv2/recipetwo/hos_store', obj, function (res){
                    console.log(res)
                    if (res.code == 1) {
                        _this.drugData = res.data
                    } else {
                        layer.msg('未查询到商品',{icon:0})
                        _this.drugData = []
                    }
                }, function (err) {})
            })
        },
        drugPreserve () {  // 药品保存
            var _this = this;
            layui.use('layer', function() {
                var layer = layui.layer;
                if (_this.multipleDrug.length <= 0) {
                    layer.msg('请选择药品',{icon:0});
                    return false;
                }
                // 'name' => '药品名称',
                // 'num' => '药品数量',
                // 'id'=>'药品列表id or 空',
                // 'usage'=>'用法及用量',
                // 'cname'=>'厂家名称',
                // 'gg'=>规格
                _this.multipleDrug.map(v => {
                    var obj = new Object();
                    obj.name = v.mc
                    obj.num = 1
                    obj.id = v.id
                    obj.usage = v.yfyl
                    obj.cname = v.gc
                    obj.gg = v.gg
                    _this.drugPreserveList.push(obj)
                })
                _this.multipleDrug = []
                _this.drugCancel()
                _this.searchDrug()
            }); 
            
        },
        submitdata() {   // 提交
            var _this = this;
            layui.use(["layer", 'table'], function () {
                var layer = layui.layer;
                var table = layui.table;
                var isphone = /^1[3456789]\d{9}$/;
                var isNum = /\d/;
                var flag = false;
                if (_this.checkedCities.length <= 0) {
                    layer.msg('请选择医生',{icon:2})
                    return;
                }
                if(!_this.userPhone || !isphone.test(_this.userPhone)) {
                    layer.msg('请输入正确电话',{icon:2})
                    return;
                }
                if (!_this.username) {
                    layer.msg('请输入姓名',{icon:2})
                    return;
                }
                if(!_this.sex) {
                    layer.msg('请选择性别',{icon:2})
                    return;
                }
                if(!_this.age) {
                    layer.msg('请输入年龄',{icon:2})
                    return;
                } else if (!isNum.test(_this.age)) {
                    layer.msg('请输入正确年龄',{icon:2})
                    return;
                }
                
                if (!_this.disease) {
                    layer.msg('请输入症状',{icon:2})
                    return;
                }
                var tabledata = _this.tablelist.filter(val => {
                    return val.name !== '' || val.num !== '' || val.usage !== ''
                })
                if (tabledata.length <=0 && _this.drugPreserveList.length <= 0) {
                    layer.msg('请输入药品',{icon:2})
                    return ;
                }
                console.log(tabledata)
                if (tabledata.length > 0) {
                    tabledata.map(val => {
                        if (!val.name || !val.num || !val.usage) {
                            layer.msg('请完善药品数据',{icon:2})
                            flag = true
                            return false;
                        }
                    })
                }
                if(_this.drugPreserveList.length>0) {
                    _this.drugPreserveList.map(val => {
                        if (val.num == '') {
                            layer.msg('请输入药品数量',{icon:2})
                            flag = true
                            return false;
                        }
                    })
                }
                if (flag) {
                    return false;
                }
                _this.submitMsg1 = '您将通过鲁医通账户支付此次处方费用'
                _this.submitMsg2 =  '是否确认提交？'
                _this.dialogVisible = true
                _this.btnType = 1
            });
        },
         
        addtabel () {   // 添加表格
            var obj = {name: '', num: '', usage: '', cname: '', gg: ''}
            this.tablelist.push(obj)
            this.drugCancel()
        },
        handleCheckAllChange(val) {     // 全选
            if(val) {
                this.checkedCities = this.doctorList.filter(val => {
                    return val.type == 0
                }) 
            } else {
                this.checkedCities = [] 
            }
        },
        handleCheckedCitiesChange(value) {  // 单选
                var checkedCount = value.length;
                if (checkedCount == this.doctorList.length) {
                    this.checkAll = true;
                } else {
                    this.checkAll = false;
                }
        },
        searchPhone () { // 根据手机号搜索信息
            var _this = this;
            var isphone = /^1[3456789]\d{9}$/;
            if (!isphone.test(this.userPhone)) {
                return;
            }
            _this.$http.post('/shv2/Recipetwo/user_data', {phone: this.userPhone}, function (res) {
                console.log(res)
                if (res.code == 1) {
                    _this.phoneMsg(res.data)
                }
            })

        },
        phoneMsg (data) { // 根据电话获取的信息
            this.username = data.real_name       // 名字
            this.sex = data.sex                  // 性别
            this.age = data.age                  // 年龄
            this.liver = data.liver              // 肝功能
            this.kidney = data.kidney            // 肾功能
            this.allergy = data.allergy          // "过敏史
            this.ago = data.ago                  // 过往病史
            this.yun = data.yun                  // 备孕情况
        },
        drugList () {  // 添加药品列表
            var self = this;
            if (this.drugData.length <= 0) {
                this.initDrug()
            }
            layui.use(["layer"], function () {
                var layer = layui.layer;
                var $ = layui.jquery;
                layer.open({
                    type: 1,
                    shade: 0.4,
                    shadeClose: true,
                    closeBtn: 0,
                    title: "",
                    content: $("#addDrugLsit"),
                    area: ["860px", "540px"],
                    cancel: function () { }
                });
            });
        },
        drugCancel () { // 关闭弹框
            layui.use('layer', function(){
                var layer = layui.layer;
                layer.closeAll('page');
            }); 
        },
        submitBtn (n) {
            var _this = this;
            if (n == 0) {
                this.go("/server/YaoprescriptionListPic/YaoprescriptionList")
            } else {
                this.disabled = true
                var arr = []
                _this.checkedCities.map(val => {
                    arr.push(val.did)
                })
                var tabledata = _this.tablelist.filter(val => {
                    return val.name != '' || val.num != '' || val.usage != ''
                })
                if (tabledata.length>0) {
                    tabledata.forEach(val => {
                        console.log(val)
                       _this.drugPreserveList.push(val)
                    })
                }

                var obj = {
                    did: arr.join(','),
                    names: _this.username,
                    sex: _this.sex == 1? _this.sex:'0',
                    age: _this.age,
                    phone: _this.userPhone,
                    liver: _this.liver? _this.liver:'正常',
                    kidney: _this.kidney?_this.kidney : '正常',
                    allergy: _this.allergy?_this.allergy : '正常',
                    ago: _this.ago? _this.ago : '正常',
                    yun: _this.yun? _this.yun : '正常',
                    disease:  _this.disease,
                    drug: _this.drugPreserveList,
                    shop_word: _this.shop_word
                }
                console.log(obj)
                _this.$http.postJson('/shv2/Recipetwo/recipe_add', obj,null, function (res) {
                    console.log(res)
                    if (res.code == 1) {
                        layer.msg('提交成功', { icon:1 , time: 1000})
                        var t = setTimeout(() => {
                           _this.disabled = false
                           _this.go('/server/YaoprescriptionListPic/YaoprescriptionList');
                           clearTimeout(t)
                        }, 1000)
                    } else if (res.code == 0) {
                        layer.msg('请添加完善数据和处方药品',{icon:2})
                        _this.disabled = false
                    } else {
                        layer.msg(res.msg,{icon:2})
                        _this.disabled = false
                    }
                }, function (err) { console.log(err) });
                
            }
        }
       
    }
}

</script>

<style scoped lang="less">
 .returns {
    width:100%;
    padding: 24px 0;
    background-color: #F1F2F9;
    text-align: center;
    button {
        vertical-align: middle;
        background-color: #3196FF;
    }
    button:first-child {
        background: #fff;
        border:1px solid #3196ff;
        color:#3196ff;
        -webkit-border-radius: 4px;
        border-radius: 4px;
        margin-right: 20px;
    }
    .layui-btn {
        padding: 0 28px;
    }
}
#orderList {
    background-color: #F1F2F9;
    .header {
        >li {
            margin: 0;
            line-height: 40px;
            // padding-left: 30px;
           .layui-form-label {
                margin-right: 10px;
                width: 120px;
                vertical-align: middle;
            }
            
        }
        >li:last-child {
            margin-left: 20px;
        }
    }
    .orderList_tit {
        border-bottom: 1px solid #e6e6e6;
    }
    input:hover,
    input:focus {
        border: 1px solid #c2c3c3;
    }
    .screen_type {
     
            .layui-inline {
                overflow: hidden;
                label {
                  padding-right: 10px;
                }
                .layui-input-inline {
                    margin-right: 10px;
                    .el-input__inner {
                        width: 150px;
                    }
                    input {
                        height: 36px;
                    }
                }
            }
            .lay_width {
                label {
                  padding-right: 10px;
                }
                .layui-input-inline {
                    input {
                        height: 36px;
                    }
                }
            .date_icon {
                background: url(../../../common/image/pages/account/icon_sj.png)
                    no-repeat 138px;
            }
        }
        .selecttime {
            .layui-inline {
                label {
                    padding-right: 10px;
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
    .content {
        width: 100%;
        padding-right: 100px;
        ul {
            li {
                display: box;              
                display: -webkit-box;      
                display: -moz-box;         
                display: -ms-flexbox;      
                display: -webkit-flex;     
                display: flex; 
                -webkit-align-items: center;
                -moz-align-items: center;
                -ms-align-items: center;
                -o-align-items: center;
                align-items: center;
                padding: 15px 0;
                label {
                    width: 100px;
                    text-align: right;
                    margin-right: 20px;
                }
                textarea {
                    resize: none;
                    width:100%;
                    min-height: 60px;
                    line-height: 20px;
                    padding: 10px;
                }
            }
        }
    }
    .tab_content {
        margin-top: 24px;
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
        .table_con {
            padding: 20px 30px;
            .layui-table {
            
            thead {
               > tr {
                    background: #DAE9FF;
                }
            }
            tbody {
                > tr {
                    padding: 20px 0;
                    border-bottom:1px solid #C2C2C3;
                    td {
                        border:0;
                        input {
                            text-align: center;
                        }
                        .usages {
                            display: block;
                            width: 200px;
                            overflow: hidden;
                            text-overflow:ellipsis;
                            white-space: nowrap;
                        }
                    }
                    .delBtn {
                        padding: 9px 0;
                        text-align: right;
                    }
                }
            }
        }
       .addbtn {
           padding-top: 10px;
           text-align: center;
           button {
               border: 1px solid #3196FF;
               padding: 6px 60px;
               color: #3196FF;
               background-color: #fff;
               cursor: pointer;
           }
       }
    }


    .msgs {
        padding: 20px 30px;
        label {
            width: 80px;
        }
        textarea {
            resize: none;
            min-height: 60px;
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
#addDrugLsit {
    width: 100%;
    padding: 0 24px;
    h1 {
        font-size: 16px;
        font-weight: 550;
        text-align:center;
        padding: 24px 0;
        overflow: hidden;
        span {
            float: right;
            font-size: 14px;
            color: #3196FF;
            cursor: pointer;
        }
    }
    ul {
        li {
            margin-right: 12px;
            label {
                color: #666;
                margin-right: 5px;
            }
        }
    }
    .drug_table {
        height: 330px;
        margin-top: 12px;
        overflow: auto;
        position: relative;
        .shads {
            display: block;
            width: 50px;
            height: 46px;
            position: absolute;
            left: 0;
            top: 0;
            background-color: #DAE9FF;
            z-index: 3000;
        }
    }
    .footBtn {
        width: 100%;
        text-align: center;
        margin-top: 20px;
        button {
            width: 100px;
            margin: 0 15px;
        }
        .cancel {
            border: 1px solid #3196FF;
            background-color: #fff;
            color: #3196FF;
        }
    }
}
.p_block {
    height: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>
