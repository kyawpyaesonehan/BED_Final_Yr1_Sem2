// ##############################################################
// REQUIRE MODULES
// ##############################################################
const model = require("../models/task_progressModel.js");

// ##############################################################
// Create new user
// ##############################################################
module.exports.createNewTaskProgress = (req, res, next) =>
{
    if(req.body.user_id == undefined || req.body.task_id == undefined || req.body.completion_date == undefined || req.body.notes == undefined)
    {
        res.status(400).json("Bad Request");
        return;
    }

    const data = {
        user_id: req.body.user_id,
        task_id: req.body.task_id,
        completion_date: req.body.completion_date,
        notes: req.body.notes
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createNewTask:", error);
            res.status(500).json({
                message: "Internal server error"
            });
        }else {
            if(results.length == 0) 
            {
                res.status(404).json({
                    message: "Task progress not found"
                });
            }
            else res.status(201).json(results[1][0]);
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
        else {
            if(results.length == 0) 
            {
                res.status(404).json({
                    message: "Task progress not found"
                });
            }
            else res.status(200).json(results);
        }
    }

    model.selectAll(callback);
}

// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR READ User BY ID
// ##############################################################
module.exports.readProgressById = (req, res, next) =>
{
    const data = {
        id: req.params.progress_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readUserById:", error);
            res.status(500).json(error);
        } else {
            if(results.length == 0) 
            {
                res.status(404).json({
                    message: "Task progress not found"
                });
            }
            else res.status(200).json(results[0]);
        }
    }

    model.selectById(data, callback);
}

// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR READ TASK PROGRESS BY USER ID
// ##############################################################
module.exports.readProgressByUserId = (req, res, next) =>
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
                    message: "Task progress not found"
                });
            }
            else res.status(200).json(results);
        }
    }

    model.selectByUserTaskId(data, callback);
}

// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR UPDATE USER BY ID
// ##############################################################
module.exports.updateProgressById = (req, res, next) =>
{
    if(req.body.user_id == undefined || req.body.task_id == undefined || req.body.completion_date == undefined || req.body.notes == undefined)
    {
        res.status(400).json("Bad Request");
        return;
    }

    const data = {
        user_id: req.body.user_id,
        task_id: req.body.task_id,
        completion_date: req.body.completion_date,
        notes: req.body.notes,
        id: req.params.progress_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateTaskById:", error);
            res.status(500).json(error);
        } else {
            if(results.affectedRows == 0) 
            {
                res.status(404).json({
                    message: "Task progress not found"
                });
            }
            else res.status(200).send({
                progress_id: req.params.progress_id,
                user_id: req.body.user_id,
                task_id: req.body.task_id,
                completion_date: req.body.completion_date,
                notes: req.body.notes,
            });
        }
    }

    model.updateById(data, callback);
}

// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR DELETE USER BY ID
// ##############################################################
module.exports.deleteProgressById = (req, res, next) =>
{
    const data = {
        id: req.params.progress_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteProgressById:", error);
            res.status(500).json(error);
        } else {
            if(results[0].affectedRows == 0) 
            {
                res.status(404).json({
                    message: "Task progress not found"
                });
            }
            else res.status(204).send(); // 204 No Content            
        }
    }

    model.deleteById(data, callback);
}

module.exports.checkUserId = (req, res, next) => {
    const data = {
        userId: req.body.user_id
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error check movieId:", error);
            res.status(500).json(error);
        } else if (results.length == 0) {
            res.status(404).json({message: "User not found"})
        } else 
        next()
    }

    model.selectByUserId(data, callback);
}

module.exports.checkTaskId = (req, res, next) => {
    const data = {
        taskId: req.body.task_id
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error check movieId:", error);
            res.status(500).json(error);
        } else if (results.length == 0) {
            res.status(404).json({message: "Task not found"})
        } else 
        next()
    }

    model.selectByTaskId(data, callback);
}