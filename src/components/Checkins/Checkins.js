import CheckinsModel from './CheckinsModel'

exports.create = async (req) => {
  return CheckinsModel.create(req)
}

exports.delete = async (req) => {
  req.fields = { deleted: true }

  CheckinsModel.update(req)
}

exports.list = async (req) => {
  let deleted = !!req.deleted
  return CheckinsModel.list(deleted)
}

exports.retrieve = async (req) => {
  return CheckinsModel.retrieve(req.checkinId)
}
