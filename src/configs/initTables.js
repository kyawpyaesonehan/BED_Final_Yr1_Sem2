const pool = require("../services/db");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const callback = (error, results, fields) => {
  if (error) {
    console.error("Error creating tables:", error);
  } else {
    console.log("Tables created successfully");
  }
  process.exit();
}

bcrypt.hash('1234', saltRounds, (error, hash) => {
  if (error) {
    console.error("Error hashing password:", error);
  } else {
    console.log("Hashed password:", hash);

    const SQLSTATEMENT = `
      DROP TABLE IF EXISTS Task;
      DROP TABLE IF EXISTS TaskProgress;
      
      DROP TABLE IF EXISTS Sec2User;
      DROP TABLE IF EXISTS Sec2Task;
      DROP TABLE IF EXISTS Sec2Creatures;
      DROP TABLE IF EXISTS Sec2Shop;
      DROP TABLE IF EXISTS Sec2CreaturesPosession;
      DROP TABLE IF EXISTS Sec2ItemsPosession;
      DROP TABLE IF EXISTS Sec2TaskProgress;
      DROP TABLE IF EXISTS Messages;
      
      CREATE TABLE Task (
        task_id INT PRIMARY KEY AUTO_INCREMENT,
        title TEXT,
        description TEXT,
        points INT
        );
      
      CREATE TABLE TaskProgress (
        progress_id INT PRIMARY KEY AUTO_INCREMENT,
        user_id INT NOT NULL,
        task_id INT NOT NULL,
        completion_date DATE,
        notes TEXT
        );
      
      CREATE TABLE Sec2User (
        user_id INT PRIMARY KEY AUTO_INCREMENT,
        username TEXT,
        email TEXT,
        password TEXT,
        user_level INT DEFAULT 1,
        diamonds INT DEFAULT 0,
        current_item TEXT
        );
      
      CREATE TABLE Sec2Task (
        task_id INT PRIMARY KEY AUTO_INCREMENT,
        title TEXT,
        description TEXT,
        creature_id INT,
        creature_name TEXT,
        creature_level INT,
        diamonds INT
        );
      
      CREATE TABLE Sec2Creatures (
        creature_id INT PRIMARY KEY AUTO_INCREMENT,
        creature_name TEXT,
        level INT,
        power TEXT,
        amount INT
        );
      
      CREATE TABLE Sec2Shop (
        item_id INT PRIMARY KEY AUTO_INCREMENT,
        item_name TEXT,
        power TEXT,
        amount INT,
        cost INT
        );
      
      CREATE TABLE Sec2CreaturesPosession (
        id INT PRIMARY KEY AUTO_INCREMENT,
        user_id INT NOT NULL,
        username TEXT,
        user_level INT,
        creature_id INT NOT NULL,
        creature_name TEXT,
        creature_level INT
        );
      
      CREATE TABLE Sec2ItemsPosession (
        id INT PRIMARY KEY AUTO_INCREMENT,
        user_id INT NOT NULL,
        username TEXT,
        user_level INT,
        item_id INT NOT NULL,
        item_name TEXT
        );
      
      CREATE TABLE Sec2TaskProgress (
        id INT PRIMARY KEY AUTO_INCREMENT,
        user_id INT NOT NULL,
        task_id INT NOT NULL
        );

        CREATE TABLE Messages (
          id INT PRIMARY KEY AUTO_INCREMENT,
          message_text TEXT NOT NULL,
          user_id INT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

      INSERT INTO Task (task_id, title, description, points) VALUES
      (1, 'Plant a tree', 'Plant a tree in your neighbourhood or a designated green area', 50),
      (2, 'Use Public Transportation', 'Use public transportation or carpool instead of driving alone', 30),
      (3, 'Reduce Plastic Usage', 'Commit to using reusable bags and containers', 40),
      (4, 'Energy consumption', 'Turn off lights and appliances when not in use', 25),
      (5, 'Composting', 'Start composting kitchen scraps to create natural fertilizer', 35);
        
      INSERT INTO Sec2Task (task_id, title, description, creature_id, creature_name, creature_level, diamonds) VALUES
      (1, 'Sylvan Grove Rejuvenation', 'Harness the arcane arts to revive the ancient Sylvan Grove by planting a mystical tree with the guidance of the Butterfly Seraphim', 1, 'Butterfly Seraphim', 1, 50),
      (2, 'Lunar Seeding Incantation', 'Under the silver glow of the moon, perform a powerful incantation to plant celestial seeds with the aid of the Lunar Serpent familiar', 2, 'Lunar Serpent', 1, 60),
      (3, 'Crystal Bloom Enchantment', 'Embark on a wizardry quest to enchant a crystal bloom, turning it into a guardian spirit tree with the assistance of the Crystal Guardian familiar', 3, 'Crystal Guardian', 1, 55),
      (4, 'Aetheric Sky Travel Spell', 'Master the Aetheric Sky Travel Spell to soar through the skies on the Cloud Pegasus and spread awareness about reducing energy consumption', 4, 'Cloud Pegasus', 1, 40),
      (5, 'Pixie-Crafted Enchanted Satchel', 'Seek the aid of friendly pixies to craft an enchanted eco-satchel that expands magically to accommodate all your needs', 5, 'Eco Pixie', 1, 45),
      (6, 'Eternal Flame Conservation Charm', 'Convince the majestic Phoenix of Eternal Flames to embrace a conservation charm and wisely manage its eternal flames', 6, 'Phoenix of Eternal Flames', 1, 65),
      (7, 'Starlight Composting Sonata', 'Compose a magical sonata under the starlight to accelerate composting with the guidance of Starlight Sprites, the ethereal creatures of the night', 7, 'Starlight Sprites', 1, 70);
        
      INSERT INTO Sec2Creatures (creature_id, creature_name, level, power, amount) VALUES
      (1, 'Fire Phoenix', 1, 'Flame of Renewal - Revives scorched lands, promoting reforestation by km square', 50),
      (2, 'Lunar Serpent', 1, 'Tidal Harmony - Influences tides to cleanse polluted waters by liters', 60),
      (3, 'Crystal Guardian', 1, 'Ecological Aura - Enhances the growth and vitality of nearby plant life by years', 70),
      (4, 'Cloud Nimbus', 1, 'Aetheric Energy Siphon - Converts excess energy into a reusable magical resource by grams', 90),
      (5, 'Eco Pixie', 1, 'Nature Weaver - Crafts sustainable materials from enchanted natural elements(grams)', 100),
      (6, 'Phoenix of Eternal Flames', 1, 'Everlasting Warmth - Provides sustainable, renewable heat without combustion by grams', 40),
      (7, 'Starlight Sprites', 1, 'Twilight Purification - Cleanses the air and neutralizes harmful pollutants during the night by grams', 120);
        
      INSERT INTO Sec2Shop (item_id, item_name, power, amount, cost) VALUES
      (1, 'Magic Wand', 'Multiply the power of creature', 2, 100),
      (2, 'Magic Seeds', 'Add the level of the user', 1, 50);

      INSERT INTO Messages (message_text, user_id) VALUES
      ("Hello world!", 1),
      ("Yummy!", 2),  
      ("I am the one", 3);
      `;

    pool.query(SQLSTATEMENT, callback);
  }
});
