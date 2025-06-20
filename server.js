const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.connect('mongodb://localhost:27017/tracker');

const DataSchema = new mongoose.Schema({
  userId: String,
  domain: String,
  seconds: Number,
  date: Date,
});

const TimeEntry = mongoose.model('TimeEntry', DataSchema);

const app = express();
app.use(cors());
app.use(express.json());

app.post('/log', async (req, res) => {
  const { userId, domain, seconds } = req.body;
  await TimeEntry.create({ userId, domain, seconds, date: new Date() });
  res.send({ status: "ok" });
});

app.get('/report/:userId', async (req, res) => {
  const data = await TimeEntry.find({ userId: req.params.userId });
  res.send(data);
});

app.listen(3001, () => console.log('Server running on port 3001'));
