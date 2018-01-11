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
