import discord
from discord import app_commands
from discord.ext import commands
from utils import db, views
import json
import ast

class Loja(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    @app_commands.command(name="loja", description="Ver produtos disponíveis")
    async def loja(self, interaction: discord.Interaction):
        cursor = db.conn.cursor()
        cursor.execute("SELECT id, nome, preco, estoque, descricao FROM produtos")
        produtos = cursor.fetchall()
        if not produtos:
            await interaction.response.send_message("Nenhum produto disponível.", ephemeral=True)
            return

        embeds = []
        for prod in produtos:
            embed = discord.Embed(title=prod[1], description=prod[4], color=0x1abc9c)
            embed.add_field(name="Preço", value=f"R$ {prod[2]:.2f}")
            embed.add_field(name="Estoque", value=prod[3])
            view = views.AddToCartView(prod[0])
            await interaction.response.send_message(embed=embed, view=view)

async def setup(bot):
    await bot.add_cog(Loja(bot))
