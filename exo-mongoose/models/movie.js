import mongoose from 'mongoose';

const { Schema } = mongoose;

// Définir le schéma du film
const movieSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  releaseDate: {
    type: Date,
    required: true,
  },
});

// Créer le modèle de film basé sur le schéma
const Movie = mongoose.model('Movie', movieSchema);

export default Movie;
