/* eslint-disable new-cap */
/* eslint-disable no-console */
/* eslint-disable func-names */
/**
 @module harper
 */
// ---------------------------------------------------------------------------
// [START functionsimport]

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const ethers = require('ethers');
const axios = require('axios').default;

try {
  admin.initializeApp(functions.config().firebase);
} catch (e) {
  //   console.log(e);
} // You do that because the admin SDK can only be initialized once.

const helper = function () {};

helper.prototype.provider = new ethers.providers.CloudflareProvider();

helper.prototype.db = admin.firestore();

// ---------------------------------------------------------------------------

/**
 * Checks if the given string is an address
 *
 * @function parseUrl
 * @param {string} url the given HEX adress
 * @returns {object} url parts
 */
helper.prototype.parseUrl = function (url) {
  const parts = url.split('/');

  let keybase = 1;

  if (parts[1] === 'api') {
    keybase = 3;
  }

  const param1 = parts[keybase];
  let ethAddress;
  if (this.isAddress(param1)) {
    ethAddress = param1;
  }
  const param2 = parts[keybase + 1];
  const param3 = parts[keybase + 2];

  const payload = {
    ethAddress,
    param1,
    param2,
    param3,
  };

  return payload;
};

/**
 * Checks if the given string is an address
 *
 * @function isAddress
 * @param {string} ethAddress the given HEX adress
 * @returns {boolean} yay
 */
helper.prototype.isAddress = function (ethAddress) {
  return ethers.utils.isAddress(ethAddress);
};

/**
 * Checks if the given string is an address
 *
 * @function getAssets
 * @param {string} ethAddress the given HEX adress
 * @returns {object} yay
 */
helper.prototype.getAssets = async function (ethAddress) {
  const assetsUrl = `https://api.opensea.io/api/v1/assets?owner=${ethAddress}&order_direction=desc&offset=0&limit=100`;

  // Make a request for a user with a given ID
  try {
    const response = await axios.get(assetsUrl);

    return response.data.assets; // response;
  } catch (error) {
    return {};
  }
};

/**
 * Checks if the given string is an address
 *
 * @function getAssets
 * @param {string} contractAddress the given HEX address of the contract
 * @param {string} tokenId token id
 * @returns {object} yay
 */
helper.prototype.getAsset = async function (contractAddress, tokenId) {
  const assetUrl = `https://api.opensea.io/api/v1/asset/${contractAddress}/${tokenId}/`;

  // Make a request for a user with a given ID
  try {
    const response = await axios.get(assetUrl);

    return response.data; // response;
  } catch (error) {
    return {};
  }
};

/**
 * resolves and ens name
 *
 * @function ensResolve
 * @param {string} ethAddress the given HEX address of the contract
 * @returns {string} ensName
 */
helper.prototype.ensLookup = async function (ethAddress) {
  try {
    const name = await this.provider.lookupAddress(ethAddress);
    return name;
  } catch (error) {
    console.log(error);
  }
  return '';
};

/**
 * resolves and ens name
 *
 * @function ensResolve
 * @param {string} ensName the given HEX address of the contract
 * @returns {string} address
 */
helper.prototype.ensResolve = async function (ensName) {
  try {
    const address = await this.provider.resolveName(ensName);
    console.log(address);
    return address;
  } catch (error) {
    console.log(error);
  }
  return '';
};

/**
 * resolves and ens name
 *
 * @function ensResolve
 * @param {string} ensName the given HEX address of the contract
 * @returns {string} address
 */
helper.prototype.ensGetData = async function (ensName) {
  const records = ['avatar', 'email', 'url', 'vnd.twitter', 'vnd.github'];
  const data = {};
  try {
    const resolver = await this.provider.getResolver(ensName);

    if (resolver) {
      // eslint-disable-next-line no-restricted-syntax
      for (const key of records) {
        // eslint-disable-next-line no-await-in-loop
        const result = await resolver.getText(key);
        if (result) {
          data[key] = result;
        }
      }
      return data;
    }
  } catch (error) {
    console.log(error);
  }
  return null;
};

/**
 * resolves and ens name
 *
 * @function getEthBalance
 * @param {string} ethAddress the given HEX address of the contract
 * @returns {string} amount
 */
helper.prototype.getEthBalance = async function (ethAddress) {
  try {
    const balance = await this.provider.getBalance(ethAddress);

    return ethers.utils.formatEther(balance);
  } catch (error) {
    console.log(error);
  }
  return null;
};

// [End Action helpers]

// ---------------------------------------------------------------------------

module.exports = new helper();
