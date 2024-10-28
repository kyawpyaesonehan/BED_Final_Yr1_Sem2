// ##############################################################
// Select All
// ##############################################################
const pool = require('../services/db');

module.exports.selectAll = (callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM Sec2Task;
    `;
    
    pool.query(SQLSTATMENT, callback);

}

// ##############################################################
// Select By ID
// ##############################################################
module.exports.selectById = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM Sec2Task
    WHERE task_id = ?;
    `;
    const VALUES = [data.id];
    
    pool.query(SQLSTATMENT, VALUES, callback);
}