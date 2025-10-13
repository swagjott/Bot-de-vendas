import fs from 'fs';
const dbFile = './database/db.json';

export function getPainel() {
  const db = JSON.parse(fs.readFileSync(dbFile));
  return db.painel || {};
}

export function setPainel(painelAtualizado) {
  const db = JSON.parse(fs.readFileSync(dbFile));
  db.painel = painelAtualizado;
  fs.writeFileSync(dbFile, JSON.stringify(db, null, 2));
}
