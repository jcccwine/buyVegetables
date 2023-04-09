// 创建数据库，数据库连接，
module.exports = app=> {
  const mongoose = require('mongoose')
  mongoose.connect('mongodb://127.0.0.1:27017/community-service',{
    useNewUrlParser: true, useUnifiedTopology: true ,
  })
  mongoose.set('useFindAndModify', false)
  require('require-all')(__dirname+'/../models')
}
