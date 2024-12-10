const router = require('express').Router();
const controllers = require('../controllers');

const { verifyAccessToken } = require('../middlewares/jwtVerification');

router.post('/login', controllers.authController.login);
router.post('/logout', verifyAccessToken,controllers.authController.logout);

module.exports = router;