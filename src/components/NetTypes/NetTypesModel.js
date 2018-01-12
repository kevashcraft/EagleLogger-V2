import Model from '../Model/Model'

exports.create = async (req) => {
  let sql = `
    INSERT INTO nettypes (name, nts, skywarn)
    VALUES ($1, $2)
  `
  let bind = [req.net, req.nts, req.skywarn]

  return Model.query(sql, bind, true, true)
}

exports.list = async (deleted) => {
  let sql = `
    SELECT * FROM nettypes
    WHERE deleted = $1
  `
  let bind = [deleted]

  return Model.query(sql, bind)
}

exports.retrieve = async (id) => {
  let sql = `
    SELECT * FROM nettypes
    WHERE id = $1
      AND NOT deleted
  `
  let bind = [id]

  return Model.query(sql, bind, true)
}

exports.update = async (req) => {
  Model.update('nettypes', req.fields, req.netTypeId)
}
