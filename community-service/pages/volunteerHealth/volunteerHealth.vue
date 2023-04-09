<template>
	<view class="content">
		<view class="volun-item">
			<text>日期：</text>
			<text>{{modal.date}}</text>
		</view>
		<view class="volun-item">
			<text>当前区域：浙江省杭州市临安区</text>
		</view>
		<view class="volun-item">
			<text>今日体温：</text>
			<input type="text" value="" v-model="modal.tempure"/>
		</view>
		<view class="volun-item">
			<text>是否健康：</text>
			<van-radio-group
			  :value="modal.radio"
			  @change="onChange"
			  direction="horizontal"
			>
			  <van-radio name="是">是</van-radio>
			  <van-radio name="否">否</van-radio>
			</van-radio-group>
		</view>
		<view class="volun-item">
			<text>健康码：</text>
			<van-uploader :file-list="fileList" :deletable="isDelete" max-count="1" @after-read="afterRead" />
		</view>
		<view class="volun-item">
			<text>健康码颜色：</text>
			<text style="display: inline-block; width: 150px;" @click="showPopup">{{modal.color}}</text>
			<van-popup
			  :show="show"
			  position="bottom"
			  custom-style="height: 35%;"
			>
				<van-picker 
					show-toolbar 
					:columns="columns" 
					@cancel="onCancel" 
					@confirm="onConfirm"
				/>
			</van-popup>
		</view>
		<van-button class="btn" plain type="primary" @click="submit">提交信息</van-button>
	</view>
</template>

<script>
// import {areaList} from'@vant/area-data'
import {subHealthy} from '../../utils/api.js'
export default {
	data() {
		return {
			modal: {
				radio: '是',
				color: '',
				date: new Date().toISOString().slice(0, 10),
				openid: ''
			},
			fileList: [],
			isDelete: true,
			columns: ['绿色', '黄色', '橙色', '红色'],
			show: false,
			
		}
	},
	methods: {
		onChange(event) {
		    this.modal.radio = event.detail
		},
		afterRead(event) {
		    const { file } = event.detail
		    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
		    uni.uploadFile({
		      url: 'http://localhost:3000/web/api/upload',
		      filePath: file.url,
		      name: 'file',
		      formData: { 'user': 'test' },
		      success: (res) => {
		        // 上传完成需要更新 fileList
		        this.fileList.push({ ...file, url: JSON.parse(res.data).url })
				this.modal.fileUrl = this.fileList[0].url
		      },
		    });
		},
		showPopup() {
			this.show = true
		},
		onConfirm(event) {
			const { picker, value, index } = event.detail
			this.modal.color = value
			this.show = false
		},
		onCancel(event) {
			this.show = false
		},
		submit() {
			uni.getStorage({
				key: 'openid',
				success: (res) => {
					console.log(res)
					this.modal.openid = res.data
					subHealthy(this.modal).then( res => {
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
