# NexusAuth - Trang Đăng Nhập & Đăng Ký Hiện Đại

Trang xác thực người dùng cao cấp được xây dựng bằng **HTML5, Vanilla CSS hiện đại (Glassmorphism), và JavaScript ES6+**.

## 🌟 Tính Năng Nổi Bật

1. **Đăng nhập & Đăng ký linh hoạt (Tabs)**:
   - Hiệu ứng chuyển đổi tab mượt mà (Sliding glider pill).
   - Đăng nhập bằng Email/Tên đăng nhập và Mật khẩu.
   - Đăng ký tài khoản mới với đầy đủ thông tin: Họ tên, Email, Mật khẩu, Xác nhận mật khẩu, Điều khoản dịch vụ.

2. **Xác thực nhanh bằng Google (Google OAuth)**:
   - Nút đăng nhập Google chuẩn thương hiệu chính thức (Google 4-color G logo).
   - Cửa sổ mô phỏng chọn tài khoản Google (Account Chooser) chân thực: chọn tài khoản có sẵn hoặc nhập tài khoản Google bất kỳ.

3. **Bảo mật & Trải nghiệm người dùng (UX/UI)**:
   - Đo độ mạnh mật khẩu thời gian thực (Password Strength Meter) với 4 cấp độ: Yếu, Trung bình, Tốt, Rất mạnh.
   - Kiểm tra khớp mật khẩu xác nhận tức thì (Instant Password Matching).
   - Bật/tắt ẩn hiện mật khẩu (Show/Hide password).
   - "Ghi nhớ đăng nhập" lưu phiên người dùng an toàn vào `localStorage`.
   - "Quên mật khẩu?" với Modal gửi liên kết khôi phục.

4. **Giao diện Glassmorphism đỉnh cao**:
   - Nền hiệu ứng quả cầu ánh sáng chuyển động mềm mại (Floating Ambient Orbs).
   - Chuyển đổi giao diện Sáng / Tối (Dark / Light Theme) linh hoạt, lưu trạng thái người dùng.
   - Chuyển đổi ngôn ngữ Tiếng Việt 🇻🇳 / English 🇺🇸.
   - Hệ thống thông báo nổi (Toast Notifications) đẹp mắt.
   - Xem trước Hồ sơ người dùng / Bảng điều khiển (Dashboard Preview) sau khi đăng nhập thành công.

---

## 🚀 Cách Mở & Chạy Dự Án

### Cách 1: Mở trực tiếp bằng trình duyệt
Nhấp đúp chuột vào tệp [index.html](file:///d:/duanAPP/index.html) để mở trên Google Chrome, Microsoft Edge, Cốc Cốc hoặc trình duyệt yêu thích.

### Cách 2: Chạy qua Local Server
Máy chủ cục bộ đang chạy tại:
👉 **[http://localhost:5500](http://localhost:5500)**

---

## 📁 Cấu Trúc Thư Mục

- [index.html](file:///d:/duanAPP/index.html): Cấu trúc ngữ nghĩa HTML5, tối ưu SEO, hỗ trợ Accessibility.
- [style.css](file:///d:/duanAPP/style.css): Hệ thống thiết kế CSS variables, Glassmorphism, Animation, Responsive.
- [app.js](file:///d:/duanAPP/app.js): Xử lý toàn bộ logic tương tác, xác thực, Google simulation, theme toggle, lưu trữ trạng thái.
