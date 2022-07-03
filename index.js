const express = require("express");
const cors = require("cors");
const socket = require('socket.io');

const usersRoutes = require("./routes/usersRoutes");
const messagesRoutes = require("./routes/messagesRoutes");

require("dotenv").config();
require("./utils/connectDB");


const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', usersRoutes);
app.use('/api/messages', messagesRoutes);


const server = app.listen(process.env.PORT, () => {
    console.log(`server started on port ${process.env.PORT} !`);
});

const io = socket(server, {
    cors: {
        origin: 'https://alasdika.herokuapp.com/',
        credentials: true,
    },
});

global.onlineUsers = new Map();

io.on('connection', socket => {
    global.chatSocket = socket;
    socket.on('add-user', userId => {
        onlineUsers.set(userId, socket.id);
    });
    socket.on('send-msg', data => {
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket) {
            socket
                .to(sendUserSocket)
                .emit('msg-receive', data.message);
        }
    });
});

/********************* Deployment ****************/


const path = require('path');


const __dirname1 = path.resolve();
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname1, 'chat-app/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname1, 'chat-app/build/index.html'));
    })
}
else {
    app.get("/", (req, res) => {
        res.send('API is Running Successfully.');
    });
}