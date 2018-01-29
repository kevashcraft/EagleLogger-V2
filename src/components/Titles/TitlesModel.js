import Model from '../Model/Model'

exports.list = async () => {
  let sql = `
    SELECT * FROM titles WHERE NOT deleted
  `
  let bind = []
  return Model.query(sql, bind)
}
