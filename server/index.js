const express = require('express');//aqui vamos a usar el modulo express

const app = express();//aqui creamos nuestro servidor

app.listen(3000, ()=>{
    console.log('Server on port 3000');
});//Usamos el metodo listen del obj app, cuando se ejecuta el codigo empezara a escuchar por el puerto indicado