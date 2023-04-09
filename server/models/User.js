const mogoose = require('mongoose')

// 创建表的规则
const schema = new mogoose.Schema({
  openid: {
    type: String
  },
  userName: {
    type: String
  },
  sex: {
    type: String
  },
  tel: {
    type: String
  },
  location: {

  },
  address: {
    type: String
  },
  note: {
    type: String
  },
  type: {
    type: String
  },
  date: {
    type: String
  }
})
// 创建数据库表
module.exports = mogoose.model('User',schema)