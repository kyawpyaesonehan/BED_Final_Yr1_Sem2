const express = require('express');
const router = express.Router();

const controller = require('../controllers/playerController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');

router.get('/', controller.readAllPlayer);
router.post('/', jwtMiddleware.verifyToken,controller.createNewPlayer);

router.get('/user', controller.readAllPlayerByRel);

router.get('/:id', controller.readPlayerById);
router.put('/:playerId', jwtMiddleware.verifyToken,controller.checkOwnership,controller.updatePlayerById);
router.delete('/:playerId', jwtMiddleware.verifyToken,controller.checkOwnership,controller.deletePlayerById);


module.exports = router;