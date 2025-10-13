import discord
from discord.ext import commands
from discord import app_commands
import json
import os

with open("config.json") as f:
    config = json.load(f)
  
TOKEN = os.getenv("DISCORD_TOKEN")
if not TOKEN:
    raise ValueError("Token do Discord não encontrado! Configure DISCORD_TOKEN na Square Cloud.")

intents = discord.Intents.all()
bot = commands.Bot(command_prefix=config["prefix"], intents=intents)
tree = bot.tree

cogs = ["cogs.admin", "cogs.loja", "cogs.pix", "cogs.embeds", "cogs.logs"]
for cog in cogs:
    bot.load_extension(cog)

@bot.event
async def on_ready():
    print(f"Bot logado como {bot.user}")
    await tree.sync()
    print("Slash commands sincronizados!")

bot.run(TOKEN)
