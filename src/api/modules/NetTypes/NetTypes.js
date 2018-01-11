import NetTypesModel from './NetTypesModel'

exports.create = async (req) => {
  return NetTypesModel.create(req)
}

exports.delete = async (req) => {
  req.fields = { deleted: true }

  NetTypesModel.update(req)
}

exports.list = async (req) => {
  let deleted = !!req.deleted
  return NetTypesModel.list(deleted)
}

exports.retrieve = async (req) => {
  return NetTypesModel.retrieve(req.netId)
}

exports.update = async (req) => {
  req.fields = {
    name: req.name,
    freq: req.freq,
    nts: req.nts,
    starttime: req.starttime
  }

  NetTypesModel.update(req)
}
