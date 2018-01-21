import Model from '../Model/Model'

// exports.create = async (req) => {
//   let sql = `
//     INSERT INTO callsigns (net_id, callsign_id)
//     VALUES ($1, $2)
//   `
//   let bind = [req.netId, req.callsignId]

//   return Model.query(sql, bind, true, true)
// }

exports.find = async (callsign) => {
  let sql = `
    SELECT * FROM callsigns
    WHERE callsign = $1
    WHERE valid_end > current_date
    LIMIT 1
  `
  let bind = [callsign]

  return Model.query(sql, bind, true)
}

exports.list = async (deleted) => {
  let sql = `
    SELECT * FROM callsigns
    WHERE deleted = $1
  `
  let bind = [deleted]

  return Model.query(sql, bind)
}

exports.retrieve = async (id) => {
  let sql = `
    SELECT * FROM callsigns
    WHERE id = $1
      AND NOT deleted
  `
  let bind = [id]

  return Model.query(sql, bind, true)
}

exports.search = async (query, queryString) => {
  let sql = `
    SELECT
      callsigns.*,
      callsigns.callsign || ' - ' || callsigns.name as text,
      callsigns.id as value
    FROM callsigns
    WHERE callsigns.callsign like ANY(ARRAY[${queryString}])
    ORDER BY similarity(callsigns.callsign || ' ' || callsigns.name, $1) DESC
    LIMIT 5
  `
  let bind = [query]

  return Model.query(sql, bind)
}

exports.update = async (req) => {
  Model.update('callsigns', req.fields, req.callsignId)
}
