const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = process.env.PORT || 3000;
const mongoUrl = process.env.MONGO_URL;
const dbName = 'appdb';

app.get('/', async (req, res) => {
  try {
    const client = await MongoClient.connect(mongoUrl, { useUnifiedTopology: true });
    const db = client.db(dbName);
    const messages = await db.collection('messages').find().toArray();
    client.close();
    res.json({ messages });
  } catch (err) {
    res.status(500).json({ error: 'Failed to connect to MongoDB', details: err.message });
  }
});

app.listen(port, () => {
  console.log(`Node.js app listening on port ${port}`);
});

