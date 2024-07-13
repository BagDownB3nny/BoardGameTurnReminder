const TelegramBot = require('node-telegram-bot-api');
const express = require('express');

// Replace 'YOUR_BOT_TOKEN' with your actual bot token
const token = '7346799257:AAHno0dRjsRNsXurqe7HygIpxbQJYm0K5uk';
const bot = new TelegramBot(token, { polling: true });

// Replace 'YOUR_GROUP_CHAT_ID' with your actual group chat ID
const groupId = '-4282758428';

const app = express();
const port = 26950;

// routes

app.post('/remind', (req, res) => {
    console.log(req);
    sendMessageToGroup(req.query.player);
    res.send('Message sent to group!');
  });

// Function to send a message to the group chat
function sendMessageToGroup(player) {
    const message = `It is ${player}'s turn!`;
  bot.sendMessage(groupId, message)
    .then(() => {
      console.log('Message sent successfully');
    })
    .catch(err => {
      console.error('Error sending message:', err);
    });
}

// Example: Send a message to the group every 10 seconds
sendMessageToGroup('I HAVE NO POINTS');

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });