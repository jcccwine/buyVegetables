<template>
  <div class="about">
    <h1>{{$route.name == 'editPersonInfo' ? '编辑':'查看'}}个人信息</h1>
    <el-form :disabled="isDisbled" label-width="120px" @submit.native.prevent="save" style="margin-top:1.5rem">
      <el-form-item label="用户名">
        <el-input v-model="model.adminName"></el-input>
      </el-form-item>
      <el-form-item label="密码" v-show="!isShow">
        <el-input type="password" v-model="model.adminPassword"></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="model.staffName"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-input v-model="model.staffSex"></el-input>
      </el-form-item>
      <el-form-item label="年龄">
        <el-input v-model="model.staffAge"></el-input>
      </el-form-item>
      <el-form-item label="联系方式">
        <el-input v-model="model.staffTel"></el-input>
      </el-form-item>
      <el-form-item label="登记时间">
        <el-input v-model="model.staffDate"></el-input>
      </el-form-item>
      <el-form-item v-show="!isShow">
        <el-button style="margin-top:3rem" type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    props: {
      id: {}
    },
    data(){
      return {
        model: {},
        isDisbled: false,
        isShow: false
      }
    },
    watch: {
      '$route': {
        handler(route) {
          if (route.name == 'checkPersonInfo') {
            this.isDisbled = true
            this.isShow = true
          }
          else {
            this.isDisbled = false
            this.isShow = false
          }
        }
      }
    },
    methods: {
      // 判断是编辑还是查看
      async save(){        
        let res // eslint-disable-line no-unused-vars
        if (this.$route.name == 'editPersonInfo') {
          res = await this.$http.put(`rest/staff/${this.id}`,this.model)
          console.log(this.model)
          this.$message({
            type: 'success',
            message: '信息修改成功'
          })
        }
      },
      async fetch(){
        if (this.$route.name == 'checkPersonInfo') {
          this.isDisbled = true
          this.isShow = true
        }
        const res = await this.$http.get(`rest/staff/${this.id}`)// eslint-disable-line no-unused-vars
        // 如果直接用res.data会覆盖掉model的数据
        this.model = Object.assign({},this.model,res.data)
      }
    },
    created() {
      this.fetch()
    },
  }

</script>