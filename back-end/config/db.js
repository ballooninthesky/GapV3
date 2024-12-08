const fs = require('fs');
const mysql = require('mysql2/promise');
require('dotenv').config();

const initializeDatabase = async () => {
    try {
        // อ่านไฟล์ SQL
        const sql = fs.readFileSync('database.sql', 'utf8');

        // สร้างการเชื่อมต่อกับ MySQL
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            multipleStatements: true, // อนุญาตคำสั่ง SQL หลายคำสั่ง
        });

        console.log('Connected to MySQL');

        // รันคำสั่ง SQL
        await connection.query(sql);
        console.log('Database initialized successfully');

        connection.end();
    } catch (error) {
        console.error('Error initializing database:', error.message);
    }
};

module.exports = initializeDatabase;
