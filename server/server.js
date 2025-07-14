const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
const config = require('./config/database');
const userRoute = require('./routes/userRoutes');
const productRoute = require('./routes/productRoutes');
const cartRoute = require('./routes/cartRoutes');
const orderRoute = require('./routes/orderRoutes');

const app = express();
const port = config.port || 3000;

app.use(cors());
app.use(express.json());
app.use('/api/user', userRoute);
app.use('/api/', productRoute);
app.use('/api/', cartRoute);
app.use('/api/', orderRoute);

mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

app.get('/', (req, res) => {
  res.send(`<h1> Connected to TheBrandStore Server </h1>`);
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
