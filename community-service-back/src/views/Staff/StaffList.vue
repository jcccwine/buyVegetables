<template>
  <div>
    <h3>员工列表</h3>
    <el-table :data="staffList">
      <el-table-column prop="_id" label="ID" width="230"></el-table-column>
      <el-table-column prop="adminName" label="用户名"></el-table-column>
      <el-table-column prop="staffName" label="员工姓名"></el-table-column>
      <el-table-column prop="staffSex" label="性别"></el-table-column>
      <el-table-column prop="staffAge" label="年龄"></el-table-column>
      <el-table-column prop="staffTel" label="联系方式"></el-table-column>
      <el-table-column prop="staffDate" label="登记时间"></el-table-column>
      <el-table-column prop="staffAuthority" label="权限"></el-table-column>
      <el-table-column
      fixed="right"
      label="操作"
      width="100">
        <template slot-scope="scope">
          <el-button type="text" width="180" 
          @click="remove(scope.row)">删除</el-button>
        </template>
        <template slot-scope="scope">
          <el-button type="text" width="180" 
          @click="authority(scope.row)">更改权限</el-button>
        </template>
      </el-table-column>
      <el-dialog
        title="修改权限"
        :append-to-body="true"
        :visible.sync="dialogVisible"
        width="35%"
        :before-close="handleClose">
        <el-select v-model="model.staffAuthority">
          <el-option v-for="item in staffAuthorityList" :key="item.id"
            :label="item.status" :value="item.status"></el-option>
        </el-select>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="queding">确 定</el-button>
        </span>
      </el-dialog>
    </el-table>
  </div>
</template>

<script>
// 导出模块本身
export default {
  inject: ['reload'],
  data(){
    return {
      model: {},
      staffList: [],
      staffAuthorityList: [
        {id: 0, status: '普通员工'},
        {id: 1, status: '管理员'}
      ],
      dialogVisible: false,
      id: null
    }
  },
  methods: {
    async fetch(){
      const res = await this.$http.get('rest/staff')
      // 把传给前端的数据给data
      this.staffList = res.data
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(() => {
          done();
        })
        .catch(() => {});
    },
    async queding() {
      this.dialogVisible = false
      const res = await this.$http.put(`examine/staff/${this.id}/${this.model.staffAuthority}`)
      console.log(res)
      localStorage.clear()
      this.$router.push('/login')
      this.$message({
        type: 'success',
        message: '当前账号权限已被修改，请重新登录'
      })
    },
    async remove(row){
      this.$confirm(`是否删除该员工信息 "${row.name}"`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then( async() => {
          const res = await this.$http.delete(`rest/staff/${row._id}`)// eslint-disable-line no-unused-vars
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.reload()
        });
    },
    authority(row) {
      this.dialogVisible = true
      this.id = row._id
    }
  },
  // 生命周期钩子函数，创建时期
  created() {
    this.fetch()
  }
}
</script>
