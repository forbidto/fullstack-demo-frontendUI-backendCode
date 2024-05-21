// server.js
require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const connectToMongoDB = require('./config/mongoConfig');
const app = express();
const { sequelize, User, Listing, ListingOwner, } = require('./models/index');

app.use(express.json());

// Connect to MongoDB
connectToMongoDB();


// Routes
const listingUploadRouter = require('./routes/listingSubmitRoute');
const authRouter = require('./routes/authRoute')
const listingRouter = require('./routes/listingRoute')
app.use('/api', listingUploadRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);
//app.use('/api/auth', authRouter);

// Sync all models
sequelize.sync({ force: true })
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch(error => console.log('This error occurred', error));


app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.send(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Something went wrong');
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});