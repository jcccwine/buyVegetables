<template>
    <view class="card p-3 bg-white mt-3">
      <view class="card-header d-flex ai-center border-bottom">
        <span class="sprite" :class="sprite"></span>
        <view class="fs-xl flex-1 px-2">{{title}}</view>
        <i class="sprite sprite-menu ai-center" v-if="!plain "></i>
      </view>
      <view class="card-body pt-3">
        <slot></slot>
      </view>
  </view>
</template>

<script>
export default {
  props:{
    title: {type: String,required: true},
    sprite: {type: String,required: true},
  }
}
</script>

<style lang="scss">
@import '../assets/scss/_variables.scss';
  .card {
    border-bottom: 1px solid $border-color;
  }
</style>