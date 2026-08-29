# HCKR Dashboard - Hostinger Business Plan Deployment Guide

Complete step-by-step guide to deploy the HCKR Phone Audio Analysis Dashboard on Hostinger Business Plan.

## Prerequisites

✓ Active Hostinger Business Plan
✓ cPanel access (included with Business Plan)
✓ SSH access enabled
✓ Node.js support enabled on your hosting
✓ At least 500MB disk space
✓ Your own domain name

## Deployment Steps

### Step 1: Prepare Your Files

1. **Download/Prepare the application**
   - Ensure you have all project files:
     ```
     hckr/
     ├── server.js
     ├── package.json
     ├── public/
     │   ├── login.html
     │   └── dashboard.html
     ├── audio/
     │   └── (23 audio files)
     └── README.md
     ```

2. **Create a .zip file**
   - Compress all files into `hckr.zip`
   - Do NOT include `node_modules/` folder

### Step 2: Upload to Hostinger via cPanel File Manager

1. **Log in to cPanel**
   - Go to: `cpanel.yourdomain.com` or use Hostinger's client panel
   - Username: Your cPanel username
   - Password: Your cPanel password

2. **Navigate to File Manager**
   - Click on **File Manager** in cPanel
   - Navigate to your home directory (e.g., `/home/yourusername/`)
   - Create a new folder: **hckr**

3. **Upload Files**
   - Click **Upload** button
   - Select your `hckr.zip` file
   - Wait for upload to complete
   - Right-click on `hckr.zip` → **Extract**
   - Delete the `hckr.zip` file

### Step 3: SSH Access (Alternative Upload Method)

If you prefer SSH (faster for large files):

```bash
# From your local machine terminal
scp -r ./hckr/* username@yourdomain.com:/home/yourusername/hckr/

# Then connect via SSH
ssh username@yourdomain.com
cd ~/hckr
```

### Step 4: Install Node.js Dependencies

1. **Via cPanel File Manager Terminal** (if available):
   - File Manager → Open Terminal button
   - Navigate: `cd ~/hckr`
   - Run: `npm install`

2. **Via SSH** (Recommended):
   ```bash
   ssh username@yourdomain.com
   cd ~/hckr
   npm install
   ```

   Expected output:
   ```
   added 72 packages, audited 73 packages
   found 0 vulnerabilities
   ```

### Step 5: Configure Node.js Application in cPanel

1. **Go to cPanel → Node.js**
   - Click on **Node.js Manager** or **Node.js Applications**

2. **Create New Application**
   - Click **Create Application** button
   - Fill in the form:

   ```
   Node.js Version:      16.x or 18.x (latest stable)
   Application Mode:     Production
   Application root:     /home/yourusername/hckr
   Application startup file:  server.js
   Application URL:      yourdomain.com
                        (or subdomain.yourdomain.com)
   Application port:     3000
   Passenger log file:   Leave as default
   ```

3. **Click Create**
   - Wait for the application to start
   - Status should show: **Running**

### Step 6: Set Up SSL/HTTPS Certificate

1. **Automatic SSL (AutoSSL)**
   - cPanel → **AutoSSL**
   - Your domain should be auto-configured
   - Wait for certificate installation (5-10 minutes)

