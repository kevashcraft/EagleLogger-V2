import { native } from 'pg'
import config from './config'

const pool = new native.Pool({
  host: config.postgres.hostname,
  user: config.postgres.username,
  password: config.postgres.password,
  database: config.postgres.database
})

export default pool
