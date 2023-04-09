<template>
	<view class="buyVeg">
		<view class="left">
			<view class="left-item" 
			:class="[isActive==item.id?'active':null]" 
			v-for="item in cateList" 
			:key="item.id" 
			@click="choose(item.id, item.name)">
				<view style="line-height: 45px;">{{item.name}}</view>
			</view>
		</view>
		<view class="right">
			<view class="right-item" v-for="item in vegList" :key="item._id">
				<image :src="item.vegPic" mode=""></image>
				<view class="veg">
					<view class="veg-title">
						{{item.vegName}}
					</view>
					<view class="veg-desc">
						{{item.vegDesc}}
					</view>
					<view class="shop">
						<text style="color: #FF0000; font-size: 13px;">￥{{item.vegPrice}}</text>
						<text style="color: #BBBBBB; font-size: 12px;">/{{item.vegUnit}}</text>
						<view class="stepper">
							<view class="iconfont icon-jian" @click="subtract(item._id)" v-if="count[item._id]"></view>
							<view class="value" v-if="count[item._id]>0">{{count[item._id]}}</view>
							<view class="iconfont icon-tianjia" @click="add(item._id, item.vegPrice, $event)"></view>
						</view>
					</view>
				</view>
				
			</view>
		</view>
		
		<!-- 底部固定购物车 -->
		<view class="HZL_cat">
			<view class="HZL_cat_img_view" @click="cartPopup">
				<image :src="[total>0?'../../static/images/new_shop.png':'../../static/images/shop.png']" class="HZL_cat_img"></image>
				<view class="HZL_cat_num" v-if="total > 0"> {{total}} </view>
			</view>
			<view class="total-price" v-if="total>0">总价：{{totalPrice}}元</view>
			<view class="HZL_cat_text" @click="go">去结算</view>
		</view>
		
		<!-- 遮罩层 -->
		<van-overlay :show="show" @click="onClickHide">
		  <view class="wrapper">
			  <view class="wrap-shop">
			  	<text>已选商品</text>
				<text @click="clear">清空</text>
			  </view>
			  <view class="shop-item" v-for="item in shopList" :key="item._id" v-if="count[item._id]>0">
				<image :src="item.vegPic" mode=""></image>
			  	<text style="line-height: 40px; font-size: 13px; font-weight: 550; margin-left: 20px;">{{item.vegName}}</text>
				<view class="" style="display: flex; margin-left: 100px; line-height: 40px; width: 100px;">
					<view class="iconfont icon-jian" @click="subtract(item._id)"></view>
					<view class="value">{{count[item._id]}}</view>
					<view class="iconfont icon-tianjia" @click="add(item._id, item.vegPrice, $event)"></view>
				</view>
			  </view>
		  </view>
		</van-overlay>
	</view>	
	
	
</template>

<script>
	import {getVeg, getVegById, getUser, submitOrder} from '../../utils/api.js'
	export default {
		data() {
			return {
				openid: '',
				cateList: [
					{id: 0, name: '蔬菜'},
					{id: 1, name: '水果'},
					{id: 2, name: '肉类'},
					{id: 3, name: '速冻食品'},
					{id: 4, name: '海鲜'},
				],
				isActive: 0,
				vegList: [],
				mapData: new Map(),
				count: {},
				total: 0,
				show: false,
				shopList: [],	// 下面购物车数据
				totalPrice: 0
			}
		},
		onLoad() {
			uni.getStorage({
				key: 'openid',
				success: (res) => {
					this.openid = res.data
				},
				// fail: (err) => {
				// 	uni.showModal({
				// 	    title: '提示',
				// 	    content: '这是一个模态弹窗',
				// 	    success: function (res) {
				// 	        if (res.confirm) {
				// 	            uni.navigateTo({
				// 	            	url: '../login/login'
				// 	            })
				// 	        } else if (res.cancel) {
				// 	            uni.navigateTo({
				// 	            	url: '../index/index'
				// 	            })
				// 	        }
				// 	    }
				// 	});
				// }
			})			
		},
		methods:{
			choose(index, name) {
				this.isActive = index
				getVeg(name).then(res=>{
					this.vegList = res
				}).catch( err => {
					uni.showToast({
						title: err
					})
				})
			},
			add(index, price, event) {
				this.total++
				this.mapData.set(index, this.mapData.get(index)?this.mapData.get(index)+1:1)
				this.count = this.mapChangeObj(this.mapData)
				this.totalPrice += price
			},
			subtract(index) {
				this.total--
				this.mapData.set(index, this.mapData.get(index)?this.mapData.get(index)-1:0)
				this.count = this.mapChangeObj(this.mapData)
			},
			cartPopup() {
				if (this.total == 0) {
					return 
				}
				this.show = true
				this.shopList = []
				for (let i in this.count) {
					getVegById(i).then(res => {
						this.shopList.push(res)
					}).catch(err => {
						console.log(err)
					})
				}
			},
			onClickHide() {
				this.show = false
			},
			clear() {
				
			},
			// 将map转换为对象
			mapChangeObj(map) {
				let obj = {}
				for(let [k,v] of map) {
				   obj[k] = v
				}
				return obj
			},
			go() {
				let params = [], orderList = {}, sum = 0
				for (let i of this.shopList) {
					i = Object.assign({}, i, {num: this.count[i._id]})
					params.push(i)
				}
				for (let i of params) {
					sum += i.num*i.vegPrice
				}
				getUser(this.openid).then( res => {
					let d = new Date()
					orderList = Object.assign({}, res[0], {
						_id: Date.now().toString(16), 
						cate: params, 
						orderState: '待接单', 
						orderPrice: this.totalPrice,
						date: d.getFullYear()+"-"+((d.getMonth()+1)>=10?+(d.getMonth()+1):"0"+(d.getMonth()+1))+"-"+((d.getDate())>=10?d.getDate():'0'+d.getDate())
					})
					submitOrder(orderList).then(res => {
						uni.navigateTo({
							url: '../order/order'
						})
					}).catch( err => {
						consoel.log(err)
					})
				}).catch( err => {
					console.log(err)
				})
			}
		}
	}
