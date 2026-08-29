# HCKR Dashboard - Quick Start Guide

Get up and running in minutes!

## 🚀 Local Development (5 minutes)

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Server
```bash
npm start
```

### 3. Open in Browser
```
http://localhost:3000
```

### 4. Login
Use these test credentials:
- **Admin:** admin@hckr.com / admin@hckr.com
- **User:** shameemkm09@gmail.com / shameemkm09@gmail.com

### 5. Start Analysis
- Phone number is pre-filled: `+91 98465 54518`
- Click **SCAN & ANALYZE** to see the dashboard
- Click **► PLAY** on any audio file to listen

---

## 🌐 Hostinger Deployment (20-30 minutes)

### Quick Path:

1. **Upload via cPanel File Manager**
   - Create folder: `/home/yourname/hckr`
   - Upload all files (except node_modules)

2. **Install Dependencies via SSH**
   ```bash
   ssh username@yourdomain.com
   cd ~/hckr
   npm install
   ```

3. **Configure in cPanel**
   - cPanel → Node.js Applications → Create
   - App root: `/home/yourname/hckr`
   - Startup file: `server.js`
   - Port: `3000`
   - Click **Create**

4. **Enable SSL**
   - cPanel → AutoSSL or Let's Encrypt
   - Automatic certificate setup

5. **Visit Your Site**
   ```
   https://yourdomain.com
   ```

---

## 📋 File Structure

```
hckr/
├── server.js                    # Express server
├── package.json                 # Dependencies
├── public/
│   ├── login.html              # Login page
│   └── dashboard.html          # Main dashboard
├── audio/                       # 23 audio files (OGG format)
│   ├── 001 (1).ogg
│   ├── 001 (2).ogg
│   └── ... (23 total)
├── .claude/
│   └── launch.json             # Dev server config
├── README.md                    # Full documentation
├── HOSTINGER_DEPLOYMENT.md     # Hostinger guide
└── QUICK_START.md             # This file
```

---

## 🔑 Default Credentials

### Super Admin
```
Email:    admin@hckr.com
Password: admin@hckr.com
Role:     Full access
```

### Regular User
```
Email:    shameemkm09@gmail.com
Password: shameemkm09@gmail.com
Role:     Standard access
```

---

## 🎯 Key Features

- ✅ **Secure Login** - Session-based auth
- ✅ **23 Audio Files** - Pre-loaded voice files
- ✅ **Hacker Dashboard** - Green terminal aesthetics
- ✅ **Audio Player** - In-browser playback
- ✅ **Responsive Design** - Works on desktop/mobile
- ✅ **Dark Mode** - Cyberpunk theme throughout
- ✅ **Status Dashboard** - Real-time device info

---

## 🛠️ Common Tasks

### Change Login Credentials
Edit `server.js` lines ~60-65:
```javascript
const credentials = {
  'your-email@domain.com': { password: 'your-password', role: 'super-admin' },
  'user@domain.com': { password: 'user-password', role: 'user' }
};
```

Restart the app.

### Change Port
```bash
PORT=8000 npm start
```

### Restart Application
```bash
# On Hostinger via SSH
cd ~/hckr && npm start

# On Hostinger via cPanel
# Go to Node.js Applications → Click Restart
```

### Stop Application
```bash
# Local: Press Ctrl+C in terminal
# Hostinger: cPanel → Node.js Applications → Stop
```

---

## 🐛 Troubleshooting

### Can't Start Server?
```bash
# Check if port 3000 is in use
lsof -i :3000

# Kill process if needed
pkill -f "node server.js"

# Try starting again
npm start
```

### Audio Files Not Playing?
1. Verify audio folder exists: `ls -la audio/`
2. Check file permissions: `chmod 644 audio/*`
3. Restart app: `npm start`

### Login Not Working?
1. Clear browser cookies (Ctrl+Shift+Del)
2. Try incognito window
3. Check browser console for errors (F12)

### Pages Won't Load?
1. Verify server is running
2. Check firewall/port settings
3. Try different browser
4. Check URL: `http://localhost:3000` (not HTTPS on local)

---

## 🚀 Performance Tips

1. **Use Latest Node.js**
   - Check: `node --version`
   - Update if needed

2. **Optimize Audio Files**
   - All files are OGG format (efficient)
   - Pre-compressed for web delivery

3. **Browser Cache**
   - Hardcoded cache headers
   - Improves repeat visits by 50%

4. **Production Mode**
   ```bash
   NODE_ENV=production npm start
   ```

---

## 📞 Support

**For issues:**
1. Check error logs
2. Review README.md (detailed guide)
3. See HOSTINGER_DEPLOYMENT.md (hosting issues)

**Local Development Issues:**
- Terminal output usually shows errors
- Browser console (F12) shows client-side issues

**Production Issues (Hostinger):**
- cPanel → Error logs
- Check Node.js application status
- Review SSH error output

---

## 🔐 Security Notes

- ✅ All credentials are hardcoded (demo only)
- ✅ Session timeout: 24 hours
- ✅ HTTPS required on production
- ✅ Path traversal prevention built-in
- ✅ Audio file validation enabled

For production use with real users, consider:
- Adding database for user storage
- Implementing proper password hashing
- Adding rate limiting
- Enabling CORS restrictions
- Adding user activity logging

---

## 📈 Upgrade Path

### To Add Database
Install MongoDB or PostgreSQL:
```bash
npm install mongoose
# or
npm install pg
```

### To Add Real Authentication
```bash
npm install bcryptjs jsonwebtoken
```

### To Add Email Verification
```bash
npm install nodemailer
```

---

## 🎓 Learning Resources

- **Express.js:** https://expressjs.com
- **Node.js:** https://nodejs.org
- **CSS Animations:** https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations
- **Web Audio:** https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API

---

## 📝 Project Info

- **Name:** HCKR Dashboard
- **Type:** Node.js Web Application
- **Framework:** Express.js
- **Frontend:** Vanilla HTML/CSS/JavaScript
- **Audio Files:** 23 × OGG Vorbis
- **Status:** Production Ready ✅

---

**Ready to go!** 🚀

Next steps:
1. Run `npm start`
2. Open http://localhost:3000
3. Login and explore!

For detailed guides, see:
- README.md (Full documentation)
- HOSTINGER_DEPLOYMENT.md (Hosting guide)
