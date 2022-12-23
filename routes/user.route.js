const express = require('express');
const upload = require('../middleware/uploadImage.middleware');
const router = express.Router()
const userController = require('../controllers/user.controllers.js');
const checkAuthMiddleware = require('../middleware/checkAuth.middleware');

module.exports = (app) => {
    // afficher tous les livres
    app.get('/users', userController.afficherTout);
    // créer un livre
    app.post('/users', upload.single('image'), userController.creer);
    // créer un livre
    app.post('/manyImages', upload.array('image', 12), userController.creer);
    // afficher un livre de Id donné
    app.get('/users/:userId', userController.afficherUn);
    // modifier un livre
    app.put('/users/:userId', userController.modifier);
    // supprimer un livre
    app.delete('/users/:userId', userController.supprimer);
    //delete many 
    app.delete('/users', userController.deleteAll);
    //signup user
    app.post('/users/signUp', userController.signUp);
    //login
    app.post('/users/login', userController.login);
}