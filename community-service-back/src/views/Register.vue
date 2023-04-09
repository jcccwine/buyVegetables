<template>
  <div class="login-bg">
    <el-card header="请先注册" class="login-card">
      <el-form @submit.native.prevent="register">
        <el-form-item label="用户名">
          <el-input v-model="model.adminName"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="model.adminPassword"></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input type="staffTel" v-model="model.staffTel"></el-input>
        </el-form-item>
        <el-form-item class="register">
          <el-button type="primary" native-type="submit">注册</el-button>
        </el-form-item>
        <span class="login" @click="login">已有账号？去登录</span>
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      model: {}
    }
  },
  methods: {
    async register() {
      const res = await this.$http.post('rest/staffs',this.model)
      console.log(res)
    },
    login() {
      this.$router.push('/login')
    }
  },
}
</script>

<style>
.login-bg {
  background: url(../assets/images/bg.jpg) no-repeat;
  height: 100%;
  position: fixed;
  width: 100%;
  background-size: cover;
}
.login-card {
  width: 25rem;
  margin: 10rem auto;
}
.register {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 5px;
}
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 12px;
  color: #409EFF;
}
</style>