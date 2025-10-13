import fs from 'fs';
const dbFile = './database/db.json';
if (!fs.existsSync(dbFile)) fs.writeFileSync(dbFile, JSON.stringify({ painel: {}, produtos: [], pix: {} }));

export default {
  name: 'interactionCreate',
  async execute(interaction, client) {
    if (interaction.isCommand()) {
      const command = client.commands.get(interaction.commandName);
      if (!command) return;
      try {
        await command.execute(interaction, client);
      } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'Ocorreu um erro!', ephemeral: true });
      }
    }
    
    if (interaction.isModalSubmit() && interaction.customId === 'criarProdutoModal') {
      const nome = interaction.fields.getTextInputValue('nomeProduto');
      const preco = parseFloat(interaction.fields.getTextInputValue('precoProduto'));
      const estoque = parseInt(interaction.fields.getTextInputValue('estoqueProduto'));

      const db = JSON.parse(fs.readFileSync(dbFile));
      db.produtos.push({ id: Date.now().toString(), nome, preco, estoque });
      fs.writeFileSync(dbFile, JSON.stringify(db, null, 2));

      await interaction.reply({ content: `Produto "${nome}" criado com sucesso!`, ephemeral: true });
    }
    
  }
};
