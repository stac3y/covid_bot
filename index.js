const {Telegraf} = require('telegraf');
require('custom-env').env('staging');
const covidService = require('./services/covid.js');
const formatCountryMsg = require('./messages/country.js')

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
    ctx.reply(`Welcome to COVID BOT!
You need to send a name of country where you need to get COVID data`);
});

bot.help(ctx => {
    ctx.reply(`Example:
Russia
China
Finland`);
});

bot.hears(/.*/, async ctx =>{
    const {data} = await covidService.getByCountry(ctx.message.text);
    if (data && data.results === 0) {
       return ctx.reply('Country not found. Try another!');
    }
    const message = formatCountryMsg(data.response[0]);
    return ctx.replyWithMarkdown(message);
})

bot.launch().then(res => {
    const date = new Date();
    console.log(`Bot launched at ${date}`);
})
    .catch(err => console.log(err));