const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('./models/student.js')
require('./models/mentor.js')
require('./models/Grevince.js')
const router = require('./routes/route.js');
const dotenv = require('dotenv');
const path = require('path')

dotenv.config()

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const origin = process.env.ORIGIN;
const port = process.env.port || 5000;

app.use(cors());
// app.use(cors({ origin: origin, credentials: true }));

// mongoose.connect(`mongodb+srv://abhi:${process.env.DB_PASSWORD}@cluster0.isarath.mongodb.net/?retryWrites=true&w=majority`, {                  
mongoose.connect(`mongodb://localhost:27017`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log("Successfully connect to MongoDB");
  })
  .catch(err => {
    console.error("Connection error", err.message);
  });

// Serving the frontent
// app.use(express.static(path.join(__dirname, "./client/build")))
// app.get("*", (req, res)=>{
//   res.sendFile(
//     path.join(__dirname, "./client/build/index.html"),
//     function(err){
//       res.status(500).send(err)
//     }
//   )
// })

app.use('/', router);

app.listen(port, () => {
  console.log(`Server is running on port - ${port}`);
}) 