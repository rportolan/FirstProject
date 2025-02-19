// app.js (or server.js)
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const helmet = require('helmet'); // Importer Helmet
require('dotenv').config();

const goalsRoutes = require('./routes/goalsRoute');
const subGoalsRoutes = require('./routes/subGoalsRoute');
const tasksRoutes = require('./routes/tasksRoute');
const authRoutes = require('./routes/authRoute');
const booksRoutes = require('./routes/booksRoute');
const profileRoutes = require('./routes/usersRoute');

const FRONTEND_URL = process.env.FRONTEND_URL;

const app = express();

// Utiliser Helmet pour sécuriser les en-têtes HTTP
app.use(helmet()); // Appliquer Helmet pour sécuriser l'application

// Configurer CORS avec des paramètres spécifiques pour autoriser une origine particulière (ngrok URL)
const corsOptions = {
  origin: FRONTEND_URL, // Remplacez par votre URL front-end ou '*' si vous voulez autoriser toutes les origines
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Middleware pour ajouter Cross-Origin-Resource-Policy
app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin'); // Autorise le partage des ressources entre origines
  next();
});

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/mygoals', goalsRoutes);
app.use('/mygoals', subGoalsRoutes);
app.use('/mygoals', tasksRoutes);
app.use('/logbook', booksRoutes);
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes); 

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

module.exports = app;




