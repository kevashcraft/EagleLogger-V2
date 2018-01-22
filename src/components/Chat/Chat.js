import ChatModel from './ChatModel'
import AuthModel from '../Auth/AuthModel'

let auth = async (req) => {
  let token = await AuthModel.retrieve(req.token.userId, req.token.code)
  return !!token
}

exports.create = async (req) => {
  if (!(await auth(req))) return false
  return ChatModel.create(req.userId, req.netId, req.message)
}

exports.retrieve = async (req) => {
  return ChatModel.retrieve(req.netId)
}
