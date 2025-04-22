Category	Subcategory	Details	Notes
Yêu cầu dự án	Chức năng chính	Tạo link ngắn từ URL dài.	
Yêu cầu dự án	Chức năng chính	Chuyển hướng từ link ngắn đến URL gốc.	
Yêu cầu dự án	Chức năng chính	Theo dõi số lần nhấp (click tracking).	
Yêu cầu dự án	Chức năng chính	Quản lý link (CRUD: tạo, đọc, cập nhật, xóa).	
Yêu cầu dự án	Chức năng chính	Xác thực người dùng (phân quyền).	
Yêu cầu dự án	Yêu cầu phi chức năng	Hiệu suất cao (low latency khi chuyển hướng).	
Yêu cầu dự án	Yêu cầu phi chức năng	Khả năng mở rộng (scale cho nhiều người dùng).	
Yêu cầu dự án	Yêu cầu phi chức năng	Bảo mật (ngăn chặn spam, mã hóa dữ liệu).	
Yêu cầu dự án	Yêu cầu phi chức năng	Độ tin cậy (uptime cao).	
Công nghệ	Ngôn ngữ lập trình	Node.js (Express)	
Công nghệ	Ngôn ngữ lập trình	Go hoặc Node.js thường được ưa chuộng vì tốc độ và dễ mở rộng.	
Công nghệ	Cơ sở dữ liệu	PostgreSQL – cơ sở dữ liệu SQL quan hệ, phù hợp cho dữ liệu có cấu trúc và quan hệ phức tạp.	
Công nghệ	Cơ sở dữ liệu	Redis – dùng để cache (link ngắn -> URL gốc) nhằm tăng tốc truy xuất.	
Công nghệ	Cơ sở dữ liệu	Redis là lựa chọn tốt cho caching trong hệ thống shortlink để giảm tải cho PostgreSQL.	
Công nghệ	Caching	Redis hoặc Memcached để giảm tải database khi chuyển hướng.	
Công nghệ	Web server	Nginx hoặc built-in server của framework (như Express).	
Công nghệ	Cloud/Hosting	VPS	
Kiến trúc Backend	REST API hoặc GraphQL	POST /shorten: Nhận URL dài, trả về link ngắn (dùng Sequelize lưu vào PostgreSQL, Redis cache).	
Kiến trúc Backend	REST API hoặc GraphQL	GET /:shortCode: Chuyển hướng đến URL gốc (kiểm tra Redis trước, sau đó PostgreSQL).	
Kiến trúc Backend	REST API hoặc GraphQL	GET /analytics/:shortCode: Trả về dữ liệu thống kê (số lần nhấp, createdAt từ PostgreSQL).	
Kiến trúc Backend	REST API hoặc GraphQL	PUT/DELETE /:shortCode: Cập nhật/xóa link (kiểm tra quyền user, cập nhật PostgreSQL và Redis).	
Kiến trúc Backend	REST API hoặc GraphQL	Nếu có xác thực: Thêm endpoint /auth/login, /auth/register.	
Kiến trúc Backend	Database Schema	PostgreSQL table mẫu: CREATE TABLE links (shortCode VARCHAR(8) PRIMARY KEY, originalUrl TEXT NOT NULL, createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, expiresAt TIMESTAMP, userId VARCHAR(50), clicks INTEGER DEFAULT 0);	
Kiến trúc Backend	Database Schema	Tạo index cho shortCode: CREATE INDEX idx_shortcode ON links(shortCode); để tăng tốc truy vấn.	
Kiến trúc Backend	Tạo mã ngắn	Sử dụng thuật toán băm (MD5/SHA-1), lấy 6-8 ký tự đầu.	
Kiến trúc Backend	Tạo mã ngắn	Hoặc tạo ngẫu nhiên (base62: 0-9, a-z, A-Z) và kiểm tra trùng lặp.	
Kiến trúc Backend	Tạo mã ngắn	Đảm bảo shortCode là unique trong PostgreSQL (sử dụng PRIMARY KEY hoặc UNIQUE constraint).	
Kiến trúc Backend	Kiến trúc tổng thể	API Layer: Xử lý request/response (Express, FastAPI…).	
Kiến trúc Backend	Kiến trúc tổng thể	Service Layer: Logic nghiệp vụ (tạo link, kiểm tra hết hạn…).	
Kiến trúc Backend	Kiến trúc tổng thể	Data Layer: Tương tác với PostgreSQL và Redis.	
Kiến trúc Backend	Kiến trúc tổng thể	Caching Layer: Redis để lưu shortCode -> originalUrl cho tốc độ cao.	
Triển khai	Khởi tạo dự án	Tạo repository (GitHub/GitLab).	
Triển khai	Khởi tạo dự án	Cấu trúc thư mục (Node.js): /project/src/controllers, /services, /models, /routes, /middleware, /config, /tests, server.js.	
Triển khai	Cài đặt môi trường	Cài đặt ngôn ngữ/framework (npm, pip, go mod…).	
Triển khai	Cài đặt môi trường	Cấu hình .env: DATABASE_URL=postgres://user:password@localhost:5432/shortlink, REDIS_URL=redis://localhost:6379, PORT=3000, SECRET_KEY=your_jwt_secret.	
Triển khai	Kết nối Database	Dùng ORM: Sequelize (Node.js), SQLAlchemy (Python), hoặc thư viện native (pgx cho Go) để kết nối PostgreSQL.	
Triển khai	Kết nối Database	Thiết lập kết nối PostgreSQL trong file config, đảm bảo pool connection để tối ưu hiệu suất.	
Triển khai	Triển khai API cơ bản	Ví dụ Node.js/Express: POST /shorten tạo link ngắn, GET /:shortCode chuyển hướng (truy vấn PostgreSQL hoặc Redis).	
Triển khai	Test cục bộ	Dùng Postman hoặc curl để test các endpoint.	
Triển khai	Test cục bộ	Kiểm tra chuyển hướng và lưu trữ link trong PostgreSQL.	
