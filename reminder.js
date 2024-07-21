const TelegramBot = require('node-telegram-bot-api');
const express = require('express');

// Replace 'YOUR_BOT_TOKEN' with your actual bot token
const token = '7346799257:AAHno0dRjsRNsXurqe7HygIpxbQJYm0K5uk';
const bot = new TelegramBot(token, { polling: true });

// Replace 'YOUR_GROUP_CHAT_ID' with your actual group chat ID
const groupId = '-4277270175';

const app = express();
const port = process.env.PORT;
let timerId;
let staggerTimerId;
let mute = false;

// routes

app.post('/remind', (req, res) => {
    console.log(req);
    clearTimeout(timerId);
    clearTimeout(staggerTimerId);
    staggerTimerId = setTimeout(() => sendMessageToGroupEveryHour(req.query.player, req.query.url), 1000);
    res.send('Message sent to group!');
  });

bot.onText(/\/diam/, (msg) => {
  bot.sendMessage(groupId, "Yessir");
  mute = true;
});

bot.onText(/\/undiam/, (msg) => {
  bot.sendMessage(groupId, "Yessir");
  mute = false;
});



// Function to send a message to the group chat
function sendMessageToGroup(player, url) {
  if (mute) {
    return;
  }
  const message = `It is ${player}'s turn! \n\nPlease make your move at: ${url}`;
  bot.sendMessage(groupId, message)
    .then(() => {
      console.log('Message sent successfully');
    })
    .catch(err => {
      console.error('Error sending message:', err);
    });
}

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });

function keepAlive() {
    setTimeout(keepAlive, 40000);
}

keepAlive();
    

function sendMessageToGroupEveryHour(player, url) {
  sendMessageToGroup(player, url);
  timerId = setTimeout(() => sendMessageToGroupEveryHour(player, url), 3600000);
}
