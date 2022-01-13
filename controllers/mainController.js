const express = require('express');
const date = require('../getDate.js');

exports.getMainPage = (req, res) => {
    let today = date.getDate();
    res.render('index', {dateToRender: today});
};

exports.getDate = (req, res)=> { 
    let today = date.getDate();
    res.send(today);
};

exports.getLoginPage