import NetsModel from './NetsModel'
import moment from 'moment'

exports.create = async (req) => {
  let started = moment()
  let timeArray = req.startTime.split(':')
  started.hour(timeArray[0])
  started.minute(timeArray[1])
  started.second(0)
  started.millisecond(0)
  return NetsModel.create(req.netTypeId, started)
}

exports.delete = async (req) => {
  let fields = { deleted: true }

  NetsModel.update(req.id, fields)
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

exports.reopen = async (req) => {
  let fields = {stopped: {safe: 'NULL'}}

  return NetsModel.update(req.id, fields)
}

exports.retrieve = async (req) => {
  return NetsModel.retrieve(req.id)
}

exports.start = async (req) => {
  req.fields = { started: req.started }

  NetsModel.update(req)
}

exports.stop = async (req) => {
  let stopped = moment()
  let timeArray = req.stopTime.split(':')
  let minute = timeArray[1].slice(0, 2)
  let ampm = timeArray[1].slice(-2)
  let hour = parseInt(timeArray[0])
  if (ampm === 'pm') hour += 12
  stopped.hour(hour)
  stopped.minute(minute)
  stopped.second(0)
  stopped.millisecond(0)

  let fields = {stopped}

  return NetsModel.update(req.id, fields)
}
