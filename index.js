const express = require('express');
const userRouter = require('./routes/users.js');
const scheduleRouter = require('./routes/schedule.js');
const purchasedRouter = require('./routes/purchased.js');
const eticketRouter = require('./routes/eticket.js');
const middleware = require('./middleware/logs.js');

const multer = require('multer');
const path = require('path');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use('/', middleware);
app.use(express.json());

app.use('/users', userRouter);
app.use('/schedule', scheduleRouter);
app.use('/purchased', purchasedRouter);
app.use('/eticket', eticketRouter);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'images/');
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, Date.now() + ext);
    },
  });
  
  const upload = multer({ storage });

app.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }
    res.send('File uploaded successfully!');
  });
  

app.listen(PORT, ()=> {
    console.log(`Server Berjalan di PORT : ${PORT}`);
});