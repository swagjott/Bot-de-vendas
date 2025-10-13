import { SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder, ChannelType, EmbedBuilder } from 'discord.js';
import fs from 'fs';
const dbFile = './database/db.json';
if (!fs.existsSync(dbFile)) fs.writeFileSync(dbFile, JSON.stringify({ painel: {}, produtos: [], pix: {}, carrinhosAtivos: [] }));

export default {
  default: {
    data: new SlashCommandBuilder()
      .setName('painel')
      .setDescription('Painel de configuração do bot'),

    async execute(interaction) {
      const db = JSON.parse(fs.readFileSync(dbFile));
      const painel = db.painel || {};

      const cargoPermitido = painel.cargoPermitido;
      if (
        interaction.user.id !== interaction.guild.ownerId &&
        (!cargoPermitido || !interaction.member.roles.cache.has(cargoPermitido))
      ) {
        return interaction.reply({ content: 'Você não tem permissão para usar o painel.', ephemeral: true });
      }

      const embed = new EmbedBuilder()
        .setTitle('Painel de Configuração')
        .setDescription('Selecione as opções abaixo para configurar o bot')
        .addFields(
          { name: 'Cargo Permitido', value: painel.cargoPermitido ? `<@&${painel.cargoPermitido}>` : 'Não definido', inline: true },
          { name: 'Canal de Logs', value: painel.canalLogs ? `<#${painel.canalLogs}>` : 'Não definido', inline: true },
          { name: 'Categoria dos Carrinhos', value: painel.categoriaCarrinhos ? `<#${painel.categoriaCarrinhos}>` : 'Não definido', inline: true }
        )
        .setColor('Blue');

      const cargosMenu = new StringSelectMenuBuilder()
        .setCustomId('selecionarCargo')
        .setPlaceholder('Selecionar cargo permitido (somente dono)')
        .addOptions(
          interaction.guild.roles.cache.map(role => ({
            label: role.name,
            value: role.id
          }))
        )
        .setDisabled(interaction.user.id !== interaction.guild.ownerId);

      const canaisMenu = new StringSelectMenuBuilder()
        .setCustomId('selecionarCanal')
        .setPlaceholder('Selecionar canal de logs')
        .addOptions(
          interaction.guild.channels.cache
            .filter(c => c.type === ChannelType.GuildText)
            .map(c => ({ label: c.name, value: c.id }))
        );
      
      const categoriasMenu = new StringSelectMenuBuilder()
        .setCustomId('selecionarCategoria')
        .setPlaceholder('Selecionar categoria para carrinhos')
        .addOptions(
          interaction.guild.channels.cache
            .filter(c => c.type === ChannelType.GuildCategory)
            .map(c => ({ label: c.name, value: c.id }))
        );

      const rowCargos = new ActionRowBuilder().addComponents(cargosMenu);
      const rowCanais = new ActionRowBuilder().addComponents(canaisMenu);
      const rowCategorias = new ActionRowBuilder().addComponents(categoriasMenu);

      await interaction.reply({ embeds: [embed], components: [rowCargos, rowCanais, rowCategorias], ephemeral: true });
    }
  }
};
