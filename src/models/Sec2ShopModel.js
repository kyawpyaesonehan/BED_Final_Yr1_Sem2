// ##############################################################
// REQUIRE MODULES
// ##############################################################
const pool = require('../services/db');

module.exports.selectAll = (callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM Sec2Shop;
    `;
    
    pool.query(SQLSTATMENT, callback);

}

module.exports.selectById = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM Sec2Shop
    WHERE item_id = ?;
    `;
    const VALUES = [data.id];
    
    pool.query(SQLSTATMENT, VALUES, callback);
}

// ##############################################################
// DEFINE OPERATION FOR Id Validation for Item
// ##############################################################
module.exports.selectByItemId = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM Sec2ItemsPosession
    WHERE item_id = ? AND user_id = ?
    `;
    const VALUES = [data.item_id, data.user_id];
    
    pool.query(SQLSTATMENT, VALUES, callback);
}

// ##############################################################
// DEFINE OPERATION FOR Buying Item
// ##############################################################
module.exports.newItem = (data, callback) => {
    const SQLSTATEMENT = `
    INSERT INTO Sec2ItemsPosession (user_id, username, user_level, item_id, item_name)
    SELECT ?, Sec2User.username, Sec2User.user_level, Sec2Shop.item_id, Sec2Shop.item_name
    FROM Sec2User
    JOIN Sec2Shop ON Sec2User.user_id = ? AND Sec2Shop.item_id = ?;

    UPDATE Sec2User
    SET diamonds = diamonds - (SELECT cost FROM Sec2Shop WHERE item_id = ? )
    WHERE user_id = ?;

    SELECT * FROM Sec2ItemsPosession WHERE id = LAST_INSERT_ID();
    `;
    
    const VALUES = [data.user_id, data.user_id, data.item_id, data.item_id, data.user_id];
    
    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.selectByitemId = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM Sec2Shop
    WHERE item_id = ?;
    `;
    const VALUES = [data.id];
    
    pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.selectByUserShopId = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM Sec2User
    WHERE user_id = ?;
    `;
    const VALUES = [data.user_id];
    
    pool.query(SQLSTATMENT, VALUES, callback);
}

// ##############################################################
// DEFINE OPERATION FOR Buying Item
// ##############################################################
module.exports.deductItemFromBalance = (data, callback) => {
    const SQL_STATEMENT = `
    SELECT * FROM Sec2User
    WHERE user_id = ?;

    SELECT * FROM Sec2Shop
    WHERE item_id = ?;
    `;

    const VALUES = [data.user_id, data.item_id];

    pool.query(SQL_STATEMENT, VALUES, callback);
};
