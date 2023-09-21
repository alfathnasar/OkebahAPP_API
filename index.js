const express = require('express');
const userRouter = require('./routes/users.js');
const scheduleRouter = require('./routes/schedule.js');
const purchasedRouter = require('./routes/purchased.js');
const eticketRouter = require('./routes/eticket.js');
const middleware = require('./middleware/logs.js');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use('/', middleware);
app.use(express.json());

app.use('/users', userRouter);
app.use('/schedule', scheduleRouter);
app.use('/purchased', purchasedRouter);
app.use('/eticket', eticketRouter);

app.listen(PORT, ()=> {
    console.log(`Server Berjalan di PORT : ${PORT}`);
});