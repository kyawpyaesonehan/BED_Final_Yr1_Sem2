// ##############################################################
// REQUIRE MODULES
// ##############################################################
const pool = require('../services/db');

// ##############################################################
// DEFINE OPERATION FOR Email Validation
// ##############################################################
module.exports.selectByEmail = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM Sec2User
    WHERE email = ? OR username = ?
    `;
    const VALUES = [data.email, data.username];
    
    pool.query(SQLSTATMENT, VALUES, callback);
}
// ##############################################################
// DEFINE INSERT OPERATION FOR User
// ##############################################################
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

// ##############################################################
// DEFINE SELECT ALL OPERATIONS FOR User
// ##############################################################
module.exports.selectAll = (callback) => {
    const SQL_STATEMENT = `
        SELECT
            Sec2User.user_id,
            Sec2User.username,
            Sec2User.email,
            CONCAT(
                'You have lowered down your carbon footprint to ',
                CASE
                    WHEN Sec2User.current_item = 1 THEN SUM(Sec2Creatures.amount) * 2
                    ELSE SUM(Sec2Creatures.amount)
                END,
                ' pounds'
            ) AS achievement,
            Sec2User.diamonds,
            CASE
                WHEN Sec2User.current_item = 2 THEN Sec2User.user_level + 1
                ELSE Sec2User.user_level
            END AS user_level,
            Sec2User.current_item
        FROM Sec2User
        LEFT JOIN Sec2CreaturesPosession ON Sec2User.user_id = Sec2CreaturesPosession.user_id
        LEFT JOIN Sec2Creatures ON Sec2CreaturesPosession.creature_id = Sec2Creatures.creature_id
        GROUP BY Sec2User.user_id, Sec2User.username, Sec2User.email, Sec2User.diamonds, Sec2User.user_level, Sec2User.current_item;`;

    pool.query(SQL_STATEMENT, callback);
};


// ##############################################################
// DEFINE SELECT BY ID OPERATIONS FOR USER
// ##############################################################
module.exports.selectById = (data, callback) =>
{
    const SQLSTATMENT = `
        SELECT
        Sec2User.user_id,
        Sec2User.username,
        Sec2User.email,
        CONCAT(
            'You have lowered down your carbon footprint to ',
            CASE
                WHEN Sec2User.current_item = 1 THEN (
                    SELECT SUM(Sec2Creatures.amount) * 2 
                    FROM Sec2CreaturesPosession 
                    LEFT JOIN Sec2Creatures ON Sec2CreaturesPosession.creature_id = Sec2Creatures.creature_id 
                    WHERE Sec2CreaturesPosession.user_id = Sec2User.user_id
                )
                ELSE (
                    SELECT SUM(Sec2Creatures.amount) 
                    FROM Sec2CreaturesPosession 
                    LEFT JOIN Sec2Creatures ON Sec2CreaturesPosession.creature_id = Sec2Creatures.creature_id 
                    WHERE Sec2CreaturesPosession.user_id = Sec2User.user_id
                )
            END,
            ' pounds'
        ) AS achievement,
        Sec2User.diamonds,
        CASE
            WHEN Sec2User.current_item = 2 THEN Sec2User.user_level + 1
            ELSE Sec2User.user_level
        END AS user_level,
        Sec2User.current_item,
        (SELECT SUM(Task.points) 
        FROM Taskprogress
        JOIN Task ON TaskProgress.task_id = Task.task_id
        WHERE TaskProgress.user_id = Sec2User.user_id) AS total_points
        FROM Sec2User
        WHERE Sec2User.user_id = ?;
    `;


    const VALUES = [data.id, data.id];
    
    pool.query(SQLSTATMENT, VALUES, callback);
}

// ##############################################################
// DEFINE UPDATE OPERATIONS FOR USER
// ##############################################################
module.exports.updateById = (data, callback) =>
{
    const SQLSTATMENT = `
    UPDATE Sec2User 
    SET username = ?, email = ?, password = ?
    WHERE user_id = ?;
    `;
    const VALUES = [data.username, data.email, data.password, data.id];
    
    pool.query(SQLSTATMENT, VALUES, callback);
}

// ##############################################################
// DEFINE UPDATE OPERATIONS FOR Level Up
// ##############################################################
module.exports.updateLevelById = (data, callback) =>
{
    const SQLSTATMENT = `
    UPDATE Sec2User 
    SET user_level = user_level + 1, diamonds = diamonds - 70
    WHERE user_id = ?;
    
    UPDATE Sec2CreaturesPosession
    SET creature_level = (SELECT user_level FROM Sec2User WHERE user_id = ?)
    WHERE user_id = ?;

    UPDATE Sec2CreaturesPosession
    SET user_level = (SELECT user_level FROM Sec2User WHERE user_id = ?)
    WHERE user_id = ?;

    UPDATE Sec2ItemsPosession
    SET user_level = (SELECT user_level FROM Sec2User WHERE user_id = ?)
    WHERE user_id = ?;

    SELECT user_id, user_level AS "Current level" FROM Sec2User WHERE user_id = ?;
    `;
    const VALUES = [data.user_id, data.user_id, data.user_id, data.user_id, data.user_id, data.user_id, data.user_id, data.user_id];
    
    pool.query(SQLSTATMENT, VALUES, callback);
}

// ##############################################################
// DEFINE DELETE OPERATIONS FOR USER
// ##############################################################
module.exports.deleteById = (data, callback) =>
{
    const SQLSTATMENT = `
    DELETE FROM Sec2User 
    WHERE user_id = ?;
    DELETE FROM taskProgress 
    WHERE user_id = ?;
    DELETE FROM sec2TaskProgress 
    WHERE user_id = ?;

    ALTER TABLE Sec2User AUTO_INCREMENT = 1;
    `;
    const VALUES = [data.id,data.id,data.id];
    
    pool.query(SQLSTATMENT, VALUES, callback);   
}

// ##############################################################
// DEFINE OPERATION FOR Id Validation
// ##############################################################
module.exports.selectByLevelId = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM Sec2User
    WHERE user_id = ?;
    `;
    const VALUES = [data.user_id];
    
    pool.query(SQLSTATMENT, VALUES, callback);
}

