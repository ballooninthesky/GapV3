const express = require('express');
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/auth'); // นำเข้า authRoutes

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MySQL Connection
const connectDB = async () => {
    try {
        global.db = await mysql.createPool({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '', // รหัสผ่านเป็นค่าว่าง
            database: process.env.DB_NAME || 'yourdatabase', // เปลี่ยนชื่อฐานข้อมูล
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
        });
        console.log('MySQL connected');
    } catch (error) {
        console.error('Error connecting to MySQL:', error.message);
        process.exit(1); // ออกจากโปรแกรมหากเชื่อมต่อไม่ได้
    }
};

// Connect to the database
connectDB();

// Routes
app.use('/api/auth', authRoutes); // ใช้งาน authRoutes

app.get('/', (req, res) => {
    res.send('API is running...');
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'An error occurred', error: err.message });
});

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
