<!--404-->
<template>
    <div id="notfind">
        <div class="pointer container Mg-T60 Pd-T20" @click="go('/')">
          <img src="../common/img/icon/logo.png" alt>
        </div>
        <div class="container none_con">
            <i class="bg_icon1"></i>
            <i class="bg_icon2"></i>
            <div class="none_msg">
                <p class="Ft-S48 Color_blue ">Page</p>
                <p class="Ft-S48 Color_blue Mg-T16g-T16 Mg-B24 ">Not Found</p>
                <p class="Ft-S20 Color_black Mg-B30">抱歉，您访问的页面出错了！</p>
                <button class="pointer" @click="go('/')">返回首页</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'notfind',
    data() {
        return {
        }
    },
    components: {

    },
    created() {

    },
    mounted() {

    },
    methods: {

    }
}
</script>

<style scoped lang="less">
#notfind {
    .none_con {
        height: 553px;
        padding-bottom: 43px;
        position: relative;
        .bg_icon1 {
            position: absolute;
            display: inline-block;
            width: 367px;
            height: 221px;
            top: 0px;
            right: 0px;
            background: url(../common/img/404/pic_right.png) no-repeat center;
        }
        .bg_icon2 {
            position: absolute;
            display: inline-block;
            width: 367px;
            height: 221px;
            bottom: 43px;
            left: 0px;
            background: url(../common/img/404/pic_left.png) no-repeat center;
        }
        .none_msg {
            width: 700px;
            background: url(../common/img/404/pic_404.png) no-repeat right top;
            position: absolute;
            left: 227px;
            top: 140px;
            p:first-child{
                line-height: 58px;
                font-weight: bold
            }
            p:nth-child(2){
                line-height: 58px;
                font-weight: bold
            }
            button {
                width: 130px;
                height: 42px;
                background: rgba(20, 141, 255, 1);
                border-radius: 4px;
                border: none;
                color: #fff;
                font-size: 18px;
            }
        }
    }
}
</style>