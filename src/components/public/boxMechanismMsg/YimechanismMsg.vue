<template>
    <div id="YiMsg" class="bg_f">
        
            <table class="mgtab">
                <tr class="" height="60px">
                    <td width="160px" class="Ft-S14 Color_black" align="right">
                        <span class="Color_red">*</span> 机构名称：
                    </td>
                    <td class="Pd-L40 Ft-S16 Color_gray6">
                        <div class="layui-input-inline">
                            <input type="text" v-model="formdata.name" placeholder="请输入机构名称" style="width: 500px;" />
                        </div>
                    </td>
                </tr>
                <tr class="" height="182px">
                    <td width="160px" class="Ft-S14 Color_black v-top" align="right">
                        <span class="Color_red">*</span> 营业执照：
                    </td>
                    <td class="Pd-L40 Ft-S16 Color_gray6 Pd-B30">
                        <div class="fl uploadimg Mg-R36">
                            <span class="Ft-S14" id="showimg">点击上传</span> <input type="file"  accept=".png,.jpg,.jpeg" id="yyzz" placeholder="" />
                            <p class="Ft-S14 Color_gray6">上传营业执照</p>
                        </div>
                    </td>
                </tr>
                <tr class="" height="60px">
                    <td width="160px" class="Ft-S14 Color_black" align="right">
                        <span class="Color_red">*</span> 营业执照号：
                    </td>
                    <td class="Pd-L40 Ft-S16 Color_gray6">
                        <div class="layui-input-inline">
                            <input type="text" v-model="formdata.number" placeholder="请输入营业执照号" style="width: 500px;" />
                        </div>
                    </td>
                </tr>
                <tr class="" height="60px">
                    <td width="160px" class="Ft-S14 Color_black" align="right">
                        <span class="Color_red">*</span> 营业执照所在地：
                    </td>
                    <td class="Pd-L40 Ft-S16 Color_gray6">
                        <div class="layui-input-inline">
                            <el-select id="sheng" @change="selectcity(formdata.province)" v-model="formdata.province" style="width: 200px;" placeholder="请选择省">
                                <el-option v-for="val in provinceList" :label="val.aname" :value="val.aid" :key="val.aid"></el-option>
                            </el-select>
                        </div>
                        <div class="layui-input-inline">
                            <el-select id="city" @change="selectcounty(formdata.city)" v-model="formdata.city" style="width: 200px;" placeholder="请选择市">
                                <el-option v-for="val in cityList" :label="val.aname" :value="val.aid" :key="val.aid"></el-option>
                            </el-select>
                        </div>
                        <div class="layui-input-inline">
                            <el-select v-model="formdata.county" style="width: 200px;" placeholder="请选择县/区">
                                <el-option v-for="val in countyList" :label="val.aname" :value="val.aid" :key="val.aid"></el-option>
                            </el-select>
                        </div>
                    </td>
                </tr>
                <tr class="" height="60px">
                    <td width="160px" class="Ft-S14 Color_black" align="right">
                        <span class="Color_red">*</span> 营业执照地址：
                    </td>
                    <td class="Pd-L40 Ft-S16 Color_gray6">
                        <input type="text" v-model="formdata.address" placeholder="请输入营业执照地址" style="width: 500px;" />
                    </td>
                </tr>
                <tr class="" height="60px">
                    <td width="160px" class="Ft-S14 Color_black" align="right">
                        <span class="Color_red">*</span> 营业执照有效期：
                    </td>
                    <td class="Pd-L40 Ft-S16 Color_gray6">
                        <div class="layui-form " id='IsPurchased'>
                            <input type="radio" name="dates" value="1" title="长期有效" lay-filter="jiedian"  checked/>
                            <input type="radio" name="dates" value="2" title="选择有效期" lay-filter="jiedian" />
                            <input type="text" id="date" placeholder="请选择起始时间" style="width: 200px;" />-<input type="text" id="date1" placeholder="请选择到期时间" style="width: 200px;" />
                        </div>
                        <!-- <input type="text" id="date" placeholder="请选择起始时间" style="width: 300px;" />-<input type="text" id="date1" placeholder="请选择到期时间" style="width: 300px;" /> -->
                    </td>
                </tr>
                <tr class="" height="60px">
                    <td width="160px" class="Ft-S14 Color_black" align="right">
                        <span class="Color_red">*</span> 法人姓名：
                    </td>
                    <td class="Pd-L40 Ft-S16 Color_gray6">
                        <input type="text" v-model="formdata.method_name" placeholder="请输入真实姓名" style="width: 200px;" />
                    </td>
                </tr>
                <tr class="" height="60px">
                    <td width="160px" class="Ft-S14 Color_black" align="right">
                        <span class="Color_red">*</span> 法人身份证号：
                    </td>
                    <td class="Pd-L40 Ft-S16 Color_gray6">
                        <input type="text" v-model="formdata.method_prove" maxlength="18" placeholder="请输入法人身份证号" style="width: 500px;" />
                    </td>
                </tr>
                <tr class="" height="182px">
                    <td width="160px" class="Ft-S14 Color_black v-top" align="right">
                        <span class="Color_red">*</span> 法人身份证照片：
                    </td>
                    <td class="Pd-L40 Ft-S16 Color_gray6 Pd-B50">
                        <div class="fl uploadimg Mg-R24">
                            <span class="Ft-S14" id="showimg1">点击上传</span> <input type="file" accept=".png,.jpg,.jpeg" id="idcardz" placeholder="" />
                            <p class="Ft-S14 Color_gray6">身份证照正面</p>
                        </div>
                        <div class="fl uploadimg">
                            <span class="Ft-S14" id="showimg2">点击上传</span> <input type="file" accept=".png,.jpg,.jpeg" id="idcardf" placeholder="" />
                            <p class="Ft-S14 Color_gray6">身份证照反面</p>
                        </div>
                    </td>
                </tr>
                <tr class="" height="182px">
                    <td width="160px" class="Ft-S14 Color_black v-top" align="right">
                        <span class="Color_red">*</span> 认证资料上传：
                    </td>
                    <td class="Pd-L40 Ft-S16 Color_gray6 Pd-B30">
                        <p class="Color_red Pd-B12 Ft-S12">请上传小于5MB的jpg/jpeg/png格式的图片，图片细节必须清晰可见</p>
                        <div class="fl uploadimg Mg-R24">
                            <span class="Ft-S14" id="showimg7">点击上传</span> <input type="file" accept=".png,.jpg,.jpeg" id="yljgpho" placeholder="" />
                            <p class="Ft-S14 Color_gray6">医疗机构执业许可证**</p>
                        </div>
                    </td>
                </tr>
                <tr class="">
                    <td width="160px" class="Ft-S14 Color_black" align="right">
                        <p style="position:relative;top:-39px">
                            <span class="Color_red">*</span> 证件缺失申请：
                        </p>
                    </td>
                    <td class="Pd-L40 Ft-S16 Color_gray6">
                        <p class="Color_red Pd-B12 Ft-S12 Pd-T24">仅当证件缺失情况下需要提交缺失申请</p>
                        <div class="clear upflie " style="overflow:hidden">
                            <div class="fl">
                                <input type="file" accept=".png,.jpg,.jpeg,.bmp,.gif" id="uploadfile" placeholder="" />
                                <span class="file-up" id="uptext">上传相关证件缺失申请</span>
                            </div>
                            <span id="getmodle" class="pointer" style="font-size:12px; color: #3196FF;margin-left: 180px; line-height: 36px;">
                                <a style="color: #3196FF;" :href="$http.baseURL+'/file/application_form.docx'" download="">下载相关证件缺失申请模板</a>
                            </span>
                        </div>

                        <p class="Color_gray6 Mg-T10 Mg-B10" style="font-size:12px;">
                            请先下载《授权证明文件模板》后填写相关信息加盖绑定机构公章后上传
                        </p>
                        <p class="Color_gray6" style="font-size:12px;">
                            格式要求：支持 jpg、jpeg、bmp、gif、png格式照片，大小不超过2M
                        </p>
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td class="Pd-L44 Pd-T40">
                        <!-- <button class="Ft-S16 onsubmit" :disabled='disabled' @click="submitFun">
                            下一步
                        </button> -->
                        <el-button class="Ft-S16 onsubmit" :disabled='disabled' @click="submitFun" type="primary" :loading="disabled">下一步</el-button>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>
