const mongoose = require('mongoose');
const URI = "mongodb://localhost/mean-crud";

//Conexion a la bd
mongoose.connect(URI)
    .then(db => console.log('Database is connected'))
    .catch(err => console.log(err));

module.exports = mongoose;

