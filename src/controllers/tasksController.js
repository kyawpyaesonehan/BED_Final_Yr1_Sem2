// ##############################################################
// REQUIRE MODULES
// ##############################################################
const model = require("../models/tasksModel.js");

// ##############################################################
// Create new user
// ##############################################################
module.exports.createNewTask = (req, res, next) =>
{
    if(req.body.title == undefined || req.body.description == undefined || req.body.points == undefined)
    {
        res.status(400).json("Bad Request");
        return;
    }

    const data = {
        title: req.body.title,
        description: req.body.description,
        points: req.body.points,
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createNewTask:", error);
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
module.exports.readAllTask = (req, res, next) =>
{
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllTask:", error);
            res.status(500).json(error);
        } 
        else res.status(200).json(results);
    }

    model.selectAll(callback);
}

// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR READ TASK BY ID
// ##############################################################
module.exports.readTaskById = (req, res, next) =>
{
    const data = {
        id: req.params.task_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readTaskById:", error);
            res.status(500).json(error);
        } else {
            if(results.length == 0) 
            {
                res.status(404).json({
                    message: "Task not found"
                });
            }
            else res.status(200).json(results[0]);
        }
    }

    model.selectById(data, callback);
}

// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR UPDATE USER BY ID
// ##############################################################
module.exports.updateTaskById = (req, res, next) =>
{
    if(req.body.title == undefined || req.body.description == undefined || req.body.points == undefined)
    {
        res.status(400).json("Bad Request");
        return;
    }

    const data = {
        title: req.body.title,
        description: req.body.description,
        points: req.body.points,
        id: req.params.task_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateTaskById:", error);
            res.status(500).json(error);
        } else {
            if(results.affectedRows == 0) 
            {
                res.status(404).json({
                    message: "Task not found"
                });
            }
            else res.status(200).send({
                task_id: req.params.task_id,
                title: req.body.title,
                description: req.body.description,
                points: req.body.points
            });
        }
    }

    model.updateById(data, callback);
}

// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR DELETE USER BY ID
// ##############################################################
module.exports.deleteTaskById = (req, res, next) =>
{
    const data = {
        id: req.params.task_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteTreeById:", error);
            res.status(500).json(error);
        } else {
            if(results[0].affectedRows == 0) 
            {
                res.status(404).json({
                    message: "Task not found"
                });
            }
            else res.status(204).send(); // 204 No Content            
        }
    }

    model.deleteById(data, callback);
}