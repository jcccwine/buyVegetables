<template>
  <div>
    <h3>文章列表</h3>
    <el-button @click="$router.push('/articles/create')">新增公告</el-button>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="230"></el-table-column>
      <el-table-column prop="title" label="公告标题"></el-table-column> 
      <el-table-column prop="adminName" label="发布者"></el-table-column>   
      <el-table-column prop="date" label="公告时间"></el-table-column>  
      <el-table-column
      fixed="right"
      label="操作"
      width="100">
        <template slot-scope="scope">
          <!-- scope.row当前这一行的数据 跳转到articles/edit/${scope.row._id}这个页面-->
          <el-button type="text" width="180" 
          @click="$router.push(`/articles/edit/${scope.row._id}`)">编辑</el-button>
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
      items: []
    }
  },
  methods: {
    async fetch(){
      const res = await this.$http.get('rest/articles')
      // 把传给前端的数据给data
      this.items = res.data
      console.log(res.data)
    },
    async remove(row){
      this.$confirm(`是否删除文章 "${row.title}"`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then( async() => {
          const res = await this.$http.delete(`rest/articles/${row._id}`)// eslint-disable-line no-unused-vars
          this.$message({
            type: 'success',
            message: '删除成功!'
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
