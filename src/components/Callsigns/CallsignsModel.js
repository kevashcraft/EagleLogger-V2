import Model from '../Model/Model'

exports.find = async (callsign) => {
  let sql = `
    SELECT * FROM callsigns
    WHERE callsign = $1
      AND valid_end > current_date
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
    SELECT
      callsigns.*,
      users.ncs
    FROM callsigns
    LEFT JOIN users ON users.callsign_id = callsigns.id
    WHERE callsigns.id = $1
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
      AND callsigns.valid_end > current_date
    ORDER BY ((similarity(callsigns.callsign, $1) * 90) +
      (similarity(callsigns.name, $1) * 10)) DESC
    LIMIT 5
  `
  let bind = [query]

  return Model.query(sql, bind)
}

exports.update = async (id, fields) => {
  await Model.update('callsigns', id, fields)
  return true
}
