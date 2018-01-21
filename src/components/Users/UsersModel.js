import Model from '../Model/Model'

exports.create = async (callsignId, authCode) => {
  let sql = `
    INSERT INTO users (callsignId, authCode)
    VALUES ($1, $2)
    RETURNING id
  `
  let bind = [callsignId, authCode]

  return Model.query(sql, bind, true, true)
}
