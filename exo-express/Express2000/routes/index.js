import express from 'express';
const router = express.Router();

// Route pour la page d'accueil
router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

// Route pour la page de bienvenue (Texte HTML)
router.get('/bienvenue', (req, res) => {
  res.send('<h2>Page de bienvenue</h2><p>Bienvenue sur notre site !</p>');
});

// Route pour les informations JSON
router.get('/info', (req, res) => {
  const info = {
    nom: "John Doe",
    age: 30,
    profession: "Développeur"
  };
  res.json(info);
});

// Route pour le code de statut personnalisé (Accès interdit)
router.get('/acces-interdit', (req, res) => {
  res.status(403).send("Accès interdit : Vous n'avez pas la permission d'accéder à cette ressource.");
});

// Route pour la redirection vers la page d'accueil
router.get('/redirection-accueil', (req, res) => {
  res.redirect('/');
});

// Route pour les utilisateurs
router.get('/users', (req, res) => {
  res.send('Liste des utilisateurs');
});

export default router;
