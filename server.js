require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:4200',
    credentials: true,
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
app.use('/uploads', express.static('uploads'))
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log('Connected to Database'))
app.use(express.json())
require('./routes/course.route.js')(app);
require('./routes/user.route.js')(app);

app.listen(3000, () => { console.log('server Started'); })