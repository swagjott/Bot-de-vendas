import { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, StringSelectMenuBuilder } from 'discord.js';
import fs from 'fs';
const dbFile = './database/db.json';

export default {
  default: {
    data: new SlashCommandBuilder()
      .setName('criarembed')
      .setDescription('Cria uma embed de produtos'),

    async execute(interaction) {
      const db = JSON.parse(fs.readFileSync(dbFile));
      const painel = db.painel;
      if (interaction.user.id !== interaction.guild.ownerId &&
          (!painel.cargoPermitido || !interaction.member.roles.cache.has(painel.cargoPermitido)))
        return interaction.reply({ content: 'Você não tem permissão!', ephemeral: true });

      if (db.produtos.length === 0) 
        return interaction.reply({ content: 'Não há produtos para exibir!', ephemeral: true });
      
      const embed = new EmbedBuilder()
        .setTitle('Produtos Disponíveis')
        .setDescription('Selecione um produto para comprar');
      
      const button = new ButtonBuilder()
        .setCustomId('comprarProduto')
        .setLabel('Comprar')
        .setStyle(ButtonStyle.Success)
      
      const selectMenu = new StringSelectMenuBuilder()
        .setCustomId('selecionarProduto')
        .setPlaceholder('Selecione um produto')
        .addOptions(db.produtos.map(p => ({ label: p.nome, value: p.id })));

      await interaction.reply({
        embeds: [embed],
        components: [new ActionRowBuilder().addComponents(button), new ActionRowBuilder().addComponents(selectMenu)],
        ephemeral: false
      });
    }
  }
};
