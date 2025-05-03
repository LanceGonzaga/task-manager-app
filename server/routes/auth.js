// backend/server/routes/auth.js

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: 'User not found' });
  
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ error: 'Invalid password' });
  
    // Create a token
    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
    res.json({
      message: 'Login successful',
      token,
      user: { id: user._id, username: user.username }
    });
  });
  