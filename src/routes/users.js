const express = require('express');
const router = express.Router();

const User = require('../models/User');

const passport = require('passport');

router.get('/users/signin', (req, res) => {
 res.render('users/signin');
});

router.post('/users/signin', passport.authenticate('local', {
    successRedirect: '/notes',
    failureRedirect: '/users/signin',
    failureFlash: true
}));

router.get('/users/signup', (req, res) => {
 res.render('users/signup');
});

router.post('/users/signup', async (req, res) => {
    const { name, email, password, confirm_password }= req.body;
    const errors = [];
    
    if(name.length <= 0){
        errors.push({text: 'Por favor, ingresa tu nombre'});
    }
    if(email.length <= 0){
        errors.push({text: 'Por favor, ingresa tu correo'});
    }
    if(password.length <= 0){
        errors.push({text: 'Por favor, ingresa una contraseña'});
    }
    if(confirm_password.length <= 0){
        errors.push({text: 'Por favor, ingresa la confirmación de contraseña'});
    }
    if(password != confirm_password){
        errors.push({text: 'La contraseña no concuerda'});
    }
    if(password.length < 4){
        errors.push({text: 'La contraseña debe ser mayor a 4 caracteres'});
    }
    if(errors.length > 0){
        res.render('users/signup', {errors, name, email, password, confirm_password});
    }else {
        const emailUser = await User.findOne({email: email});
        if(emailUser){
            req.flash('error_msg', 'Lo siento, este correo ya esta siendo utilizado por otro usuario');
            res.redirect('/users/signup');
        }
        const newUser = new User({name, email, password});
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        req.flash('success_msg', 'Felicidades, usted se ha registrado' );
        res.redirect('/users/signin');
    }
});

router.get('/users/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;