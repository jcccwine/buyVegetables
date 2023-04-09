const baseUrl = 'http://localhost:3000/web/api'

const request = (params) => {
  return new Promise((reslove, reject) => {
    uni.request({
      url: baseUrl + params.url,  // baseURL+请求接口的具体地址
      data: params.data || '',  // 请求参数
      method: params.method || 'GET',   // 默认为get
      header: { // 设置请求的 header
        'Content-Type': 'application/json'
      }, 
      success: function(res){
        // console.log('success');
        reslove(res.data)
        if (res.data.code != 200) {
          uni.showToast({
            icon: 'none',
            title: res.data.message
          })
        }
      },
      fail: function(e) {
		uni.showToast({
          icon: 'none',
          title: '请求失败'
        })
        reject(e)
      },
      complete: function() {
        // complete
      }
    })
  })
}

module.exports = {
	request
}

