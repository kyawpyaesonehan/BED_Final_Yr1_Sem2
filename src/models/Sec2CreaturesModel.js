// ##############################################################
// REQUIRE MODULES
// ##############################################################
const pool = require('../services/db');

module.exports.selectAll = (callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM Sec2Creatures;
    `;
    
    pool.query(SQLSTATMENT, callback);

}

module.exports.selectById = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM Sec2Creatures
    WHERE creature_id = ?;
    `;
    const VALUES = [data.id];
    
    pool.query(SQLSTATMENT, VALUES, callback);
}