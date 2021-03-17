<template>
  <div class="login_container" ref="clcheight">
    <!-- 插件开始  外层使用了particles包裹  class="beijing"可以添加一张背景图片 配合css引入-->
    <div id="particles">
      <vue-particles
        color="#0000FF"
        height="700px"
        :particleOpacity="0.7"
        :particlesNumber="90"
        shapeType="circle"
        :particleSize="4"
        linesColor="#EE82EE"
        :linesWidth="1.5"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="200"
        :moveSpeed="3"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"
        class="beijing"
      >
      </vue-particles>
    </div>
    <!-- end -->

    <!-- 登陆 -->
    <div class="loginBox">
      <div class="login_avatar">
        <img src="../assets/head.jpg" alt="">
      </div>
      <h2 class="title">用户登录</h2>

      <el-form :model="loginForm" class="login_form" ref="loginFormRef">
        <el-form-item>
          <el-input prefix-icon="el-icon-user" v-model="loginForm.username"
                    maxlength="10" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input prefix-icon="el-icon-lock" type="password" v-model="loginForm.password"
                    maxlength="16" placeholder="请输入密码">
          </el-input>
        </el-form-item>

        <el-form-item class="btnLogin">
          <el-button class="login_btn1" type="primary" @click="login">登陆</el-button>
          <el-button class="login_btn2" type="info" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      visible: true //是否显示密码
    }
  },
  mounted() {
    this.$refs.clcheight.style.height = `${document.documentElement.clientHeight}px`  //解决出现的滚动条
    // console.log(this.$refs.clcheight)
    // console.log(`${document.documentElement.clientHeight}`) //获取屏幕可视化区域的高度
  },
  methods: {
    changePass(value) {
      //判断渲染，true:暗文显示，false:明文显示
      this.visible = value !== 'show'
    },
    login() {
      if (this.loginForm.username !== '' && this.loginForm.password !== '') {
        this.$refs.loginFormRef.validate(async valid => {
          if (!valid) {
            return
          }
          await this.$axios.post('/login', this.loginForm)
            .then(result => {
              // console.log(result.data.data.token);
              if (result.data.meta.status === 200) {
                this.$message.success({
                  showClose: true,
                  message: '登陆成功'
                })
                window.sessionStorage.setItem('token', result.data.data.token)
                this.$router.push('/home')
              } else {
                this.$message.error({
                  showClose: true,
                  message: '用户名或密码错误'
                })
              }
            })
            .catch(res => {
              console.log(res)
              this.$message.error({
                showClose: true,
                message: '连接服务器失败'
              })
            })
        })
      } else {
        this.$message.warning({
          showClose: true,
          message: '用户名密码不为空'
        })
      }
    },
    reset() {
      this.$refs.loginFormRef.resetFields()
      this.loginForm.username = ''
      this.loginForm.password = ''
    }

  }
}
</script>

<style lang="less" scoped>


//登陆容器
.login_container {
  width: 100%;
  height: 100% !important;
  overflow-y: hidden;
  padding: 0;
  margin: 0;
}

//引入背景图
.beijing {
  height: 100%;
  padding: 0;
  margin: 0;
  overflow-y: hidden;
  background-image: radial-gradient(#002953, #041222);
}

.title {
  position: absolute;
  top: 8%;
  left: 50%;
  transform: translate(-50%);
  color: white;
}

.loginForm {

}

//登陆小框
.loginBox {
  background-image: linear-gradient(#002953, #795da3);
  width: 350px;
  height: 250px;
  padding: 20px;
  position: relative;
  left: 0;
  right: 0;
  top: 20%;
  margin: auto;
  border-radius: 5%;
  //border: #ffffff 1px solid;
}

//头像
.login_avatar {
  height: 70px;
  width: 70px;
  border: antiquewhite 1px solid;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #ddd;
  position: relative;
  left: 50%;
  transform: translate(-50%, -80%);
  background-color: #fff;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: cornflowerblue;
    transition: all 2s
  }

  img:hover {
    transform: rotate(360deg);
  }
}

.login_form {
  //border:1px solid red;
  margin-top: 20px;
  transform: translate(0px, -30px);
}

.login_btn1 {
  width: 45%;
}

.login_btn2 {
  width: 45%;
}

.el-button + .el-button {
  margin-left: 30px;
}
</style>
