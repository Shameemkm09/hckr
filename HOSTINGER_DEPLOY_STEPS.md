# HCKR Dashboard - Hostinger Deployment - STEP BY STEP

## ⏱️ Total Time: 20-30 minutes

---

## STEP 1: Prepare Your Files (5 minutes)

### What you need:
- [ ] Hostinger Business Plan active
- [ ] cPanel username & password
- [ ] Your domain name
- [ ] SSH access enabled (ask Hostinger if not)

### Check your project is ready:
```bash
# Verify all files exist
ls -la                    # Should show: server.js, package.json, public/, audio/
npm install              # Already done
git status              # Should show: On branch master
```

✅ **Status Check: PASS** - Project ready

---

## STEP 2: Create Files for Upload (2 minutes)

### Option A: Create ZIP file (Easiest)

```bash
# Exclude node_modules (they'll be reinstalled)
zip -r hckr_production.zip \
  server.js \
  package.json \
  package-lock.json \
  public/ \
  audio/ \
  .env.example \
  README.md \
  QUICK_START.md
```

✅ **Result:** `hckr_production.zip` file ready

### Option B: Use Git (Recommended for updates)
Skip to Step 3 if using git clone method.

---

## STEP 3: Upload to Hostinger - METHOD 1: cPanel File Manager (Easiest)

### Login to cPanel:
1. Go to: **https://cpanel.yourdomain.com**
   - Or use Hostinger's client panel
   - Username: Your cPanel username
   - Password: Your cPanel password

2. Click **File Manager**

### Create folder and upload:

3. Navigate to home directory `/home/yourusername/`

4. **Create New Folder:**
   - Right-click → **Create Folder**
   - Name: `hckr`
   - Click **Create**

5. **Double-click** `hckr` folder to open it

6. **Upload Files:**
   - Click **Upload** button
   - Select `hckr_production.zip`
   - Wait for upload (shows progress bar)
   - ✅ Upload complete

7. **Extract ZIP:**
   - Right-click `hckr_production.zip`
   - Select **Extract**
   - Click **Extract File(s)**
   - Wait for extraction
   - ✅ Files extracted

8. **Delete ZIP:**
   - Right-click `hckr_production.zip`
   - Select **Delete**
   - Confirm deletion
   - ✅ Deleted

9. **Verify files:**
   - You should see:
     - `server.js`
     - `package.json`
     - `public/` folder
     - `audio/` folder
   - ✅ All files present

---

## STEP 3 (ALT): Upload via SSH (Faster for large files)

If cPanel File Manager is slow:

```bash
# From your LOCAL computer terminal:

# 1. Copy files to Hostinger
scp -r ./hckr/* yourusername@yourdomain.com:/home/yourusername/hckr/

# Example:
# scp -r ./hckr/* admin@example.com:/home/admin/hckr/

# 2. Connect via SSH
ssh yourusername@yourdomain.com

# Example:
# ssh admin@example.com

# 3. Navigate to project
cd ~/hckr
pwd                 # Should show: /home/yourusername/hckr

# 4. Verify files
ls -la              # Should show: server.js, package.json, public/, audio/
```

✅ **Files uploaded**

---

## STEP 4: Install Dependencies via SSH (5 minutes)

### Connect to Hostinger via SSH:

```bash
ssh yourusername@yourdomain.com
# Enter password

# Navigate to project
cd ~/hckr

# Verify location
pwd
# Should output: /home/yourusername/hckr
```

### Install npm dependencies:

```bash
npm install
```

**Wait for it to complete.** Expected output:
```
added 72 packages, audited 73 packages
found 0 vulnerabilities
```

### Verify installation:
```bash
ls -la node_modules/    # Should show express, body-parser, etc.
npm list              # Should show express@4.18.2
```

✅ **Dependencies installed**

---

## STEP 5: Create Node.js Application in cPanel (5 minutes)

### Back in cPanel:

1. Click on **Node.js Applications** (or **Node.js Manager**)
   - Look in the main cPanel menu
   - If you can't find it, search for "Node" in the search bar

2. Click **Create Application** button

### Fill in the form with these values:

| Field | Value |
|-------|-------|
| **Node.js Version** | 18.x (or latest 16.x/18.x) |
| **Application Mode** | Production |
| **Application root** | /home/yourusername/hckr |
| **Application startup file** | server.js |
| **Application URL** | yourdomain.com OR www.yourdomain.com |
| **Application port** | 3000 |
| **Passenger log file** | (leave as default) |

### Example screenshot values:
```
Node.js Version:       18.19.0
Application Mode:      Production
Application root:      /home/admin/hckr
Startup file:          server.js
Application URL:       mysite.com
Port:                  3000
```

3. Click **Create Application** button

### Wait for setup:
- You'll see a loading message
- Status changes to **Running** (green indicator)
- Application is now active!

✅ **Node.js application created**

---

## STEP 6: Set Up SSL/HTTPS Certificate (5-10 minutes)

### Automatic Setup (AutoSSL) - EASIEST:

1. In cPanel, find **AutoSSL** or **SSL/TLS**

2. Click **Manage** or **Run AutoSSL**

3. Your domain should be listed

4. Click **Issue Certificate** or **Auto Install**

5. Wait 5-10 minutes for certificate to install

6. Status should change to: **Certificate installed**

✅ **SSL certificate active**

### Verify SSL is working:
- Visit: **https://yourdomain.com** (note: HTTPS)
- Browser should NOT show security warning
- Green lock icon should appear

---

## STEP 7: Test Your Application (5 minutes)

### Open your browser:

1. **Visit your domain:**
   ```
   https://yourdomain.com
   ```

2. **You should see:**
   - Green "HCKR" title
   - Login form
   - Demo credentials box
   - Matrix background animation

