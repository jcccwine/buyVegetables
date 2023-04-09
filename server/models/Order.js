const mogoose = require('mongoose')

// 创建表的规则
const schema = new mogoose.Schema({
  _id: {
    type: String
  },
  openid: {
    type: String
  },
  userName: {
    type: String
  },
  tel: {
    type: String
  },
  address: {
    type: String
  },
  cate: [{
    _id: {type: String},
    vegName: {type: String},
    vegPic: {type: String},
    vegPrice: {type: String},
    vegUnit: {type: String},
    num: {type: Number}
  }],
  orderState: {
    type: String
  },
  orderPrice: {
    type: String
  },
  date: {
    type: String
  }
})
// 创建数据库表
module.exports = mogoose.model('Order',schema)