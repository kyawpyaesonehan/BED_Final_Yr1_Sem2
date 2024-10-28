// ##############################################################
// REQUIRE MODULES
// ##############################################################
const pool = require('../services/db');

module.exports.selectAll = (callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM Sec2CreaturesPosession;
    `;
    
    pool.query(SQLSTATMENT, callback);

}

module.exports.selectById = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM Sec2CreaturesPosession
    WHERE user_id = ?;
    `;
    const VALUES = [data.user_id];
    
    pool.query(SQLSTATMENT, VALUES, callback);
}