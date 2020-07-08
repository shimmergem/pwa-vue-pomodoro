class Database {
  constructor(dbconfig) {
    this.dbconfig = dbconfig
    this.database = this.openDB(dbconfig)
  }
  get dbName() {
    return this.db ? this.db.name : this.dbconfig.name
  }
  get dbVersion() {
    return this.db ? this.db.version : ''
  }
  openDB(dbconfig) {
    return new Promise((resolve, reject) => {
      try {
        let dbName = dbconfig.name
        const request = window.indexedDB.open(dbName)
        request.onerror = event => reject(event)
        request.onupgradeneeded = event => {
          let db = event.target.result
          let tables = dbconfig.tables
          tables.forEach(table => {
            if (!db.objectStoreNames.contains(table.name)) {
              db.createObjectStore(table.name, table.options);
            }
          })
          resolve(db)
        }
        request.onsuccess = event => resolve(event.target.result)
      } catch (e) {
        reject(e)
      }
    })
  }
  
  insert(table, record) {
    return new Promise(async (resolve, reject) => {
      try {
        let db = await this.database
        let request = db.transaction([table], 'readwrite').objectStore(table).add(record)
        request.onsuccess = event => resolve({status: '200', message: 'ok', data: this})
        request.onerror = event => reject(event)
      } catch(e) {
        reject(e)
      }
    })
  }
  readAll(table) {
    return new Promise(async (resolve, reject) => {
      try {
        let data = []
        let db = await this.database
        const request = db.transaction([table]).objectStore(table).openCursor()
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
  async update (table, ...rest) {
    try {
      let db = await this.database
      let objectStore = db.transaction([table], 'readwrite').objectStore(table)
      let request = objectStore.put(...rest)
    } catch (e) {
  
    }
  }
}

export default Database