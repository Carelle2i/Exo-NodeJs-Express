import express from 'express';
import fs from 'fs';
import path from 'path';

const router = express.Router();

// Route pour la liste des livres
router.get('/livres', (req, res) => {
    // Chemin absolu vers le fichier livres.json
    const filePath = path.join(__dirname, '../data/livres.json');
    // Renvoyer le fichier JSON en réponse
    res.sendFile(filePath);
});

// Route pour les détails d'un livre spécifique
router.get('/livres/:id', (req, res) => {
    const id = req.params.id;
    // Renvoyer les détails du livre correspondant à l'ID
    res.json({ id: id, title: "The Rescue", pages: 560, auteur: "Soline.L" });
});

// Route pour l'ajout d'un nouveau livre
router.post('/ajout-livre', (req, res) => {
    // Pour cet exercice, simulez l'ajout d'un nouveau livre
    res.status(201).send("Livre ajouté avec succès !");
});

// Route pour la recherche de livres par auteur
router.get('/recherche-livre/auteur/:auteur', (req, res) => {
    const author = req.params.auteur;
    // Chemin absolu vers le fichier livres.json
    const filePath = path.join(__dirname, '../data/livres.json');

    // Lire le contenu du fichier JSON
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Erreur de lecture du fichier JSON:', err);
            res.status(500).send('Erreur interne du serveur');
            return;
        }

        try {
            const books = JSON.parse(data);
            // Filtrer les livres par l'auteur spécifié
            const filteredBooks = books.filter(book => book.auteur === author);
            // Renvoyer les résultats de la recherche
            res.json(filteredBooks);
        } catch (error) {
            console.error('Erreur de parsing du fichier JSON:', error);
            res.status(500).send('Erreur interne du serveur');
        }
    });
});

export default router;
