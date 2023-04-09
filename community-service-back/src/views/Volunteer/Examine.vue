<template>
  <div>
    <h3>志愿者审核列表</h3>
    <el-table :data="volunteerList">
      <el-table-column prop="_id" label="ID" width="230"></el-table-column>
      <el-table-column prop="date" label="申请时间"></el-table-column>
      <el-table-column prop="userName" label="姓名"></el-table-column>
      <el-table-column prop="sex" label="性别"></el-table-column>
      <el-table-column prop="tel" label="联系电话"></el-table-column>
      <el-table-column prop="address" label="社区地址"></el-table-column>
      <el-table-column prop="note" label="申请理由"></el-table-column>
      <el-table-column prop="type" label="状态"></el-table-column>
      <el-table-column
      fixed="right"
      label="操作"
      width="100">
        <template slot-scope="scope">
          <!-- scope.row当前这一行的数据 跳转到categories/edit/${scope.row._id}这个页面-->
          <el-button type="text" width="180" 
          @click="examine(scope.row._id)">审核</el-button>
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
      volunteerList: []
    }
  },
  methods: {
    async fetch(){
      const res = await this.$http.get('rest/users')
      // 把传给前端的数据给data
      this.volunteerList = res.data
      console.log(this.volunteerList)
    },
    async remove(row){
      this.$confirm(`是否删除该条数据`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then( async() => {
        const res = await this.$http.delete(`rest/users/${row._id}`)// eslint-disable-line no-unused-vars
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.reload()
      });
    },
    examine(row) {
      this.$confirm(`是否通过该用户提交的审核`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const res = this.$http.put(`examine/examineVolunteer/${row}`)// eslint-disable-line no-unused-vars
        this.$message({
          type: 'success',
          message: '审核成功!'
        })
        this.reload()
      });
    }
  },
  // 生命周期钩子函数，创建时期
  created() {
    this.fetch()
  }
}
</script>