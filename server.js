import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SESSION_SECRET = 'hckr_secure_secret_key_2024';
const NODE_ENV = 'production';

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 24 * 60 * 60 * 1000
  }
}));

// Auth middleware
const requireLogin = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/');
  }
  next();
};

// Debug route
app.get('/api/session', (req, res) => {
  console.log('Session check:', req.session);
  res.json({
    hasSession: !!req.session.user,
    user: req.session.user,
    sessionID: req.sessionID
  });
});

// Routes
app.get('/', (req, res) => {
  if (req.session.user) {
    return res.redirect('/dashboard');
  }
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.post('/api/login', (req, res) => {
  console.log('📝 Login attempt:', req.body);

  const { email, password } = req.body;

  const credentials = {
    'admin@hckr.com': { password: 'admin@hckr.com', role: 'super-admin' },
    'shameemkm09@gmail.com': { password: 'shameemkm09@gmail.com', role: 'user' }
  };

  const user = credentials[email];

  if (user && user.password === password) {
    console.log('✅ Login successful:', email);
    req.session.user = {
      email,
      role: user.role
    };
    return res.json({ success: true, role: user.role });
  }

  console.log('❌ Login failed:', email);
  res.status(401).json({ success: false, message: 'Invalid credentials' });
});

app.get('/dashboard', requireLogin, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

app.post('/api/analyze', requireLogin, (req, res) => {
  const { phoneNumber } = req.body;

  if (!phoneNumber) {
    return res.status(400).json({ success: false, message: 'Phone number required' });
  }

  // Get audio files from audio folder
  const audioDir = path.join(__dirname, 'audio');

  try {
    const files = fs.readdirSync(audioDir).filter(file =>
      /\.(mp3|wav|ogg|m4a)$/i.test(file)
    );

    const audioFiles = files.map(file => ({
      id: Buffer.from(file).toString('base64'),
      name: file,
      filename: file,
      size: fs.statSync(path.join(audioDir, file)).size,
      timestamp: new Date().toISOString()
    }));

    res.json({
      success: true,
      phoneNumber,
      totalFiles: audioFiles.length,
      files: audioFiles,
      userRole: req.session.user.role,
      scanTime: new Date().toLocaleString()
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error reading audio files' });
  }
});

app.get('/api/audio/:filename', requireLogin, (req, res) => {
  const filename = Buffer.from(req.params.filename, 'base64').toString('utf-8');
  const audioPath = path.join(__dirname, 'audio', filename);

  // Security: prevent directory traversal
  const realPath = path.resolve(audioPath);
  const audioDir = path.resolve(path.join(__dirname, 'audio'));

  if (!realPath.startsWith(audioDir)) {
    return res.status(403).json({ success: false, message: 'Forbidden' });
  }

  if (fs.existsSync(audioPath)) {
    res.setHeader('Content-Type', 'audio/ogg');
    res.setHeader('Accept-Ranges', 'bytes');
    res.sendFile(audioPath);
  } else {
    res.status(404).json({ success: false, message: 'File not found' });
  }
});

app.get('/api/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ success: false, message: 'Server error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🔓 HCKR Dashboard running on port ${PORT}`);
  console.log(`📡 Environment: ${NODE_ENV}`);
  console.log(`✅ Server started successfully`);
});
