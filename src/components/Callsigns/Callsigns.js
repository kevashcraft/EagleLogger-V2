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
  let callsign = await CallsignsModel.retrieve(req.callsignId)
  let titles = await CallsignsModel.retrieveTitles(req.callsignId)
  callsign.titleIds = titles.map(title => title.titleId)
  return callsign
}

exports.retrieveTitles = async (req) => {
  return CallsignsModel.retrieveTitles(req.callsignId)
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

  await exports.updateTitles(req)
  return CallsignsModel.update(req.id, fields)
}

exports.updateTitles = async (req) => {
  if (!(await auth(req))) return false
  let titles = await CallsignsModel.retrieveTitles(req.id)
  let titleIds = titles.map(title => title.titleId)

  req.titleIds.forEach(async titleId => {
    if (titleIds.indexOf(titleId) < 0) {
      await CallsignsModel.createTitle(req.id, titleId)
    }
  })

  titleIds.forEach(async titleId => {
    if (req.titleIds.indexOf(titleId) < 0) {
      await CallsignsModel.deleteTitle(req.id, titleId)
    }
  })

  return true
}

exports.upgrade = async (req) => {
  if (!(await auth(req))) return false

  let fields = {
    ncs: true
  }

  return CallsignsModel.update(req.id, fields)
}
