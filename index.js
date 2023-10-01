const express = require('express');
const userRouter = require('./routes/users.js');
const scheduleRouter = require('./routes/schedule.js');
const purchasedRouter = require('./routes/purchased.js');
const eticketRouter = require('./routes/eticket.js');
const wisataRouter = require('./routes/wisata.js');
const middleware = require('./middleware/logs.js');
const upload = require('./middleware/multer.js');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use('/', middleware);
app.use(express.json());

app.use('/users', userRouter);
app.use('/schedule', scheduleRouter);
app.use('/purchased', purchasedRouter);
app.use('/eticket', eticketRouter);
app.use('/wisata', wisataRouter);

app.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
  
    // Handle the uploaded file here
    res.json({
      message: 'Upload Berhasil'
    });
  });
  

app.listen(PORT, ()=> {
    console.log(`Server Berjalan di PORT : ${PORT}`);
});