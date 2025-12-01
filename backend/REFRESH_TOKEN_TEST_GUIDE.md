# Hướng dẫn Kiểm tra Chức năng Refresh Token

## Các cải tiến đã thực hiện:

### 1. ✅ Thêm Validation trong Controller
- Kiểm tra refresh token không null hoặc rỗng
- Trả về HTTP 400 nếu thiếu refresh token

### 2. ✅ Xóa Refresh Token khi Logout  
- Khi logout, xóa tất cả refresh tokens của user khỏi Redis
- Ngăn chặn việc sử dụng refresh token sau khi logout

### 3. ✅ Refresh Token Rotation
- Mỗi lần refresh, tạo refresh token mới
- Xóa refresh token cũ để tăng bảo mật
- Theo best practice của OAuth 2.0

### 4. ✅ Thêm Repository Methods
- `findByUsername(String username)` - Tìm refresh tokens theo username
- `deleteByUsername(String username)` - Xóa tất cả refresh tokens của user

## Test Cases

### Test 1: Đăng nhập thành công
```bash
# Request
POST http://localhost:8080/login
Content-Type: application/json

{
  "username": "testuser",
  "password": "password123"
}

# Expected Response (200 OK)
{
  "token": "eyJhbGc...",
  "refreshToken": "eyJhbGc..."
}
```

### Test 2: Refresh token thành công
```bash
# Request
POST http://localhost:8080/refresh-token
Content-Type: application/json

{
  "refreshToken": "eyJhbGc..." # Token từ login response
}

# Expected Response (200 OK)
{
  "token": "eyJhbGc...",        # Access token MỚI
  "refreshToken": "eyJhbGc..."  # Refresh token MỚI (khác token cũ)
}

# ✅ Kiểm tra: Token cũ không thể dùng lại
```

### Test 3: Refresh token với token không hợp lệ
```bash
# Request
POST http://localhost:8080/refresh-token
Content-Type: application/json

{
  "refreshToken": "invalid_token"
}

# Expected Response (401 UNAUTHORIZED)
"Invalid or expired refresh token"
```

### Test 4: Refresh token với token rỗng
```bash
# Request
POST http://localhost:8080/refresh-token
Content-Type: application/json

{
  "refreshToken": ""
}

# Expected Response (400 BAD REQUEST)
"Refresh token is required"
```

### Test 5: Refresh token với token null
```bash
# Request
POST http://localhost:8080/refresh-token
Content-Type: application/json

{}

# Expected Response (400 BAD REQUEST)
"Refresh token is required"
```

### Test 6: Logout và kiểm tra refresh token bị vô hiệu hóa
```bash
# Step 1: Login
POST http://localhost:8080/login
{
  "username": "testuser",
  "password": "password123"
}

# Response: Lưu lại token và refreshToken

# Step 2: Logout
POST http://localhost:8080/logout
Authorization: Bearer {token}

# Expected Response (200 OK)
"Logout success"

# Step 3: Thử refresh với token cũ
POST http://localhost:8080/refresh-token
{
  "refreshToken": "{refreshToken từ step 1}"
}

# Expected Response (401 UNAUTHORIZED)
"Invalid or expired refresh token"

# ✅ Refresh token đã bị xóa khỏi Redis
```

### Test 7: Refresh token rotation (không thể dùng lại token cũ)
```bash
# Step 1: Login và lấy refresh token
POST http://localhost:8080/login
# Response: refreshToken1

# Step 2: Refresh lần đầu
POST http://localhost:8080/refresh-token
{
  "refreshToken": "refreshToken1"
}
# Response: refreshToken2 (MỚI)

# Step 3: Thử dùng lại refreshToken1
POST http://localhost:8080/refresh-token
{
  "refreshToken": "refreshToken1"
}

# Expected Response (401 UNAUTHORIZED)
"Invalid or expired refresh token"

# ✅ Refresh token rotation hoạt động đúng
```

### Test 8: Access token hết hạn, dùng refresh token để lấy mới
```bash
# Step 1: Đợi access token hết hạn (hoặc dùng token đã hết hạn)
GET http://localhost:8080/demo
Authorization: Bearer {expired_access_token}

# Expected Response (401 UNAUTHORIZED)

# Step 2: Dùng refresh token để lấy access token mới
POST http://localhost:8080/refresh-token
{
  "refreshToken": "{valid_refresh_token}"
}

# Expected Response (200 OK)
{
  "token": "new_access_token",
  "refreshToken": "new_refresh_token"
}

# Step 3: Dùng access token mới
GET http://localhost:8080/demo
Authorization: Bearer {new_access_token}

# Expected Response (200 OK)
"Hello! Bạn đã xác thực thành công."
```

## Kiểm tra trong Redis

### Xem refresh tokens trong Redis
```bash
# Kết nối Redis CLI
redis-cli

# Xem tất cả keys
KEYS *

# Xem refresh token info
KEYS refresh_token:*

# Xem chi tiết một refresh token
HGETALL refresh_token:{jwtId}

# Kiểm tra TTL
TTL refresh_token:{jwtId}
```

### Kiểm tra sau logout
```bash
# Sau khi logout, kiểm tra refresh tokens của user
KEYS refresh_token:*

# ✅ Không còn refresh token của user đã logout
```

## Flow bảo mật chuẩn

```
1. Login → Nhận access_token (15 phút) + refresh_token (30 ngày)
2. Dùng access_token để gọi API
3. Access_token hết hạn → Dùng refresh_token lấy cặp token mới
4. Refresh_token cũ bị xóa (rotation)
5. Logout → Cả access_token và refresh_token bị vô hiệu hóa
```

## Lưu ý quan trọng

- ✅ Refresh token được lưu trong Redis với TTL = 30 ngày
- ✅ Mỗi lần refresh, token cũ bị xóa và tạo token mới (rotation)
- ✅ Logout xóa tất cả refresh tokens của user
- ✅ Access token có thời gian sống ngắn (config trong application.properties)
- ✅ Refresh token có thời gian sống dài (30 ngày = 2592000 giây)

## Các vấn đề đã được sửa

1. ❌ **Trước:** Refresh token không bị xóa khi logout → ✅ **Sau:** Xóa tất cả refresh tokens
2. ❌ **Trước:** Refresh token được tái sử dụng → ✅ **Sau:** Rotation - token mới mỗi lần refresh  
3. ❌ **Trước:** Không validation input → ✅ **Sau:** Kiểm tra null/empty
4. ❌ **Trước:** Thiếu @Transactional cho delete query → ✅ **Sau:** Thêm annotation
