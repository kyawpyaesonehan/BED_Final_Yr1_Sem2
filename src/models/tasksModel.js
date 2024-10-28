// ##############################################################
// REQUIRE MODULES
// ##############################################################
const pool = require('../services/db');

// ##############################################################
// DEFINE INSERT OPERATION FOR TREE
// ##############################################################
module.exports.insertSingle = (data, callback) =>
{
    const SQLSTATMENT = `
    INSERT INTO Task (title, description, points)
    VALUES (?, ?, ?);

    SELECT * from Task where task_id=LAST_INSERT_ID()
    `;
    
    const VALUES = [data.title, data.description, data.points];
    
    pool.query(SQLSTATMENT, VALUES, callback);
}

// ##############################################################
// DEFINE SELECT ALL OPERATIONS FOR User
// ##############################################################
module.exports.selectAll = (callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM Task;
    `;
    
    pool.query(SQLSTATMENT, callback);

}

// ##############################################################
// DEFINE SELECT BY ID OPERATIONS FOR TASK
// ##############################################################
module.exports.selectById = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM Task
    WHERE task_id = ?;
    `;
    const VALUES = [data.id];
    
    pool.query(SQLSTATMENT, VALUES, callback);
}

// ##############################################################
// DEFINE UPDATE OPERATIONS FOR TREE
// ##############################################################
module.exports.updateById = (data, callback) =>
{
    const SQLSTATMENT = `
    UPDATE Task 
    SET title = ?, description = ?, points = ?
    WHERE task_id = ?;
    `;
    const VALUES = [data.title, data.description, data.points, data.id];
    
    pool.query(SQLSTATMENT, VALUES, callback);
}

// ##############################################################
// DEFINE DELETE OPERATIONS FOR USER
// ##############################################################
module.exports.deleteById = (data, callback) =>
{
    const SQLSTATMENT = `
    DELETE FROM Task 
    WHERE task_id = ?;

    ALTER TABLE User AUTO_INCREMENT = 1;
    `;
    const VALUES = [data.id];
    
    pool.query(SQLSTATMENT, VALUES, callback);   
}