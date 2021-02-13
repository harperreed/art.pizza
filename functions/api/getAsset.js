// ---------------------------------------------------------------------------
// [START functionsimport]

/* eslint-disable no-unused-vars */
const functions = require("firebase-functions");
const admin = require("firebase-admin");

try {
  admin.initializeApp(functions.config().firebase);
} catch (e) {
  // You do that because the admin SDK can only be initialized once.
}

// Not in use, commented out for ease of readding.
// const firebase = require('firebase');
// const db = admin.firestore();

// [END functionsimport]
// ---------------------------------------------------------------------------
// [START additionalimports]

// Not in use, commented out for ease of readding.

// [END additionalimports]
// ---------------------------------------------------------------------------
// [START helpers]

// [END helpers]
// ---------------------------------------------------------------------------
// [START functions]

module.exports = functions.https.onRequest(async (request, response) => {
  response.send("asset");
});

exports = module.exports;
// [END functions]
// ---------------------------------------------------------------------------
/* eslint-enable no-unused-vars */
