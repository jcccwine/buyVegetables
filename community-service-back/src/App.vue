<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>


<script>
export default {
  provide () {    //父组件中通过provide来提供变量，在子组件中通过inject来注入变量。                                             
    return {
      reload: this.reload                                              
    }
  },
  data() {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    reload () {
      this.isRouterAlive = false      //先关闭
      this.$nextTick(() => {
        this.isRouterAlive = true     //再打开
      }) 
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>
