const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authentication } = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/register', upload.single('photo'), userController.register);
router.post('/login', userController.login);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.get('/email/:email', userController.getUserByEmail);  
router.put('/:id', authentication, authorization('user'), upload.single('photo'), userController.update);
router.delete('/:id', authentication, authorization('user'), userController.destroy);

module.exports = router;
