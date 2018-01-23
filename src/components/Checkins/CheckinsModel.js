import Model from '../Model/Model'

exports.create = async (netId, callsignId) => {
  let sql = `
    INSERT INTO checkins (net_id, callsign_id)
    VALUES ($1, $2)
    ON CONFLICT (net_id, callsign_id) DO UPDATE SET deleted = false
    RETURNING id
  `
  let bind = [netId, callsignId]

  return Model.query(sql, bind, true, true)
}

exports.filter = async (fields) => {
  return Model.filter('checkins_view', fields)
}

exports.list = async (deleted) => {
  let sql = `
    SELECT * FROM checkins_view
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

exports.update = async (id, fields) => {
  Model.update('checkins', id, fields)
}
