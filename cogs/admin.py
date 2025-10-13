import discord
from discord import app_commands
from discord.ext import commands
from utils import db
from datetime import datetime

class Admin(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    @app_commands.command(name="painel", description="Configurar bot (ADM)")
    async def painel(self, interaction: discord.Interaction):
        config_atual = db.carregar_config()

        class PainelModal(discord.ui.Modal, title="Configuração do Bot"):
            admin_cargo = discord.ui.TextInput(label="Cargo ADM (ID)", default=str(config_atual["admin_cargo_id"]))
            categoria_carrinho = discord.ui.TextInput(label="Categoria Carrinhos (ID)", default=str(config_atual["categoria_carrinhos_id"]))
            canal_logs = discord.ui.TextInput(label="Canal de Logs (ID)", default=str(config_atual["canal_logs_id"]))

            async def on_submit(self, modal_interaction: discord.Interaction):
                cursor = db.conn.cursor()
                cursor.execute(
                    "UPDATE config SET admin_cargo_id=?, categoria_carrinhos_id=?, canal_logs_id=? WHERE id=1",
                    (int(self.admin_cargo.value), int(self.categoria_carrinho.value), int(self.canal_logs.value))
                )
                db.conn.commit()
                await modal_interaction.response.send_message("Configurações atualizadas com sucesso!", ephemeral=True)

        await interaction.response.send_modal(PainelModal())

async def setup(bot):
    await bot.add_cog(Admin(bot))
