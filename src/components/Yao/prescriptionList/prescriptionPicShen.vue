<template>
    <!-- 审核 -->
    <div class="perscriptionPicShen">
        <!-- 审核中展示 -->
        <div class="perscription " v-if='!check_show'>
            <div class="msg" >
                您好，您的资料正在审核中，请耐心等待！
            </div>
            <div class="user_msg Mg-T24 bg_f">
                <perscription-msg></perscription-msg>
            </div>
        </div>
    

    <!-- 未通过展示 -->
    <div class="perscription Pd-B40" v-if='check_show'>

        <div class="my_check">
            <div class="msg" >
                您好，您的资料审核未通过，请重新上传！
                <p>未通过原因：{{ failed }}</p>
            </div>
        </div>
        <div>
            <perscription-add></perscription-add>
        </div>
    </div>


    </div>
</template>
<script>
import perscriptionMsg from './commons/prescription_Msg';
import perscriptionAdd from './commons/prescription_add'
export default {
    components: {
        'perscription-msg': perscriptionMsg,
        'perscription-add': perscriptionAdd
    },
        data () {
            return {
                check_show: true,  // 是否审核
                failed: '',        // 审核失败原因
                status: false,
                status2: false
            }
        },
       
        methods: {
             // 查询是否审核中
            Userdata () {
                var _this = this;
                _this.$http.post('/shv2/Recipe/recipe_check', {}, function (res) {
                    if (res.code == 1) {
                         var type = res.data.teacher_type.toString()
                        switch(type) {
                            case '0': 
                                var data = _this.localstorage.get('Prescription');  // 产看是否提交过申请
                                if (data) {
                                    _this.status = true; 
                                    _this.fileStatus = false; 
                                    _this.fileStatus2 = false; 
                                    _this.disBtn = false
                                    _this.img1 = data[0];
                                    _this.img2 = data[1];
                                    _this.status2 = false
                                }
                                ; break;      // 未发起审核
                            case '1': 
                                var data = _this.localstorage.get('Prescription');
                                if (data) {
                                    _this.localstorage.remove('Prescription');
                                }
                                _this.status = true; _this.fileStatus = false; _this.fileStatus2 = false; _this.disBtn = false; _this.status2 = false
                                _this.img1 = _this.$http.baseURL + res.data.teacher_pic;
                                _this.img2 = _this.$http.baseURL + res.data.yname_pic;
                            ; break;     // 审核中
                            case '2': 
                                clearInterval(_this.times)
                                _this.$router.replace({ path: '/server/YaoprescriptionListPic/YaoprescriptionList'})
                            ; break;          // 审核成功
                            case '3': _this.status2 = true; _this.failed = res.data.teacher_text 
                                _this.status = false;
                                _this.img1 = _this.$http.baseURL + res.data.teacher_pic;
                                _this.img2 = _this.$http.baseURL + res.data.yname_pic;
                                _this.labelTxt = '重新上传'
                                _this.labelTxt2 = '重新上传'
                            ; break;  // 审核失败
                        }
                    }
                   
                }, function (err) {console.log(err)})
            },
        }
            
}
</script>
<style lang='less' scoped>
.perscriptionPicShen {
    height: 100%;
    background-color: #F1F2F9;
.perscription {
    height: 100%;
    .user_msg {
        background-color: #FFF;
        width: 100%;
        overflow: hidden;
    }
}

    
}


.msg {
    border:1px solid #3196FF;
    background: #EAF4FF;
    color: #3196FF;
    padding: 18px 24px;
    margin-bottom: 20px;
    // display: none;
    p {
        color: #666666;
        margin-top: 20px;
    }
}



</style>

