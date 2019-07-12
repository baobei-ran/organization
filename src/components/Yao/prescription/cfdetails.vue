<template>
    <div class="cfdetails">
        <div class="fang_preview_box">
                <ul class="f_title">
                    <li>
                        <span class="smallsize-font">处方编号：</span><span>{{ recipeDetail.order_code }}</span>
                    </li>
                    <li>
                        <span class="smallsize-font">处方生成时间：</span><span>{{ recipeDetail.start_time | moment }}</span>
                    </li>
                    <li>
                        <span class="smallsize-font">处方失效时间：</span><span>{{ recipeDetail.undue_time | moment }}</span>
                    </li>
                </ul>
                <h2>云医康互联网医院电子处方</h2>
                <div class="f_user">
                    <ul>
                        <li><span>姓名：</span><span>{{ recipeDetail.name }}</span></li>
                        <li><span>性别：</span><span v-text='recipeDetail.sex == 0?"男":"女"'></span></li>
                        <li><span>年龄：</span><span>{{ recipeDetail.age }}岁</span></li>
                        <li><span>肝功能：</span><span v-text="recipeDetail.liver?recipeDetail.liver:'正常'"></span></li>
                        <li><span>肾功能：</span><span v-text="recipeDetail.kidney?recipeDetail.kidney:'正常'"></span></li>
                        <li><span>备孕情况：</span><span v-text="recipeDetail.yun?recipeDetail.yun:'无'"></span></li>
                        <li><span>过敏史：</span><span v-text="recipeDetail.allergy?recipeDetail.allergy:'无'"></span></li>
                        <li><span>过往病史：</span><span v-text='recipeDetail.ago?recipeDetail.ago:"无"'></span></li>
                    </ul>
                    <p>诊断结果：<span>{{ recipeDetail.result }}</span></p>
                </div>
                <div class="f_yao">
                    <h3>Rp</h3>
                    <div>
                        <ul v-for='(val, i) in recipe_eat' :key="i+'_ll'">
                            <li><span>{{ val.name }}</span> <span>*{{val.num}}</span></li>
                            <li>{{val.usage}}</li>
                        </ul>
                    </div>
                    <img class="f_zheng" :src="$http.baseURL+recipeDetail.seal" alt="">
                </div>
                <p class="f_pety">( 以下空白，修改无效 )</p>
                <ul class="f_signature">
                    <li>
                        <span>处方医师：</span>
                        <img :src='$http.baseURL+recipeDetail.signpic' alt="">
                    </li>
                    <li v-show="recipeDetail.yname_pic">
                        <span>审核药师：</span>
                        <img :src="$http.baseURL+recipeDetail.yname_pic" alt="">
                    </li>
                </ul>
            </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            recipeDetail: {},
            recipe_eat: []
        }
    },
    methods: {
        sonFun (cfdata) {
            console.log(cfdata)
            this.recipeDetail = cfdata.data
            this.recipe_eat = cfdata.drug
        }
    }
}
</script>

<style lang="less" scoped>
.cfdetails {
    width: 640px;
    height: 100%;
    padding: 20px;
    overflow-y: auto;
    > .fang_preview_box {
        width:100%;
        min-height: 100%;
        padding: 10px;
        border: 1px solid rgba(0,0,0,.2);
        .f_title {
            overflow: hidden;
            > li {
                // margin-right: 10px;
                float: left;
                > span {
                    display: inline-block;
                    font-size: 12px;
                    -webkit-transform: scale(0.8);
                    transform: scale(0.8);
                }
                .smallsize-font{
                    font-size: 6px;
                }
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
                font-weight: 550;
            }
            > div {
                ul {
                    font-size: 12px;
                    margin-top: 10px;
                    li {
                        padding: 3px 0;
                        span:last-child {
                            margin-left: 20px;
                        }
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
            display: -webkit-box; 
            display: -moz-box; 
            display: -webkit-flex; 
            display: -moz-flex; 
            display: -ms-flexbox; 
            display: flex;
            -webkit-align-items:center;
            box-align:center;
            -moz-box-align:center;
            -webkit-box-align:center;
            align-items: center;
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
</style>

