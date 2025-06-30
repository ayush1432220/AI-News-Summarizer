require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const newsRoutes = require('./routes/news.routes');
const summarizeRoutes = require('./routes/summarize.routes');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

console.log(`Connecting to MongoDB...${process.env.MONGO_URI}`);
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Successfully connected to MongoDB.'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/news', newsRoutes);
app.use('/api/summarize', summarizeRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});