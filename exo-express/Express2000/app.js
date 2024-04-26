import express from 'express';
import createError from 'http-errors';

// Importez les routes principales
import indexRouter from './routes/index.js';
import bookRouter from './routes/bookRoutes.js'; // Importez le routeur externe pour les livres

// Instanciez l'application Express
const app = express();
const PORT = process.env.PORT || 3000;
 
// Déclaration des routes principales
app.use('/', indexRouter);
app.use('/livres', bookRouter); // Utilisez le routeur externe pour les routes liées aux livres

// Route par défaut pour les erreurs 404
app.use((req, res, next) => {
  next(createError(404));
});

// Gestion des erreurs globales
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send('Erreur');
});

// Lancement du serveur
app.listen(PORT, () => {
  console.log(`Serveur en écoute sur le port ${PORT}`);
});
