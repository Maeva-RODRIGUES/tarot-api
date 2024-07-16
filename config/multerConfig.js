// multerConfig.js

const multer = require('multer');
const path = require('path');

// Configuration de stockage pour Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Dossier de destination des fichiers
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Nom du fichier
  }
});

// Filtrage des fichiers pour n'accepter que les images
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!'); // Rejeter les fichiers non-images
  }
};

// Initialisation de Multer avec les configurations définies
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // Limite de taille de fichier à 5MB
  fileFilter: fileFilter
});

module.exports = upload;
