-- สร้างฐานข้อมูล (ถ้ายังไม่มี)
CREATE DATABASE IF NOT EXISTS user_auth;

-- ใช้ฐานข้อมูล
USE user_auth;

-- สร้างตาราง users
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);