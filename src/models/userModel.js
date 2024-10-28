const pool = require('../services/db');

module.exports.selectAll = (callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM Sec2User;
    `;
    
    pool.query(SQLSTATMENT, callback);

}

module.exports.insertSingle = (data, callback) =>
{
    const SQLSTATMENT = `
    INSERT INTO Sec2User (username, email, password)
    VALUES (?, ?, ?);

    SELECT user_id, username, email, user_level, diamonds, current_item from Sec2User where user_id=LAST_INSERT_ID()
    `;
    
    const VALUES = [data.username, data.email, data.password];
    
    pool.query(SQLSTATMENT, VALUES, callback);
}

//////////////////////////////////////////////////////
// SELECT USER BY USERNAME  
//////////////////////////////////////////////////////
module.exports.selectByName = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM sec2User
    WHERE username = ?;
    `;
const VALUES = [data.username];

pool.query(SQLSTATMENT, VALUES, callback);
}


module.exports.selectByEmailOrUsername = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM sec2User
    WHERE username = ? OR email = ?;
    `;
    
    const VALUES = [data.username,data.email];
    
    pool.query(SQLSTATMENT, VALUES, callback);
}