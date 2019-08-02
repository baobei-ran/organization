<template>
<!-- 处方图片 -->
    <div class="cf-recipe">
        <div id="fang_preview">
            <div class="fang_preview_box">
                <ul class="f_title">
                    <li class="smallsize-font">
                        <span>处方编号：</span>
                        <span>{{ recipemsg.order_code }}</span>
                    </li>
                    <li class="smallsize-font">
                        <span>处方生成时间：</span>
                        <span>{{ recipemsg.start_time | moment }}</span>
                    </li>
                    <li class="smallsize-font">
                        <span>处方失效时间：</span>
                        <span>{{ recipemsg.undue_time | moment }}</span>
                    </li>
                </ul>
                <h2>云医康互联网医院电子处方</h2>
                <div class="f_user">
                    <ul>
                        <li><span>姓名：</span><span>{{ recipemsg.name }}</span></li>
                        <li><span>性别：</span><span v-text="recipemsg.sex == 0?'男':'女'"></span></li>
                        <li><span>年龄：</span><span>{{ recipemsg.age }}岁</span></li>
                        <li><span>肝功能：</span><span>{{ recipemsg.liver }}</span></li>
                        <li><span>肾功能：</span><span>{{ recipemsg.kidney }}</span></li>
                        <li><span>备孕情况：</span><span>{{ recipemsg.yun }}</span></li>
                        <li><span>过敏史：</span><span>{{ recipemsg.allergy }}</span></li>
                        <li><span>过往病史：</span><span>{{ recipemsg.ago }}</span></li>
                    </ul>
                    <p>诊断结果：<span>{{ recipemsg.result }}</span></p>
                </div>
                <div class="f_yao">
                    <h3>Rp</h3>
                    <div>
                        <ul v-for='(val, i) in recipe_eat' :key='i+"_yao"'>
                            <li>
                                <span>{{ val.name }}</span>
                                <span style="margin-left:20px;">*{{ val.num }}</span>
                            </li>
                            <li>{{ val.usage }}</li>
                        </ul>
                    </div>
                    <img class="f_zheng" :src="$http.baseURL+recipemsg.zhang_pic" alt="">
                </div>
                <p class="f_pety">( 以下空白，修改无效 )</p>
                <ul class="f_signature">
                    <li>
                        <span>处方医师：</span>
                        <img :src='$http.baseURL+recipemsg.signpic' alt="">
                    </li>
                    <li v-show='recipemsg.flag == 0?false:true'>
                        <span>审核药师：</span>
                        <img :src="$http.baseURL+recipemsg.yname_pic" alt="">
                    </li>
                </ul>
            </div>
            <img v-show="cfreject" class="cfReject" src="../../../common/image/check/cfshjj.png" alt="" />
        </div>
    </div>
</template>

<script>
export default {
    props: {
        id: {
            type: Number
        },
        isReject: {
            type: Number
        }
    },
    data () {
        return {
            cfreject: this.isReject,
            recipemsg: {},  // 处方信息
            recipe_eat: [], // 药品信息
        }
    },
    mounted () {
        var _this = this;
        this.$http.post('/mobile/Doch5/recipe_look', {id: this.id}, function (res) {
                console.log(res)
                if (res.code == 1) {
                    _this.recipemsg = res.data
                    _this.recipe_eat = res.recipe_eat;
                }
        }, function (err) { console.log(err) })
    },
    methods: {

    }
}
</script>

<style lang="less" scoped>
.cf-recipe {
    width: 620px;
    max-height: 560px;
    overflow-x: hidden;
    overflow-y: auto;
#fang_preview {
    width: 620px;
    position: relative;
    .cfReject {
        position: absolute;
        top: 120px;
        left: 30%;
        width: 240px;
    }
    .fang_preview_box {
        height: 100%;
        padding: 10px;
        border: 1px solid rgba(0,0,0,.2);
        .f_title {
            overflow: hidden;
            > li {
                margin-right: 3px;
                float: left;
                height: 20px;
                > span {
                    display: block;
                    float: left;
                    font-size: 12px;
                    -webkit-text-size-adjust:none !important;
                    -webkit-transform: scale(0.8);
                    transform:scale(0.8);
                }
                
            }
            .smallsize-font{
                font-size: 6px;
            }
        }
        >h2 {
            font-size: 18px;
            text-align: center;
            font-weight: 550;
            letter-spacing: 2px;
            padding: 10px 0;
        }
        .f_user {
            border-bottom: 1px dashed #666;
            > ul {
                overflow: hidden;
                li {
                    float: left;
                    width: 33.3%;
                    font-size: 12px;
                    padding: 3px 0;
                }
            }
            >p {
                margin: 10px 0;
                font-size: 12px;
            }
        }
        .f_yao {
            padding: 10px 0;
            min-height: 120px;
            position: relative;
            >h3 {
                font-size: 12px;
            }
            > div {
                ul {
                    font-size: 12px;
                    margin-top: 10px;
                    li {
                        padding: 3px 0;
                    }
                }
            }
            .f_zheng {
                position: absolute;
                right: 20px;
                top: 10%;
                width: 100px;
                height: 100px;
                -webkit-border-radius: 100%;
                border-radius: 100%;
            }
        }
        .f_pety {
            width: 100%;
            text-align: center;
        }
        .f_signature {
            margin-top: 10px;
            overflow: hidden;
            li {
                float: left;
                width: 50%;
                > img {
                    width: 50px;
                }
            }
        }
    }
    
}
    
}
</style>