2. **Manual SSL (Let's Encrypt)**
   - cPanel → **Let's Encrypt SSL**
   - Select your domain
   - Click **Issue Certificate**
   - Wait for completion

### Step 7: Enable Reverse Proxy (Important!)

1. **cPanel → EasyApache**
   - Ensure **mod_proxy** is enabled
   - Or configure through **AutoSSL/HTTPS**

2. **Alternative: Configure .htaccess**
   - Create `.htaccess` in your `public_html` folder (if needed):
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule ^(.*)$ http://localhost:3000/$1 [P,L]
   </IfModule>
   ```

### Step 8: Verify Installation

1. **Test the application:**
   - Open browser: `https://yourdomain.com`
   - You should see the login page
   - Login credentials:
     - Email: `admin@hckr.com`
     - Password: `admin@hckr.com`

2. **Check logs if there are issues:**
   - cPanel → Error logs
   - Look for Node.js application errors

3. **Restart application:**
   - cPanel → Node.js Applications
   - Find your app → Click **Restart**

## Troubleshooting

### Application Won't Start

**Error: "Port 3000 already in use"**
```bash
# Via SSH, find and kill the process
lsof -ti:3000 | xargs kill -9

# Then restart from cPanel
```

**Error: "Module not found"**
```bash
ssh username@yourdomain.com
cd ~/hckr
npm install
```

### Audio Files Not Loading

1. **Check file permissions:**
   ```bash
   chmod 755 audio
   chmod 644 audio/*
   ```

2. **Verify audio folder exists:**
   ```bash
   ls -la audio/
   ```

3. **Check file ownership:**
   ```bash
   chown -R username:username ~/hckr
   ```

### Can't Access via Domain

1. **Verify DNS records**
   - Hostinger Panel → Domain Management
   - Check A record points to your IP
   - Allow 24-48 hours for propagation

2. **Check firewall**
   - cPanel → Firewall
   - Ensure port 3000 is not blocked
   - Or configure through reverse proxy

3. **Check if Node.js app is running**
   - cPanel → Node.js Applications
   - Status should be: **Running**
   - If not, click **Start**

### SSL Certificate Issues

1. **Clear cache:**
   - Open incognito/private browser window
   - Try accessing `https://yourdomain.com`

2. **Re-issue certificate:**
   - cPanel → AutoSSL or Let's Encrypt
   - Remove certificate
   - Re-issue new certificate

### Session/Login Issues

1. **Clear browser cookies:**
   - Browser settings → Clear site data
   - Refresh page

2. **Restart Node.js app:**
   - cPanel → Node.js Applications
   - Click **Restart**

## Performance Optimization

### 1. Enable PM2 for Auto-Restart (Optional)

```bash
ssh username@yourdomain.com
npm install -g pm2
pm2 start server.js
pm2 startup
pm2 save
```

### 2. Enable Gzip Compression

Add to top of `server.js`:
```javascript
import compression from 'compression';
app.use(compression());
```

Then update package.json dependencies:
```bash
npm install compression
```

### 3. Optimize Audio Files

Pre-convert audio to OGG format:
```bash
# Using FFmpeg (if available)
ffmpeg -i input.mp3 -c:a libvorbis -q:a 4 output.ogg
```

### 4. Set Cache Headers

The app already includes cache-friendly responses. To enhance:

Add to `server.js`:
```javascript
app.use(express.static(path.join(__dirname, 'public'), {
  maxAge: '1h'
}));
```

## Maintenance

### Regular Tasks

1. **Weekly:**
   - Check cPanel for error logs
   - Verify application is running
   - Test login functionality

2. **Monthly:**
   - Check disk space usage: `df -h`
   - Review Node.js logs
   - Update SSL certificate status

3. **As Needed:**
   - Update Node.js version: cPanel → Node.js → Change version
   - Backup application: cPanel → Backup
   - Restart application if issues occur

### Backup and Restore

**Backup:**
1. cPanel → Backup → Full Backup
2. Or manual backup: `zip -r backup.zip ~/hckr`

**Restore:**
1. cPanel → Restore → Select backup
2. Or manual: `unzip -r backup.zip`

## Accessing Application Logs

```bash
# Via SSH
ssh username@yourdomain.com

# View Node.js error logs
cat ~/hckr/error.log

# View combined logs
tail -f ~/hckr/error.log

# Clear old logs
rm ~/hckr/*.log
```

## Change Credentials (Optional)

Edit `server.js` line ~60:

```javascript
const credentials = {
  'your-email@domain.com': { password: 'your-password', role: 'super-admin' },
  'another-email@domain.com': { password: 'another-password', role: 'user' }
};
```

Then restart application from cPanel.

## Upgrade Node.js Version

1. cPanel → Node.js Applications
2. Select your app → Click **Restart**
3. Change Node.js version dropdown
4. Click **Change version**
5. Wait for automatic restart

## Monitoring and Alerts

### Set Up Email Alerts (Hostinger Features)

1. Hostinger Panel → Email Alerts
2. Enable:
   - Daily disk usage report
   - CPU usage alerts
   - Bandwidth usage alerts

### Manual Monitoring Script

Create `monitor.sh`:
```bash
#!/bin/bash

# Check if Node.js app is running
if ! pgrep -f "node.*server.js" > /dev/null; then
  cd ~/hckr && npm start &
  echo "App restarted at $(date)" >> monitor.log
fi
```

Run via cron:
```bash
crontab -e
# Add: */5 * * * * ~/hckr/monitor.sh
```

## Useful Hostinger Resources

- **Support:** https://support.hostinger.com
- **cPanel Tutorials:** https://hostinger.com/cpanel-tutorials
- **Node.js Hosting Guide:** https://hostinger.com/nodejs-hosting
- **SSL Certificate Help:** https://hostinger.com/ssl-certificate-setup

## Support Contact

For Hostinger-specific issues:
- **Email:** support@hostinger.com
- **Live Chat:** Available 24/7 in Hostinger panel
- **Ticket System:** Hostinger Panel → Support

For application-specific issues:
- Check error logs in cPanel
- Review README.md included in project
- Verify all audio files exist in `/audio` folder

## Success Checklist

- ✓ Files uploaded to cPanel
- ✓ npm install completed successfully
- ✓ Node.js application created in cPanel
- ✓ Application status shows "Running"
- ✓ SSL certificate installed
- ✓ Domain resolves to application
- ✓ Login page loads at https://yourdomain.com
- ✓ Can log in with admin credentials
- ✓ Audio files display and play
- ✓ Logout works correctly

## Estimated Time

- Upload files: 5-10 minutes
- Install dependencies: 2-5 minutes
- Configure cPanel: 5 minutes
- SSL setup: 5-10 minutes
- First test: 2 minutes
- **Total: 20-35 minutes**

---

**Last Updated:** 2024
**Version:** 1.0.0
**Status:** Production Ready
