module.exports = app => {
  const router = require('express').Router()
  const multer = require('multer')
  const mongoose = require('mongoose')
  const https = require("https")
  const Category = mongoose.model('Category')
  const Health = mongoose.model('Health')
  const User = mongoose.model('User')
  const Order = mongoose.model('Order')
  const Comment = mongoose.model('Comment')
  const Issue = mongoose.model('Issue')
  const Article = mongoose.model('Article')

  // 获取openID
  router.post('/getOpenId', async(req, res)=> {
    let code = req.body.code //获取小程序传来的code
    let appid = "wx9f742d80097ad5bc" //自己小程序后台管理的appid，可登录小程序后台查看
    let secret = "4380899cdef4ce4d9f038ccf1d8ec604" //小程序后台管理的secret，可登录小程序后台查看
    let grant_type = "authorization_code" // 授权（必填）默认值
    let url = "https://api.weixin.qq.com/sns/jscode2session?grant_type=" + grant_type + "&appid=" + appid + "&secret=" + secret + "&js_code=" + code
    let openid, sessionKey
    https.get(url, (res1) => {
      res1.on("data", (d) => {
        console.log("返回的信息: ", JSON.parse(d))
        openid = JSON.parse(d).openid //得到openid
        sessionKey = JSON.parse(d).session_key //得到session_key
        let data = {
          openid: openid,
          sessionKey: sessionKey
        }
        res.send(data)
      })
      .on("error", (e) => {
        console.error(e)
      })
    })
  })

  // 根据openID查找用户
  router.get('/queryUser/:openid', async(req, res) => {
    const model = await User.find({"openid": req.params.openid})
    res.send(model)
  })

  // 获取菜品分类
  router.get('/get_veg/:vegParent', async(req, res) => {
    const model = await Category.find({"vegParent.name": req.params.vegParent})
    res.send(model)
  })

  // 根据id查找菜品
  router.get('/getVegById/:id', async(req, res) => {
    const model = await Category.findById(req.params.id)
    res.send(model)
  })

  // 提交订单信息
  router.post('/submitOrder', async(req, res) => {
    const model = await Order.create(req.body)
    res.send(model)
  })

  // 通过openID查找对应用户的订单
  router.get('/getOrderByOpenId/:openid', async(req, res) => {
    const model = await Order.find({"openid": req.params.openid})
    res.send(model)
  })

  // 通状态查找对应用户的订单
  router.get('/getOrderByState/:orderState', async(req, res) => {
    let model
    if (req.params.orderState == '全部分类') {
      model = await Order.find()
    }
    else {
      model = await Order.find({"orderState": req.params.orderState})
    }
    res.send(model)
  })

  // 通过id查找订单
  router.get('/getOrderById/:id', async(req, res) => {
    const model = await Order.findById(req.params.id)
    res.send(model)
  })

  // 提交评价信息
  router.post('/submitComment', async(req, res) => {
    const model = await Comment.create(req.body)
    res.send(model)
  })

  // 提交志愿者审核
  router.post('/applyVolun/:openid', async (req, res)=> {
    const model = await User.findOneAndUpdate({"openid": req.params.openid}, req.body)
    console.log(req.body)
    res.send(model)
  })

  // 提交志愿者健康登记情况
  router.post('/subHealth', async (req, res)=> {
    const model = await Health.create(req.body)
    res.send(model)
  })

  // 提交意见
  router.post('/subIssue', async (req, res)=> {
    console.log(req.body)
    const model = await Issue.create(req.body)
    res.send(model)
  })
  
  // 获取文章
  router.get('/getArticle', async(req, res) => {
    const model = await Article.find()
    res.send(model)
  })

  // 保存用户信息
  router.put('/savePersonInfo', async(req, res) => {
    const model = await User.findOneAndUpdate({"openid": req.body.openid}, req.body)
    res.send(model)
  })

  // 通过id查找公告
  router.get('/getArticleById/:id', async(req, res) => {
    const model = await Article.findById(req.params.id)
    res.send(model)
  })

  // 修改订单状态
  router.put('/modifyOrderState/:id', async(req, res) => {
    const model = await Order.findByIdAndUpdate(req.params.id, {$set: {orderState: '已评价'}}, {new: true})
    res.send(model)
  })

  // 删除订单
  router.delete('/deleteOrderById/:id', async(req, res) => {
    await Order.findByIdAndDelete(req.params.id,req.body)
    res.send({
      success: true
    })
  })
 

  // 上传图片到服务器
  const upload = multer({dest: __dirname + '/../../uploads'})
  router.post('/upload', upload.single('file'),async (req,res)=>{
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })

  app.use('/web/api', router)
}
