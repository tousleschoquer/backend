const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const borrowRoutes = require('./routes/borrowRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const mangaRoutes = require('./routes/mangaRoutes');
const serieRoutes = require('./routes/serieRoutes');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();


const app = express();

app.use(cors());
app.use(express.json());

// start the server


app.get('/', (req, res) => {
    res.send('je suis fini');
});


app.use('/api/borrow', borrowRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/manga', mangaRoutes);
app.use('/api/serie', serieRoutes);
app.use('/api/user', userRoutes);


// check if MONGO_URI is defined 
if (!process.env.MONGO_URI) { 
    console.error("MONGOURL must be defined"); process.exit(1); 
}


mongoose.connect(process.env.MONGO_URI) 
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('server is running on PORT', process.env.PORT);
        });
    }) 
    .catch((err) => {
        console.error('Could not connect to MongoDB...', err);
    });






