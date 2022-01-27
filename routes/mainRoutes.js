const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const mainController = require('../controllers/mainController');

let upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, './images');
        },
        filename: function(req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
        }
    })
});

router.get('/', mainController.getMainPage);
router.get('/register', mainController.getRegisterPage);
router.post('/register', mainController.postRegisterPage);
router.get('/login', mainController.getLoginPage);
router.post('/login', mainController.postLoginPage);
router.get('/admin', mainController.getAdminPage);
router.get('/logout', mainController.userLogout);

router.post('/admin', upload.single('userFile'), mainController.postInfo);




module.exports = router;