import Model from '../Model/Model'

exports.create = async (req) => {
  let sql = `
    INSERT INTO checkins (net_id, callsign_id)
    VALUES ($1, $2)
  `
  let bind = [req.netId, req.callsignId]

  return Model.query(sql, bind, true, true)
}

exports.list = async (deleted) => {
  let sql = `
    SELECT * FROM checkins
    WHERE deleted = $1
  `
  let bind = [deleted]

  return Model.query(sql, bind)
}

exports.retrieve = async (id) => {
  let sql = `
    SELECT * FROM checkins
    WHERE id = $1
      AND NOT deleted
  `
  let bind = [id]

  return Model.query(sql, bind, true)
}

exports.update = async (req) => {
  Model.update('checkins', req.fields, req.checkinId)
}
