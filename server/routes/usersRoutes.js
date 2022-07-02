const { register, login, setAvatar, getAllUsers } = require("../controllers/usersController");

const usersRoutes = require("express").Router();


usersRoutes.post('/register', register);

usersRoutes.post('/login', login);

usersRoutes.put('/setAvatar/:id', setAvatar);

usersRoutes.get('/allUsers/:id', getAllUsers);


module.exports = usersRoutes;