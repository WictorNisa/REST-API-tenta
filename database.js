import Database from 'better-sqlite3';
const db = new Database('store.db', { verbose: console.log });

export default db;