import { SlashCommandBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } from 'discord.js';
import fs from 'fs';
const dbFile = './database/db.json';

export default {
  default: {
    data: new SlashCommandBuilder()
      .setName('cadastrarpix')
      .setDescription('Cadastra a chave Pix do dono'),

    async execute(interaction) {
      if (interaction.user.id !== interaction.guild.ownerId)
        return interaction.reply({ content: 'Somente o dono pode usar!', ephemeral: true });

      const modal = new ModalBuilder().setCustomId('cadastrarPixModal').setTitle('Cadastrar Pix');

      const nomeInput = new TextInputBuilder().setCustomId('nomePix').setLabel('Nome').setStyle(TextInputStyle.Short);
      const tipoInput = new TextInputBuilder().setCustomId('tipoPix').setLabel('Tipo de chave').setStyle(TextInputStyle.Short);
      const chaveInput = new TextInputBuilder().setCustomId('chavePix').setLabel('Chave Pix').setStyle(TextInputStyle.Short);
      const bancoInput = new TextInputBuilder().setCustomId('bancoPix').setLabel('Banco').setStyle(TextInputStyle.Short);

      modal.addComponents(
        new ActionRowBuilder().addComponents(nomeInput),
        new ActionRowBuilder().addComponents(tipoInput),
        new ActionRowBuilder().addComponents(chaveInput),
        new ActionRowBuilder().addComponents(bancoInput)
      );

      await interaction.showModal(modal);
    }
  }
};
