<template>
  <el-container style="height: 100vh;">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu :default-openeds="['1', '2', '3']" router unique-opened :default-active="$router.path">
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-message"></i>买菜</template>
          <el-menu-item index="/categories/list">菜品列表</el-menu-item>
          <el-menu-item index="/orders/list">订单列表</el-menu-item>
          <el-menu-item index="/comments/list">评价列表</el-menu-item>
          <el-menu-item index="/echarts">数据展示</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title"><i class="el-icon-message"></i>志愿者</template>
          <el-menu-item index="/volunteers/examine">志愿者审核</el-menu-item>
          <el-menu-item index="/volunteers/health">志愿者健康列表</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title"><i class="el-icon-message"></i>社区</template>
          <!-- <el-menu-item index="/staffs/edit">员工</el-menu-item> -->
          <el-menu-item v-if="auth!=='普通员工'" index="/staffs/list">员工列表</el-menu-item>
          <el-menu-item index="/articles/list">公告列表</el-menu-item>
          <el-menu-item index="/issues/list">意见反馈</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
  
    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="$router.push(`/editPersons/${id}`)">编辑个人信息</el-dropdown-item>
            <el-dropdown-item @click.native="$router.push(`/checkPersons/${id}`)">查看信息</el-dropdown-item>
            <el-dropdown-item @click.native="logout()">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>{{adminName}}</span>
      </el-header>
      
      <el-main>
        <!-- 路由容器 -->
        <router-view :key="$router.path"></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      adminName: localStorage.getItem('adminName'),
      id: localStorage.getItem('_id'),
      auth: null
    }
  },
  created() {
    this.auth = localStorage.getItem('auth')
    console.log(this.auth)
  },
  methods: {
    logout() {
      localStorage.clear()
      this.$router.push('/login')
      this.$message({
        type: 'success',
        message: '您已退出，请重新登录'
      })
    }
  },
}
</script>

<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  .el-aside {
    color: #333;
  }
</style>
