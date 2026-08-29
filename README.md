# HCKR - Phone Audio Analysis Dashboard

A Node.js web application with a hacker-themed interface for analyzing extracted audio files from devices.

## Features

- 🔐 Secure login system with role-based access (Super Admin / User)
- 📱 Phone number input for device analysis
- 🔍 Hacker-themed dashboard with terminal aesthetics
- 🎵 Audio file extraction and playback
- ⚠️ Security warnings and compliance messaging
- 📊 Real-time audio file status display
- 🎨 Dark mode with green terminal styling

## Quick Start

### Local Development

1. **Install dependencies:**
```bash
npm install
```

2. **Start the server:**
```bash
npm start
```

3. **Access the application:**
Open your browser and navigate to `http://localhost:3000`

### Login Credentials

| Email | Password | Role |
|-------|----------|------|
| admin@hckr.com | admin@hckr.com | Super Admin |
| shameemkm09@gmail.com | shameemkm09@gmail.com | User |

**Default Phone Number:** +91 98465 54518

## Project Structure

```
hckr/
├── server.js              # Express server & API endpoints
├── package.json           # Dependencies
├── public/
│   ├── login.html        # Login interface
│   └── dashboard.html    # Main analysis dashboard
├── audio/                # Audio files directory (23 extracted voice files)
└── README.md            # This file
```

## Deployment to Hostinger Business Plan

### Prerequisites
- Node.js 14+ installed on your Hostinger account
- SSH access to your hosting
- Basic command line knowledge

### Step-by-Step Deployment

#### 1. Upload Files to Hostinger

```bash
# Via SSH or FTP
# Upload all files to your hosting directory (e.g., /home/yourusername/hckr/)
scp -r ./* username@your-hostinger-ip:/home/yourusername/hckr/
```

#### 2. Install Dependencies via SSH

```bash
ssh username@your-hostinger-ip
cd /home/yourusername/hckr
npm install
```

#### 3. Configure Node.js (if using cPanel/WHM)

- Go to **cPanel** → **Node.js**
- Create a new **Node.js Application**
- Set:
  - **App mode:** Production
  - **App root:** `/home/yourusername/hckr`
  - **App URL:** Your domain (e.g., `example.com`)
  - **App startup file:** `server.js`
  - **Port:** 3000 (or any available port)

#### 4. Set Environment Variables (Optional)

Create a `.env` file:
```
PORT=3000
NODE_ENV=production
```

#### 5. Start the Application

Via cPanel Node.js manager: Click **Start**

Or via SSH:
```bash
npm start
```

#### 6. Configure SSL/HTTPS (Recommended)

In cPanel:
- Go to **AutoSSL** or **Let's Encrypt SSL**
- Install certificate for your domain
- All traffic will be automatically redirected to HTTPS

### Restart Application

**Via cPanel:**
- Node.js → Select app → Click "Restart"

**Via SSH:**
```bash
npm start  # Or use PM2 for auto-restart
```

## API Endpoints

### Authentication
- `GET /` - Login page
- `POST /api/login` - Authenticate user
- `GET /api/logout` - Logout user

### Dashboard
- `GET /dashboard` - Main dashboard (requires login)
- `POST /api/analyze` - Analyze phone device (requires login)
- `GET /api/audio/:filename` - Stream audio file (requires login)

## Features Breakdown

### Login System
- Fixed credentials (no database required)
- Session-based authentication
- Role-based access control
- 24-hour session timeout

### Analysis Dashboard
- Phone number input with country code
- Pre-populated with example number (+91 98465 54518)
- Real-time audio file extraction display
- Hacker aesthetic with:
  - Green terminal styling
  - Scanline animations
  - Glitch effects
  - Matrix background
  - Pulsing warnings

### Audio Player
- Inline audio playback
- Multiple file formats supported (.ogg, .mp3, .wav, .m4a)
- File size and type display
- Status indicators

### Security Features
- Server-side session management
- Path traversal prevention
- Audio file validation
- MIME type checking
- User role validation on all endpoints

## Customization

### Change Login Credentials

Edit `server.js` line ~60:
```javascript
const credentials = {
  'your-email@domain.com': { password: 'your-password', role: 'super-admin' },
  'user-email@domain.com': { password: 'user-password', role: 'user' }
};
```

### Change UI Colors

Edit `public/dashboard.html` and `public/login.html` CSS variables:
```css
color: #00ff00;  /* Green terminal color */
border-color: #00ff00;
box-shadow: 0 0 20px rgba(0, 255, 0, 0.3);
```

### Change Port

Edit `server.js` last line or use environment variable:
```bash
PORT=8080 npm start
```

## Troubleshooting

### Port Already in Use
```bash
# Linux/Mac: Find and kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Windows: Use netstat and taskkill
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Audio Files Not Loading
- Ensure `audio/` folder exists in project root
- Check file permissions: `chmod 644 audio/*`
- Verify audio formats are supported (.ogg, .mp3, .wav, .m4a)

### Can't Connect to Server
- Check firewall settings
- Ensure port 3000 is open in Hostinger firewall
- Verify Node.js is running: `ps aux | grep node`

### Session Issues
- Clear browser cookies
- Check browser console for errors
- Verify cookies are enabled

## Performance Tips

1. **Use PM2 for Auto-Restart**
```bash
npm install -g pm2
pm2 start server.js
pm2 startup
pm2 save
```

2. **Enable Compression**
The app already includes gzip-compatible responses.

3. **Optimize Audio Files**
Pre-convert to .ogg format for better compatibility and smaller file sizes.

4. **Caching**
Browser cache headers are set for static assets.

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

Proprietary - For authorized use only

## Support

For deployment issues on Hostinger:
1. Check Hostinger documentation: https://support.hostinger.com
2. Verify Node.js version: `node --version`
3. Check error logs in cPanel: Error logs section
4. Restart Node.js application

## Notes

- All credentials and audio files are included for demonstration
- Session timeout is set to 24 hours
- Maximum file upload is limited by server configuration
- Audio files are streamed, not downloaded
- All connections should use HTTPS in production

---

**Last Updated:** 2024
**Version:** 1.0.0