</script>

<style scoped>
	@import url("../../assest/iconfont/iconfont.css");
	.buyVeg {
		display: flex;
	}
	.left {
		position: fixed;
		width: 80px;
		height: 100%;
		border-right: #ddd solid 1px;
		background-color: #ddd;
	}
	.left-item {
		display: flex;
		justify-content: center;
		height: 45px;
		font-size: 13px;
	}
	.active {
		background-color: #fff;
		font-weight: 600;
		border-left: 3px #4cd964 solid;
	}
	.right {
		display: flex;
		flex-direction: column;
		padding: 5px;
		margin-left: 80px;
		width: 250px;
	}
	.right-item {
		display: flex;
/* 		justify-content: space-between; */
	}
	.right image {
		width: 88px;
		height: 88px;
		padding: 5px;
		border-radius: 5px;
	}
	.veg {
		display: flex;
		flex-direction: column;
		border-bottom: 0.5px solid #DDDDDD;
		width: 135px;
	}
	.veg-title {
		font-size: 15px;
		font-weight: 500;
		margin-top: 10px;
	}
	.veg-desc {
		font-size: 13px;
		color: #AAAAAA;
		margin: 10px 0;
		overflow: hidden; 
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.shop {
		display: flex;
		justify-content: space-between;
	}
	/*加减器*/
	.stepper {
		flex: 1;
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		align-items: center;
		padding-right: 5px;
	}
	.bottom {
		display: flex;
		justify-content: space-around;
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 50px;
		padding: 5px;
		background-color: #00B43C;
	}
	/* 购物车 */
	.HZL_cat{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 750rpx;
		height: 50px;
		background-color: rgba(50, 50, 50, 1);
		display: flex;
		align-items: center;
		z-index: 99;
	}
	.HZL_cat_img_view{
		position: absolute;
		width: 100rpx;
/* 		height: 100rpx;
		top: -30rpx; */
		left: 15rpx;
		/* border-radius: 50%; */
		/* background-color: #4cd964; */
		display: flex;
		justify-content:center;
		align-items:Center;
		border: 15rpx solid rgba(50, 50, 50, 1);
	}
	
	.HZL_cat_img{
		width: 70rpx;
		height: 70rpx;
	}
	
	.HZL_cat_num{
		position: absolute;
		width: 50rpx;
		height: 50rpx;
		top: -30rpx;
		right: -20rpx;
		background-color: #FF0000;
		padding: 2.5rpx;
		border-radius: 50%;
		display: flex;
		justify-content:center;
		align-items:Center;
		color: white;
		font-size: 25rpx;
		border: 1rpx solid rgba(50, 50, 50, 0.3);
	}
	
	.HZL_cat_text{
		margin-left: 580rpx;
		width: 180rpx;
		height: 50px;
		background-color: #4cd964;
		font-size: 28rpx;
		color: white;
		display: flex;
		justify-content:center;
		align-items:Center;
	}
	
	.wrapper {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 50px;
		/* width: 750rpx; */
		background-color: white;
		min-height: 270rpx;
		padding: 5px;
		z-index: 9;
	}
	.wrap-shop {
		display: flex;
		justify-content: space-between;
		margin-bottom: 5px;
	}
	.total-price {
		position: absolute;
		color: #FFFFFF;
		left: 90px;
	}
	.block {
		width: 100%;
		height: 120px;
		background-color: #FFFFFF;
	}
	.shop-item {
		display: flex;
		margin-bottom: 5px;
	}
	.shop-item image{
		width: 40px;
		height: 40px;
	}
</style>
