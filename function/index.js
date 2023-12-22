const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");

admin.initializeApp();
const app = express();

const {
  createChallenge,
  getAllChallenges,
  getChallengeById,
  updateChallenge,
  deleteChallenge,
} = require("../controllers/challengeController");

const {
  createModule,
  getAllModules,
  getModuleById,
  updateModule,
  deleteModule,
} = require("../controllers/moduleController");

const {
  createPackage,
  getAllPackages,
  getPackageById,
  updatePackage,
  deletePackage,
} = require("../controllers/packageController");

const {
  createObject,
  getAllObjects,
  getObjectById,
  updateObject,
  deleteObject,
  identifyObject,
} = require("../controllers/objectController");

const {
  register,
  login,
  update,
  destroy,
  getUserById,
  getAllUsers,
  getUserByEmail,
} = require("../controllers/userController");

const routes = [
  {path: "/challenges", methods: ["post", "get"], controller: {post: createChallenge, get: getAllChallenges}},
  {path: "/challenges/:challengeId", methods: ["get", "put", "delete"], controller: {get: getChallengeById, put: updateChallenge, delete: deleteChallenge}},
  {path: "/modules", methods: ["post", "get"], controller: {post: createModule, get: getAllModules}},
  {path: "/modules/:moduleId", methods: ["get", "put", "delete"], controller: {get: getModuleById, put: updateModule, delete: deleteModule}},
  {path: "/packages", methods: ["post", "get"], controller: {post: createPackage, get: getAllPackages}},
  {path: "/packages/:packageId", methods: ["get", "put", "delete"], controller: {get: getPackageById, put: updatePackage, delete: deletePackage}},
  {path: "/objects", methods: ["post", "get"], controller: {post: createObject, get: getAllObjects}},
  {path: "/objects/:objectId", methods: ["get", "put", "delete"], controller: {get: getObjectById, put: updateObject, delete: deleteObject}},
  {path: "/objects/identify", methods: ["post"], controller: {post: identifyObject}},
  {path: "/users/register", methods: ["post"], controller: {post: register}},
  {path: "/users/login", methods: ["post"], controller: {post: login}},
  {path: "/users/:userId", methods: ["put", "delete", "get"], controller: {put: update, delete: destroy, get: getUserById}},
  {path: "/users", methods: ["get"], controller: {get: getAllUsers}},
  {path: "/users/email/:email", methods: ["get"], controller: {get: getUserByEmail}},
];

routes.forEach((route) => {
  route.methods.forEach((method) => {
    const handler = route.controller[method];
    if (handler) {
      app[method](route.path, handler);
    }
  });
});

exports.api = functions.https.onRequest(app);