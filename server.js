const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const CHAT_PORT = process.env.CHAT_PORT || 4000;
const app = express();
const http = require('http');
const server = http.createServer(app);
const socketio = require('socket.io')


const io = socketio(server);
// require('./seeders/messageSeed');

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);

// Define API routes here

// Send every other request to the React app
// Define any API routes before this runs

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});

// socketio.adapter(redis({ host: 'localhost', port: 3000}));
io.on('connection', socket => {
  socket.on('message', ({user, msgObj}) => {
    io.emit('message', {user, msgObj})
  })
})

server.listen(CHAT_PORT, function() {
  console.log(`Chat service is running on ${CHAT_PORT}`)
})