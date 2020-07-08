interface Table {
  name: string,
  options: any,
}

interface DBConfig {
  name: string,
  tables: Table[],
}

declare class Database {
  db: any;
  dbName: any;
  dbTables: Table[];
  constructor(dbconfig: DBConfig);
}