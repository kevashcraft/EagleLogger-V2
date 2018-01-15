import db from '../../api/app/postgres'
import moment from 'moment'

let camelCase = (str) => {
  return str.replace(/_([a-z])/g, (g) => {
    return g[1].toUpperCase()
  })
}

let convertRows = (rows) => {
  rows.forEach((row, i, rows) => {
    Object.keys(row).forEach(key => {
      let cCKey = camelCase(key)

      if (cCKey !== key) {
        rows[i][cCKey] = row[key]
        delete rows[i][key]
      }
    })
  })

  return rows
}

exports.filter = (table, fields) => {
  let filter = exports.formatFields(fields, 'filter')

  let sql = `
    SELECT * FROM ${table}
    WHERE ${filter.set}
    ORDER BY id DESC
  `

  return exports.query(sql, filter.bind)
}

exports.query = async (sql, bind, astr = false, asv = false) => {
  try {
    let results = await db.query(sql, bind)

    let ret = convertRows(results.rows)

    if (astr || asv) {
      ret = ret[0]
    }

    if (asv) {
      if (typeof ret === 'object') {
        let key = Object.keys(ret)
        ret = ret[key]
      }
    }

    return ret
  } catch (e) {
    console.log('Could not run query', sql, bind, e)
    return false
  }
}

exports.run = async (sql, bind) => {
  try {
    db.query(sql, bind)
  } catch (e) {
    console.log('Could not run query', sql, bind, e)
  }
}

exports.update = async (table, id, fields) => {
  let update = exports.formatFields(fields, 'update')
  let sql = `
    UPDATE ${table} SET ${update.set}
    WHERE id = $${update.count + 1}
  `
  update.bind.push(id)

  await exports.run(sql, update.bind)
  return true
}

exports.formatFields = (fields, type = 'update') => {
  let count = 0
  let bind = []
  let joiner = type === 'update' ? ',' : ' AND '
  let modifier = 0
  let set = Object
    .keys(fields)
    .map((field, index) => {
      if (fields[field] &&
        typeof fields[field] === 'object' &&
        !moment.isMoment(fields[field])
        ) {
        let key = Object.keys(fields[field])[0]
        if (key === 'safe') {
          modifier--
          if (type === 'filter' && fields[field].safe === 'NULL') {
            return field + ' is ' + fields[field].safe
          } else {
            return field + ' = ' + fields[field].safe
          }
        }
        if (key === 'bind') {
          count++
          bind.push(fields[field].bind)
          return field + ' = $' + (index + 1 + modifier)
        }
      } else {
        count++
        bind.push(fields[field])
        return field + ' = $' + (index + 1 + modifier)
      }
    })
    .join(joiner)

  return {
    count,
    bind,
    set
  }
}

exports.cc = (str) => {
  let cc = myString.replace(/_([a-z])/g, (g) => { return g[1].toUpperCase() })
}
