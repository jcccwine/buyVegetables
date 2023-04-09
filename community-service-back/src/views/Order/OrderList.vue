<template>
  <div>
    <h3>订单列表</h3>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="230"></el-table-column>
      <el-table-column prop="userName" label="姓名"></el-table-column>
      <el-table-column prop="tel" label="联系方式"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
      <!-- <el-table-column prop="cate" label="菜品"></el-table-column> -->
      <el-table-column prop="orderPrice" label="价格"></el-table-column>
      <el-table-column prop="orderState" label="状态"></el-table-column>
      <el-table-column prop="date" label="订单时间"></el-table-column>
      <el-table-column
      fixed="right"
      label="操作"
      width="100">
        <template slot-scope="scope">
          <el-button type="text" width="180" @click="ReceOrder(scope.row._id)" :disabled="disabled1">接单</el-button>
          <el-button type="text" width="180" @click="finishOrder(scope.row._id)" :disabled="disabled2">完成</el-button>
          <el-button type="text" width="180" @click="checkOrder(scope.row._id)">查看</el-button>
        </template>
      </el-table-column>
      <el-dialog
        title="订单菜品信息"
        :append-to-body="true"
        :visible.sync="dialogVisible"
        width="35%">
        <div style="display: flex; font-size: 15px" v-for="item in cate.cate" :key="item._id">
          <div style="margin-right: 20px">{{item.vegName}}</div>
          <div style="margin-right: 20px">单价：{{item.vegPrice}}/{{item.vegUnit}}</div>
          <div>份数：{{item.num}}</div>
        </div>
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
      items: [],
      dialogVisible: false,
      cate: [],
      disabled1: false,
      disabled2: false
    }
  },
  methods: {
    async fetch(){
      const res = await this.$http.get('rest/orders')
      // 把传给前端的数据给data
      this.items = res.data
    },
    ReceOrder(row){
      this.$confirm(`是否接单`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const res = this.$http.put(`examine/receOrder/${row}`)// eslint-disable-line no-unused-vars
          this.disabled1 = true
          this.reload()
          this.$message({
            type: 'success',
            message: '成功接单!'
          })
        });
    },
    finishOrder(row) {
      this.$confirm(`订单是否已完成`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const res = this.$http.put(`examine/finishOrder/${row}`)// eslint-disable-line no-unused-vars
          this.reload()
          this.disabled2 = true
          this.$message({
            type: 'success',
            message: '订单已完成!'
          })
        });
    },
    async checkOrder(row) {
      const res = await this.$http.get(`rest/orders/${row}`)
      this.cate = res.data
      this.dialogVisible = true
      console.log(this.dialogVisible)
      console.log(res)
    }
  },
  // 生命周期钩子函数，创建时期
  created() {
    this.fetch()
  }
}
</script>
