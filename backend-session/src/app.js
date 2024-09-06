import cors from 'cors';
import express from 'express';
import session from 'express-session';
import morgan from 'morgan';
import path from 'path';
import { connectDB } from './db/database.js';
import router from './routes/auth.routes.js'; // Importar las rutas

const app = express();
const PORT = process.env.PORT || 4000;
const __dirname = path.resolve();

// Middlewares
app.use(cors({
    origin: [
        'http://localhost:5500',
        'http://localhost:3000',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'mi_secreto',
    resave: false,
    saveUninitialized: true,
    cookie: { 
        secure: false, // Cambiar a `true` en producción si usas HTTPS
        httpOnly: true,
        sameSite: 'lax'
    }
}));



// Usar las rutas
app.use('/', router); // Prefijo para las rutas

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}/`));
