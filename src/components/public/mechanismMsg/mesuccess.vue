<template>
    <div id="bankcard_sh" class="bg_f Pd-B40">
        <p class="recharge_tit Ft-S18 Color_black Pd-L22 Pd-T24 Pd-B24">
            机构信息
        </p>
        <div class="Pd-L24 Pd-R24">
            <table class="Mg-T24" width="100%">
                <tr class="" height="34px">
                    <td width="100px" class="Ft-S14 Color_gray6" align="right">
                        机构类型：
                    </td>
                    <td class="Pd-L40 Ft-S14 Color_black">药店</td>
                </tr>
                <tr class="" height="34px">
                    <td width="100px" class="Ft-S14 Color_gray6" align="right">机构名称：</td>
                    <td class="Pd-L40 Ft-S14 Color_black">北京同仁堂大药房</td>
                </tr>

                <tr>
                    <td colspan="2">
                        <p style="border-top:1px solid #E6E6E6;" class="Mg-T20 Pd-B20"></p>
                    </td>

                </tr>
                <tr class="" height="34px">
                    <td width="100px" class="Ft-S14 Color_gray6" align="right">
                        业务联系人：
                    </td>
                    <td class="Pd-L40 Ft-S14 Color_black">张三</td>
                </tr>
                <tr class="" height="34px">
                    <td width="100px" class="Ft-S14 Color_gray6" align="right">
                        联系电话：
                    </td>
                    <td class="Pd-L40 Ft-S14 Color_black">197****3333</td>
                </tr>
                <tr class="" height="34px">
                    <td width="100px" class="Ft-S14 Color_gray6" align="right">
                        机构经营地址：
                    </td>
                    <td class="Pd-L40 Ft-S14 Color_black">北京市朝阳区安定门外小关街51号</td>
                </tr>
                <tr class="" height="34px">
                    <td width="100px" class="Ft-S14 Color_gray6" align="right">
                        机构电话：
                    </td>
                    <td class="Pd-L40 Ft-S14 Color_black">（010）51190889</td>
                </tr>
                <tr class="" height="34px">
                    <td width="100px" class="Ft-S14 Color_gray6" align="right">
                        经纬度：
                    </td>
                    <td class="Pd-L40 Ft-S14 Color_black">经度（Y）232.32|纬度（X）232.32</td>
                </tr>
                <tr class="" height="34px">
                    <td width="100px" class="Ft-S14 Color_gray6 v-top Pd-T10" align="right">
                        机构简介：
                    </td>
                    <td class="Pd-L40 Ft-S14 Color_black Pd-T10">
                        <p style="max-width:993px">医院（Hospital）一词是来自于拉丁文原意为“客人”，因为一开始设立时，是供人避难，还备有休息间，使来者舒适，有招待意图。后来，才逐渐成为满足人类医疗需求，提供医疗服务的专业机构，收容和治疗病人的服务场所。</p>
                    </td>
                </tr>
            </table>

            <div >
                <div id='demo'></div>
            </div>

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
        var map = new AMap.Map("demo", {   // 地图
                resizeEnable: true,
                zoom: 13
            });
            map.on('click', function (e) {
                var x = e.lnglat.getLng();
                var y =e.lnglat.getLat();
            });
    },
    methods: {
        initdata() {


        }
    }
}
</script>

<style scoped lang="less">
#bankcard_sh {
    .recharge_tit {
        border-bottom: 1px solid #f1f2f9;
    }
    .onup {
        width: 80px;
        height: 30px;
        background: rgba(49, 150, 255, 1);
        border-radius: 4px;
        border: none;
        color: #fff;
        margin-left: 23px;
    }
    .sh_status {
        padding: 18px;
        background: #eaf4ff;
        border: 1px solid #3196ff;
        color: #3196ff;
        font-size: 14px;
    }
    .fileimg {
        display: inline-block;
        width: 14px;
        height: 14px;
        background: url(../../../common/image/pages/account/icon_sfz.png)
            no-repeat;
        position: relative;
        top: 2px;
        margin-right: 5px;
    }
    .filetext {
        display: inline-block;
        width: 14px;
        height: 14px;
        background: url(../../../common/image/pages/account/icon_wj.png)
            no-repeat;
        position: relative;
        top: 2px;
        margin-right: 5px;
    }
}
</style>
