import CheckinsModel from './CheckinsModel'

exports.create = async (req) => {
  return CheckinsModel.create(req.netId, req.callsignId)
}

exports.delete = async (req) => {
  let fields = { deleted: true }

  CheckinsModel.update(req.id, fields)
}

exports.list = async (req) => {
  let fields = {
    deleted: !!req.deleted,
    net_id: req.netId
  }

  return CheckinsModel.filter(fields)
}

exports.retrieve = async (req) => {
  return CheckinsModel.retrieve(req.checkinId)
}
