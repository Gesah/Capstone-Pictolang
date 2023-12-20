const express = require('express');
const router = express.Router();
const objectController = require('../controllers/objectController');
const multer = require('multer');
const { authentication } = require('../middlewares/authentication');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/create', upload.single('photo'), objectController.createObject);
router.get('/', objectController.getAllObjects);
router.get('/:id', objectController.getObjectById);
router.put('/:id', upload.single('photo'), objectController.updateObject);
router.delete('/:id', objectController.deleteObject);
router.post('/identify', upload.single('photo'), objectController.identifyObject);

module.exports = router;
