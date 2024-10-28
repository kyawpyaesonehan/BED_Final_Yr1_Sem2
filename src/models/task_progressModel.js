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
    INSERT INTO TaskProgress (user_id, task_id, completion_date, notes)
    VALUES (?, ?, ?, ?);

    SELECT * from TaskProgress where progress_id=LAST_INSERT_ID()
    `;
    
    const VALUES = [data.user_id, data.task_id, data.completion_date, data.notes];
    
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
// DEFINE SELECT BY ID OPERATIONS FOR TREE
// ##############################################################
module.exports.selectById = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM TaskProgress
    WHERE progress_id = ?;
    `;
    const VALUES = [data.id];
    
    pool.query(SQLSTATMENT, VALUES, callback);
}

// ##############################################################
// DEFINE SELECT BY ID OPERATIONS FOR TREE
// ##############################################################
module.exports.selectByUserTaskId = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM TaskProgress
    WHERE user_id = ?;
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
    UPDATE TaskProgress
    SET user_id = ?, task_id = ?, completion_date = ?, notes = ?
    WHERE task_id = ?;
    `;
    const VALUES = [data.user_id, data.task_id, data.completion_date, data.notes, data.id];
    
    pool.query(SQLSTATMENT, VALUES, callback);
}

// ##############################################################
// DEFINE DELETE OPERATIONS FOR USER
// ##############################################################
module.exports.deleteById = (data, callback) =>
{
    const SQLSTATMENT = `
    DELETE FROM TaskProgress 
    WHERE progress_id = ?;

    ALTER TABLE User AUTO_INCREMENT = 1;
    `;
    const VALUES = [data.id];
    
    pool.query(SQLSTATMENT, VALUES, callback);   
}

module.exports.selectByUserId = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM Sec2User
    WHERE user_id = ?;
    `;
    const VALUES = [data.userId];
    
    pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.selectByTaskId = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM Task
    WHERE task_id = ?;
    `;
    const VALUES = [data.taskId];
    
    pool.query(SQLSTATMENT, VALUES, callback);
}