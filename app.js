require( 'dotenv' ).config();                               // Importa dependencia para crear variables de entorno

const express = require( 'express' );                       // Importa Express crea infraestructura, rutas, responde a peticiones
const { dbConection } = require('./src/config/mongo.config');   // Importa configuracion de DB para Mongo usando Mongoose
const app = express();                                      // Asigna invocacion de Express
const cors = require( 'cors' );                             // CORS: Permisiona el acceso a peticiones de aplicaciones externas
const { createDefaultUsers } = require('./src/config/mongo.setup');


const PORT = process.env.PORT || 3000;                      // Define el puerto a traves de la variable de entorno


app.use( cors() );
app.use( express.json() );

/** Establece Rutas de la aplicacion */
app.use( '/api/auth', require( './src/routes/auth.routes' ) );
app.use(
    '/api/products',                        // Middleware que configura la ruta
    require( './src/routes/products.routes' )   // Importa el archivo de rutas para esta ruta '/api/products'
);    
app.use( '/api/categories', require( './src/routes/category.routes' ) );

app.use('/api/services', require('./src/routes/services.routes'));

app.use('/api/talleres', require('./src/routes/taller.routes'));

app.get('/', (req, res) => {
    res.status(200).json({ message: '¡Bienvenido a mi servidor backend!' });
  });

app.get('/health', (req, res) => {
    // You can perform any health check logic here
    // For example, check if the database is accessible
    // or if any critical services are running
    const healthStatus = {
        status: 'ok',
        message: 'Application is healthy'
    };
    res.json(healthStatus);
});

dbConection();      // Invoca la configuracion de DB, es decir: Pone a funcionar la BD

createDefaultUsers() //para que lo llame

/** Lanza un Servidor web usando Express en el puerto que se le indique a la variable de entorno PORT */
app.listen( PORT, function() {
    console.log( `Servidor escuchando en http://localhost:${ PORT }` );
} );