3. **Login with these credentials:**
   - Email: `admin@hckr.com`
   - Password: `admin@hckr.com`
   - Click **ACCESS SYSTEM**

4. **You should see:**
   - Green navbar with "HCKR DASHBOARD"
   - Security warning (orange banner)
   - Phone analysis interface with: +91 98465 54518
   - Status showing: 23 audio files detected
   - List of audio files below
   - Green play buttons for each file

5. **Test audio playback:**
   - Click **► PLAY** button on any audio file
   - Audio player appears
   - Press play button in player
   - You should hear audio playing

6. **Test logout:**
   - Click red **LOGOUT** button (top right)
   - You return to login page

✅ **Application is working!**

---

## STEP 8: Troubleshooting (If something doesn't work)

### Issue: Can't access yourdomain.com

**Solution 1: Check DNS**
```
1. In Hostinger → Domain Management
2. Check A record points to your IP
3. Wait 24-48 hours for DNS to propagate
4. Try: ping yourdomain.com
```

**Solution 2: Check Node.js app status**
```
1. cPanel → Node.js Applications
2. Find your app
3. Status should show: "Running" (green)
4. If red, click "Start" button
```

**Solution 3: Check logs**
```
# Via SSH:
cd ~/hckr
cat error.log        # Check for errors
tail -f error.log    # Watch live errors
```

### Issue: SSL certificate not working

**Solution:**
```
1. cPanel → AutoSSL
2. Click "Issue" or "Reissue" certificate
3. Wait 10-15 minutes
4. Refresh browser (Ctrl+Shift+R for hard refresh)
5. Visit: https://yourdomain.com
```

### Issue: Audio files not playing

**Solution:**
```
# Via SSH:
cd ~/hckr/audio
ls -la              # Should show 23 .ogg files
chmod 644 *.ogg     # Fix permissions
chmod 755 ~/hckr    # Fix folder permissions

# Then restart app in cPanel
```

### Issue: Node.js application won't start

**Solution:**
```
# Via SSH:
cd ~/hckr
npm install         # Reinstall dependencies
npm start          # Test if it starts locally
```

---

## STEP 9: Verify Everything Works ✅

### Final Checklist:

- [ ] Can access https://yourdomain.com
- [ ] Login page loads (green hacker theme)
- [ ] Demo credentials work
- [ ] Dashboard shows with 23 audio files
- [ ] Audio playback works
- [ ] Logout button works
- [ ] No browser console errors (F12)
- [ ] SSL shows green lock icon
- [ ] Status shows "COMPROMISED ✗"

### Quick Test Commands:

```bash
# Via SSH - Check application status
curl http://localhost:3000

# Check if files exist
cd ~/hckr && ls -la

# Check logs for errors
cd ~/hckr && grep -i error *.log

# Check disk space
df -h
```

✅ **Application is live and working!**

---

## STEP 10: Make It Production-Ready (Optional)

### Change Admin Credentials:

```bash
# Via SSH or cPanel File Manager:
# Edit server.js line 60-65

nano ~/hckr/server.js

# Find this section:
# const credentials = {
#   'admin@hckr.com': { password: 'admin@hckr.com', role: 'super-admin' },
#   'shameemkm09@gmail.com': { password: 'shameemkm09@gmail.com', role: 'user' }
# };

# Change to YOUR credentials:
# const credentials = {
#   'your-email@domain.com': { password: 'your-password', role: 'super-admin' },
#   'user-email@domain.com': { password: 'user-password', role: 'user' }
# };

# Save: Ctrl+X, then Y, then Enter

# Restart application in cPanel
```

### Enable PM2 Auto-Restart (Optional):

```bash
# Via SSH:
npm install -g pm2
pm2 start ~/hckr/server.js --name "hckr"
pm2 startup
pm2 save
```

✅ **Production ready**

---

## Ongoing Maintenance

### Weekly:
```bash
# Check logs
ssh yourusername@yourdomain.com
cd ~/hckr && tail -n 50 error.log

# Check disk space
df -h

# Verify app is running
ps aux | grep node
```

### Monthly:
```bash
# Backup application
zip -r backup_$(date +%Y%m%d).zip ~/hckr

# Check for updates (optional)
npm outdated
```

---

## Support Resources

**If you get stuck:**

1. **Hostinger Support:**
   - Live Chat: 24/7 in Hostinger panel
   - Email: support@hostinger.com
   - Help: https://support.hostinger.com

2. **Node.js Issues:**
   - Check: `npm start` output
   - View: cPanel error logs
   - Restart: Click "Restart" in Node.js Applications

3. **SSL Issues:**
   - Reissue certificate in AutoSSL
   - Hard refresh: Ctrl+Shift+R
   - Clear cache: Settings → Clear site data

---

## Success - You're Live! 🎉

Your HCKR Dashboard is now running on Hostinger at:
```
https://yourdomain.com
```

**Login with:**
- Email: admin@hckr.com (or your custom email)
- Password: admin@hckr.com (or your custom password)

**Features working:**
- ✅ Hacker dashboard interface
- ✅ Secure authentication
- ✅ 23 audio files
- ✅ Audio playback
- ✅ Full HTTPS/SSL
- ✅ Auto-scaling with Hostinger

---

## Next Steps (Optional Enhancements)

1. **Add database** for real users (MongoDB/PostgreSQL)
2. **Enable logging** to track activity
3. **Add analytics** to see who's using it
4. **Set up email** notifications
5. **Create backup schedule** in cPanel

---

**Deployment Complete!** 🚀

Visit your domain and enjoy your HCKR Dashboard!

---

**Need help?**
- Refer to: README.md
- Hostinger docs: https://support.hostinger.com
- Check error logs in cPanel
