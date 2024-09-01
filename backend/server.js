const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000'
}));
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/birthdayApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const storySchema = new mongoose.Schema({
  name: String,
  story: String,
});

const Story = mongoose.model('Story', storySchema);

app.post('/stories', async (req, res) => {
  const story = new Story(req.body);
  await story.save();
  res.send(story);
});

app.get('/stories', async (req, res) => {
  const stories = await Story.find();
  res.send(stories);
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});