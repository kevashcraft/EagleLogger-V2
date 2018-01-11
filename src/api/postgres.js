import { native } from 'pg'
import config from './config'

const pool = new native.Pool({
  user: config.postgres.username,
  password: config.postgres.password,
  database: config.postgres.database
})

export default pool
