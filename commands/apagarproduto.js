import { SlashCommandBuilder, StringSelectMenuBuilder, ActionRowBuilder } from 'discord.js';
import fs from 'fs';
const dbFile = './database/db.json';

export default {
  default: {
    data: new SlashCommandBuilder()
      .setName('apagarproduto')
      .setDescription('Apaga um produto existente'),

    async execute(interaction) {
      const db = JSON.parse(fs.readFileSync(dbFile));
      const painel = db.painel;

      if (interaction.user.id !== interaction.guild.ownerId &&
          (!painel.cargoPermitido || !interaction.member.roles.cache.has(painel.cargoPermitido))) {
        return interaction.reply({ content: 'Você não tem permissão!', ephemeral: true });
      }

      if (db.produtos.length === 0)
        return interaction.reply({ content: 'Não há produtos para apagar!', ephemeral: true });

      const menu = new StringSelectMenuBuilder()
        .setCustomId('apagarProdutoMenu')
        .setPlaceholder('Selecione o produto para apagar')
        .addOptions(db.produtos.map(p => ({ label: p.nome, value: p.id })));

      await interaction.reply({ components: [new ActionRowBuilder().addComponents(menu)], ephemeral: true });
    }
  }
};
