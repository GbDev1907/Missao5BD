const mongoose = require('mongoose');

const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
};

mongoose.connect('mongodb://localhost:27017/livraria', options).then(() => console.log('MongoDB Connected...')).catch(err => console.log(err));

module.exports = mongoose;