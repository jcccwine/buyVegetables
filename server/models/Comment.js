const mogoose = require('mongoose')

// 创建表的规则
const schema = new mogoose.Schema({
  openid: {
    type: String
  },
  date: {
    type: String
  },
  tempure: {
    type: String
  },
  radio: {
    type: String
  },
  fileUrl: {
    type: String
  },
  color: {
    type: String
  }
})
// 创建数据库表
module.exports = mogoose.model('Comment',schema)