const express = require('express');//aqui vamos a usar el modulo express
const app = express();//aqui creamos nuestro servidor
const morgan = require('morgan');
const { mongoose } = require('./database');

//Setting (configuración basica servidor)
app.set('port',process.env.PORT || 3000);//Cogerá el puerto por defecto, si no el 3000

//Midlewares (permite trabajar con la informacion del servidor)
app.use(morgan('dev'));
app.use(express.json());

//Routes
app.use('/api/teachers', require('./routers/teachers.routes'));
//Starting the server
app.listen(app.get('port'), ()=>{
    console.log('Server on port 3000');
});//Usamos el metodo listen del obj app, cuando se ejecuta el codigo empezara a escuchar por el puerto indicado