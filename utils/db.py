import sqlite3

conn = sqlite3.connect("database.db")
cursor = conn.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS produtos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    preco REAL,
    estoque INTEGER,
    descricao TEXT
)
""")

cursor.execute("""
CREATE TABLE IF NOT EXISTS usuarios (
    id_discord TEXT PRIMARY KEY,
    carrinho TEXT,
    chave_pix TEXT
)
""")

cursor.execute("""
CREATE TABLE IF NOT EXISTS vendas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    id_usuario TEXT,
    produtos TEXT,
    total REAL,
    status TEXT,
    id_canal_carrinho TEXT,
    data TEXT
)
""")

cursor.execute("""
CREATE TABLE IF NOT EXISTS logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    acao TEXT,
    usuario TEXT,
    data TEXT
)
""")

cursor.execute("""
CREATE TABLE IF NOT EXISTS config (
    id INTEGER PRIMARY KEY,
    admin_cargo_id INTEGER,
    categoria_carrinhos_id INTEGER,
    canal_logs_id INTEGER
)
""")

conn.commit()

def carregar_config():
    cursor.execute("SELECT admin_cargo_id, categoria_carrinhos_id, canal_logs_id FROM config WHERE id=1")
    result = cursor.fetchone()
    if result:
        return {"admin_cargo_id": result[0], "categoria_carrinhos_id": result[1], "canal_logs_id": result[2]}
    else:
        cursor.execute("INSERT INTO config (id, admin_cargo_id, categoria_carrinhos_id, canal_logs_id) VALUES (1,0,0,0)")
        conn.commit()
        return {"admin_cargo_id": 0, "categoria_carrinhos_id": 0, "canal_logs_id": 0}
