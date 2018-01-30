import NetsModel from './NetsModel'
import AuthModel from '../Auth/AuthModel'
import UsersModel from '../Users/UsersModel'

import moment from 'moment'

let auth = async (req) => {
  let token = await AuthModel.retrieve(req.token.userId, req.token.code)
  if (!req.netId) {
    return !!token
  }
  let net = await NetsModel.retrieve(req.id)
  return (net.ncsId === token.userId)
}

exports.create = async (req) => {
  if (!(await auth(req))) return false
  let user = UsersModel.retrieve(req.token.userId)

  let started = moment()
  let timeArray = req.startTime.split(':')
  started.hour(timeArray[0])
  started.minute(timeArray[1])
  started.second(0)
  started.millisecond(0)
  return NetsModel.create(req.netTypeId, user.callsignId, started)
}

exports.delete = async (req) => {
  if (!(await auth(req))) return false

  let fields = { deleted: true }

  return NetsModel.update(req.id, fields)
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
      nets.push({header: '<span class="red--text">Active Nets</span>'})
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
  if (!(await auth(req))) return false
  let fields = {stopped: {safe: 'NULL'}}

  return NetsModel.update(req.id, fields)
}

exports.retrieve = async (req) => {
  return NetsModel.retrieve(req.id)
}

// exports.start = async (req) => {
//   req.fields = { started: req.started }

//   NetsModel.update(req)
// }

exports.stop = async (req) => {
  if (!(await auth(req))) return false

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