// ##############################################################
// DEFINE OPERATION FOR Id Validation for Task
// ##############################################################
module.exports.selectByUserIdForTask = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM Sec2User
    WHERE user_id = ?;
    `;
    const VALUES = [data.user_id];
    
    pool.query(SQLSTATMENT, VALUES, callback);
}

// ##############################################################
// DEFINE OPERATION FOR Diamonds Validation
// ##############################################################
module.exports.selectByDiamonds = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM Sec2User
    WHERE user_id = ?;
    `;
    const VALUES = [data.user_id];
    
    pool.query(SQLSTATMENT, VALUES, callback);
}

// ##############################################################
// DEFINE OPERATION FOR Doing Task
// ##############################################################
module.exports.doTaskById = (data, callback) =>
{
    const SQLSTATMENT = `
    INSERT INTO Sec2TaskProgress (user_id, task_id)
    VALUES (?, ?);

    SELECT * from Sec2TaskProgress WHERE id=LAST_INSERT_ID();
    SELECT creature_name, creature_level, diamonds AS "diamonds earned" FROM Sec2Task WHERE task_id = ?;
    UPDATE Sec2User SET diamonds = diamonds + (SELECT diamonds FROM Sec2Task WHERE task_id = ?) WHERE user_id = ?;
    `;
    
    const VALUES = [data.user_id, data.task_id, data.task_id, data.task_id, data.user_id];
    
    pool.query(SQLSTATMENT, VALUES, callback);
}

// ##############################################################
// DEFINE OPERATION FOR Get Creatures
// ##############################################################
module.exports.getCreatureById = (data, callback) =>
{
    const SQLSTATMENT = `
    INSERT INTO Sec2CreaturesPosession (user_id, username, user_level, creature_id, creature_name, creature_level)
    SELECT ?, Sec2User.username, Sec2User.user_level, Sec2Task.creature_id, Sec2Task.creature_name, Sec2User.user_level
    FROM Sec2User
    JOIN Sec2Task ON Sec2User.user_id = ? AND Sec2Task.task_id = ?;

    SELECT * from Sec2CreaturesPosession where id=LAST_INSERT_ID();
    `;
    
    const VALUES = [data.user_id, data.user_id, data.task_id];
    
    pool.query(SQLSTATMENT, VALUES, callback);
}

// ##############################################################
// DEFINE UPDATE OPERATIONS FOR Item
// ##############################################################
module.exports.updateItem = (data, callback) =>
{
    const SQLSTATMENT = `
    UPDATE Sec2User 
    SET current_item = ?
    WHERE user_id = ?;

    SELECT current_item FROM Sec2User WHERE user_id = ?;
    `;
    const VALUES = [data.item_id, data.user_id, data.user_id];
    
    pool.query(SQLSTATMENT, VALUES, callback);
}

// ##############################################################
// DEFINE OPERATION FOR Id Validation for Item Ownership
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



