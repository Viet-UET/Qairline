# Frontend-Backend Connection Testing Guide

## 🚀 Quick Start - Development Mode

### 1. Ensure Backend is Running

```bash
# Backend should be running on port 8080
curl http://localhost:8080/actuator/health
# Should return: {"status":"UP"}
```

### 2. Start Frontend in Development Mode

```bash
cd /home/longha/Desktop/Qairline/frontend
npm run dev
```

Frontend will be available at: **http://localhost:5173**

## 🧪 Testing Connection

### Method 1: Browser Console (Recommended)

1. Open Frontend: http://localhost:5173
2. Open Browser DevTools: `F12` or `Right-click → Inspect`
3. Go to **Console** tab
4. Run commands:

```javascript
// Test 1: Check API configuration
testAPI.printConfig()

// Test 2: Test connection to backend
await testAPI.testConnection()

// Test 3: Test login
await testAPI.testLogin('username', 'password')

// Test 4: Run all tests
await testAll()
```

### Expected Output for Successful Connection

```
=== API Configuration ===
Base URL: http://localhost:8080
With Credentials: true
Headers: {Common: {}, Delete: {}, Get: {}, Head: {}, Post: {}, Put: {}, Patch: {}}
Token: Not set
========================

✓ Connection successful: {status: "UP"}
✓ Login successful: {token: "...", user: {...}}
```

## 🔍 API Endpoint Testing

### Available Test Commands

```javascript
// 1. Test connection
await testAPI.testConnection()
// Calls: GET /actuator/health

// 2. Test login
await testAPI.testLogin('admin', 'password123')
// Calls: POST /auth/login
// Returns: {token, user}

// 3. Check auth status
await testAPI.testAuthStatus()
// Calls: GET /auth/status
// Requires: Valid token

// 4. Test logout
await testAPI.testLogout()
// Calls: POST /auth/logout
// Clears token from localStorage

// 5. Print current config
testAPI.printConfig()
// Shows API base URL, headers, and stored token

// 6. Run all tests at once
await testAll()
// Runs tests 1, 3 (tests 2 requires credentials)
```

## 📋 Troubleshooting

### Issue 1: "Cannot reach backend"

**Error Message:**
```
✗ Connection failed: Network Error
```

**Solutions:**
1. Check if backend is running:
   ```bash
   curl http://localhost:8080/actuator/health
   ```

2. Check API base URL:
   ```javascript
   testAPI.printConfig()
   // Should show: Base URL: http://localhost:8080
   ```

3. If showing wrong URL, check your environment:
   ```bash
   # In frontend directory, check if .env has:
   VITE_API_URL=http://localhost:8080
   ```

### Issue 2: Login fails with 401

**Error Message:**
```
✗ Login failed: {status: 401, message: "Invalid credentials"}
```

**Solutions:**
1. Verify username and password exist in backend database
2. Check backend logs for auth errors
3. Ensure CORS is configured correctly in backend

### Issue 3: CORS errors in browser

**Browser Console Error:**
```
Access to XMLHttpRequest from origin 'http://localhost:5173' has been blocked by CORS policy
```

**Solutions:**
1. Add CORS configuration to backend
2. Ensure backend allows `http://localhost:5173`
3. Backend should have:
   ```properties
   APP_FRONTEND_URL=http://localhost:5173
   ```

### Issue 4: Token not being saved

**Check localStorage:**
```javascript
// In browser console
localStorage.getItem('token')
// Should return token string, not null
```

**If token is null:**
1. Check login response includes `token` field
2. Verify the backend returns correct token in response

## 🔐 Authentication Flow Test

### Step-by-Step Test

1. **Clear any existing login:**
   ```javascript
   localStorage.clear()
   testAPI.printConfig()
   // Should show Token: Not set
   ```

2. **Test login:**
   ```javascript
   const result = await testAPI.testLogin('admin', 'password123')
   console.log('Token received:', result.token)
   ```

3. **Verify token saved:**
   ```javascript
   localStorage.getItem('token')
   // Should show the token
   ```

4. **Test authenticated request:**
   ```javascript
   await testAPI.testAuthStatus()
   // Should show user info
   ```

5. **Test logout:**
   ```javascript
   await testAPI.testLogout()
   localStorage.getItem('token')
   // Should return null
   ```

## 📊 Network Debugging

### Check Network Requests

1. Open DevTools → **Network** tab
2. Try to login
3. Look for request to `POST /auth/login`
4. Check **Response** tab to see backend response

### View Request Headers

1. Click on the login request in Network tab
2. Go to **Headers** tab
3. Should show:
   ```
   Request Headers:
   - Content-Type: application/json
   - Authorization: (if token set)
   
   Response Headers:
   - Set-Cookie: (if session-based)
   ```

## 🛠️ Manual Testing with curl

```bash
# Test 1: Check backend is running
curl -i http://localhost:8080/actuator/health

# Test 2: Login request
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"password123"}'

# Test 3: With token (replace TOKEN)
curl -i http://localhost:8080/api/auth/status \
  -H "Authorization: Bearer TOKEN"
```

## 📝 Login Component Notes

The updated Login component now:
- ✓ Uses axios instance for consistent configuration
- ✓ Shows loading state during submission
- ✓ Provides detailed error messages
- ✓ Saves JWT token to localStorage
- ✓ Logs API URL for debugging
- ✓ Handles network errors gracefully

## 🔗 Important Files

- **API Configuration:** `/src/api/axios.js`
- **Test API:** `/src/api/test.js`
- **Login Component:** `/src/pages/Auth/Login/Login.jsx`
- **Main Entry:** `/src/main.jsx`

## 📚 Next Steps

1. ✓ Start frontend: `npm run dev`
2. ✓ Open http://localhost:5173
3. ✓ Open browser console (F12)
4. ✓ Run: `testAPI.printConfig()`
5. ✓ Verify API URL is correct
6. ✓ Test login with real credentials
7. ✓ Monitor Network tab for requests/responses

## 💡 Tips

- Always check browser console for axios/fetch errors
- Use Network tab to see actual HTTP requests
- Token should be JWT format (three parts separated by dots)
- localStorage persists across page refreshes
- Clear localStorage if getting weird auth issues: `localStorage.clear()`

## 📞 Common Issues Checklist

- [ ] Backend running on 8080? `curl localhost:8080/actuator/health`
- [ ] Frontend running on 5173? Check terminal output
- [ ] Can reach backend? `testAPI.testConnection()`
- [ ] API URL correct? `testAPI.printConfig()`
- [ ] Valid credentials? Check backend user table
- [ ] CORS configured? Check backend logs
- [ ] Token saving? Check localStorage in DevTools
- [ ] Network working? Check Network tab in DevTools
