import {request} from './request.js'

export function getOpenId(params) {
	return request({
		url: '/getOpenId',
		method: 'post',
		data: params
	})
}

// 根据openID查找用户
export function getUser(params) {
	return request({
		url: "/queryUser/"+params,
		method: 'get',
	})
}

// 根据类目选择菜品
export function getVeg(params) {
	return request({
		url: "/get_veg/"+params,
		method: 'get',
	})
}

// 根据id查找菜品
export function getVegById(params) {
	return request({
		url: "/getVegById/"+params,
		method: 'get',
	})
}

// 提交订单
export function submitOrder(params) {
	return request({
		url: "/submitOrder",
		method: 'post',
		data: params
	})
}

// 通过openID查找对应用户的订单
export function getOrder(params) {
	return request({
		url: "/getOrderByOpenId/"+params,
		method: 'get'
	})
}

// 通过订单id查找对应用户的订单
export function getOrderById(params) {
	return request({
		url: "/getOrderById/"+params,
		method: 'get'
	})
}

// 通过订单状态查找对应的订单
export function getOrderByState(params) {
	return request({
		url: "/getOrderByState/"+params,
		method: 'get'
	})
}

// 提交评价
export function submitComment(params) {
	return request({
		url: "/submitComment",
		method: 'post',
		data: params
	})
}

// 志愿者申请
export function applyVolun(openid, params) {
	return request({
		url: "/applyVolun/"+openid,
		method: 'post',
		data: params
	})
}

// 提交健康信息
export function subHealthy(params) {
	return request({
		url: "/subHealth",
		method: 'post',
		data: params
	})
}

// 提交意见反馈
export function subIssue(params) {
	return request({
		url: "/subIssue",
		method: 'post',
		data: params
	})
}

// 获取公告
export function getArticle() {
	return request({
		url: "/getArticle",
		method: 'get'
	})
}

// 保存用户信息
export function updateOrderState(params) {
	return request({
		url: "/updateOrderState",
		method: 'put',
		data: params
	})
}

// 通过id查找对应公告
export function getArticleById(params) {
	return request({
		url: "/getArticleById/"+params,
		method: 'get'
	})
}

// 修改订单状态
export function modifyOrderState(params) {
	return request({
		url: "/modifyOrderState/"+params,
		method: 'put',
	})
}

// 删除订单
export function deleteOrderById(params) {
	return request({
		url: "/deleteOrderById/"+params,
		method: 'delete',
	})
}
