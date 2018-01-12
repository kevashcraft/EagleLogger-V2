import NetsModel from './NetsModel'

exports.create = async (req) => {
  return NetsModel.create(req)
}

exports.delete = async (req) => {
  req.fields = { deleted: true }

  NetsModel.update(req)
}

exports.list = async (req) => {
  let deleted = !!req.deleted
  return NetsModel.list(deleted)
}

exports.retrieve = async (req) => {
  return NetsModel.retrieve(req.netId)
}

exports.start = async (req) => {
  req.fields = { started: req.started }

  NetsModel.update(req)
}

exports.stop = async (req) => {
  req.fields = { stopped: req.stopped }

  NetsModel.update(req)
}
