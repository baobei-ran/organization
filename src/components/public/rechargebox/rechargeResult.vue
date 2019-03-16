<template>
    <div id="bank_recharge" class="bg_f" style="height:800px;">
        <p class="recharge_tit Ft-S18 Color_black Pd-L22 Pd-T24 Pd-B24 Mg-B40">
            充值到银行卡
        </p>
        <div class="ac">
            <img src="../../../common/image/pages/account/icon_czcg.png" alt="" class="Mg-T40 Mg-B16" />
            <!-- <img src="../../../common/image/pages/account/icon_czsb.png" alt="" class="Mg-T40 Mg-B16" /> -->
            <p>充值成功！</p>
            <!-- <p>充值失败，余额不足</p> -->
            <button class="Mg-T40 gobacklyt Color_white Ft-S16" style="width: 140px;
            height: 40px;
            background: #3196FF;
            border:none;
            border-radius: 5px;
            " id="golyt">
                返回鲁医通账户
            </button>
        </div>
    </div>
</template>
<script>
export default {
    name: '',
    data() {
        return {

        }
    },
    mounted() {
        this.initdata()
    },
    methods: {
        initdata() {

        }
    }
}
</script>

<style scoped lang="less">
//银行卡充值
#bank_recharge {
    .recharge_tit {
        border-bottom: 1px solid #f1f2f9;
    }
    #price {
        border: 1px solid #c2c2c3;
        width: 160px;
        height: 36px;
        padding-left: 10px;
    }
    input:focus,
    input:hover {
        border: 1px solid #c2c2c3;
    }
    .getcode {
        border: 1px solid #3196ff;
        color: #3196ff;
        display: inline-block;
        width: 80px;
        height: 30px;
        font-size: 12px;
        line-height: 30px;
        border-radius: 3px;
        text-align: center;
        cursor: pointer;
    }
    .bankrecharge {
        width: 110px;
        height: 40px;
        background: #3196ff;
        border: none;
        color: #fff;
        border-radius: 4px;
        cursor: pointer;
    }
}
</style>
