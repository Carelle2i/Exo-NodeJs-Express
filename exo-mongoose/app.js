import express from 'express';
import mongoose from 'mongoose';
import createError from 'http-errors';

// Importez les routes principales
import indexRouter from './routes/index.js';
import movieRouter from './routes/movieRouter.js';

// Instanciez l'application Express
const app = express();
const PORT = process.env.PORT || 3000;

// Connexion à la base de données MongoDB
mongoose.connect('mongodb://localhost:27017/mon_cinema', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connexion à la base de données MongoDB réussie');
  // Démarrez le serveur une fois la connexion réussie
  app.listen(PORT, () => {
    console.log(`Serveur en écoute sur le port ${PORT}`);
  });
})
.catch((error) => {
  console.error('Erreur de connexion à la base de données MongoDB:', error);
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Déclaration des routes principales
app.use('/', indexRouter);
app.use('/movies', movieRouter);

// Route par défaut pour les erreurs 404
app.use((req, res, next) => {
  next(createError(404));
});

// Gestion des erreurs globales
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send(err.message);
});
