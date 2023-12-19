const { Router } = require('express')
const router = Router()
const loginControllers = require('../controllers/login.controller')

router.post('/', loginControllers.loginFunction);

module.exports = router;