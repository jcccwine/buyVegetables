<template>
  <view class="page-article">
    <view class="nav">
      <strong>
        {{model.title}}
      </strong>
      <view>
        {{model.date}}
      </view>
    </view>
    <!-- 内容 -->
    <view class="content" v-html="model.body"></view>
    <!-- 关联内容 -->
  </view>
</template>

<script>
import {getArticleById} from '../../utils/api.js'
export default {
  data(){
    return {
      model: {}
    }
  },
  onLoad(options) {
	getArticleById(options.articleId).then( res => {
		console.log(this.model)
		console.log(res)
		this.model = res
	}).catch( err => {
		console.log(err)
	})
  },
  // 监听，id变化重新执行fetch方法
  watch: {
    id: 'fetch',
  },
}
</script>

<style scoped>
	.page-article {
		padding: 10px;
	}
	.page-article .nav {
		display: flex;
		justify-content: space-between;
	}
	.content {
		margin-top: 20px;
		font-size: 13px;
	}
</style>