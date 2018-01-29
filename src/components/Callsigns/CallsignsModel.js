import Model from '../Model/Model'

exports.createTitle = async (callsignId, titleId) => {
  let sql = `
    INSERT INTO callsign_titles (callsign_id, title_id)
    VALUES ($1, $2)
    ON CONFLICT (callsign_id, title_id) DO UPDATE SET deleted = false
    RETURNING id
  `
  let bind = [callsignId, titleId]

  return Model.query(sql, bind, true, true)
}

exports.deleteTitle = async (callsignId, titleId) => {
  let sql = `
    UPDATE callsign_titles
    SET deleted = true
    WHERE callsign_id = $1
      AND title_id = $2
  `

  let bind = [callsignId, titleId]

  return Model.run(sql, bind)
}

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
      callsigns.*
    FROM callsigns
    WHERE callsigns.id = $1
  `
  let bind = [id]

  return Model.query(sql, bind, true)
}

exports.retrieveTitles = async (id) => {
  let sql = `
    SELECT
      callsign_titles.*
    FROM callsign_titles
    WHERE callsign_titles.callsign_id = $1
      AND NOT callsign_titles.deleted
  `
  let bind = [id]

  return Model.query(sql, bind)
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
