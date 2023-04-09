<template>
	<view class="content">
		<view class="banner">
			<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
				<swiper-item  v-for="item in bannerList" :key="item.id">
					<view class="swiper-item">
						<image :src="item.url"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="option">
			<view class="option-item" v-for="item in optionList" :key="item.id" @click="navigate(item.id)">
				<view style="text-align: center;" class="iconfont" :class="[item.iconfont]"></view>
				<view class="title">{{item.title}}</view>
			</view>
		</view>
		<view class="article">
			<view class="nav">
				<view class="iconfont icon-fankui"></view>
				<text style="font-size: 13px; margin-left: 10px;">社区公告</text>
			</view>
			<view class="content" v-for="item in articleList" :key="item._id" @click="article(item._id)">
				<view style="display: flex;">
					<view style="margin-right: 10px;" class="iconfont icon-announce"></view>
					<text>{{item.title}}</text>
				</view>
				<text>{{item.date}}</text>
			</view>
		</view>
	</view>
</template>

<script>
import {getArticle} from '../../utils/api.js'
export default {
	data() {
		return {
			bannerList: [
				{id: 0, url: '../../static/images/banner1.jpg'},
				{id: 1, url: '../../static/images/banner2.jpg'}
			],
			optionList: [
				{id: 0, iconfont: 'icon-maicai', title: '买菜', url: '../buyVeg/buyVeg'},
				{id: 1, iconfont: 'icon-shenqing2', title: '志愿者申请', url: '../volunteerApply/volunteerApply'},
				{id: 2, iconfont: 'icon-jiankang', title: '健康登记', url: '../volunteerHealth/volunteerHealth'},
				{id: 3, iconfont: 'icon-fankui', title: '使用反馈', url: '../feedBack/feedBack'}
			],
			articleList: []
		}
	},
	onLoad() {
		getArticle().then( res => {
			this.articleList = res
		}).then( err => {
			console.log(err)
		})
	},
	methods: {
		navigate(index) {
			uni.navigateTo({
				url: this.optionList[index].url
			})
		},
		article(index) {
			console.log(111)
			uni.navigateTo({
				url: '../articleDetail/articleDetail?articleId='+index
			})
		}
	}
}
</script>

<style scoped>
	@import url("../../assest/iconfont/iconfont.css");
	image {
		width: 100%;
		background: 100% 100% no-repeat;
	}
	.option {
		display: flex;
		justify-content: space-around;
		align-items: center;
		margin: 25px 0 0 10px;
		width: 300px;
		background-color: #FFFFFF;
	}
	.option .title {
		padding-top: 10px;
		font-size: 12px;
		color: #aaa;
		text-align: center;
	}
	.article {
		margin: 20px 26px 0 26px;
	}
	.article .nav {
		display: flex;
		padding-bottom: 10px;
		border-bottom: 1px solid #DDDDDD;
	}
	.article .content {
		margin: 10px 0 10px 0;
		display: flex;
		justify-content: space-between;
		font-size: 12px;
	}
</style>
