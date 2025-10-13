import discord
from discord.ext import commands
from discord import app_commands
from utils import db

class Pix(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    @app_commands.command(name="cadastrarpix", description="Cadastrar sua chave Pix")
    async def cadastrarpix(self, interaction: discord.Interaction):
        class PixModal(discord.ui.Modal, title="Cadastrar Pix"):
            chave = discord.ui.TextInput(label="Digite sua chave Pix")

            async def on_submit(self, modal_interaction: discord.Interaction):
                cursor = db.conn.cursor()
                cursor.execute("INSERT OR REPLACE INTO usuarios (id_discord, chave_pix) VALUES (?, ?)",
                               (str(modal_interaction.user.id), self.chave.value))
                db.conn.commit()
                await modal_interaction.response.send_message("Chave Pix cadastrada com sucesso!", ephemeral=True)

        await interaction.response.send_modal(PixModal())

async def setup(bot):
    await bot.add_cog(Pix(bot))
