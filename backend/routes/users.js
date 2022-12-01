const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/users');

router.post('/add',userCtrl.createUser); 

router.get('/add',userCtrl.getAllUser);   

module.exports = router;