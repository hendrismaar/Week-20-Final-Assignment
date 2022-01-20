const User = require('../models/user')
const Info = require('../models/info')
const express = require('express');;
const passport = require('passport');
const date = require('../getDate.js');

exports.getMainPage = (req, res) => {
    Info.fetchInfo(infoMass => {
        console.log(infoMass);

    let today = date.getDate();
    res.render('index', {dateToRender: today, displayInfo: infoMass});
    });
    
}

exports.getDate = (req, res)=> { 
    let today = date.getDate();
    res.send(today);
};

exports.getLoginPage = (req, res) => {
    let today = date.getDate();
    res.render('login', {dateToRender: today});
};

exports.getRegisterPage = (req, res)=>{
    let today = date.getDate();
    res.render('register', {dateToRender: today});
};

exports.postRegisterPage = (req, res) => {
    User.register({username: req.body.username}, req.body.password, (error, user) => {
        if(error) {
            console.log(error);
            res.redirect('/register');
        } else {
            passport.authenticate('local')(req, res, () => {
                res.redirect('/admin');
            });
        }
    });
};

exports.postLoginPage = (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });

    req.login(user, (error) => {
        if(error) {
            console.log(error)
            res.redirect('/login')
        } else {
            passport.authenticate('local')(req, res, () =>{
                res.redirect('/admin')
            });
        }
    });
};



exports.userLogout = (req, res) => {
    req.logout();
    res.redirect('/');
};

exports.getAdminPage = (req, res) => {
    Info.fetchInfo(infoMass => {
        console.log(infoMass);

        let today = date.getDate();
        if(req.isAuthenticated) {
            res.render('admin', {dateToRender: today, displayInfo: infoMass})
        } else {
            res.redirect('/')
        }
    });
};



exports.postInfo = (req, res) => {
    console.log(req.body.userInfo);

    const newInfo = new Info(req.body.userInfo,);

    newInfo.saveInfo();
    
    res.redirect('/admin');
}

exports.deleteInfo = (req, res) => {
    let infoToDelete = req.body.infoToDelete;
    Wish.deleteInfo(infoToDelete);
    res.redirect('/admin');

}