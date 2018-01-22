import Model from '../Model/Model'

exports.create = async (userId, netId, message) => {
  let sql = `
    INSERT INTO chat (user_id, net_id, message)
    VALUES ($1, $2, $3)
    RETURNING id
  `
  let bind = [userId, netId, message]

  return Model.query(sql, bind, true, true)
}

exports.retrieve = async (netId) => {
  let sql = `
    SELECT * FROM chat_view
    WHERE net_id = $1
    ORDER BY id ASC
  `
  let bind = [netId]

  return Model.query(sql, bind)
}
