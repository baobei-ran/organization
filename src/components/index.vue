<template>
    <div class="index">
        <yao-home v-if='boolear'></yao-home>
        <yi-home v-else></yi-home>
    </div>
</template>
<script>
import YaoHome from './Yao-home.vue'
import YiHome from './Yi-home.vue'
export default {
    components: {
        'yao-home': YaoHome,
        'yi-home': YiHome
    },
    data () {
        return {
            boolear: true
        }
    },
    mounted () {
        this.judge();
    },
    methods: {
        judge() {   // 根据登录的 name 来进行辨认
            var user = this.localstorage.get('logindata');
            if (user.name.includes('医院')) {
                this.boolear = false
            } else {
                this.boolear = true
            }
        }
    }

}
</script>
<style scoped>

</style>

