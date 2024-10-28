const pool = require('../services/db');

module.exports.selectAll = (callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM sec2User;
    `;
    
    pool.query(SQLSTATMENT, callback);

}

module.exports.selectAllRel = (callback) =>
{
    const SQLSTATMENT = `
    SELECT
        PlayerUserRel.user_id, 
        PlayerUserRel.player_id, 
        User.username, 
        Player.name as character_name, 
        Player.level as character_level, 
        Player.created_on as char_created_on, 
        User.created_on as user_created_on
    FROM 
        PlayerUserRel
    INNER JOIN
        Player ON PlayerUserRel.player_id = Player.id
    INNER JOIN 
        User ON PlayerUserRel.user_id = User.id;
    `;
    
    pool.query(SQLSTATMENT, callback);

}

module.exports.selectById = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM Player
    WHERE id = ?;
    `;
    const VALUES = [data.id];
    
    pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.insertSingle = (data, callback) =>
{
    const SQLSTATMENT = `
    INSERT INTO Player (name, level)
    VALUES (?, ?);

    INSERT INTO PlayerUserRel (user_id, player_id)
    VALUES (?, (SELECT id FROM Player where id = LAST_INSERT_ID()));

    SELECT * FROM Player WHERE id=LAST_INSERT_ID();
    `;
    
    const VALUES = [data.name, data.level, data.user_id];
    
    pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.updateById = (data, callback) =>
{
    const SQLSTATMENT = `
    UPDATE Player 
    SET name = ?, level = ?
    WHERE id = ?;
    `;
    const VALUES = [data.name, data.level, data.id];
    
    pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.deleteById = (data, callback) =>
{
    const SQLSTATMENT = `
    DELETE FROM Player 
    WHERE id = ?;

    ALTER TABLE Player AUTO_INCREMENT = 1;
    `;
    const VALUES = [data.id];
    
    pool.query(SQLSTATMENT, VALUES, callback);   
}

module.exports.insertSingleRel = (data, callback) =>
{
    const SQLSTATMENT = `
    INSERT INTO Player (name, level)
    VALUES (?, ?);
    `;
    
    const VALUES = [data.name, data.level];
    
    pool.query(SQLSTATMENT, VALUES, callback);
}


module.exports.selectByOwnerId = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM PlayerUserRel
    WHERE player_id = ? AND user_id = ?;
    `;
    const VALUES = [data.player_id, data.user_id];
    
    pool.query(SQLSTATMENT, VALUES, callback);
}