// modules
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

// routes
const authRouter = require('./routes/authRoutes.js')

// middlewares

// config
const databaseName = "trip";
const port = 3000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
// call routes
app.use('/api/auth', authRouter);

// mongodb connection
mongoose.connect(
  `mongodb://localhost/${databaseName}`
)

app.get('/', (req, res) => {
  res.json({ message: 'Test route' });
});

app.listen(port, () => {
  console.log(`Backend working on ${port} port`);
});
