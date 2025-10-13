import discord
from discord.ui import View, Button

class AddToCartView(View):
    def __init__(self, produto_id):
        super().__init__(timeout=None)
        self.produto_id = produto_id
        self.add_item(Button(label="Adicionar ao carrinho", style=discord.ButtonStyle.green, custom_id=f"add_{produto_id}"))
        self.add_item(Button(label="Remover do carrinho", style=discord.ButtonStyle.red, custom_id=f"remove_{produto_id}"))
