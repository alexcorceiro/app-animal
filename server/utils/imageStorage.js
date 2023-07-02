const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, '..', 'images', String(req.user.id));
    fs.mkdir(dir, { recursive: true }, (err) => {
      if (err) {
        console.error(err);
        return cb(err);
      }
      cb(null, dir);
    });
  },
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png|gif/;
  const mimetype = fileTypes.test(file.mimetype);
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype && extname) {
    return cb(null, true);
  }
  cb(new Error('Seuls les fichiers image sont autorisés !'));
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5, // limit image size to 5MB
  },
});

module.exports = upload;
