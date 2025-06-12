import express from 'express';
import multer from 'multer';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();


//  CONFIGURAZIONE FILE FILTER

const fileFilter = (req, file, cb) => {
  const allowed = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Formato non consentito: solo JPG, PNG, WEBP'));
  }
};


//  UPLOAD LOCALE (sviluppo/test)

const localStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + unique + ext);
  },
});

const localUpload = multer({
  storage: localStorage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // max 5MB
});

//  CONFIG CLOUDINARY

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
});


// UPLOAD CLOUDINARY (produzione)

const cloudStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'cloud-upload',
    format: async () => 'png', // forza PNG
    public_id: (req, file) => {
      const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
      return unique + '-' + file.originalname;
    },
  },
});

const cloudUpload = multer({
  storage: cloudStorage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});


//  ROUTES


// Route: Upload Locale
router.post('/upload', localUpload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Nessun file caricato' });
  }
  res.json({
    message: 'File salvato localmente!',
    file: {
      filename: req.file.filename,
      path: `/uploads/${req.file.filename}`,
    },
  });
});

// Route: Upload Cloudinary
router.post('/upload-cloud', cloudUpload.single('file'), (req, res) => {
  if (!req.file || !req.file.path) {
    return res.status(400).json({ error: 'Upload fallito su Cloudinary' });
  }
  res.json({
    message: 'File caricato su Cloudinary!',
    cloudUrl: req.file.path,
  });
});


//  SENDGRID - Email demo

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.get('/send-email', async (req, res) => {
  const msg = {
    to: 'johnsmith@example.com',
    from: 'mittente@tuodominio.com',
    subject: 'Benvenuto!',
    text: 'Grazie per aver provato il nostro servizio!',
    html: '<strong>Grazie per aver provato il nostro servizio!</strong>',
  };

  try {
    await sgMail.send(msg);
    res.json({ status: 'Email inviata con successo!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Errore durante l’invio dell’email' });
  }
});

export default router;