<script>
export default {
    name: 'mechanismMsg',
    data() {
        return {
            formdata: {
                name: '',
                type: '1',
                number: '',
                province: '',
                city: '',
                county: '',
                address: '',
                method_name: '',
                method_prove: '',
            },
            provinceList: '',
            cityList: '',
            countyList: '',
            leixing: '',         // 选择的 机构类型
            disabled: false,     // 按钮
        }
    },
    mounted() {
        this.selectprovince();
        this.initdata();
    },
    methods: {
       
        ifcontent() {
            var _this = this
            this.$http.post('/shv2/Setting/look_write', {}, function (res) {
                console.log(res)
                _this.formdata = {
                    name: res.data.hospital_name,
                    type: res.data.structureType,
                    number: res.data.license_number,
                    province: res.data.license_province,
                    city: res.data.license_city,
                    county: res.data.license_county,
                    address: res.data.license_address,
                    method_name: res.data.method_name,
                    method_prove: res.data.method_prove,
                }
                // $('#showimg').attr('style', 'background:url(' + _this.$http.baseURL+res.data.license + ');background-size:cover');
                // $('#showimg').text('');
                // $('#showimg1').attr('style', 'background:url(' + _this.$http.baseURL+res.data.zcard + ');background-size:cover');
                // $('#showimg1').text('');
                // $('#showimg2').attr('style', 'background:url(' + _this.$http.baseURL+res.data.fcard + ');background-size:cover');
                // $('#showimg2').text('');
                // $('#showimg7').attr('style', 'background:url(' + _this.$http.baseURL+res.data.yljgzy + ');background-size:cover');
                // $('#showimg7').text('')
            }, function () {

            })
        },
        initdata() {
            layui.use(["laydate", "form"], function () {
                var laydate = layui.laydate;
                var form = layui.form;
                laydate.render({
                    elem: "#date" //指定元素
                });
                laydate.render({
                    elem: "#date1" //指定元素
                });
                form.render()
            });

            $('#yyzz').on('change', function () {
                $('#showimg').attr('style', 'background:url(' + window.URL.createObjectURL(this.files[0]) + ');background-size:cover');
                $('#showimg').text('')
            })
            $('#idcardz').on('change', function () {
                $('#showimg1').attr('style', 'background:url(' + window.URL.createObjectURL(this.files[0]) + ');background-size:cover');
                $('#showimg1').text('')
            })
            $('#idcardf').on('change', function () {
                $('#showimg2').attr('style', 'background:url(' + window.URL.createObjectURL(this.files[0]) + ');background-size:cover');
                $('#showimg2').text('')
            })
            $('#yljgpho').on('change', function () {
                $('#showimg7').attr('style', 'background:url(' + window.URL.createObjectURL(this.files[0]) + ');background-size:cover');
                $('#showimg7').text('')
            })
            $('#uploadfile').on('change', function () {
                $('#uptext').text('相关缺失证件已上传')
            })

        },
        selectprovince() {//初始化下拉框 省份
            var _this = this
            this.$http.post('/shv2/Setting/area', { fid: 1 }, function (res) {
                if (res.code == 1) {
                    _this.provinceList = res.data;
                }
            }, function () {

            })
        },
        selectcity(num) {//市
            var _this = this;
            this.formdata.city = '';
            this.formdata.county = '';
            this.countyList = '';
            this.$http.post('/shv2/Setting/area', { fid: num }, function (res) {
                if (res.code == 1) {
                    _this.cityList = res.data;
                }
            }, function () {

            })
        },
        selectcounty(num) { //区县
            var _this = this;
            this.formdata.county = '';
            this.$http.post('/shv2/Setting/area', { fid: num }, function (res) {
                if (res.code == 1) {
                    _this.countyList = res.data;
                }
            }, function () {

            })
        },
        submitFun() {
            var _this = this;
            var regyyzz = /(^(?:(?![IOZSV])[\dA-Z]){2}\d{6}(?:(?![IOZSV])[\dA-Z]){10}$)|(^\d{15}$)/;
            var cardid = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|31)|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}([0-9]|x|X)$/;
            var validity = $('#IsPurchased input[name="dates"]:checked').val();
            var fromdata = new FormData();
            console.log(validity)
            layui.use(["layer"], function () {
                var layer=layui.layer;
                
                if (!_this.formdata.name) {
                    layer.msg('请填写机构名称',{ icon:2});
                    return false
                }
                if (!$('#yyzz').val()) {
                    layer.msg('请上传营业执照图片',{ icon:2});
                    return false
                }
                if (!_this.formdata.number) {
                    layer.msg('请填写正确营业执照号',{ icon:2});
                    return false
                }
                if (!_this.formdata.province) {
                    layer.msg('请选择营业执照省所在地',{ icon:2});
                    return false
                }
                if (!_this.formdata.city) {
                    layer.msg('请选择营业执照所市在地',{ icon:2});
                    return false
                }
                if (!_this.formdata.county) {
                    layer.msg('请选择营业执照区、县所在地',{ icon:2});
                    return false
                }
                if (!_this.formdata.address) {
                    layer.msg('请填写营业执照地址',{ icon:2});
                    return false
                }
                if (validity == 2) {
                    if (!$('#date').val()) {
                        layer.msg('请选择营业执照有效期开始时间',{ icon:2});
                        return false
                    }
                    if (!$('#date1').val()) {
                        layer.msg('请选择营业执照有效期结束时间',{ icon:2});
                        return false
                    }
                    var oDate1 = new Date($('#date').val());
                    var oDate2 = new Date($('#date1').val());
                    if (oDate1.getTime() > oDate2.getTime()) {
                        layer.msg('开始时间不能大于结束时间',{ icon:2});
                        return false
                    }
                    fromdata.append('ktime', $('#date').val());
                    fromdata.append('jtime', $('#date1').val());
                }
                if (!_this.formdata.method_name) {
                    layer.msg('请填写法人姓名',{ icon:2});
                    return false
                }
                if (!cardid.test(_this.formdata.method_prove)) {
                    layer.msg('请填写正确法人身份证号',{ icon:2});
                    return false
                }
                if (!$('#idcardz').val()) {
                    layer.msg('请上传身份证正面',{ icon:2});
                    return false
                }
                if (!$('#idcardf').val()) {
                    layer.msg('请上传身份证反面',{ icon:2});
                    return false
                }
                _this.disabled = true
                fromdata.append('name', _this.formdata.name);
                fromdata.append('type', _this.formdata.type);
                fromdata.append('number', _this.formdata.number);
                fromdata.append('province', _this.formdata.province);
                fromdata.append('city', _this.formdata.city);
                fromdata.append('county', _this.formdata.county);
                fromdata.append('address', _this.formdata.address);
                fromdata.append('license_tstatus', validity);           // 营业执照有效期,1 长期有效 2 选择有效期
                fromdata.append('method_name', _this.formdata.method_name);
                fromdata.append('method_prove', _this.formdata.method_prove);
                $.each($('#yyzz')[0].files, function (i, file) {
                    fromdata.append('license', file);
                });
                $.each($('#idcardz')[0].files, function (i, file) {
                    fromdata.append('zcard', file);
                });
                $.each($('#idcardf')[0].files, function (i, file) {
                    fromdata.append('fcard', file);
                });
                $.each($('#yljgpho')[0].files, function (i, file) {
                    fromdata.append('yljgzy', file);
                });
                $.each($('#uploadfile')[0].files, function (i, file) {//证件
                    fromdata.append('zjqs', file);
                });
                _this.$http.upload('/shv2/Setting/add_write', fromdata, function (res) {
                    if (res.code == 1) {
                        layer.msg('上传成功', { icon: 6, time: 1500})
                        var timer = setTimeout(() => {
                            _this.$router.replace('/setting/boxMechanismMsg/mechanismNext')
                            clearTimeout(timer)
                        }, 1500)
                        
                    } else {
                        layer.msg('上传失败', { icon: 5})
                        var time = setTimeout(() => {
                            _this.disabled = false
                            clearTimeout(time)
                        }, 1000)
                    }
                })
            });
        }
    }
}
</script>

