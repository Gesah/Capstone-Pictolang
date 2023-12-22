const express = require('express');
const router = express.Router();
const objectController = require('../controllers/objectController');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/api/create', upload.single('photo'), objectController.createObject);
router.get('/api/', objectController.getAllObjects);
router.get('/api/:id', objectController.getObjectById);
router.put('/api/:id', upload.single('photo'), objectController.updateObject);
router.delete('/api/:id', objectController.deleteObject);
router.post('/api/identify', upload.single('photo'), objectController.identifyObject);

module.exports = router;
