const mogoose = require('mongoose')

// 创建表的规则
const schema = new mogoose.Schema({
  openid: {
    type: String
  },
  issueType: {
    type: String
  },
  content: {
    type: String
  },
  date: {
    type: String
  }
})
// 创建数据库表
module.exports = mogoose.model('Issue',schema)