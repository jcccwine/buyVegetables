<template>
  <div class="about">
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="用户名">
        <el-input v-model="model.adminName"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="model.adminPassword"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        model: {}
      }
    },
    methods: {
      // 判断是新建还是编辑，如果是编辑的话编辑后的数据要在数据库里更新
      async save(){     
        let res;// eslint-disable-line no-unused-vars
          // 和服务器文件夹下的admin/index.js里的 router.post('/articles' 对应
          res = await this.$http.post('rest/staffs',this.model)
          console.log(this.model)
        this.$message({
          type: 'success',
          message: '保存成功'
        })
      },
    },
  }

</script>