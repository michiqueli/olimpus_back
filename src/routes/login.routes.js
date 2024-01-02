const { Router } = require('express')
const router = Router()
const loginControllers = require('../controllers/login.controller')

router.post('/', loginControllers.loginFunction);
<<<<<<< HEAD
=======
router.get('/token/:token?', loginControllers.getUserByToken);
>>>>>>> develop

module.exports = router;