<template>
	<view class="user">
		<van-button class="v-btn" @click="login" v-if="!isLogin">登录</van-button>
		<view class="header" style="background-color: #4CD964;" v-if="isLogin">
			<image class="user-bg" src="../../static/images/user-bg.png" mode=""></image>
			<view class="nav">
				<image :src="pic" mode=""></image>
				<text>{{nickName}}</text>
			</view>
		</view>
		<view class="menu" v-for="item in menuBar" :key="item.id" @click="menuNavi(item.id)">
			<view class="menu-item">
				<view style="margin-right: 5px;" class="iconfont" :class="[item.icon]"></view>
				<text>{{item.title}}</text>
			</view>
			<view class="arrow iconfont icon-youjiantou"></view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			pic: '',
			nickName: null,
			isLogin: false,
			menuBar: [
				{id: 0, title: '我的订单', icon: 'icon-wodedingdan', url: '../order/order'},
				{id: 1, title: '完善个人信息', icon: 'icon-shenqing', url: '../personInfo/personInfo'},
			]
		}
	},
	onShow() {
		uni.getStorage({
			key: 'flag',
			success: (res) => {
				this.isLogin = res.data
				uni.getStorage({
					key: 'pic',
					success: (res) => {
						this.pic = res.data
					}
				}),
				uni.getStorage({
					key: 'name',
					success: (res) => {
						this.nickName = res.data
					}
				})
			}
		})
		
	},
	methods: {
		login() {
			uni.navigateTo({
				url: '../login/login'
			})
		},
		menuNavi(index) {
			uni.navigateTo({
				url: this.menuBar[index].url
			})
		}
	}
}
</script>

<style>
	@import url("../../assest/iconfont/iconfont.css");
	.v-btn {
		display: flex;
		width: 100vw;
		height: 100vh;
		justify-content: center;
		align-items: center;
	}
	.header {
		position: relative;
		width: 100vw;
		padding: 20px;
	}
	.header .user-bg {
		height: 100%;
		width: 100%;
		display: block;
		position: absolute;
		top: 0;
		left: 0;
	}
	.nav {
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
	.nav image {
		width: 65px;
		height: 65px;
		border-radius: 50%;
		margin-right: 10px;
	}
	.nav text {
		color: #fff;
		font-size: 14px;
	}
	.menu {
		display: flex;
		justify-content: space-between;
		border-bottom: 1px solid #EEEEEE;
		padding: 15px;
	}
	.menu-item {
		display: flex;
	}
</style>
