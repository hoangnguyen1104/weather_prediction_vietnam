# Vietnam Weather Prediction App

Ứng dụng dự báo thời tiết cho các thành phố Việt Nam, sử dụng dữ liệu thật từ OpenWeatherMap.

## Tính năng
- Xem thời tiết hiện tại và dự báo cho các thành phố lớn ở Việt Nam
- Hỗ trợ song ngữ Anh - Việt
- Tìm kiếm, xem chi tiết dự báo từng ngày
- Tự động chuyển đổi tên thành phố có dấu sang tên tiếng Anh phù hợp với OpenWeatherMap

## Hướng dẫn cài đặt

### 1. Cài đặt dependencies
```bash
npm install
```

### 2. Tạo file `.env` và cấu hình API key
Tạo file `.env` ở thư mục gốc dự án với nội dung:
```
VITE_OPENWEATHER_API_KEY=your_api_key
```
Thay `your_api_key` bằng key lấy tại [OpenWeatherMap](https://home.openweathermap.org/api_keys).

### 3. Chạy dự án
```bash
npm run dev
```
Sau đó truy cập địa chỉ hiển thị trên terminal (mặc định là http://localhost:5173 hoặc http://localhost:5174).

## Lưu ý khi sử dụng
- **Tên thành phố:**
  - Bạn có thể chọn thành phố bằng tiếng Việt có dấu hoặc tiếng Anh không dấu, chương trình sẽ tự động chuyển đổi sang tên phù hợp với OpenWeatherMap.
  - Nếu API trả về lỗi 401, hãy kiểm tra lại API key và tên thành phố truyền vào.
- **API key:**
  - Key mới tạo có thể mất vài phút để kích hoạt.
  - Không chia sẻ key công khai để tránh bị lạm dụng.

## Đóng góp
- Fork, tạo nhánh mới và gửi pull request nếu bạn muốn đóng góp thêm tính năng hoặc sửa lỗi.

---

**Chúc bạn sử dụng ứng dụng hiệu quả!** 