const { Telegraf,Markup } = require('telegraf');
require('dotenv').config()
const { MongoClient } = require('mongodb')


const bot = new Telegraf(process.env.BOT_TOKEN);

bot.command('start', async (ctx) => {
  return await ctx.replyWithMarkdown(`*✋ Привіт, ${ctx.message.from.first_name ? ctx.message.from.first_name:'✋ Привіт'}*`,
  Markup.keyboard([
       [Markup.button.callback('🏦 Особистий кабінет'), Markup.button.callback('📊 Статистика',)], 
       [Markup.button.callback('💵 Заробити')] 
     ]).resize()
     
   )
 })

bot.on('text', async(ctx)=>{
  try{
    var result = await bot.telegram.getChatMember('@crabcrabcrypto',ctx.message.from.id)
    console.log(result)
  }catch (e){
   console.log(result)
  }
  if(result.status=='left'){
    ctx.replyWithHTML("<b>Спочатку підпишіться на спонсорів - </b>@crabcrabcrypto")
  }
  if(result.status=='member'){
      //console.log(ctx.message)    
  if(ctx.message.text=='🏦 Особистий кабінет')
  {
    await ctx.replyWithHTML
    (`📝 Ім'я: <b>${ctx.message.from.first_name}</b>`
    +`\n🧿<b>ID: </b>${ctx.message.from.id}`
    +`\n\n<b>📭 На вивід:</b>`
    +`\n\n<b>🪬 Підтверджених рефералів: </b> 0`)

  }if(ctx.message.text=='📊 Статистика')
  {
    await ctx.replyWithHTML
    (`<b>📊 Статистика проекта:</b>`
    +`\n\n👨‍💻 Людей в проекті: <b>2</b>`
    +`\n💻 Людей за сьогодні: <b>2</b>`
    +`\n`,
    Markup.inlineKeyboard([
      [Markup.button.url('Служба підтримки','https://t.me/Ars5n' )]
    ])
    
    )}
  
  if(ctx.message.text=='💵 Заробити')
  {
    ctx.replyWithHTML
    (`<b>😉 За кожного реферала ви отримаєте 1.5 токена ACA</b>`
    +`\n\n<i>🔗 Ваше реферальне посилання реферальне посилання для запрошення друзів: </i>`
    +`\nhttps://t.me/TasksFromCrab_bot?start=`+ctx.message.from.id,{disable_web_page_preview: true})
  }}
})


bot.launch();  


// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));