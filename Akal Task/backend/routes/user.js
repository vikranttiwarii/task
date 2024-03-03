const router = require('express').Router();
const controller = require('../controllers/user')
const auth = require('../middleware/auth')

router.post('/adduser',controller.addUser);
router.get('/getuser/:parm',auth.verifyToken,controller.getUser);
router.put('/updateuser/:id', auth.verifyToken, controller.updateUser);
router.delete('/deleteuser/:id', auth.verifyToken, controller.deleteUser);

module.exports = router;