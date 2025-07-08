# Web Sống Xanh

## Cài đặt
1. Cài Node.js.
2. Chạy `npm install` trong thư mục gốc.

## Chạy ứng dụng
```bash
npm start
```
Truy cập `http://localhost:3000`.

## Đăng lên GitHub bằng GitHub Desktop
1. Mở GitHub Desktop, chọn "Add a local repository" trỏ đến thư mục này.
2. Commit và Push lên repository mới trên GitHub.

## Triển khai lên Render.com
1. Tạo repository trên GitHub và push code.
2. Đăng nhập Render.com, tạo Web Service, liên kết đến GitHub repo.
3. Chọn branch main, Build Command: `npm install && npm run build`, Start Command: `npm start`.
4. Render sẽ tự động deploy.