<template>
	<view class="content">
		<view class="volun-item">
			<text>姓名：</text>
			<input type="text" v-model="modal.userName"/>
		</view>
		<view class="volun-item">
			<text>收货号码：</text>
			<input type="text" placeholder="请填写手机号" v-model="modal.tel"/>
		</view>
		<view class="volun-item">
			<text>当前地区：</text>
			<text>浙江省杭州市临安区</text>
		</view>
		<view class="volun-item">
			<text>详细地址：</text>
			<input type="text" placeholder="请填写具体社区" v-model="modal.address" />
		</view>
		<van-button class="btn" plain type="primary" @click="submit">保存</van-button>
	</view>
</template>

<script>
import {savePersonInfo} from '../../utils/api.js'
export default {
	data() {
		return {
			modal: {
				date: new Date().toISOString().slice(0, 10),
				openid: ''
			},
			show: false
		}
	},
	methods: {
		submit() {
			uni.getStorage({
				key: 'openid',
				success: (res) => {
					this.modal.openid = res.data
					console.log(this.modal)
					savePersonInfo(this.modal).then( res => {
						console.log(this.modal)
						uni.showToast({
							title: '保存成功'
						})
					}).catch( err => {
						uni.showToast({
							title: '保存失败'
						})
					})
				}
			})			
		}
	}
}
</script>

<style scoped>
	.volun-item {
		display: flex;
		padding: 20px;
	}
	.btn {
		display: flex; 
		justify-content: center; 
		align-items: center;
	}
</style>

