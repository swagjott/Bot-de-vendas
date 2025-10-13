export default {
  name: 'ready',
  once: true,
  execute(client) {
    console.log(`Bot logado como ${client.user.tag}`);
  }
};
