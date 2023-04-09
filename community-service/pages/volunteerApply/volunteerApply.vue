<template>
	<view class="content">
		<view class="volun-item">
			<text>姓名：</text>
			<input type="text" v-model="modal.userName"/>
		</view>
		<view class="volun-item">
			<text>性别：</text>
			<van-radio-group
			  :value="modal.sex"
			  @change="onChange"
			  direction="horizontal">
			  <van-radio name="男">男</van-radio>
			  <van-radio name="女">女</van-radio>
			</van-radio-group>
		</view>
		<view class="volun-item">
			<text>联系方式：</text>
			<input type="text" placeholder="请填写联系方式" v-model="modal.tel"/>
		</view>
		<view class="volun-item">
			<text>当前地区：</text>
			<text>浙江省杭州市临安区</text>
		</view>
		<view class="volun-item">
			<text>具体社区：</text>
			<input type="text" placeholder="请填写具体社区" v-model="modal.address" />
		</view>
		<view class="volun-item">
			<text>申请时间：</text>
			<text>{{modal.date}}</text>
		</view>
		<view class="volun-item">
			<text>申请理由：</text>
			<textarea style="height: 30px;" placeholder="请填写申请理由" v-model="modal.note"/>
		</view>
		<van-button class="btn" plain type="primary" @click="submit">提交申请</van-button>
	</view>
</template>

<script>
import {applyVolun} from '../../utils/api.js'
export default {
	data() {
		return {
			modal: {
				sex: '女',
				date: new Date().toISOString().slice(0, 10),
				openid: '',
				type: '用户'
			},
			show: false
		}
	},
	methods: {
		onChange(event) {
		    this.modal.sex = event.detail
		},
		submit() {
			uni.getStorage({
				key: 'openid',
				success: (res) => {
					this.modal.openid = res.data
					console.log(this.modal)
					applyVolun(this.modal.openid, this.modal).then( res => {
						consoe.log(this.modal)
						consoel.log(res)
					}).catch( err => {
						uni.showToast({
							title: err
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

