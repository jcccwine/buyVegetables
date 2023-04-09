// 资源中间件，将上面请求的资源封装起来
module.exports = options => {
  return async (req,res,next)=>{
    // inflection:改变单词的各种各种形式
    const modelName = require('inflection').classify(req.params.resource)
    req.Model = require(`../models/${modelName}`)
    next()
  }
}