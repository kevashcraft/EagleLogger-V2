import Model from '../Model/Model'

// exports.create = async (req) => {
//   let sql = `
//     INSERT INTO callsigns (net_id, callsign_id)
//     VALUES ($1, $2)
//   `
//   let bind = [req.netId, req.callsignId]

//   return Model.query(sql, bind, true, true)
// }

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

exports.search = async (req) => {
  let sql = `
    SELECT
      callsigns.*,
      callsigns.callsign as text,
      callsigns.id as value
    FROM callsigns
    WHERE callsigns.callsign ilike ANY(ARRAY[${req.queryString}])
    ORDER BY similarity(callsigns.callsign, $1) DESC
    LIMIT 10
  `
  let bind = [req.query]

  return Model.query(sql, bind)
}

exports.update = async (req) => {
  Model.update('callsigns', req.fields, req.callsignId)
}
