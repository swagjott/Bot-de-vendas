import { SlashCommandBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } from 'discord.js';
import fs from 'fs';
const dbFile = './database/db.json';

export default {
  default: {
    data: new SlashCommandBuilder()
      .setName('criarproduto')
      .setDescription('Cria um novo produto'),

    async execute(interaction) {
      const db = JSON.parse(fs.readFileSync(dbFile));
      const painel = db.painel;
      if (!painel.cargoPermitido || !interaction.member.roles.cache.has(painel.cargoPermitido)) 
        return interaction.reply({ content: 'Você não tem permissão!', ephemeral: true });

      const modal = new ModalBuilder()
        .setCustomId('criarProdutoModal')
        .setTitle('Criar Produto');

      const nomeInput = new TextInputBuilder()
        .setCustomId('nomeProduto')
        .setLabel('Nome do Produto')
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

      const precoInput = new TextInputBuilder()
        .setCustomId('precoProduto')
        .setLabel('Preço')
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

      const estoqueInput = new TextInputBuilder()
        .setCustomId('estoqueProduto')
        .setLabel('Estoque')
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

      modal.addComponents(
        new ActionRowBuilder().addComponents(nomeInput),
        new ActionRowBuilder().addComponents(precoInput),
        new ActionRowBuilder().addComponents(estoqueInput)
      );

      await interaction.showModal(modal);
    }
  }
};
