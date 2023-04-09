const mongoose = require('mongoose')

// 创建表的规则
const schema = new mongoose.Schema({
  vegName: {
    type: String
  },
  vegDesc: {
    type: String
  },
  vegParent: {
    id: {type: Number},
    name: {type: String}
  },
  vegPic: {
    type: String
  },
  vegPrice: {
    type: Number
  },
  vegStock: {
    type: Number
  },
  vegUnit: {
    type: String
  },
  vegStatus: {
    status: {type: String}
  },
  createTime: {

  },
  updateTime: {
    
  }
})

// schema.virtual('children',{
//   localField: '_id',
//   foreignField: 'parent',
//   justOne: false,
//   ref: 'Category'
// })
schema.virtual('newsList',{
  localField: '_id',
  foreignField: 'categories',
  justOne: false,
  ref: 'Article'
})
// 创建数据库表
module.exports = mongoose.model('Category',schema)