import CallsignsModel from './CallsignsModel'

exports.create = async (req) => {
  return CallsignsModel.create(req)
}

exports.delete = async (req) => {
  req.fields = { deleted: true }

  CallsignsModel.update(req)
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
