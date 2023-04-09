<template>
	<view class="comment">
		<view class="cate">
			<view class="cate-item" v-for="item in cateList" :key="item._id">
				<view class="title">
					<image :src="item.vegPic" mode=""></image>
					<text style="line-height: 30px;" v-model="model.vegName">{{item.vegName}}</text>
				</view>
				<van-rate
				  :value="model.score"
				  :size="25"
				  color="#FFD21E"
				  void-color="#eee"
				  void-icon="star"
				  @change="onChange(item._id, $event)"/>
				<textarea style="width: 250px; height: 130px; padding: 7px;" v-model="model.comment" placeholder="请填写您的评价" />
			</view>
		</view>
		<van-button class="btn" plain type="primary" @click="submitComment">提交评价</van-button>
	</view>
</template>

<script>
import {getOrderById, modifyOrderState} from '../../utils/api.js'
export default {
	data() {
		return {
			cateList: [],
			model: {
				vegName: '',
				score: 0,
			},
			id: null
		}
	},
	onLoad(options) {
		getOrderById(options.orderId).then( res => {
			this.cateList = res.cate
			this.id = options.orderId
		}).catch(err => {
			console.log(err)
		})
	},
	methods: {
		onChange(index, event) {
			console.log(event)
			this.score = event.detail
		},
		submitComment() {
			console.log(this.model)
			modifyOrderState(this.id).then(res => {
				console.log(res)
			}).catch(err => {
				console.log(err)
			})
		}
	}
}
</script>

<style scoped>
	.comment {
		padding: 20px;
	}
	.title {
		display: flex;
	}
	.title image {
		width: 30px;
		height: 30px;
		margin-right: 10px;
	}
	.btn {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 20px;
	}
</style>
