import express from 'express';
import jsonServer from 'json-server';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import cors from 'cors';
import jwt from 'jsonwebtoken';

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

// In a production environment, store this secret in an environment variable
const jwtSecret = '3OVx&=|m[_Z<ML|^_Z!8($3?cl:D,';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbFilePath = path.join(__dirname, 'db.json');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;

function readDb() {
  try {
    const data = fs.readFileSync(dbFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return { users: [] };
  }
}

function writeDb(data) {
  fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2));
}

app.post('/register', (req, res) => {
  const { name, email, password, confirmPassword, gender, age } = req.body;

  if (!name || !email || !password || !confirmPassword || !gender || !age) {
    return res.status(400).json({ error: 'Please provide all required fields.' });
  }
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format.' });
  }
  if (!passwordRegex.test(password)) {
    return res.status(400).json({ error: 'Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a digit, and a special character.' });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'Passwords do not match.' });
  }

  const db = readDb();
  const existingUser = db.users.find(user => user.email === email);
  if (existingUser) {
    return res.status(400).json({ error: 'User already exists.' });
  }

  const newUser = {
    id: Date.now(),
    name,
    email,
    password,
    gender,
    age
  };

  db.users.push(newUser);
  writeDb(db);

  res.status(201).json({
    message: 'Registration successful! Please log in.',
    user: newUser
  });
});

app.post('/login', (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password.' });
    }
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: 'Invalid email format.' });
    }

    const db = readDb();
    const user = db.users.find(user => user.email === email && user.password === password);
    if (user) {
      // Generate a JWT token that expires in 1 hour
      const token = jwt.sign(
        { id: user.id, email: user.email },
        jwtSecret,
        { expiresIn: '1h' }
      );
      res.status(200).json({
        success: true,
        message: 'Login successful',
        user,
        token,           // send token to the client
        redirectUrl: '/navbar'
      });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

const router = jsonServer.router(dbFilePath);
app.use('/api', router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