<style scoped lang="less">
#YiMsg {
    .mechanismMsg_tit {
        border-bottom: 1px solid #f1f2f9;
    }
    select {
        display: block;
        height: 36px;
        padding-left: 10px;
        border: 1px solid rgba(194, 194, 195, 1);
    }
    input {
        height: 36px;
        padding-left: 10px;
        border: 1px solid rgba(194, 194, 195, 1);
    }
    input:focus,
    input:hover {
        border: 1px solid rgba(194, 194, 195, 1);
    }
    .progress {
        height: 120px;
        background: rgba(234, 244, 255, 1);
        border: 1px solid rgba(49, 150, 255, 1);
        .bold_line {
            position: relative;
            width: 660px;
            margin: 0 auto;
            height: 4px;
            background: rgba(221, 221, 221, 1);
            margin-top: 47px;
        }
        .pro_circle {
            position: relative;
            top: -17px;
            width: 740px;
            margin: 0 auto;
            text-align: center;
            li {
                .after {
                    position: relative;
                    display: inline-block;
                    width: 30px;
                    height: 30px;
                    background: #3196ff;
                    border-radius: 50%;
                    margin-bottom: 9px;
                    color: #fff;
                    line-height: 30px;
                }
                .after + p {
                    color: #3196ff;
                }
                .active {
                    position: relative;
                    display: inline-block;
                    width: 30px;
                    height: 30px;
                    background: rgba(255, 255, 255, 1);
                    border: 1px solid rgba(170, 170, 170, 1);
                    border-radius: 50%;
                    margin-bottom: 9px;
                    i {
                        position: absolute;
                        top: 8px;
                        left: 8px;
                        display: inline-block;
                        width: 12px;
                        height: 12px;
                        background: rgba(49, 150, 255, 1);
                        border-radius: 50%;
                    }
                }
                .active + p {
                    color: #3196ff;
                }
                .end {
                    position: relative;
                    display: inline-block;
                    width: 30px;
                    height: 30px;
                    background: rgba(255, 255, 255, 1);
                    border: 1px solid rgba(170, 170, 170, 1);
                    border-radius: 50%;
                    margin-bottom: 9px;
                    i {
                        display: none;
                    }
                }
            }
            li:nth-child(2) {
                margin-left: 245px;
            }
            li:nth-child(3) {
                margin-left: 245px;
            }
        }
    }
    .mgtab {
        .uploadimg {
            width: 158px;
            height: 158px;
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
                color: #c2c2c2;
                width: 158px;
                height: 158px;
                padding-top: 100px;
                background: url(../../../common/image/pages/account/icon_pic.png)
                    no-repeat center 44px;
                position: absolute;
                z-index: 0;
                left: 0px;
            }
            p {
                margin-top: 168px;
            }
        }
        .upflie {
            div {
                position: relative;
                height: 36px;
                #uploadfile {
                    width: 175px;
                    height: 36px;
                    position: absolute;
                    left: 0px;
                    z-index: 3;
                    opacity: 0;
                }
                .file-up {
                    display: block;
                    border-radius: 4px;
                    width: 175px;
                    height: 36px;
                    line-height: 36px;
                    padding-left: 28px;
                    background: #3196ff
                        url(../../../common/image/pages/account/icon_sc.png)
                        no-repeat 10px;
                    font-size: 14px;
                    color: #fff;
                    position: absolute;
                    left: 0px;
                    z-index: 0;
                }
            }
        }
        .onsubmit {
            width: 110px;
            height: 40px;
            background: rgba(49, 150, 255, 1);
            border-radius: 4px;
            color: #fff;
            font-size: 16px;
            border: none;
            margin-bottom: 46px;
        }
    }
}
</style>
