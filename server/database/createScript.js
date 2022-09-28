//Libraries
require('dotenv/config');
const mysql = require('mysql');

const createScript = () => {
    const database = mysql.createConnection({
        host: 'localhost',
        user: 'elnurdev',
        password: process.env.MYSQL_PASSWORD,
        multipleStatements: true
    });
    const query = `
    CREATE DATABASE IF NOT EXISTS yournextmeal CHARACTER SET utf8mb4;
    USE yournextmeal;

    CREATE TABLE IF NOT EXISTS users (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        username VARCHAR(20) NOT NULL UNIQUE,
        password VARCHAR(500) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        phone_number VARCHAR(20) UNIQUE,
        birthdate DATE,
        img_path VARCHAR(100) UNIQUE,
        premium BOOLEAN NOT NULL DEFAULT false,
        admin BOOLEAN NOT NULL DEFAULT false,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        last_visited TIMESTAMP NOT NULL DEFAULT NOW(),
        refresh_token VARCHAR(500)
    );

    CREATE TABLE IF NOT EXISTS recipes (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(100) NOT NULL,
        total_time DECIMAL(4, 2) NOT NULL,
        time_type ENUM('min', 'h'),
        description VARCHAR(255) NOT NULL,
        servings INT NOT NULL,
        ingredients TEXT NOT NULL,
        directions MEDIUMTEXT NOT NULL,
        gluten_free BOOLEAN NOT NULL,
        dairy_free BOOLEAN NOT NULL,
        calories VARCHAR(5) NOT NULL,
        protein VARCHAR(10),
        carbohydrates VARCHAR(10),
        dietary_fiber VARCHAR(10),
        sugars VARCHAR(10),
        fat VARCHAR(10),
        saturated_fat VARCHAR(10),
        cholesterol VARCHAR(10),
        vitamin_A_Iu VARCHAR(10),
        niacin_equivalents VARCHAR(10),
        vitamin_B6 VARCHAR(10),
        vitamin_C VARCHAR(10),
        folate VARCHAR(10),
        calcium VARCHAR(10),
        iron VARCHAR(10),
        magnesium VARCHAR(10),
        potassium VARCHAR(10),
        sodium VARCHAR(10),
        thiamin VARCHAR(10),
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        created_by INT NOT NULL,
        FOREIGN KEY (created_by) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS recipe_likes (
        recipe_id INT NOT NULL,
        user_id INT NOT NULL,
        FOREIGN KEY (recipe_id) REFERENCES recipes(id),
        FOREIGN KEY (user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS saved_recipes (
        recipe_id INT NOT NULL,
        user_id INT NOT NULL,
        FOREIGN KEY (recipe_id) REFERENCES recipes(id),
        FOREIGN KEY (user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS recipe_imgs (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        path VARCHAR(100),
        recipe_id INT NOT NULL,
        created_by INT NOT NULL,
        FOREIGN KEY (recipe_id) REFERENCES recipes(id),
        FOREIGN KEY (created_by) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS posts (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        content MEDIUMTEXT NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        created_by INT NOT NULL,
        FOREIGN KEY (created_by) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS post_likes (
        post_id INT NOT NULL,
        user_id INT NOT NULL,
        FOREIGN KEY (post_id) REFERENCES posts(id),
        FOREIGN KEY (user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS comments (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        content VARCHAR(500) NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        recipe_id INT,
        post_id INT,
        created_by INT NOT NULL,
        FOREIGN KEY (recipe_id) REFERENCES recipes(id),
        FOREIGN KEY (post_id) REFERENCES posts(id),
        FOREIGN KEY (created_by) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS reports (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        msg VARCHAR(255) NOT NULL,
        recipe_id INT,
        post_id INT,
        created_by INT NOT NULL,
        acknowledged BOOLEAN NOT NULL DEFAULT false,
        FOREIGN KEY (recipe_id) REFERENCES recipes(id),
        FOREIGN KEY (post_id) REFERENCES posts(id),
        FOREIGN KEY (created_by) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS contact_msg (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        msg VARCHAR(255) NOT NULL,
        created_by INT NOT NULL,
        acknowledged BOOLEAN NOT NULL DEFAULT false,
        FOREIGN KEY (created_by) REFERENCES users(id)
    );
    `

    database.query(query);
    database.end();
}

module.exports = createScript;