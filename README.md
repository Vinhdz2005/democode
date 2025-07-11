# Profile Card - Danh Thiếp Điện Tử

## 🚀 Cách sử dụng

### 1. Cài đặt dependencies
```bash
npm install
```

### 2. Chạy Backend Server
```bash
# Chạy server
npm start

# Hoặc chạy với nodemon (tự động restart khi có thay đổi)
npm run dev
```

### 3. Truy cập trang web

Sau khi chạy server, truy cập:
- **Trang chính:** `http://localhost:3000/index.html`
- **Trang admin:** `http://localhost:3000/admin`

### 4. Cập nhật dữ liệu

1. Mở trang admin (`http://localhost:3000/admin`)
2. Thay đổi thông tin trong các tab
3. Bấm nút **"Lưu dữ liệu"** (màu xanh)
4. Dữ liệu sẽ tự động được lưu vào `data.json`
5. Refresh trang chính để thấy thay đổi

## 📁 Cấu trúc file

```
profile/
├── backend.js          # Backend server (Node.js/Express)
├── frontend.js         # Frontend JavaScript
├── index.html          # Trang chính
├── admin.html          # Trang quản trị
├── data.json           # Dữ liệu profile
├── package.json        # Node.js dependencies
├── index.css           # CSS trang chính
├── admin.js            # JavaScript trang admin
├── img/                # Thư mục ảnh
│   ├── avatar.jpg
│   ├── banner.jpg
│   └── ...
└── README.md           # Hướng dẫn này
```

## 🔧 Cấu trúc Backend/Frontend

### Backend (`backend.js`)
- **Express server** chạy trên port 3000
- **API endpoints:**
  - `POST /api/save-data` - Lưu dữ liệu vào data.json
  - `GET /api/get-data` - Đọc dữ liệu từ data.json
- **Static file serving** - Phục vụ file HTML/CSS/JS

### Frontend (`frontend.js`)
- **Load dữ liệu** từ API hoặc file data.json
- **Update DOM** với dữ liệu động
- **Modal functions** cho các tính năng tương tác

## ⚠️ Lưu ý quan trọng

- **Phải chạy `npm start`** để khởi động backend server
- **Truy cập qua localhost:3000** thay vì mở file HTML trực tiếp
- **File `data.json`** sẽ được tự động cập nhật khi bấm "Lưu dữ liệu"
- **Tất cả thay đổi** sẽ hiển thị ngay lập tức sau khi refresh trang chính

## 🛠️ Tính năng

- ✅ **Backend/Frontend tách biệt** - Dễ bảo trì và mở rộng
- ✅ **API RESTful** - Chuẩn web API
- ✅ **Quản lý dữ liệu** - Thông tin cá nhân, liên hệ, mạng xã hội, chứng chỉ
- ✅ **Modal hiển thị ảnh** - Avatar, banner, chứng chỉ
- ✅ **Lưu dữ liệu tự động** - Không cần thao tác thủ công
- ✅ **Giao diện admin** - Thân thiện, dễ sử dụng
- ✅ **Responsive design** - Tương thích mọi thiết bị

## 🚀 Deployment

### Local Development
```bash
npm install
npm run dev
```

### Production
```bash
npm install
npm start
```

### Environment Variables
- `PORT` - Port server (mặc định: 3000)
