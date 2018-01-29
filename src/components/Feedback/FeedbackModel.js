import Model from '../Model/Model'

exports.create = async (userId, page, message) => {
  let sql = `
    INSERT INTO feedback (user_id, page, message)
    VALUES ($1, $2, $3)
    RETURNING id
  `
  let bind = [userId, page, message]

  return Model.query(sql, bind, true, true)
}
