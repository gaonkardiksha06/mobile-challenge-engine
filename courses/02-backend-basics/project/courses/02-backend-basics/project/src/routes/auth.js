import { Router } from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/User.js';
import { signToken, requireAuth } from '../middleware/auth.js';

const router = Router();

router.post('/register', async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'username, email, and password are required' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, passwordHash });
    const token = signToken({ id: user._id, username: user.username });

    res.status(201).json({
      token,
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ error: 'Username or email already in use' });
    }
    next(err);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

    const token = signToken({ id: user._id, username: user.username });
    res.json({
      token,
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (err) {
    next(err);
  }
});

router.get('/profile', requireAuth, async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-passwordHash');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

export default router;