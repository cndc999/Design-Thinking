# Chăm Sóc Thú Cưng — Pet Care App

Ứng dụng prototype HTML/CSS/JavaScript chăm sóc thú cưng.

## Cấu trúc dự án (modular)

```
petcare/
├── index.html           ← Shell duy nhất
├── css/
│   ├── tokens.css       ← Biến màu, reset
│   ├── layout.css       ← Phone frame, topnav, screen
│   ├── components.css   ← Button, form, card, tag, toast
│   └── screens.css      ← Style riêng từng màn hình
├── js/
│   ├── state.js         ← Data, breed images, SVG icons
│   ├── nav.js           ← goTo(), goBack(), goHome(), topnav
│   ├── screens.js       ← HTML template cho 8 màn hình
│   └── app.js           ← Event binding, handlers, init
└── README.md
```

## Cách chạy

1. Giải nén petcare.zip
2. Mở VS Code → File → Open Folder → chọn thư mục petcare
3. Cài extension "Live Server" (Ritwick Dey)
4. Chuột phải index.html → Open with Live Server
5. App mở tại http://127.0.0.1:5500

## Flow

Intro → Tạo hồ sơ → Chọn giống → Thông tin → Trang chủ → Chọn thú cưng → Đặt lịch → Thành công

Tất cả màn hình (trừ Intro/Home) đều có nút Quay lại + Về trang chủ ở topnav.
