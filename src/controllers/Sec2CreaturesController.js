// ##############################################################
// REQUIRE MODULES
// ##############################################################
const model = require("../models/Sec2CreaturesModel.js");

module.exports.readAllCreatures = (req, res, next) =>
{
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllCreatures:", error);
            res.status(500).json(error);
        } 
        else res.status(200).json(results);
    }

    model.selectAll(callback);
}

module.exports.readCreaturesById = (req, res, next) =>
{
    const data = {
        id: req.params.creature_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readCreatureById:", error);
            res.status(500).json(error);
        } else {
            if(results.length == 0) 
            {
                res.status(404).json({
                    message: "Creature not found"
                });
            }
            else res.status(200).json(results[0]);
        }
    }

    model.selectById(data, callback);
}