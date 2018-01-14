import NetsModel from './NetsModel'

exports.create = async (req) => {
  return NetsModel.create(req)
}

exports.delete = async (req) => {
  req.fields = { deleted: true }

  NetsModel.update(req)
}

exports.list = async (req) => {
  let fields = {deleted: !!req.deleted}
  if (!req.all) fields.stopped = { safe: 'NULL' }
  let nets = await NetsModel.filter(fields)

  if (req.all) {
    let activeNets = nets.filter(net => { return !net.stopped })
    let closedNets = nets.filter(net => { return net.stopped })

    nets = []

    if (activeNets.length) {
      nets.push({header: 'Active Nets'})
      nets = nets.concat(activeNets)
    }

    if (closedNets.length) {
      nets.push({header: 'Closed Nets'})
      nets = nets.concat(closedNets)
    }
  }

  return nets
}

exports.retrieve = async (req) => {
  return NetsModel.retrieve(req.id)
}

exports.start = async (req) => {
  req.fields = { started: req.started }

  NetsModel.update(req)
}

exports.stop = async (req) => {
  req.fields = { stopped: req.stopped }

  NetsModel.update(req)
}
