import Model from '../Model/Model'

exports.create = async (req) => {
  let sql = `
    INSERT INTO nets (nettype_id, started)
    VALUES ($1, $2)
  `
  let bind = [req.netTypeId, req.started]

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
    SELECT * FROM nets
    WHERE id = $1
      AND NOT deleted
  `
  let bind = [id]

  return Model.query(sql, bind, true)
}

exports.update = async (req) => {
  Model.update('nets', req.fields, req.netId)
}
