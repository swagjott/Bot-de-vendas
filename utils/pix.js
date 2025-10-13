import fs from 'fs';
const dbFile = './database/db.json';

export function getPix() {
  const db = JSON.parse(fs.readFileSync(dbFile));
  return db.pix || {};
}

export function setPix(dadosPix) {
  const db = JSON.parse(fs.readFileSync(dbFile));
  db.pix = dadosPix;
  fs.writeFileSync(dbFile, JSON.stringify(db, null, 2));
}
