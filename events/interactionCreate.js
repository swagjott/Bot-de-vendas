import fs from 'fs';
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, PermissionsBitField } from 'discord.js';
const dbFile = './database/db.json';

export default {
  name: 'interactionCreate',
  async execute(interaction, client) {
    const db = JSON.parse(fs.readFileSync(dbFile));
    const painel = db.painel || {};

    if (interaction.isCommand()) {
      const command = client.commands.get(interaction.commandName);
      if (!command) return;
      try { await command.execute(interaction, client); } 
      catch (err) { console.error(err); await interaction.reply({ content: 'Ocorreu um erro!', ephemeral: true }); }
    }

    if (interaction.isModalSubmit()) {

      return;
    }

    if (interaction.isStringSelectMenu()) {
      if (interaction.customId === 'selecionarCargo') {
        if (interaction.user.id !== interaction.guild.ownerId) return interaction.reply({ content: 'Somente o dono pode alterar o cargo permitido.', ephemeral: true });
        painel.cargoPermitido = interaction.values[0];
        fs.writeFileSync(dbFile, JSON.stringify(db, null, 2));
        return interaction.reply({ content: `Cargo permitido atualizado para <@&${painel.cargoPermitido}>.`, ephemeral: true });
      }
      if (interaction.customId === 'selecionarCanal') {
        if (interaction.user.id !== interaction.guild.ownerId &&
            (!painel.cargoPermitido || !interaction.member.roles.cache.has(painel.cargoPermitido)))
          return interaction.reply({ content: 'Você não tem permissão.', ephemeral: true });
        painel.canalLogs = interaction.values[0];
        fs.writeFileSync(dbFile, JSON.stringify(db, null, 2));
        return interaction.reply({ content: `Canal de logs atualizado para <#${painel.canalLogs}>.`, ephemeral: true });
      }
      if (interaction.customId === 'selecionarCategoria') {
        if (interaction.user.id !== interaction.guild.ownerId &&
            (!painel.cargoPermitido || !interaction.member.roles.cache.has(painel.cargoPermitido)))
          return interaction.reply({ content: 'Você não tem permissão.', ephemeral: true });
        painel.categoriaCarrinhos = interaction.values[0];
        fs.writeFileSync(dbFile, JSON.stringify(db, null, 2));
        return interaction.reply({ content: `Categoria dos carrinhos atualizada para <#${painel.categoriaCarrinhos}>.`, ephemeral: true });
      }
    }

    if (interaction.isButton()) {
      const carrinho = db.carrinhosAtivos.find(c => c.canalId === interaction.channel.id);
      if (!carrinho) return;

      if (interaction.customId === 'botaoPix') {
        const pix = db.pix;
        return interaction.reply({ content: `💰 Faça o pagamento PIX:\nNome: ${pix.nome}\nTipo: ${pix.tipo}\nChave: ${pix.chave}\nBanco: ${pix.banco}`, ephemeral: true });
      }

      if (interaction.customId === 'botaoCancelar') {
        await interaction.channel.send('Compra cancelada! O carrinho será deletado.');
        interaction.channel.delete();
        db.carrinhosAtivos = db.carrinhosAtivos.filter(c => c.canalId !== interaction.channel.id);
        fs.writeFileSync(dbFile, JSON.stringify(db, null, 2));
        return;
      }
    }
  }
};
