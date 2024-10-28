// ##############################################################
// REQUIRE MODULES
// ##############################################################
const model = require("../models/Sec2UserModel.js");

// ##############################################################
// CHECK EMAIL
// ##############################################################
module.exports.checkEmail = (req, res, next) => {
    const data = {
        email: req.body.email,
        username: req.body.username
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error check email:", error);
            res.status(500).json(error);
        } else if (results.length != 0) {
            res.status(409).json({message: "User already exist"})
        } else 
        next()
    }

    model.selectByEmail(data, callback);
}

// ##############################################################
// Create new user
// ##############################################################
module.exports.createNewUser = (req, res, next) =>
{
    if(req.body.username == undefined || req.body.email == undefined || req.body.password == undefined)
    {
        res.status(400).json("Bad Request");
        return;
    }

    const data = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createNewUser:", error);
            res.status(500).json({
                message: "Internal server error"
            });
        } else {
            res.status(201).json(results[1][0]);
        }
    }

    model.insertSingle(data, callback);
}

// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR READ ALL Users
// ##############################################################
module.exports.readAllUser = (req, res, next) =>
{
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllUser:", error);
            res.status(500).json(error);
        } 
        else res.status(200).json(results);
    }

    model.selectAll(callback);
}

// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR READ USER BY ID
// ##############################################################
module.exports.readUserById = (req, res, next) =>
{
    const data = {
        id: req.params.user_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readUserById:", error);
            res.status(500).json(error);
        } else {
            if(results.length == 0) 
            {
                res.status(404).json({
                    message: "User not found"
                });
            }
            else res.status(200).json({
                ...results[0],
            });
        }
    }

    model.selectById(data, callback);
}

// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR UPDATE USER BY ID
// ##############################################################
module.exports.updateUserById = (req, res, next) =>
{
    if(req.body.username == undefined || req.body.email == undefined || req.body.password == undefined)
    {
        res.status(400).json({
            message: "Missing required data"
        });
        return;
    }

    const data = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        id: req.params.user_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateTreeById:", error);
            res.status(500).json(error);
        } else {
            if(results.affectedRows == 0) 
            {
                res.status(404).json({
                    message: "User not found"
                });
            }
            else res.status(200).send({
                user_id: req.params.user_id,
                username: req.body.username,
                email: req.body.email
            });
        }
    }

    model.updateById(data, callback);
}

// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR DELETE USER BY ID
// ##############################################################
module.exports.deleteUserById = (req, res, next) =>
{
    const data = {
        id: req.params.user_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteTreeById:", error);
            res.status(500).json(error);
        } else {
            if(results[0].affectedRows == 0) 
            {
                res.status(404).json({
                    message: "User not found"
                });
            }
            else res.status(201).json({
                message: "User deleted successfully"
            }); // 204 No Content            
        }
    }

    model.deleteById(data, callback);
}

// ##############################################################
// CHECK ID
// ##############################################################
module.exports.checkId = (req, res, next) => {
    const data = {
        user_id: req.body.user_id
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error check Id:", error);
            res.status(500).json(error);
        } else if (results.length == 0) {
            res.status(409).json({message: "User not found"})
        } else 
        next()
    }

    model.selectByLevelId(data, callback);
}

// ##############################################################
// CHECK ID FOR TASK
// ##############################################################
module.exports.checkIdForTask = (req, res, next) => {
    const data = {
        user_id: req.params.user_id
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error check Id:", error);
            res.status(500).json(error);
        } else if (results.length == 0) {
            res.status(409).json({message: "User not found"})
        } else 
        next()
    }

    model.selectByUserIdForTask(data, callback);
}

// ##############################################################
// CHECK BALANCE
// ##############################################################
module.exports.checkBalance = (req, res, next) => {
    const data = {
        user_id: req.body.user_id
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error checking balance:", error);
            return res.status(500).json(error);
        }
        const user = results[0];
        const diamondBalance = user.diamonds;

        if (diamondBalance < 70) {
            return res.status(403).json({ message: "Insufficient diamond balance" });
        } 
        req.diamondBalance = diamondBalance; 
        next()
    }

    model.selectByDiamonds(data, callback);
}

// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR LEVEL UP USER BY ID
// ##############################################################
module.exports.levelUpUserById = (req, res, next) =>
{
    if(req.body.user_id == undefined)
    {
        res.status(400).json({
            message: "Missing required data"
        });
        return;
    }

    const data = {
        user_id: req.body.user_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateLevelById:", error);
            res.status(500).json(error);
        } else {
            if(results.affectedRows == 0) 
            {
                res.status(404).json({
                    message: "User not found"
                });
            }
            else res.status(200).send({
                message: "Level Upgraded Successfully",
                ...results[4][0]
            });
        }
    }

    model.updateLevelById(data, callback);
}

// ##############################################################
// Do Task
// ##############################################################
module.exports.doTask = (req, res, next) =>
{
    if(req.body.task_id == undefined)
    {
        res.status(400).json("Bad Request");
        return;
    }

    const data = {
        user_id: req.params.user_id,
        task_id: req.body.task_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createNewUser:", error);
            res.status(500).json({
                message: "Internal server error"
            });
        } else {
            res.status(201).json({
                ...results[1][0],
                message: "Task done successfully, got a creature and diamonds.",
                ...results[2][0],
                ...results[3][0]
            });
        }
    }

    model.doTaskById(data, callback);
}

// ##############################################################
// Get Creature
// ##############################################################
module.exports.getCreature = (req, res, next) =>
{
    if(req.body.task_id == undefined)
    {
        res.status(400).json("Bad Request");
        return;
    }

    const data = {
        user_id: req.params.user_id,
        task_id: req.body.task_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error Get Creatures:", error);
            res.status(500).json({
                message: "Internal server error"
            });
        } else 
        next()
    }

    model.getCreatureById(data, callback);
}

// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR UPDATE USER EQUIPMENT BY ID
// ##############################################################
module.exports.equipItem = (req, res, next) =>
{
    if(req.body.item_id == undefined)
    {
        res.status(400).json({
            message: "Missing required data"
        });
        return;
    }

    const data = {
        item_id: req.body.item_id,
        user_id: req.params.user_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateTreeById:", error);
            res.status(500).json(error);
        } else {
            if(results.affectedRows == 0) 
            {
                res.status(404).json({
                    message: "User not found"
                });
            }
            else res.status(200).send({
                message: "successfully equipped",
                user_id: req.params.user_id,
                ...results[1][0]
            });
        }
    }

    model.updateItem(data, callback);
}

// ##############################################################
// CHECK ID FOR OWNERSHIP
// ##############################################################
module.exports.checkOwner = (req, res, next) => {
    const data = {
        item_id: req.body.item_id,
        user_id: req.params.user_id
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error check Id:", error);
            res.status(500).json(error);
        } else if (results.length == 0) {
            res.status(409).json({message: "User does not blong to this item"})
        } else 
        next()
    }

    model.selectByItemId(data, callback);
}
