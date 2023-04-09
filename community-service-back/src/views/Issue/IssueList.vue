<template>
  <div>
    <h3>反馈意见列表</h3>
    <!-- <el-button>导出excle</el-button> -->
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="230"></el-table-column>
      <el-table-column prop="issueType" label="意见类型"></el-table-column>
      <el-table-column prop="content" label="意见内容"></el-table-column>
      <el-table-column prop="date" label="提交时间"></el-table-column>
      <el-table-column
      fixed="right"
      label="操作"
      width="100">
        <template slot-scope="scope">
          <el-button type="text" width="180" @click="checkIssue(scope.row._id)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// 导出模块本身
export default {
  data(){
    return {
      items: []
    }
  },
  methods: {
    async fetch(){
      const res = await this.$http.get('rest/issues')
      this.items = res.data
    },
    checkIssue(id) {
      console.log(id)
    }
  },
  // 生命周期钩子函数，创建时期
  created() {
    this.fetch()
  }
}
</script>
