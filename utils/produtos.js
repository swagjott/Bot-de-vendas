import fs from 'fs';
const dbFile = './database/db.json';

export function listarProdutos() {
  const db = JSON.parse(fs.readFileSync(dbFile));
  return db.produtos || [];
}

export function criarProduto(nome, preco, estoque) {
  const db = JSON.parse(fs.readFileSync(dbFile));
  const id = Date.now().toString();
  db.produtos.push({ id, nome, preco, estoque });
  fs.writeFileSync(dbFile, JSON.stringify(db, null, 2));
  return id;
}

export function apagarProduto(id) {
  const db = JSON.parse(fs.readFileSync(dbFile));
  db.produtos = db.produtos.filter(p => p.id !== id);
  fs.writeFileSync(dbFile, JSON.stringify(db, null, 2));
}

export function atualizarProduto(id, dados) {
  const db = JSON.parse(fs.readFileSync(dbFile));
  const produto = db.produtos.find(p => p.id === id);
  if (!produto) return false;
  Object.assign(produto, dados);
  fs.writeFileSync(dbFile, JSON.stringify(db, null, 2));
  return true;
}
