<template>
	<view class="feedback">
		<text>问题类型</text>
		<view class="type">
			<view class="type-item" v-for="item in typeList" :key="item.id">
				<button :class="[model.issueType==item.name?'active':'']" @click="model.issueType=item.name">{{item.name}}</button>
			</view>
		</view>
		<textarea v-model="model.content" style="background-color: #FFFFFF;" placeholder="请描述一下您的问题" />
		<button style="margin: 20px auto; width: 150px; background-color: #4CD964;color: #FFFFFF; border-left: 1px solid #4CD964;" @click="submitIssue">提交</button>
	</view>
</template>

<script>
import {subIssue, getUser} from '../../utils/api.js'
export default {
	data() {
		return {
			typeList: [
				{id: 0, name: '功能建议'},
				{id: 1, name: '页面意见'},
				{id: 2, name: '操作建议'},
				{id: 3, name: '您的新需求'}
			],
			model: {
				issueType: '',
				date: new Date().toISOString().slice(0, 10)
			}
		}
	},
	methods: {
		submitIssue() {
			if (this.model.issueType == '' ) {
				uni.showToast({
					title: '请选择意见类型'
				})
			}
			if (!this.model.content) {
				uni.showToast({
					title: '请填写具体内容'
				})
			}
			else {
				uni.getStorage({
					key: 'openid',
					success: (res) => {
						this.model.openid = res.data
						console.log(this.model)
						subIssue(this.model).then( res => {
							console.log(res)
						}).catch( err => {
							console.log(err)
						})
					}	
				})
				
			}
		}
	}
}
</script>

<style>
	page {
		background-color: #EEEEEE;
		padding: 5px;
	}
</style>

<style scoped>
	.type {
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
	}
	.type-item {
		display: flex;
	}
	.active {
		background-color: #4cd964;
		color: #FFFFFF;
	}
	button {
		width: 80px;
		height: 30px;
		line-height: 30px;
		font-size: 14px;
		margin: 8px 5px;
	}
</style>
