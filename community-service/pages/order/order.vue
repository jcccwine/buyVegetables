<template>
	<view class="content">
		<view class="nav">
			<view :class="[isActive == item.id?'active':'']" @click="getOrderByState(item.id, item.title)" v-for="item in navList" :key="item.id">
				{{item.title}}
			</view>
		</view>
		<view class="order">
			<view class="order-main" style="background-color: #ffffff;" v-for="item in orderList" :key="item._id">
				<view class="order-item">
					<view style="display: flex;">
						<view class="item" v-for="index in item.cate" :key="index._id">
							<image :src="index.vegPic" mode=""></image>
						</view>
					</view>
					<text style="line-height: 55px; font-size: 13px; color: #DDDDDD;">共{{item.cate.length}}件></text>
				</view>
				<view class="comment-btn">
					<button style="border: 1px solid #EEEEEE;" @click="deleteOrder(item._id)">删除订单</button>
					<button style="border: 1px solid #4CD964; color: #4CD964;" @click="comment(item._id)">评价订单</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import {getOrder, getOrderByState, deleteOrderById} from '../../utils/api.js'
export default {
	data() {
		return {
			isActive: 0,
			navList: [
				{id: 0, title: '全部分类'},
				{id: 1, title: '待送达'},
				{id: 2, title: '待评价'},
				{id: 3, title: '已评价'}
			],
			orderList: [],
			openid: ''
		}
	},
	onLoad() {
		uni.getStorage({
			key: 'openid',
			success: (res) => {
				this.openid = res.data
				getOrder(this.openid).then(res=> {
					this.orderList = res
				}).catch(err=> {
					console.log(err)
				})
			}
		})
	},
	methods: {
		getOrderByState(id, index) {
			this.isActive = id
			if (index == '全部分类') {
				getOrder(this.openid).then(res=> {
					this.orderList = res
				}).catch(err=> {
					console.log(err)
				})
			}
			else {
				this.orderList = []
				getOrderByState(index).then( res => {
					this.orderList = res
				}).catch(err => {
					console.log(err)
				})
			}
		},
		comment(index) {
			uni.navigateTo({
				url: '../comment/comment?orderId='+index
			})
		},
		deleteOrder(index) {
			uni.showModal({
			    title: '提示',
			    content: '确认删除该订单？',
			    success: function (res) {
			        if (res.confirm) {
			            deleteOrderById(index).then(res => {
							console.log(res)
						})
			        } else if (res.cancel) {
			            console.log('用户点击取消')
			        }
			    }
			});
		}
	}
	
}
</script>

<style>
	page {
		background-color: #EEEEEE;
	}
</style>

<style scoped>
	.nav {
		display: flex;
		justify-content: space-around;
		align-items: center;
		width: 100%;
		height: 30px;
		/* background-color: #FFFFFF; */
	}
	.active {
		border-bottom: 2px solid #4cd964;
		color: #4CD964;
		padding: 5px 0;
	}
	.order {
		padding: 0 10px;
	}
	.order-main {
		background-color: #FFFFFF;
		border-radius: 10px;
		padding: 5px;
		margin-top: 15px;
	}
	.order-item {
		display: flex;
		width: 100%;
		height: 50px;
		margin-top: 15px;
		justify-content: space-between;
	}
	.item {
		display: flex;
		justify-content: space-around;
	}
	.item image {
		width: 55px;
		height: 55px;
		background: 100% 100% no-repeat;
		margin: 0 3px;
	}
	.comment-btn {
		display: flex;
		margin-left: 110px;
		margin-top: 20px;
	}
	.comment-btn button {
		width: 85px;
		border-radius: 30px;
		height: 25px;
		font-size: 13px;
		line-height: 25px;
		background-color: #FFFFFF;
	}
</style>
