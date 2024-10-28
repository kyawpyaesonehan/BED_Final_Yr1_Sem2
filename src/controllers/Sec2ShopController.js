// ##############################################################
// REQUIRE MODULES
// ##############################################################
const model = require("../models/Sec2ShopModel.js");

module.exports.readAllItems = (req, res, next) =>
{
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllItems:", error);
            res.status(500).json(error);
        } 
        else res.status(200).json(results);
    }

    model.selectAll(callback);
}

module.exports.readItemsById = (req, res, next) =>
{
    const data = {
        id: req.params.item_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readItemById:", error);
            res.status(500).json(error);
        } else {
            if(results.length == 0) 
            {
                res.status(404).json({
                    message: "Item not found"
                });
            }
            else res.status(200).json(results[0]);
        }
    }

    model.selectById(data, callback);
}

// ##############################################################
// CHECK ID FOR TASK
// ##############################################################
module.exports.checkItem = (req, res, next) => {
    const data = {
        item_id: req.body.item_id,
        user_id: req.params.user_id
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error check Id:", error);
            res.status(500).json(error);
        } else if (results.length != 0) {
            res.status(409).json({message: "Item already bought"})
        } else 
        next()
    }

    model.selectByItemId(data, callback);
}

// ##############################################################
// Buy New Item
// ##############################################################
module.exports.buyItem = (req, res, next) =>
{
    if(req.body.item_id == undefined)
    {
        res.status(400).json("Bad Request");
        return;
    }

    const data = {
        user_id: req.params.user_id,
        item_id: req.body.item_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error Buying items:", error);
            res.status(500).json({
                message: "Internal server error"
            });
        } 
        else {
            res.status(201).json(results[2][0]);
        }
    }

    model.newItem(data, callback);
}

// ##############################################################
// CHECK ITEM ID
// ##############################################################
module.exports.checkItemId = (req, res, next) => {
    {
        const data = {
            id: req.body.item_id
        }
    
        const callback = (error, results, fields) => {
            if (error) {
                console.error("Error readItemById:", error);
                res.status(500).json(error);
            } else {
                if(results.length == 0) 
                {
                    res.status(404).json({
                        message: "Item not found"
                    });
                }
                else 
                next();
            }
        }
        model.selectByitemId(data, callback);
    }
}

// ##############################################################
// CHECK User ID
// ##############################################################
module.exports.checkUserShopId = (req, res, next) => {
    {
        const data = {
            user_id: req.params.user_id
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
                else 
                next();
            }
        }
        model.selectByUserShopId(data, callback);
    }
}

// ##############################################################
// CHECK BALANCE
// ##############################################################
module.exports.checkBalance = (req, res, next) => {
    const data = {
        user_id: req.params.user_id,
        item_id: req.body.item_id
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error checking balance:", error);
            return res.status(500).json(error);
        }
        const user = results[0][0]; // Access the first row of the first result set
        const diamondBalance = user.diamonds;

        const itemCost = results[1][0].cost; // Access the first row of the second result set

        if (diamondBalance < itemCost) {
            return res.status(403).json({ message: "Insufficient diamond balance" });
        } else {
            next();
        }
    }

    model.deductItemFromBalance(data, callback);
};