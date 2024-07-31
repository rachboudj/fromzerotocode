import multer from "multer";
import path from 'path';

// Définir le stockage pour multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads'); // dossier où les images seront stockées
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // nom du fichier
  }
});

// Initialiser l'upload avec les configurations de stockage
const upload = multer({ storage: storage });

export default upload;
