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

5. **Kho Quản Lý & Tải Lên Tệp Tin (File Upload Hub)**:
   - Hiển thị tự động sau khi đăng nhập thành công qua form hoặc Google OAuth.
   - Kéo & thả tệp tin (Drag & Drop) hoặc duyệt chọn nhiều tệp tin cùng lúc từ máy tính.
   - Hỗ trợ nhập trực tiếp dữ liệu thô (JSON / CSV / SQL / Text) kèm công cụ làm đẹp JSON tự động.
   - Hàng đợi tải lên hiển thị thanh tiến trình (Progress Bar) mô phỏng mã hóa thời gian thực.
   - Quản lý kho dữ liệu cá nhân: thống kê dung lượng đã dùng (10 GB quota), phân loại tệp (Tài liệu, Hình ảnh, Bảng tính, Code).
   - Tìm kiếm tệp tin tức thì theo tên/phần mở rộng, lọc theo danh mục, chuyển đổi linh hoạt chế độ Lưới (Grid) và Danh sách (List).
   - Xem trước nhanh nội dung tệp (Preview Modal: hình ảnh, bảng CSV, mã code định dạng chuẩn), sao chép và tải tệp về máy tính.
   - Modal xem hồ sơ chi tiết và đăng xuất an toàn khỏi hệ thống.

6. **Bảng Điều Khiển Quản Trị Viên (Admin Dashboard - admin.html)**:
   - Bảo mật bằng màn hình khoá với mã xác nhận bắt buộc: **`dashboard`**.
   - Quản lý toàn diện tài khoản & phiên đăng nhập của người dùng theo thời gian thực (đồng bộ tự động giữa các tab qua `localStorage`).
   - Thống kê thời gian thực: Tổng số tài khoản, số lượt đăng nhập hôm nay, tỷ lệ Google OAuth, số tài khoản bị vô hiệu hoá.
   - Quản lý trạng thái tài khoản: Bật/tắt trạng thái hoạt động (Active / Disabled) tức thì.
   - Xem chi tiết từng tài khoản: Lịch sử đăng nhập, địa chỉ IP giả lập, Provider, vai trò.
   - Tìm kiếm nâng cao, lọc theo Provider, trạng thái, thời gian, sắp xếp và phân trang.
   - Chế độ xem linh hoạt: Dạng bảng (Table View) và dạng thẻ (Grid View).
   - Xuất dữ liệu danh sách tài khoản ra file **CSV** chuẩn UTF-8.
   - Tuỳ chọn đổi mã xác nhận admin, xoá sạch nhật ký hoặc nạp lại dữ liệu mẫu.

---

## 🚀 Cách Mở & Chạy Dự Án

### Cách 1: Mở trực tiếp bằng trình duyệt
- Mở trang người dùng: Nhấp đúp chuột vào tệp [index.html](file:///d:/duanAPP/index.html).
- Mở bảng quản trị: Nhấp đúp chuột vào tệp [admin.html](file:///d:/duanAPP/admin.html) (Mã xác nhận: `dashboard`).

### Cách 2: Chạy qua Local Server
Máy chủ cục bộ đang chạy tại:
- Trang ứng dụng chính: 👉 **[http://localhost:5500](http://localhost:5500)**
- Trang quản trị Admin: 👉 **[http://localhost:5500/admin.html](http://localhost:5500/admin.html)**

---

## 📁 Cấu Trúc Thư Mục

- [index.html](file:///d:/duanAPP/index.html): Cấu trúc trang xác thực & Kho tải lên tệp tin.
- [style.css](file:///d:/duanAPP/style.css): Hệ thống thiết kế CSS variables, Glassmorphism, Animation, Responsive cho trang người dùng.
- [app.js](file:///d:/duanAPP/app.js): Xử lý toàn bộ logic tương tác người dùng, upload tệp tin, xem trước, lưu trữ phiên.
- [admin.html](file:///d:/duanAPP/admin.html): Giao diện bảng điều khiển quản trị viên và màn hình khoá bảo vệ.
- [admin.css](file:///d:/duanAPP/admin.css): Thiết kế chuyên biệt cho hệ thống quản trị, bảng dữ liệu, thanh điều hướng sidebar.
- [admin.js](file:///d:/duanAPP/admin.js): Toàn bộ nghiệp vụ xác thực mã `dashboard`, quản lý tài khoản, lọc, tìm kiếm, xuất CSV, đồng bộ realtime.
- [sync.bat](file:///d:/duanAPP/sync.bat): Script 1-click đẩy mọi thay đổi lên GitHub ngay lập tức.
- [auto_watch.bat](file:///d:/duanAPP/auto_watch.bat): Chế độ tự động phát hiện khi lưu file (Ctrl+S) và tự động push lên GitHub theo thời gian thực.

---

## 🔄 Tự Động Đồng Bộ Thay Đổi Lên GitHub

Repository: **[hominhkha2k9-cmyk/HMK](https://github.com/hominhkha2k9-cmyk/HMK)**

### Lựa chọn 1: Chế độ 1-Click (`sync.bat`)
Mỗi khi bạn muốn đẩy các thay đổi vừa làm lên GitHub:
- Nhấp đúp vào [sync.bat](file:///d:/duanAPP/sync.bat).
- Hoặc mở terminal gõ: `.\sync.bat "tin nhắn commit tùy ý"`.

### Lựa chọn 2: Chế độ Tự Động Thời Gian Thực (`auto_watch.bat`)
- Nhấp đúp vào [auto_watch.bat](file:///d:/duanAPP/auto_watch.bat) để bật chế độ theo dõi.
- Cứ mỗi khi bạn nhấn **Ctrl + S** để lưu bất kỳ file nào (`index.html`, `style.css`, `app.js`...), hệ thống sẽ tự động gom thay đổi, tạo commit kèm mốc thời gian và push thẳng lên GitHub.
- Nhấn **Ctrl + C** trong cửa sổ bất kỳ lúc nào nếu muốn dừng theo dõi.
