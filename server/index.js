const express = require('express')

const app = express()

app.set('secret', 'hduhuy738hdudjkwq')

// 在当前app的实例上设置一个全局
app.set('secret','jksdajhdue')

app.use(require('cors')())
app.use(express.json())
// 托管静态文件
app.use('/admin',express.static(__dirname+'/admin'))
app.use('/uploads',express.static(__dirname+'/uploads'))
// app.use('/uploads-uniapp',express.static(__dirname+'/uploads-uniapp'))
// 调用模块方法，在模块里是个箭头函数，app是参数
require('./plugin/db')(app)
require('./routers/admin')(app)
require('./routers/uniapp')(app)

app.listen(3000,()=>{
  console.log('http://localhost:3000');
})