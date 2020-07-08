import Database from './Database'

const createDB = (databaseName, version) => {
  return new Promise((resolve, reject) => {
    try {
      const request = window.indexedDB.open(databaseName, version)
      request.onerror = event => reject(event)
      request.onupgradeneeded = event => resolve({
        status: '200',
        message: 'OK',
        data: event.target.result,
      })
    } catch (e) {
      reject(e)
    }
  })
}
const openDB = (databaseName, version) => {
  return new Promise((resolve, reject) => {
    try {
      const request = window.indexedDB.open(databaseName, version)
      request.onerror = event => reject(event)
      request.onsuccess = event => resolve({
        status: '200',
        message: 'OK',
        data: event.target.result,
      })
    } catch (e) {
      reject(e)
    }
  })
}

const initDB = async (dbconfig) => {
  let {data: db} = await openDB(dbconfig.name)
  let tables = dbconfig.tables.filter(table => !db.objectStoreNames.contains(table.name))
  if (tables.length > 0) {
    db = await createTables(db, dbconfig.tables)
  }
  return {
    status: '200',
    message: 'ok',
    data: db,
  }
}

const createTables = (database, tables = []) => {
  return new Promise((resolve, reject) => {
    try {
      let name = database.name
      let version = database.version
      database.close()
      const request = window.indexedDB.open(name, version + 1);
      request.onupgradeneeded = event => {
        const db = event.target.result;
        tables.forEach(table => {
          if (!db.objectStoreNames.contains(table.name)) {
            db.createObjectStore(table.name, table.options)
          }
        })
        resolve({
          status: '200',
          message: 'OK',
          data: db
        })
      }
      request.onerror = event => reject(event)
    } catch (e) {
      reject(e)
    }
  })
}

const insert = (database, table, record) => {
  return new Promise((resolve, reject) => {
    try {
      let request = database.transaction([table], 'readwrite').objectStore(table).add(record)
      request.onsuccess = event => resolve({status: '200', message: 'ok'})
      request.onerror = event => reject(event)
    } catch(e) {
      reject(e)
    }
  })
}

const readAll = (database, table) => {
  return new Promise((resolve, reject) => {
    try {
      let data = []
      const request = database.transaction([table]).objectStore(table).openCursor()
      request.onsuccess = event => {
        let cursor = event.target.result
        if (cursor) {
          data.push({value: cursor.value, primaryKey: cursor.primaryKey})
          cursor.continue()
        } else {
          resolve({stauts: '200', message: 'OK', data})
        }
      }
      request.onerror = event => reject(event)
    } catch (e) {
      reject(e)
    }
  })
}

const update = async (dbName, tableName, record) => {
  let {data: db} = await openDB(dbName)
  try {
    let objectStore = db.transaction([tableName], 'readwrite').objectStore(tableName)
  } catch (e) {

  } finally {
    db.close()
  }
}

const install = (Vue, options) => {
  Vue.prototype.$db = new Database(options)
}

const DB = {
  createDB,
  openDB,
  createTables,
  initDB,
  insert,
  readAll,
  install,
}

export default DB