<template>
  <div>
    <h3>评价列表</h3>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="230"></el-table-column>
      <el-table-column prop="cateName" label="菜品名称" width="230"></el-table-column>
      <el-table-column prop="src" label="菜品图片" width="230">
        <template slot-scope="scope">
          <img :src="scope.row.src" alt="" style="height:3rem">
        </template>
      </el-table-column>
      <el-table-column prop="content" label="评价内容" width="230"></el-table-column>
      <el-table-column prop="date" label="时间" width="230"></el-table-column>
      <el-table-column
      fixed="right"
      label="操作"
      width="100">
          <el-button type="text" width="180">查看</el-button>
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
      items: [
        {_id: '606b16a025fdf64a4ca2685b', cateName: '西红柿', src: 'http://localhost:3000/uploads/6fc954248b248ffe1100bca2ae7cf3d1', content: '西红柿很新鲜', date: '2021-04-20'},
        {_id: '60785f7355d79c220039d006', cateName: '梨', src: 'http://localhost:3000/uploads/1d298ae0cfbf337727c155ab3b7eff7c', content: '很甜', date: '2021-05-16'},
        {_id: '606b16a025fdf64a4ca2685b', cateName: '苹果', src: 'http://localhost:3000/uploads/9c4546365db7ea907736333ed50a4215', content: '很甜', date: '2021-05-16'},
      ]
    }
  },
  methods: {
    // async fetch(){
    //   const res = await this.$http.get('rest/comments')
    //   this.items = res.data
    // }
  },
  // 生命周期钩子函数，创建时期
  created() {
    // this.fetch()
  }
}
</script>
