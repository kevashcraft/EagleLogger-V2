import CallsignsModel from './CallsignsModel'
import AuthModel from '../Auth/AuthModel'
import UsersModel from '../Users/UsersModel'

let auth = async (req) => {
  let user = false
  let token = await AuthModel.retrieve(req.token.userId, req.token.code)
  if (token) user = await UsersModel.retrieve(token.userId)
  return user && user.ncs
}

exports.list = async (req) => {
  let deleted = !!req.deleted
  return CallsignsModel.list(deleted)
}

exports.retrieve = async (req) => {
  return CallsignsModel.retrieve(req.callsignId)
}

exports.search = async (req) => {
  let query = req.query.toUpperCase()
  let queryString = "'%" + query.replace(' ', "%', '%") + "%'"
  let results = await CallsignsModel.search(query, queryString)
  return {
    results,
    t: req.t
  }
}

exports.update = async (req) => {
  if (!(await auth(req))) return false
  let fields = {
    name: req.name
  }

  return CallsignsModel.update(req.id, fields)
}
