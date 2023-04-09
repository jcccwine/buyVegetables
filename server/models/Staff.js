const mogoose = require('mongoose')
const bcrypt = require('bcryptjs')

// 创建表的规则
const schema = new mogoose.Schema({
  adminName: {
    type: String
  },
  adminPassword: {
    type: String,
    select: false,
    set(val) {
      return bcrypt.hashSync(val, 10) // 10是散列指数，越高越安全但是越耗时
    }
  },
  staffName: {
    type: String
  },
  staffSex: {
    type: String
  },
  staffAge: {
    type: Number
  },
  staffTel: {
    type: String
  },
  staffDate: {
    type: String
  },
  staffAuthority: {
    type: String
  }
})
// 创建数据库表
module.exports = mogoose.model('Staff',schema)