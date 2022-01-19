const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');

router.get('/', mainController.getMainPage);
router.get('/register', mainController.getRegisterPage);
router.post('/register', mainController.postRegisterPage);
router.get('/login', mainController.getLoginPage);
router.post('/login', mainController.postLoginPage);
router.get('/admin', mainController.getAdminPage);
router.get('/logout', mainController.userLogout);

module.exports = router;