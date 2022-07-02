const { addMessage, getAllMessages } = require("../controllers/messagesController");

const usersRoutes = require("express").Router();


usersRoutes.post('/addmsg', addMessage);

usersRoutes.post('/getmsg', getAllMessages);


module.exports = usersRoutes;