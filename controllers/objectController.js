const objectModel = require('../models/objectModel');

const createObject = async (req, res) => {
  try {
    const objectData = req.body;
    const photo = req.file || null;

    // Panggil fungsi createObject di objectModel
    const objectId = await objectModel.createObject(objectData, photo);

    res.status(201).json({ message: 'Object created successfully', objectId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}; 

const updateObject = async (req, res) => {
  try {
    const objectId = req.params.id;
    const objectData = req.body;
    const photo = req.file ? req.file.buffer : null;

    if (photo) {
      objectData.photoUrl = `data:${req.file.mimetype};base64,${photo.toString('base64')}`;
    }

    await objectModel.updateObject(objectId, objectData);
    res.status(200).send('Object updated successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

const getAllObjects = async (req, res) => {
  const objects = await objectModel.getAllObjects();
  const objectsWithId = Object.entries(objects || {}).map(([id, object]) => ({ id, ...object }));
  res.status(200).json(objectsWithId);
};

const getObjectById = async (req, res) => {
  const objectId = req.params.id;
  const object = await objectModel.getObjectById(objectId);
  if (object) {
    res.status(200).json(object);
  } else {
    res.status(404).send('Object not found');
  }
};

const deleteObject = async (req, res) => {
  const objectId = req.params.id;
  await objectModel.deleteObject(objectId);
  res.status(200).send('Object deleted successfully');
};

const identifyObject = async (req, res) => {
  const imageData = req.file.buffer; 
  await objectModel.identifyObject(imageData);
  res.status(200).send('Object identified successfully');
};

module.exports = {
  createObject,
  getAllObjects,
  getObjectById,
  updateObject,
  deleteObject,
  identifyObject,
};
