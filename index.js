const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (frontend)
app.use(express.static(__dirname));

// API endpoint để lưu dữ liệu
app.post('/api/save-data', async (req, res) => {
    try {
        const data = req.body;

        if (!data || typeof data !== 'object') {
            return res.status(400).json({
                success: false,
                error: 'Dữ liệu không hợp lệ'
            });
        }

        const filePath = path.join(__dirname, 'data.json');
        const jsonString = JSON.stringify(data, null, 2);
        await fs.writeFile(filePath, jsonString, 'utf8');

        console.log('✅ Dữ liệu đã được lưu thành công:', new Date().toLocaleString());

        res.json({
            success: true,
            message: 'Dữ liệu đã được lưu thành công!',
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('❌ Lỗi khi lưu dữ liệu:', error);
        res.status(500).json({
            success: false,
            error: 'Không thể lưu dữ liệu: ' + error.message
        });
    }
});

// API endpoint để đọc dữ liệu
app.get('/api/get-data', async (req, res) => {
    try {
        const filePath = path.join(__dirname, 'data.json');
        const data = await fs.readFile(filePath, 'utf8');
        const jsonData = JSON.parse(data);

        res.json({
            success: true,
            data: jsonData
        });

    } catch (error) {
        console.error('❌ Lỗi khi đọc dữ liệu:', error);
        res.status(500).json({
            success: false,
            error: 'Không thể đọc dữ liệu: ' + error.message
        });
    }
});

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

// Khởi động server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log(`📱 Trang chính: http://localhost:${PORT}/index.html`);
    console.log(`⚙️  Trang admin: http://localhost:${PORT}/admin`);
});

// Xử lý lỗi
process.on('uncaughtException', (error) => {
    console.error('❌ Lỗi không xử lý:', error);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ Promise bị từ chối:', reason);
});