import { SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder, ChannelType, PermissionFlagsBits } from 'discord.js';
import fs from 'fs';

const dbFile = './database/db.json';
if (!fs.existsSync(dbFile)) fs.writeFileSync(dbFile, JSON.stringify({ painel: {}, produtos: [], pix: {} }));

export default {
  default: {
    data: new SlashCommandBuilder()
      .setName('painel')
      .setDescription('Configura o painel do bot'),

    async execute(interaction) {
      if (interaction.user.id !== interaction.guild.ownerId) 
        return interaction.reply({ content: 'Somente o dono do servidor pode usar!', ephemeral: true });

      const painelData = JSON.parse(fs.readFileSync(dbFile)).painel;

      interaction.reply({ content: 'Abra o modal para configurar cargo, canal e categoria.', ephemeral: true });
    }
  }
};
