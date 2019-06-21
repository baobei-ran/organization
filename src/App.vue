<template>
      <router-view></router-view>
</template>

<script>
export default {

}
</script>

<style>
input {
   outline: none;
}
.el-input__inner {  /* 覆盖eleemnt ui 的input样式 */
    height: 36px;
    line-height: 36px;
    -webkit-border-radius: 2px;
    -o-border-radius: 2px;
    border-radius: 2px;
}
</style>
