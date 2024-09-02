const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());
app.use('/uploads', express.static('uploads'));

mongoose.connect('mongodb://localhost:27017/birthdayApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
  console.log('Database name:', mongoose.connection.name);
})
.catch(err => console.error('MongoDB connection error:', err));

// הגדרת אחסון לקבצים
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 } // הגבלה ל-5MB
});

// סכמות
const storySchema = new mongoose.Schema({
  name: String,
  story: String,
});

const imageSchema = new mongoose.Schema({
  description: String,
  imageUrl: String,
});

const videoSchema = new mongoose.Schema({
  title: String,
  videoUrl: String,
});

const eventSchema = new mongoose.Schema({
  date: String,
  description: String,
  imageUrl: String,
});

const quoteSchema = new mongoose.Schema({
  quote: String,
});

// מודלים
const Story = mongoose.model('Story', storySchema);
const Image = mongoose.model('Image', imageSchema);
const Video = mongoose.model('Video', videoSchema);
const Event = mongoose.model('Event', eventSchema);
const Quote = mongoose.model('Quote', quoteSchema);

// נתיבים
app.post('/api/stories', async (req, res) => {
  try {
    const story = new Story(req.body);
    await story.save();
    res.status(201).send(story);
  } catch (error) {
    res.status(500).send('Error saving story: ' + error.message);
  }
});

app.get('/api/stories', async (req, res) => {
  const stories = await Story.find();
  res.send(stories);
});

app.delete('/api/stories/:id', async (req, res) => {
  try {
    await Story.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).send('Error deleting story: ' + error.message);
  }
});

app.post('/api/images', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }
    const image = new Image({
      description: req.body.description,
      imageUrl: `/uploads/${req.file.filename}`
    });
    await image.save();
    res.status(201).send(image);
  } catch (error) {
    res.status(500).send('Error saving image: ' + error.message);
  }
});

app.get('/api/images', async (req, res) => {
  const images = await Image.find();
  res.send(images);
});

app.delete('/api/images/:id', async (req, res) => {
  try {
    await Image.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).send('Error deleting image: ' + error.message);
  }
});

app.post('/api/videos', upload.single('video'), async (req, res) => {
  const video = new Video({
    title: req.body.title,
    videoUrl: `/uploads/${req.file.filename}`
  });
  await video.save();
  res.send(video);
});

app.get('/api/videos', async (req, res) => {
  const videos = await Video.find();
  res.send(videos);
});

app.delete('/api/videos/:id', async (req, res) => {
  try {
    await Video.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).send('Error deleting video: ' + error.message);
  }
});

app.post('/api/events', upload.single('image'), async (req, res) => {
  const event = new Event({
    date: req.body.date,
    description: req.body.description,
    imageUrl: req.file ? `/uploads/${req.file.filename}` : null
  });
  await event.save();
  res.send(event);
});

app.get('/api/events', async (req, res) => {
  const events = await Event.find();
  res.send(events);
});

app.post('/api/quotes', async (req, res) => {
  const quote = new Quote(req.body);
  await quote.save();
  res.send(quote);
});

app.get('/api/quotes', async (req, res) => {
  const quotes = await Quote.find();
  res.send(quotes);
});

app.delete('/api/quotes/:id', async (req, res) => {
  try {
    await Quote.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).send('Error deleting quote: ' + error.message);
  }
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});