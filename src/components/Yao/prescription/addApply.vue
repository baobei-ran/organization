<template>
    <div id="orderList" style="height:100%">
        <div class="bg_f">
            <ul class="Pd-T14 Pd-B14 layui-form header">
                <li class="layui-input-block">
                    <label class="layui-form-label">请选择医生</label>
                    <input type="radio" name="sex" value="男" title="全选" checked>
                    <input type="radio" name="sex" value="女" title="女" >
                    <input type="radio" name="sex" value="男" title="男">
                    <input type="radio" name="sex" value="女" title="女" >
                    <input type="radio" name="sex" value="男" title="男">
                    <input type="radio" name="sex" value="女" title="女" >
                </li>
            </ul>
        </div>
        <div class="tab_content Mg-T20 bg_f">
            <p class="orderList_tit Color_black Ft-S16 Pd-T24 Pd-B24 Pd-L24">患者数据录入</p>
            <div class="layui-tab Pd-L24 Pd-R30">
                <div class="layui-tab-content ">
                    <ul class="screen_type Pd-T20 Pd-B24 dis_f">
                        <li class="layui-inline">
                            <span class="Color_red">*</span>
                            <label>患者姓名</label>
                            <div class="layui-input-inline">
                                <input type="text" name="" autocomplete="off" class="layui-input">
                            </div>
                        </li>
                        <li class="lay_width">
                            <span class="Color_red">*</span>
                            <label >性别</label>
                            <div class="layui-input-inline" >
                                <input type="text" name="price_min" autocomplete="off" class="layui-input">
                            </div>
                            
                        </li>
                        <li class="lay_width Mg-L10">
                            <span class="Color_red">*</span>
                            <label >年龄</label>
                            <div class="layui-input-inline" >
                                <input type="text" name="price_max" autocomplete="off" class="layui-input">
                            </div>
                        </li>
                        
                        <li class="layui-inline Pd-L10">
                            <span class="Color_red">*</span>
                            <label>联系电话</label>
                            <div class="layui-input-inline">
                                <input type="text" name="" autocomplete="off" class="layui-input">
                            </div>
                        </li>

                        
                    </ul>

                    <div class="content">
                        <ul>
                            <li>
                                <label>肝功能</label>
                                <input type="text" name="" autocomplete="off" placeholder="（默认为正常）" class="layui-input">
                            </li>
                            <li>
                                <label>肾功能</label>
                                <input type="text" name="" autocomplete="off"  placeholder="（默认为正常）" class="layui-input">
                            </li>
                            <li>
                                <label>过敏史</label>
                                <input type="text" name="" autocomplete="off"  placeholder="（默认为正常）" class="layui-input">
                            </li>
                            <li>
                                <label>过往病史</label>
                                <input type="text" name="" autocomplete="off"  placeholder="（默认为正常）" class="layui-input">
                            </li>
                            <li>
                                <label>备孕情况</label>
                                <input type="text" name="" autocomplete="off"  placeholder="（默认为正常）" class="layui-input">
                            </li>
                            <li>
                                <label><span class="Color_red">*</span>症状</label>
                                <textarea name="desc" required class="layui-textarea"  placeholder="（必填）" ></textarea>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="tab_content Mg-T20 bg_f ">
            <p class="orderList_tit Color_black Ft-S16 Pd-T24 Pd-B24 Pd-L24"><span class="Color_red">*</span>处方药品</p>
            <div class="table_con">
                <table class="layui-table" lay-skin="">
                    <thead>
                        <tr class="ac">
                            <td class="firstheadtd">药品名称</td>
                            <td>药品数量</td>
                            <td>用法及用量</td>
                        </tr>
                    </thead>
                    <tbody >
                        <tr class="table_con Color_black ac">
                            <td>
                                <input type="text" name="title" required  lay-verify="required" placeholder="【药品名称】" autocomplete="off" class="layui-input">
                            </td>
                            <td>
                                <input type="text" name="title" required  lay-verify="required" placeholder="【药品数量】" autocomplete="off" class="layui-input">
                            </td>
                            <td>
                                <input type="text" name="title" required  lay-verify="required" placeholder="【用法及用量】" autocomplete="off" class="layui-input">
                            </td>
                        </tr>
                        <tr class="table_con Color_black ac">
                            <td>
                                <input type="text" name="title" required  lay-verify="required" placeholder="【药品名称】" autocomplete="off" class="layui-input">
                            </td>
                            <td>
                                <input type="text" name="title" required  lay-verify="required" placeholder="【药品数量】" autocomplete="off" class="layui-input">
                            </td>
                            <td>
                                <input type="text" name="title" required  lay-verify="required" placeholder="【用法及用量】" autocomplete="off" class="layui-input">
                            </td>
                        </tr>
                        <tr class="table_con Color_black ac">
                            <td>
                                <input type="text" name="title" required  lay-verify="required" placeholder="【药品名称】" autocomplete="off" class="layui-input">
                            </td>
                            <td>
                                <input type="text" name="title" required  lay-verify="required" placeholder="【药品数量】" autocomplete="off" class="layui-input">
                            </td>
                            <td>
                                <input type="text" name="title" required  lay-verify="required" placeholder="【用法及用量】" autocomplete="off" class="layui-input">
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="addbtn">
                    <button @click='addtabel'>+添加药品</button>
                </div>
            </div>
        </div>
        <div class="tab_content Mg-T20 bg_f">
            <div class="dis_f msgs">
                <label>药店留言</label>
                <textarea name="desc" required class="layui-textarea"  placeholder="（选填）" ></textarea>
            </div>
        </div>
        <div class="returns Mg-T24">
                <button class="layui-btn" @click='go("/server/Yaodoctorprescription/prescriptionList")'>取消</button>
                <button class="layui-btn layui-btn-normal" @click='submitdata'>立即提交</button>
        </div>
    </div>
</template>
<script>
export default {
    name: 'orderList',
    data() {
        return {
            
            
        }
    },
    mounted() {
      var self = this;
      layui.use('form', function(){
        var form = layui.form;
        form.render()
        self.$http.post('/shv2/Recipe/recipe_seldoc', {}, function (res) {
            console.log(res)
        }, function (err) { console.log(err)})
        form.on('', function(data){
            
        });
      });
    },
    methods: {
        submitdata() {   // 提交
            let _this = this;
            _this.go('/server/YaoprescriptionList')
            layui.use("layer", function () {
                var layer = layui.layer;
                
                var obj = { }
                
                // _this.$http.post('/shv2/Recipe/recipe_record', obj, function (res) {//
                //     console.log(res)
                //     if (res.code == 1) {
                //        _this.tableList = res.data
                //     } else {
                        
                //     }
                // }, function (err) { console.log(err) });
                
            });
        },
        addtabel () {   // 添加表格

        }
       
    }
}
</script>

<style scoped lang="less">
 .returns {
    width:100%;
    text-align: center;
    button:first-child {
        background: #fff;
        border:1px solid #3196ff;
        color:#3196ff;
    }
    .layui-btn {
        padding: 0 28px;
    }
}
#orderList {
    .header {
        >li {
            margin: 0;
            // padding-left: 30px;
           .layui-form-label {
                margin-right: 10px;
                width: 120px;
            }
            
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
                        height: 34px;
                    }
                }
            }
            .lay_width {
                label {
                  padding-right: 10px;
                }
                .layui-input-inline {
                    input {
                        height: 34px;
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
</style>
