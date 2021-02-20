/* eslint-disable no-console */
// ---------------------------------------------------------------------------
// [START functionsimport]

/* eslint-disable no-unused-vars */
const functions = require('firebase-functions');
const admin = require('firebase-admin');

const helper = require('../helper');

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
  // router.route(urls, path, request, response);
  const { param1 } = helper.parseUrl(request.url);

  let responseObject;

  if (param1) {
    const address = await helper.ensResolve(param1);
    console.log(address);
    responseObject = address;
  } else {
    responseObject = null;
  }
  response.setHeader('Content-Type', 'application/json');
  response.set('Cache-Control', 'public, max-age=1800, s-maxage=3600');
  response.send(JSON.stringify(responseObject));
  response.end();
});

exports = module.exports;
// [END functions]
// ---------------------------------------------------------------------------
/* eslint-enable no-unused-vars */
