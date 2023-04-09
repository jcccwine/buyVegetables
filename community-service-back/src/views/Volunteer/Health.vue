<template>
  <div>
    <h3>志愿者健康登记信息列表</h3>
    <el-table :data="healthList">
      <el-table-column prop="_id" label="ID" width="230"></el-table-column>
      <!-- <el-table-column prop="userName" label="姓名"></el-table-column> -->
      <el-table-column prop="tempure" label="体温"></el-table-column>
      <el-table-column prop="radio" label="是否健康"></el-table-column>
      <el-table-column prop="fileUrl" label="健康码">
        <template slot-scope="scope">
          <img :src="scope.row.fileUrl" alt="" style="height:3rem">
        </template>
      </el-table-column>
      <el-table-column prop="color" label="健康码颜色"></el-table-column>
      <el-table-column
      fixed="right"
      label="操作"
      width="100">
        <template slot-scope="scope">
          <el-button type="text" width="180" 
          @click="remind(scope.row)">提醒</el-button>
          <el-button type="text" width="180" 
          @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// 导出模块本身
export default {
  inject: ['reload'],
  data(){
    return {
      healthList: []
    }
  },
  methods: {
    async fetch(){
      const res = await this.$http.get('rest/healths')
      // 把传给前端的数据给data
      this.healthList = res.data
    },
    async remove(row){
      this.$confirm(`是否提醒该志愿者 "${row.name}"`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then( async() => {
          const res = await this.$http.delete(`rest/healths/${row._id}`)// eslint-disable-line no-unused-vars
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.reload()
        });
    },
    async remind(row) {
      this.reload()
      console.log(row)
    }
  },
  // 生命周期钩子函数，创建时期
  created() {
    this.fetch()
  }
}
</script>