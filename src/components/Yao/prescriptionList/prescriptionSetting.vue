<template>
    <div class="presriptionSetting">
        <p class="presriptionSetting_head Color_black Pd-T20 Pd-B20 Pd-L24 Pd-R24 Ft-S16 ">需求单信息</p>
        <div>
            <perscription-msg></perscription-msg>
        </div>
        <div class="prescription_btn">
            <button class="layui-btn layui-btn-normal" @click='set_pic'>修改设置</button>
            <button class="layui-btn layui-btn-normal"  @click='go("/server/YaoprescriptionListPic/YaoprescriptionList")'>返回</button>
            
        </div>
    </div>
</template>

<script>
import perscriptionMsg from './commons/prescription_Msg';
export default {
    components: {
        'perscription-msg': perscriptionMsg
    },
    methods: {
        set_pic () {
            this.$router.push({ path: "/server/YaoprescriptionListPic/prescriptionset" })
        }
    }
}
</script>

<style lang="less" scoped>
.presriptionSetting {
    height: 100%;
    position: relative;
    .presriptionSetting_head {
        border-bottom: 1px solid #F1F2F9;
    }
    .prescription_btn {
        position: absolute;
        left: 50%;
        bottom: 30px;
        text-align: center;
        -webkit-transform: translateX(-50%);
        -ms-transform: translateX(-50%);
        -o-transform: translateX(-50%);
        transform: translateX(-50%);
        button {
            width: 100px;
            margin: 0 12px;
        }
    }
}
</style>

