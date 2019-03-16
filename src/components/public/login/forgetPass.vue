<template>
    <div id="base">
    <div id="reset">
        <div class="input_box">
            <div class="title_logo">
                <img src="@/common/image/pages/login/icon_dblogo@3x.png" alt="">
            </div>
            <p>找回密码</p>
            <form id="myform" action="" onsubmit="return false">
            <div class="my_group"><input type="text" id="phone" name="phone" placeholder="手机号"></div>
            <div class="my_group code"><input type="text" id="code" name="code" placeholder="请输入验证码"><button id="sendCode">发送验证码</button></div>
            <div class="my_group"><input type="text" id="pwd" name="pwd" placeholder="请输入密码"></div>
            <div class="my_group link_box">
                <span class="login pointer" @click="go('/login')">返回登录</span>
                <span class="register pointer" @click="go('/register')">注册账号</span>
            </div>
            <div class="my_group">
                <div class="login_btn">
                    确定
                </div>
            </div>
            </form>
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
    },
    methods: {
        initdata() {
            layui.use(["laypage", "layer", "laydate"], function () {

            });
        }
    }
}
</script>

<style scoped lang="less">
//登录 注册 忘记密码
#base {
  width: 100%;
  min-height: 100vh;
  background: url(../../../common/image/pages/login/img_jgbg@3x.png) no-repeat;
  background-size: cover;
  font-size: 16px;
  color: #888;

  #reset {
    .input_box {
      width: 460px;
      height: 440px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: #fff;
      -webkit-border-radius: 4px;
      -moz-border-radius: 4px;
      border-radius: 4px;
      padding-top: 60px;
      .title_logo {
        width: 207px;
        height: 60px;
        position: absolute;
        top: -60/2px;
        left: 50%;
        transform: translateX(-50%);
        img {
          width: 100%;
          height: 100%;
        }
      }
      p {
        font-size: 16px;
        font-weight: 400;
        color: rgba(78, 140, 216, 1);
        text-align: center;
        margin-bottom: 27px;
      }
      .my_group {
        height: 42px;
        width: 336px;
        margin: 0 auto;
        margin-bottom: 20px;
        position: relative;
        input {
          border: 1px solid #D7D7D7;
          -webkit-border-radius: 2px;
          -moz-border-radius: 2px;
          border-radius: 2px;
          padding: 10px 20px;
          width: 100%;
        }
      }
      .code {
        img {
          position: absolute;
          right: 2px;
          top: 2px;
        }
      }
      .link_box {
        overflow: hidden;
        span {
          font-size: 14px;
          color: #888;
          &.register {
            float: left;
          }
          &.reset {
            float: right;
          }
        }
      }
      .login_btn {
        cursor: pointer;
        width: 100%;
        height: 100%;
        background: rgba(78, 140, 216, 1);
        color: #fff;
        text-align: center;
        line-height: 42px;
        -webkit-border-radius: 2px;
        -moz-border-radius: 2px;
        border-radius: 2px;
      }

    }
    .footer {
      position: absolute;
      font-size: 14px;
      color: rgba(255, 255, 255, 1);
      bottom: 40px;
      width: 100%;
      text-align: center;
    }
  }
  #reset {
    .link_box {
      .login {
        float: left;
      }
      .register {
        float: right !important;
      }
    }
    .code {
      input {
        width: 204px !important;
        margin-right: 10px;
      }
      button {
        list-style: none;
        border: 1px solid #D7D7D7;
        outline: none;
        width: 119px;
        height: 41px;
        background: rgba(255, 255, 255, 1); 
        -webkit-border-radius: 2px;
        -moz-border-radius: 2px;
        border-radius: 2px;
        font-size: 14px;
        font-weight: 400;
        color: rgba(136, 136, 136, 1);
        cursor: pointer;
      }
    }
  }

}


</style>
