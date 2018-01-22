import Model from '../Model/Model'

exports.create = async (userId, code) => {
  let sql = `
    INSERT INTO auth (user_id, code)
    VALUES ($1, $2)
    RETURNING id
  `
  let bind = [userId, code]

  return Model.query(sql, bind, true, true)
}

exports.retrieve = async (userId, code) => {
  let sql = `
    SELECT * FROM auth
    WHERE user_id = $1 and code = $2
  `
  let bind = [userId, code]

  return Model.query(sql, bind, true)
}
