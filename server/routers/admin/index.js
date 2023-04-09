module.exports = app => {
  const express = require('express')
  const jwt = require('jsonwebtoken')
  const assert = require('http-assert')
  const multer = require('multer')
  const bcrypt = require('bcryptjs')
  const adminUser = require('../../models/Staff.js') 
  const Order = require('../../models/Order.js')
  const User = require('../../models/User.js')
  // 资源中间件，将上面请求的资源封装起来
  const resourceMiddleware = require('../../middleware/resource')
  // 登录校验中间件
  const authMiddleware = require('../../middleware/auth')
  // 子路由
  const router = express.Router({
    mergeParams: true
  })
  const indexRouter = express.Router({
    mergeParams: true
  })
  // 创建分类接口
  router.post('/', authMiddleware(), async(req,res)=>{
    const model = await (req.Model.create(req.body))
    res.send(model)
  })
  // 编辑以后再保存的分类
  router.put('/:id', authMiddleware(), async(req,res)=>{
    // 通过id找到对应的数据并进行更新
    const model = await (req.Model.findByIdAndUpdate(req.params.id,req.body))
    res.send(model)
  })
  // 分类列表接口
  router.get('/', authMiddleware(), async(req,res)=>{
    let queryOptions = {}
    const items = await req.Model.find().setOptions(queryOptions).limit(150)
    res.send(items)
  })
  // 编辑分类名称
  router.get('/:id', authMiddleware(), async(req,res)=>{
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })
  // 删除分类
  router.delete('/:id', authMiddleware(), async(req,res)=>{
    await req.Model.findByIdAndDelete(req.params.id,req.body)
    res.send({
      success: true
    })
  })

  // 订单状态审核
  indexRouter.put('/receOrder/:id', async(req, res) => {
    const model = await Order.findByIdAndUpdate(req.params.id, {$set: {orderState: '待送达'}}, {new: true})
    res.send(model)
  })

  indexRouter.put('/finishOrder/:id', async(req, res) => {
    const model = await Order.findByIdAndUpdate(req.params.id, {$set: {orderState: '待评价'}}, {new: true})
    res.send(model)
  })

  // 志愿者审核
  indexRouter.put('/examineVolunteer/:id', async(req, res) => {
    const model = await User.findByIdAndUpdate(req.params.id, {$set: {type: '志愿者'}}, {new: true})
    res.send(model)
  })

  // 修改权限
  indexRouter.put('/staff/:id/:auth', async(req, res) => {
    const model = await adminUser.findByIdAndUpdate(req.params.id, {$set: {staffAuthority: req.params.auth}}, {new: true})
    res.send(model)
  })

  // 将路由挂载到实例下，第一个参数是整个路由文件请求的前半部分地址,箭头函数，要执行才有用
  app.use('/admin/api/rest/:resource', authMiddleware(), resourceMiddleware(), router)
  app.use('/admin/api/examine', authMiddleware(), indexRouter)

  const upload = multer({dest: __dirname + '/../../uploads'})
  app.post('/admin/api/upload', upload.single('file'),async (req,res)=>{
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })

  // 登录处理
  app.post('/admin/api/login', async(req, res) => {
    const {adminName, adminPassword} = req.body
    // 根据用户名找用户
    const user = await adminUser.findOne({adminName}).select('+adminPassword')
    // 错误处理
    assert(user, 422, '用户不存在')
    // 校验密码，比较密码，返回的是BOOL值
    const isValid = bcrypt.compareSync(adminPassword, user.adminPassword)
    assert(isValid, 422, '密码错误')
    // 返回token
    const token = jwt.sign({_id: user._id}, app.get('secret'))
    let _id = user._id
    let staffAuthority = user.staffAuthority
    res.send({token, adminName, _id, staffAuthority})
  })

  // 错误处理中间件
  app.use(async (err,req,res,next)=>{
    res.status(err.statusCode || 500).send({
      message: err.message
    })
  })
}