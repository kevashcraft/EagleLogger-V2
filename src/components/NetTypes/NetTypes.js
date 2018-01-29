import NetTypesModel from './NetTypesModel'
import AuthModel from '../Auth/AuthModel'
import UsersModel from '../Users/UsersModel'

let auth = async (req) => {
  let user = false
  let token = await AuthModel.retrieve(req.token.userId, req.token.code)
  if (token) user = await UsersModel.retrieve(token.userId)
  return user && user.ncs
}

exports.create = async (req) => {
  if (!(await auth(req))) return false

  return NetTypesModel.create(req.name, req.startTime, req.frequency)
}

exports.delete = async (req) => {
  if (!(await auth(req))) return false
  req.fields = { deleted: true }

  NetTypesModel.update(req)
}

exports.list = async (req) => {
  let deleted = !!req.deleted
  return NetTypesModel.list(deleted)
}

exports.retrieve = async (req) => {
  return NetTypesModel.retrieve(req.id)
}

exports.update = async (req) => {
  if (!(await auth(req))) return false

  let fields = {
    name: req.name,
    frequency: req.frequency,
    nts: req.nts,
    start_time: req.startTime
  }

  NetTypesModel.update(req.id, fields)
}
