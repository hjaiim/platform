<template>
  <div class="contain">
    <div class="login-contain">
      <p>登录页</p>
      <el-input v-model="username" placeholder="请输入账号"></el-input>
      <el-input v-model="password" placeholder="请输入密码"></el-input>
      <el-button @click="handleLogin">登录</el-button>
    </div>
  </div>

</template>
<script type="text/ecmascript-6">
import API from "api/api_login";
export default {
  created() {
    console.log(this.$route.query.redirect);
  },
  data() {
    return {
      username: "admin",
      password: "admin1"
    };
  },
  components: {},
  watch: {},
  methods: {
    handleLogin() {
      let loginParams = {
        username: this.username,
        password: this.password
      };

      API.login(loginParams)
        .then(result => {
          console.log("登录成功");

          //更新sessionStorage登录状态(登录)
          // this.$utils.data.setData('isLogin', true, 'ses');

          //回调页面
          this.$router.push({
            path: this.$route.query.redirect || "/"
          });
        })
        .catch(error => {
          console.log("登录失败");
          console.log(error);
        });
    }
  }
};
</script>
<style>
body {
  background: #dfe9fb;
}
</style>

<style type="text/css" lang="scss" rel="stylesheet/css" scoped>
@mixin positionAb($x, $y) {
  position: absolute;
  left: 50%;
  top: 50%;
  width: $x;
  height: $y;
  margin-left: -$x/2;
  margin-top: -$y/2;
  z-index: 99;
}

.contain {
  width: 100%;
  height: 100%;
  background-color: aquamarine;
}
.login-contain {
  @include positionAb(350px, 180px);
  p {
    text-align: center;
  }
  .el-input {
    width: 350px;
  }
  .el-button {
    width: 100%;
    background-color: #409eff;
    color: white;
  }
}
</style>
