import express from 'express';
import Movie from '../models/movie.js';

const router = express.Router();

// Route pour ajouter un nouveau film
router.post('/', async (req, res, next) => {
  try {
    // Créez une nouvelle instance du modèle Movie avec les données du corps de la requête
    const newMovie = new Movie(req.body);
    // Sauvegardez le nouveau film dans la base de données
    const savedMovie = await newMovie.save();
    // Renvoyez le film créé en réponse
    res.status(201).json(savedMovie);
  } catch (error) {
    // Gérez les erreurs
    next(error);
  }
});

// Route pour afficher tous les films disponibles
router.get('/', async (req, res, next) => {
  try {
    // Récupérez tous les films depuis la base de données
    const movies = await Movie.find();
    // Renvoyez les films récupérés en réponse
    res.status(200).json(movies);
  } catch (error) {
    // Gérez les erreurs
    next(error);
  }
});

// Route pour rechercher un film par son titre
router.get('/search', async (req, res, next) => {
  try {
    const title = req.query.title;
    // Recherchez un film en fonction du titre spécifié dans les paramètres de la requête
    const movie = await Movie.findOne({ title: title });
    // Si le film est trouvé, renvoyez-le en réponse
    if (movie) {
      res.status(200).json(movie);
    } else {
      res.status(404).json({ message: "Film introuvable" });
    }
  } catch (error) {
    next(error);
  }
});

// Route pour mettre à jour les informations d'un film existant
router.put('/:id', async (req, res, next) => {
  try {
    const movieId = req.params.id;
    const updatedMovie = req.body;
    // Mettez à jour le film en fonction de son ID avec les nouvelles informations
    const result = await Movie.findOneAndUpdate({ _id: movieId }, updatedMovie, { new: true });
    // Si le film est mis à jour avec succès, renvoyez-le en réponse
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Film introuvable" });
    }
  } catch (error) {
    next(error);
  }
});

// Route pour supprimer un film en fonction de son ID
router.delete('/:id', async (req, res, next) => {
  try {
    const movieId = req.params.id;
    // Supprimez le film en fonction de son ID
    const result = await Movie.findByIdAndDelete(movieId);
    // Si le film est supprimé avec succès, renvoyez un message de succès
    if (result) {
      res.status(200).json({ message: "Film supprimé avec succès" });
    } else {
      res.status(404).json({ message: "Film introuvable" });
    }
  } catch (error) {
    next(error);
  }
});

export default router;
