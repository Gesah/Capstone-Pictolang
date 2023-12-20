// packageRoutes.js
const express = require('express');
const router = express.Router();
const packageController = require('../controllers/packageController');

router.post('/', packageController.createPackage);
router.get('/', packageController.getAllPackages);
router.get('/:packageId', packageController.getPackageById);
router.put('/:packageId', packageController.updatePackage);
router.delete('/:packageId', packageController.deletePackage);

module.exports = router;
