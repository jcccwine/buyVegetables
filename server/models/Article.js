const mogoose = require('mongoose')

// 创建表的规则
const schema = new mogoose.Schema({
  title: {
    type: String
  },
  body: {
    type: String
  },
  date: {
    type: String
  },
  adminName: {
    type: String
  }
})
// 创建数据库表
module.exports = mogoose.model('Article',schema)