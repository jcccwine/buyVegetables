module.exports = options => {
  const adminUser = require('../models/Staff.js') 
  const jwt = require('jsonwebtoken')
  const assert = require('http-assert')
  return async(req, res, next) => {
    const token = String(req.headers.authorization || '').split(' ').pop()
    assert(token, 401, '请先登录')
    const {_id}= jwt.verify(token, req.app.get('secret'))
    assert(_id, 401, '请先登录')
    req.user = await adminUser.findById(_id)
    assert(req.user, 401, '请先登录')
    await next()
  }
}

