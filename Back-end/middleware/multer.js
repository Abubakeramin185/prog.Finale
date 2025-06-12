//multer
import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router = express.Router();

// Crea la cartella uploads se non esiste
const uploadDir = path.join('uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configurazione Multer
const storage = multer.diskStorage({
  // destination: function (req, file, cb) {
  //   cb(null, 'uploads/'); // cartella dove salvare i file
  // },
  // filename: function (req, file, cb) {
  //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
  //   const ext = path.extname(file.originalname);
  //   cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  // }
  
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + unique + ext);
  }
});

 const upload = multer({

  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // limite: 5MB
  fileFilter: function (req, file, cb) {
    // const allowed = /jpeg|jpg|png|image |webp/;
    
    const ext = path.extname(file.originalname).toLowerCase();
    const mime = file.mimetype;
    if (allowed.test(ext) && allowed.test(mime)) {
      cb(null, true);
    } else {
      cb(new Error('Solo immagini JPEG, JPG, PNG o WEBP sono permesse'));
    }
  }
 });
 // Definisci il fileFilter prima
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Solo immagini JPEG, JPG, PNG o WEBP sono permesse'));
  }
};

//  configura Multer usando quella funzione
const Upload= multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: fileFilter
});



// Route POST per upload immagini
router.post('/upload', upload.single('immagini'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Nessun file caricato' });
  }
  res.json({
    message: 'Upload riuscito',
    filename: req.file.filename,
    path: `/uploads/${req.file.filename}`
  });
});

export default router;
