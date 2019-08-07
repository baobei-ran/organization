<template>
<!-- 签名图片展示 -->
    <div id='signature-pic'>
        <h2>上传签名照片示例</h2>
        <p>签名需清晰可见</p>
        <p><img src="../../../common/image/icon/pic_zlsl@2x.png" alt="" /></p>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
#signature-pic {
    width: 500px;
    > h2 {
        text-align: center;
        font-size: 17px;
        color: #333;
        margin-top: 20px;
        font-weight: 500;
    }
    p {
        margin-top: 14px;
        color: #666;
        text-align: center;
        padding: 0 10px;
        img {
            width: 100%;
        }
    }
}
</style>

