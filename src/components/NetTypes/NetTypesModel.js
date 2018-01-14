import Model from '../Model/Model'

exports.create = async (name) => {
  let sql = `
    INSERT INTO net_types (name)
    VALUES ($1)
    RETURNING id
  `
  let bind = [name]

  return Model.query(sql, bind, true, true)
}

exports.list = async (deleted) => {
  let sql = `
    SELECT * FROM net_types_view
    WHERE deleted = $1
  `
  let bind = [deleted]

  return Model.query(sql, bind)
}

exports.retrieve = async (id) => {
  let sql = `
    SELECT * FROM net_types
    WHERE id = $1
      AND NOT deleted
  `
  let bind = [id]

  return Model.query(sql, bind, true)
}

exports.update = async (req) => {
  Model.update('net_types', req.fields, req.netTypeId)
}
