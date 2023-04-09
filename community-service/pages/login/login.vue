<template>
	<view class="login">
		<view>
			<view>
				<view class="content">
					<view>申请获取以下权限</view>
					<text>获得你的公开信息(昵称，头像、地区等)</text>
				</view>
				<button class="bottom" type="primary" @click="wxGetUserInfo">授权登录</button>
			</view>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>
<script>
import {getOpenId} from '../../utils/api.js'
export default {
	data() {
		return {
			isLogin: false
		}
	},
	methods: {
		// 获取openID
		wxGetUserInfo() {
			// wx获取登录用户code
			uni.login({
				provider: 'weixin',
				success: loginRes => {
					let code = loginRes.code
					console.log(loginRes)
					// 将用户登录code传递到后台置换用户SessionKey、OpenId等信息
					uni.hideLoading()
					getOpenId({ code }).then(res => {
						console.log(res)
						uni.setStorage({
							key: 'openid',
							data: res.openid
						})
					})
				},
				fail(err) {
					uni.showToast({ title: '微信登录授权失败', icon: 'none' })
				}
			}),
			// 获取用户信息
			uni.getUserProfile({
			    lang:"zh_CN",
				desc: 'weixin',
				success: res => {
					console.log(res)
					this.isLogin = true
					uni.setStorage({
						key: 'pic',
						data: res.userInfo.avatarUrl
					})
					uni.setStorage({
						key: 'name',
						data: res.userInfo.nickName
					})
					uni.setStorage({
						key: 'flag',
						data: this.isLogin
					})
					uni.navigateTo({
						url: '../my/my'
					})
				},
				fail(res) {
					uni.showToast({ title: '获取用户信息失败', icon: 'none' })
				}
			})
		}
	}
};
 </script>
<style scoped>
.header {
	margin: 90px 0 90px 50px;
	border-bottom: 1px solid #ccc;
	text-align: center;
	width: 650px;
	height: 300px;
	line-height: 450px;
}
.header image {
	width: 200px;
	height: 200px;
}
.content {
	margin-left: 50px;
	margin-bottom: 90px;
}
.content text {
	display: block;
	color: #9d9d9d;
	margin-top: 40px;
}
.bottom {
	border-radius: 80px;
	margin: 70px 50px;
	font-size: 35px;
}
</style>

