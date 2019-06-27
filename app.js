const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");
const port = process.env.PORT || 4001;
const index = require("./routes/index");
const fs = require('fs');
const app = express();
app.use(index);
const server = http.createServer(app);
const io = socketIo(server); // < Interesting!
var request = require('request');

let random = 0;
function getDataFromOutook(){
  	/*
    const res = await axios.get(
      "https://api.darksky.net/forecast/PUT_YOUR_API_KEY_HERE/43.7695,11.2558"
    ); // Getting the data from DarkSky
  */
request('http://www.google.com', function (error, response, body) {
    if (!error && response.statusCode == 200) {
       // console.log(body) // Print the google web page.
     }
})
 myObj = { "name":"John", "age":30, "car":null };
const rawData = fs.readFileSync('./data/calendarData.json');
//console.log(JSON.stringify(rawData))
 
  return JSON.parse(rawData)
}
const getApiAndEmit = async socket => {
  try {
    let tempData = getDataFromOutook();
    for(let i=0; i<tempData.length; i++){
      //random1 = Math.floor(Math.random() * 4);
      random2 = Math.floor(Math.random() * 30);
      tempData[i].personal.hours += random2;
    }
    //random1 = Math.floor(Math.random() * 4);
    //random2 = Math.floor(Math.random() * 30);
    //tempData[random1].personal.hours += random2;
    console.log(tempData.length);
    socket.emit("FromAPI", tempData);
  } catch (error) {
    console.error(`Error: ${error.code}`);
  }
};

let interval;
io.on("connection", socket => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 10000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));

