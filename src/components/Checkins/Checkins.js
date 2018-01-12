import CheckinsModel from './CheckinsModel'

exports.create = async (req) => {
  return CheckinsModel.create(req)
}

exports.delete = async (req) => {
  req.fields = { deleted: true }

  CheckinsModel.update(req)
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
