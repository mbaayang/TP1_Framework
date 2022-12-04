const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/users');

router.post('/',userCtrl.createUser); 

router.post('/login', userCtrl.login)

router.get('/',userCtrl.getAllUser);   

router.get('/:id',userCtrl.getUserId);

router.delete('/:id',userCtrl.deleteUser);

router.put('/:id',userCtrl.updateUser)

module.exports = router;