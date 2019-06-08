const TelegramBot = require('node-telegram-bot-api');


const token = '876631294:AAGUaNDafctrbyA4kVS521H0J-XARP1k-7g';

const bot = new TelegramBot(token, {polling: true});
const axios = require('axios');
const cheerio = require('cheerio');
const needle = require('needle');
const trees = require('trees');
const table =require('table');
const getBorderCharacters = require('table');
let config = {
  border: table.getBorderCharacters(`void`)
}
const URL = 'https://sinoptik.ua';




bot.onText(/start/,(msg)=>{
	const chatId=msg.chat.id;
    bot.sendMessage(
      chatId, 
      `Привет!, ${msg.from.first_name}
    	 Сначала уточню - бот разработал Богдан Глушко, ИП-71 :))
       ============================================== 
       
       Это - метеоролог. Он показывает погоду на несколько дней вперед.
       /today - погода на сегодня
       /tomorrow - на завтра
       /next - на послезавтра 
       А еще он умеет засылать картиночки с погодой!`,

       {
        reply_markup: {   
            resize_keyboard: true, 	     
            keyboard: [["today", "tomorrow"], ["next","Today's weather details"]]    
        }
      });
});

bot.onText(/today/, (msg) => {
	needle.get(URL,  function(err, res){
  if (err) throw (err);

  let $ = cheerio.load(res.body);
   
   let min_max  = $("#bd1 .temperature ").text();
    let date =$("#bd1 .day-link").text()+" "+$("#bd1 .date").text()+" "+$("#bd1 .month").text()+".";
   let current_temperature =  $(".today-temp").text(); 
 
  let weather=$("#bd1 .weatherIco").attr('title');
  
  console.log(typeof atmosphere_pressure);
     let image;
     if(weather ==="Переменная облачность")
     {
     	 image ="d200";
     }
     if(weather==="Переменная облачность, дождь"){
     	image="d220";
     }
     if(weather==="Переменная облачность, дождь, возможны грозы")
     {
     	 image = "d240";
     }

     if(weather === "Облачно с прояснениями, дождь"){
     	 image = "d320";
     }
     if(weather==="Облачно с прояснениями, дождь, грозы"){
     	 image = "d340";
     }
     if(weather==="Облачно с прояснениями, мелкий дождь"){
     	 image = "d310";
     }
       if(weather ==="Сплошная облачность"){
     	image ="d400";
     }

     console.log(weather);
     console.log(image);
    console.log(min_max);
    const chatId = msg.chat.id;
   bot.sendPhoto(chatId, image+".gif");
  bot.sendMessage(chatId,date +`\n` + min_max+`\n`+weather+"."+`\n`+"Текущая температура: " + current_temperature);

})
  
});

bot.onText(/Today's weather details/, (msg) => {
	needle.get(URL,  function  on(err, res){
  if (err) throw (err);
   let $ = cheerio.load(res.body);
   let atmosphere_pressure = $(".gray").text();
	 let array =  atmosphere_pressure.split("  ");
	  let temperature = [$(".weatherDetails .temperature").text()].join("");
      let temperatureSens = [$(".weatherDetails .temperatureSens").text()].join("");
	 let array_temperature = temperature.split(" ");
	  let array_temperatureSens = temperatureSens.split(" ");

     
    
	 let data2 = [
    [array[0], array[1], array[2], array[3], array[4], array[5], array[6], array[7]  ],
    [array_temperature[1], array_temperature[2], array_temperature[3], array_temperature[4],array_temperature[5],array_temperature[6],array_temperature[7],array_temperature[8] ],
    [array_temperatureSens[1], array_temperatureSens[2], array_temperatureSens[3], array_temperatureSens[4], array_temperatureSens[5], array_temperatureSens[6], array_temperatureSens[7], array_temperatureSens[8]]
  ]	;
  let output2 = table.table(data2,config);
	 const chatId = msg.chat.id;
 bot.sendMessage(chatId,"Атмосферное давление на весь день: "+array[8]);
 bot.sendMessage(chatId,"Температура и температура по ощущениям:"+`\n`+ output2);
})

});


bot.onText(/tomorrow/, (msg) => {
	needle.get(URL,  function(err, res){
  if (err) throw (err);

  let $ = cheerio.load(res.body);

   let min_max  = $("#bd2 .temperature ").text();
    let date =$("#bd2 .day-link").text()+" "+$("#bd2 .date").text()+" "+$("#bd2 .month").text()+".";
    
 
  let weather=$("#bd2 .weatherIco").attr('title');
  
  console.log(typeof atmosphere_pressure);
     let image;
     if(weather ==="Переменная облачность")
     {
     	 image ="d200";
     }
     if(weather==="Переменная облачность, дождь, возможны грозы")
     {
     	 image = "d240";
     }

     if(weather === "Облачно с прояснениями, дождь"){
     	 image = "d320";
     }
     if(weather==="Облачно с прояснениями, дождь, грозы"){
     	 image = "d340";
     }
     if(weather==="Облачно с прояснениями, мелкий дождь"){
     	 image = "d310";
     }
     if(weather ==="Сплошная облачность"){
     	image ="d400";
     }

     console.log(weather);
     console.log(image);
    console.log(min_max);
    const chatId = msg.chat.id;
   bot.sendPhoto(chatId, "C:/Users/gubar/Desktop/bot/src/"+image+".gif");
  bot.sendMessage(chatId,date +`\n` + min_max+`\n`+weather+".");

})
  
});

bot.onText(/next/, (msg) => {
	needle.get(URL,  function(err, res){
  if (err) throw (err);

  let $ = cheerio.load(res.body);

   let min_max  = $("#bd3 .temperature ").text();
    let date =$("#bd3 .day-link").text()+" "+$("#bd3 .date").text()+" "+$("#bd3 .month").text()+".";
    
 
  let weather=$("#bd3 .weatherIco").attr('title');
  
  console.log(typeof atmosphere_pressure);
     let image;
     if(weather ==="Переменная облачность")
     {
     	 image ="d200";
     }
     if(weather==="Переменная облачность, дождь, возможны грозы")
     {
     	 image = "d240";
     }

     if(weather === "Облачно с прояснениями, дождь"){
     	 image = "d320";
     }
     if(weather==="Облачно с прояснениями, дождь, грозы"){
     	 image = "d340";
     }
     if(weather==="Облачно с прояснениями, мелкий дождь"){
     	 image = "d310";
     }
     if(weather ==="Сплошная облачность"){
     	image ="d400";
     }

     console.log(weather);
     console.log(image);
    console.log(min_max);
    const chatId = msg.chat.id;
   bot.sendPhoto(chatId, "C:/Users/gubar/Desktop/bot/src/"+image+".gif");
  bot.sendMessage(chatId,date +`\n` + min_max+`\n`+weather+".");

})
  
});


 

