//////////////////////////////////////////////////////
// REQUIRE MODULES
//////////////////////////////////////////////////////
const express = require('express');
const router = express.Router();

//////////////////////////////////////////////////////
// CREATE ROUTER
//////////////////////////////////////////////////////
const userRoutes = require('./userRoutes');
const sec2CreatureRoutes = require('./Sec2CreaturesRoutes');
const tasksRoutes = require('./tasksRoutes');
const task_progressRoutes = require('./task_progressRoutes');
const sec2TasksRoutes = require('./Sec2TaskRoutes');
const sec2ShopRoutes = require('./Sec2ShopRoutes');
const sec2UserRoutes = require('./Sec2UserRoutes');
const sec2UserCreatureRoutes = require('./sec2UserCreatureRoutes');
const messageRoutes = require('./messageRoutes');

const exampleController = require('../controllers/exampleController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');
const userController = require('../controllers/userController');
const bcryptMiddleware = require('../middlewares/bcryptMiddleware');


router.use("/user", userRoutes);
router.use("/sec2Creatures", sec2CreatureRoutes);
router.use("/tasks", tasksRoutes);
router.use("/task_progress", task_progressRoutes);
router.use("/sec2Tasks", sec2TasksRoutes);
router.use("/sec2Shop", sec2ShopRoutes);
router.use("/sec2User", sec2UserRoutes);
router.use("/userCreature", sec2UserCreatureRoutes);
router.use("/message", messageRoutes);


//////////////////////////////////////////////////////
// DEFINE ROUTES
//////////////////////////////////////////////////////
router.post("/login", userController.login, bcryptMiddleware.comparePassword, jwtMiddleware.generateToken, jwtMiddleware.sendToken);
router.post("/register", userController.checkUsernameOrEmailExist, bcryptMiddleware.hashPassword, userController.register, jwtMiddleware.generateToken, jwtMiddleware.sendToken);

router.post("/jwt/generate", exampleController.preTokenGenerate, jwtMiddleware.generateToken, exampleController.beforeSendToken, jwtMiddleware.sendToken);
router.get("/jwt/verify", jwtMiddleware.verifyToken, exampleController.showTokenVerified);
router.post("/bcrypt/compare", exampleController.preCompare, bcryptMiddleware.comparePassword, exampleController.showCompareSuccess);
router.post("/bcrypt/hash", bcryptMiddleware.hashPassword, exampleController.showHashing);

//////////////////////////////////////////////////////
// EXPORT ROUTER
//////////////////////////////////////////////////////
module.exports = router;