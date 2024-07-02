-- Create database if not exists
CREATE DATABASE IF NOT EXISTS next;

-- Switch to 'next' database
USE next;

-- Create User table
CREATE TABLE User (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fullname VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phonenumber VARCHAR(20),
    role ENUM('user', 'shopOwner', 'admin') NOT NULL,
    photo VARCHAR(255)
);

-- Create Shop table
CREATE TABLE Shop (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category ENUM('coffee', 'restaurant', 'bar') NOT NULL,
    description TEXT,
    address VARCHAR(255),
    video VARCHAR(255),
    menu JSON, -- Assuming menu is an array of images or URLs
    logo VARCHAR(255),
    `like` INT DEFAULT 0,
    `dislike` INT DEFAULT 0
);

-- Create Comments table
CREATE TABLE Comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    comment TEXT,
    id_shop INT,
    id_user INT,
    FOREIGN KEY (id_shop) REFERENCES Shop(id),
    FOREIGN KEY (id_user) REFERENCES User(id)
);
