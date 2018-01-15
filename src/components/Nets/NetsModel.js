import Model from '../Model/Model'

exports.create = async (netTypeId, started) => {
  let sql = `
    INSERT INTO nets (net_type_id, started)
    VALUES ($1, $2)
    RETURNING id
  `
  let bind = [netTypeId, started]

  return Model.query(sql, bind, true, true)
}

exports.filter = async (fields) => {
  return Model.filter('nets_view', fields)
}

exports.list = async (deleted) => {
  let sql = `
    SELECT * FROM nets
    WHERE deleted = $1
  `
  let bind = [deleted]

  return Model.query(sql, bind)
}

exports.retrieve = async (id) => {
  let sql = `
    SELECT * FROM nets_view
    WHERE id = $1
      AND NOT deleted
  `
  let bind = [id]

  return Model.query(sql, bind, true)
}

exports.update = async (id, fields) => {
  return Model.update('nets', id, fields)
}
