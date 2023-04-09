<template>
  <div class="login-bg">
    <el-card header="请先登录" class="login-card">
      <!-- native表示监听el-form的原生事件，prevent是阻止表单默认提交不要跳转页面 -->
      <el-form @submit.native.prevent="login">
        <el-form-item label="用户名">
          <el-input v-model="model.adminName"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="model.adminPassword"></el-input>
        </el-form-item>
        <el-form-item class="register">
          <el-button type="primary" native-type="submit">登录</el-button>
        </el-form-item>
        <span class="login" @click="register">没有账号？去注册</span>
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
    async login() {
      const res = await this.$http.post('/login', this.model)
      localStorage.token = res.data.token
      localStorage.adminName = res.data.adminName
      localStorage.auth = res.data.staffAuthority
      localStorage._id = res.data._id
      this.$router.push('/')
      this.$message({
        type: 'success',
        message: '登录成功'
      })
    },
    register() {
      this.$router.push('/register')
    }
  },
}
</script>