import discord
from discord.ext import commands
from discord import app_commands

class Embeds(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    @app_commands.command(name="embed", description="Enviar embed personalizado")
    async def embed(self, interaction: discord.Interaction):
        class EmbedModal(discord.ui.Modal, title="Criar Embed"):
            titulo = discord.ui.TextInput(label="Título do Embed")
            descricao = discord.ui.TextInput(label="Descrição")
            cor = discord.ui.TextInput(label="Cor em hexadecimal (ex: 1abc9c)")
            imagem = discord.ui.TextInput(label="URL da imagem (opcional)", required=False)

            async def on_submit(self, modal_interaction: discord.Interaction):
                color = int(self.cor.value, 16)
                embed = discord.Embed(title=self.titulo.value, description=self.descricao.value, color=color)
                if self.imagem.value:
                    embed.set_image(url=self.imagem.value)
                await modal_interaction.response.send_message(embed=embed)

        await interaction.response.send_modal(EmbedModal())

async def setup(bot):
    await bot.add_cog(Embeds(bot))
