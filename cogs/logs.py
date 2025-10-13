import discord
from discord.ext import commands
from utils import db
from datetime import datetime

class Logs(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
        self.bot = bot

    async def enviar_log(self, acao: str, usuario_id: int):
        config = db.carregar_config()
        canal_id = config["canal_logs_id"]
        canal = self.bot.get_channel(canal_id)
        if canal:
            embed = discord.Embed(title="📝 Log", color=0xff0000)
            embed.add_field(name="Ação", value=acao)
            embed.add_field(name="Usuário", value=f"<@{usuario_id}>")
            embed.set_footer(text=datetime.now().strftime("%d/%m/%Y %H:%M:%S"))
            await canal.send(embed=embed)

        cursor = db.conn.cursor()
        cursor.execute("INSERT INTO logs (acao, usuario, data) VALUES (?, ?, ?)",
                       (acao, str(usuario_id), datetime.now().strftime("%Y-%m-%d %H:%M:%S")))
        db.conn.commit()

async def setup(bot):
    await bot.add_cog(Logs(bot))
