import Model from '../Model/Model'

exports.create = async (callsignId, passwordHash) => {
  let sql = `
    INSERT INTO users (callsign_id, password_hash, active)
    VALUES ($1, $2, true)
    RETURNING id
  `
  let bind = [callsignId, passwordHash]

  return Model.query(sql, bind, true, true)
}

exports.find = async (callsignId) => {
  let sql = `
    SELECT
      users.id,
      users.callsign_id,
      users.email,
      users.password_hash,
      COALESCE(users.name, callsigns.name) as name,
      callsigns.spotter_id,
      callsigns.ncs,
      callsigns.callsign
    FROM users
    JOIN callsigns ON callsigns.id = users.callsign_id
    WHERE users.callsign_id = $1
  `
  let bind = [callsignId]

  return Model.query(sql, bind, true)
}

exports.retrieve = async (id) => {
  let sql = `
    SELECT
      users.id,
      users.callsign_id,
      users.email,
      users.password_hash,
      COALESCE(users.name, callsigns.name) as name,
      callsigns.spotter_id,
      callsigns.ncs,
      callsigns.callsign
    FROM users
    JOIN callsigns ON callsigns.id = users.callsign_id
    WHERE users.id = $1
  `
  let bind = [id]

  return Model.query(sql, bind, true)
}

exports.update = async (id, fields) => {
  return Model.update('users', id, fields)
}
