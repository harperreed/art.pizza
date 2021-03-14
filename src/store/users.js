import fb from '@/firebase';
import router from '@/router';

// External authentication providers we support.
const GOOGLE_PROVIDER_ID = 'google.com';
const GITHUB_PROVIDER_ID = 'github.com';
const MICROSOFT_PROVIDER_ID = 'microsoft.com';
const FACEBOOK_PROVIDER_ID = 'facebook.com';
const TWITTER_PROVIDER_ID = 'twitter.com';

// Help use be consistent with profile fields. This should definitely live somewhere else.
const PROFILE_NAME_FIELD = 'name';
const PROFILE_PHOTO_URL_FIELD = 'photoUrl';
const PROFILE_COMPANY_WEBSITE_FIELD = 'website';
const PROFILE_LOCATION_FIELD = 'location';

const PROFILE_COMPANY_FIELD = 'company';
const PROFILE_COMPANY_NAME_FIELD = 'name';
const PROFILE_COMPANY_TITLE_FIELD = 'title';

const PROFILE_CONTACT_FIELD = 'contact';
const PROFILE_CONTACT_EMAIL_FIELD = 'email';
const PROFILE_CONTACT_PHONE_FIELD = 'phone';

const PROFILE_SUB_SECTIONS = [
  PROFILE_COMPANY_FIELD,
  PROFILE_CONTACT_FIELD,
];

// A nice lookup table with functions for generating a new provider instance.
const AUTHENTICATION_PROVIDERS = new Map([
  [GOOGLE_PROVIDER_ID, () => new fb.authProviders.GoogleAuthProvider()],
  [GITHUB_PROVIDER_ID, () => new fb.authProviders.GithubAuthProvider()],
  [MICROSOFT_PROVIDER_ID, () => new fb.authProviders.OAuthProvider(MICROSOFT_PROVIDER_ID)],
  [TWITTER_PROVIDER_ID, () => new fb.authProviders.TwitterAuthProvider()],
  [FACEBOOK_PROVIDER_ID, () => new fb.authProviders.FacebookAuthProvider()],
]);

/**
 * Returns a fully instantiated authentication provider.
 *
 * @param {String} providerId - An authentication provider ID.
 * @returns {firebase.auth.AuthProvider} - An authentication provider.
 */
function getAuthenticationProvider(providerId) {
  return AUTHENTICATION_PROVIDERS.get(providerId)();
}

/**
 * Collect out the identifiers in a list of authentication providers.
 *
 * @param {Array<object>} providers - A list of authentication providers this user has connected.
 * @returns {Set<String>} - A unique list of authentication providers the user has linked.
 */
function collectAuthProviderIDs(providers) {
  const authProviderIds = new Set();
  providers.forEach((provider) => {
    authProviderIds.add(provider.providerId);
  });
  return authProviderIds;
}

// These next two fuctions probably belong in a helper somewhere.

/**
 * Determines if an object is "empty"
 *
 * @param {object} obj - An Object
 */
function isEmpty(obj) {
  // eslint-disable-next-line no-restricted-syntax
  for (const key in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(key)) { return false; }
  }
  return true;
}

/**
 * Converts a Map to an Object suitable for Firebase.
 *
 * @param {Map} map - A map.
 * @returns {Object} - An object version of the Map.
 */
function mapToObject(map) {
  const o = {};
  map.forEach((value, name) => {
    o[name] = value;
  });
  return o;
}

/**
 * Determine if we can update any data.
 *
 * Given an existing set of data and a set of new data, determine what data
 * we may consume.
 *
 * If the returned object has any data on it, that data could be applied to
 * a datastore document.
 *
 * @param {Map<Any, Any>} availableDataMap - A map of data which is available to be consumed.
 * @param {Object} existingData - An object representing the current state.
 */
function collectUpdateableData(availableDataMap, existingData) {
  const updatableData = new Map();
  existingData = existingData || {};
  availableDataMap.forEach((fieldValue, fieldName) => {
    if (fieldValue instanceof Map) {
      // Profiles have sub-sections like `company` and `contact`.
      const sub = collectUpdateableData(fieldValue, existingData[fieldName]);
      // Don't include the sub data if its empty.
      if (!isEmpty(sub)) {
        updatableData.set(fieldName, sub);
      }
    } else if (fieldValue && (existingData[fieldName] === undefined || existingData[fieldName] === null)) {
      // Only update data which the user hasn't already touched.
      updatableData.set(fieldName, fieldValue);
    }
  });
  return mapToObject(updatableData);
}

/**
 * Normalize profile data from external sources.
 *
 * Each authentication provider provides its profile in different schemas.
 *
 * Right now this is a simple approach to grab the useful fields. This has
 * a very clear upgrade path to extensibility if we want to add lots more
 * authentication providers.
 *
 * @param {string} providerId - The name of a provider ID.
 * @param {object} profile - Profile data from our datastore.
 * @returns {object} - A normalized object of available profile data.
 */
function normalizeExternalProfileData({ providerId, profile }) {
  console.debug(`normalizeExternalProfileData: Normalizing external data from ${providerId}.`);
  // Stubs out profile subsections with their own Map.
  const subSections = [];
  PROFILE_SUB_SECTIONS.forEach((subSectionName) => {
    subSections.push([subSectionName, new Map()]);
  });
  const normalizedProfileData = new Map(subSections);
  // TODO: This stuff could be broken out into specialized functions and this function
  //       could be made much simpler.
  switch (providerId) {
    case GOOGLE_PROVIDER_ID:
      normalizedProfileData.set(PROFILE_NAME_FIELD, profile.name);
      normalizedProfileData.get(PROFILE_CONTACT_FIELD).set(PROFILE_CONTACT_EMAIL_FIELD, profile.email);
      normalizedProfileData.set(PROFILE_PHOTO_URL_FIELD, profile.picture);
      break;
    case GITHUB_PROVIDER_ID:
      normalizedProfileData.set(PROFILE_NAME_FIELD, profile.name);
      normalizedProfileData.get(PROFILE_CONTACT_FIELD).set(PROFILE_CONTACT_EMAIL_FIELD, profile.email);
      normalizedProfileData.set(PROFILE_PHOTO_URL_FIELD, profile.avatar_url);
      normalizedProfileData.get(PROFILE_COMPANY_FIELD).set(PROFILE_COMPANY_NAME_FIELD, profile.company);
      normalizedProfileData.set(PROFILE_COMPANY_WEBSITE_FIELD, profile.blog);
      normalizedProfileData.set(PROFILE_LOCATION_FIELD, profile.location);
      break;
    case MICROSOFT_PROVIDER_ID:
      normalizedProfileData.set(PROFILE_NAME_FIELD, profile.displayName);
      normalizedProfileData.get(PROFILE_CONTACT_FIELD).set(PROFILE_CONTACT_PHONE_FIELD, profile.mobilePhone);
      normalizedProfileData.get(PROFILE_COMPANY_FIELD).set(PROFILE_COMPANY_TITLE_FIELD, profile.jobTitle);
      normalizedProfileData.set(PROFILE_LOCATION_FIELD, profile.officeLocation);
      break;
    default:
      throw Error('Unknown authentication provider.');
  }
  // Dispose of empty sub-sections if the normalizers didn't use them.
  PROFILE_SUB_SECTIONS.forEach((subSectionName) => {
    if (!normalizedProfileData.get(subSectionName).size) {
      normalizedProfileData.delete(subSectionName);
    }
  });
  console.debug('normalizeExternalProfileData: Normalized external data');
  return normalizedProfileData;
}

/**
 * Produces a suitable function for handling the results of a profile query,
 * comparing it to the external profile fields, and potentially updating
 * the profile document.
 *
 * @param {Object} normalizedExternalProfileData - An object containing fields from external profiles.
 * @returns {Function} - A function you may use in the `where` clause of a profile query.
 */
function getHandleProfile(normalizedExternalProfileData) {
  /**
   * This function extracts the query document, compares to, and potentialy updates the datastore.
   *
   * @param {fb.DataSnapshot} profileQuery - A snapshot query from firestore. We use the first item.
   * @returns {null}
   */
  function handleProfile(profileQuery) {
    // Extract the profile document
    let profileDoc = null;
    profileQuery.forEach((queryDoc) => {
      profileDoc = queryDoc;
    });
    console.debug('extractAdditionalProfileInfo: Comparing new data to existing profile data.');
    // Step over all the available profile data from the auth provider, see if there's
    // any blank spots in this user's profile we can fill in.
    if (!profileDoc) {
      return;
    }
    const updatableProfileData = collectUpdateableData(normalizedExternalProfileData, profileDoc.data());
    if (!isEmpty(updatableProfileData)) {
      console.debug('extractAdditionalProfileInfo: Updating profile data using external fields.');
      profileDoc.ref.update(updatableProfileData)
        .then(() => {
          console.debug('Successfully updated profile.');
        });
    } else {
      console.debug('extractAdditionalProfileInfo: No external profile information available for update.');
    }
  }
  return handleProfile;
}

export default {
  state: {
    user: null,
  },
  mutations: {
    setAuthenticationProviders(state) {
      state.user.authProviders = collectAuthProviderIDs(fb.auth.currentUser.providerData);
    },
    setUser(state, payload) {
      if (payload) {
        payload.authProviders = collectAuthProviderIDs(fb.auth.currentUser.providerData);
      }
      console.debug('setting user payload');
      state.user = payload;
    },
    extractAdditionalProfileInfo(state, payload) {
      console.debug('extractAdditionalProfileInfo: Attempting to extract data an external identify provider.');
      const { additionalUserInfo } = payload.result;
      const normalizedExternalProfileData = normalizeExternalProfileData({
        providerId: additionalUserInfo.providerId,
        profile: additionalUserInfo.profile,
      });
      // Procude a function we can use to handle the profile data and compare it with
      // external data.
      const handleProfile = getHandleProfile(normalizedExternalProfileData);
      // Query the DB to determine the profile's current state.
      fb.db
        .collection('profiles')
        .where('uid', '==', fb.auth.currentUser.uid)
        .get()
        .then(handleProfile);
    },
  },
  actions: {
    async bindAll({ dispatch, commit }) {
      console.debug('BINDING ALL!');
      // This makes it so that we rebind on reload because
      // not doing so was causing binds to break.
      commit('clearBound');
      const bindings = [
        'bindProfile',
        'bindSubscriptions',
        'bindOverlay',
        'bindPublishedApps',
        'bindDevelopers',
        'bindApplicationTags',
        'bindApplicationCategories',
        'bindApplicationCollections',
      ];

      const promises = [];
      bindings.forEach((binder) => {
        promises.push(dispatch(binder));
      });
      console.debug('Dispatched all bindings');
      return Promise.allSettled(bindings);
    },
    async unbindAll({ dispatch, commit }) {
      console.debug('UNBINDING ALL!');
      const unbindings = [
        'unbindAppBindings',
        'unbindOverlayBindings',
        'unbindProfileBindings',
        'unbindSubscriptionBindings',
        'unbindDeveloperBindings',
        'unbindClaimsBindings',
      ];
      const promises = [];
      unbindings.forEach((binder) => {
        promises.push(dispatch(binder));
      });
      await Promise.allSettled(unbindings);
      commit('clearBound');
    },
    authenticateExternalProvider({ commit }, payload) {
      commit('setLoading', true);
      commit('clearError');

      /**
       * Handle Authentication Result.
       *
       * This method will be called in both Sign In and Account Link Scenarios.
       * When an account is linked, there will
       *
       * @param {Object} result - The authentication results.
       */
      function handleResult(result) {
        console.debug('Handling Auth Result');
        commit('setLoading', false);
        if (result.credential) {
          switch (result.operationType) {
            case 'signIn':
              commit('setStatus', 'Successfully signed in.');
              break;
            case 'link':
              commit('setStatus', 'Successfully linked another account.');
              commit('setAuthenticationProviders');
              break;
            default:
              throw Error("Operation type must be one of 'signIn', 'link'.");
          }
          commit('extractAdditionalProfileInfo', {
            result,
          });
        } else {
          throw Error('No credentials returned with result.');
        }
      }

      function handleError(error) {
        commit('setLoading', false);
        commit('setError', error);
        console.error(error);
      }

      switch (payload.operationType) {
        case 'signIn':
          fb.auth.signInWithPopup(payload.provider)
            .then(handleResult)
            .catch(handleError);
          console.debug('User Signing In');
          break;
        case 'link':
          fb.auth.currentUser.linkWithPopup(payload.provider)
            .then(handleResult)
            .catch(handleError);
          console.debug('User Linking Account.');
          break;
        default:
          throw new Error("operationType must be one of 'signIn', 'link'");
      }
    },
    signInUserExternalProvider({ dispatch }, payload) {
      dispatch('authenticateExternalProvider', {
        operationType: 'signIn',
        provider: payload.provider,
      });
    },
    linkUserExternalProvider({ dispatch }, payload) {
      dispatch('authenticateExternalProvider', {
        operationType: 'link',
        provider: payload.provider,
      });
    },
    signUserInFacebook({ dispatch }) {
      const provider = getAuthenticationProvider(FACEBOOK_PROVIDER_ID);
      dispatch('signInUserExternalProvider', { provider });
    },
    signUserInGithub({ dispatch }) {
      const provider = getAuthenticationProvider(GITHUB_PROVIDER_ID);
      dispatch('signInUserExternalProvider', { provider });
    },
    signUserInGoogle({ dispatch }) {
      const provider = getAuthenticationProvider(GOOGLE_PROVIDER_ID);
      dispatch('signInUserExternalProvider', { provider });
    },
    signUserInMicrosoft({ dispatch }) {
      const provider = getAuthenticationProvider(MICROSOFT_PROVIDER_ID);
      dispatch('signInUserExternalProvider', { provider });
    },
    signUserInTwitter({ dispatch }) {
      const provider = getAuthenticationProvider(TWITTER_PROVIDER_ID);
      dispatch('signInUserExternalProvider', { provider });
    },
    linkUserInGoogle({ dispatch }) {
      const provider = getAuthenticationProvider(GOOGLE_PROVIDER_ID);
      dispatch('linkUserExternalProvider', { provider });
    },
    linkUserInGithub({ dispatch }) {
      const provider = getAuthenticationProvider(GITHUB_PROVIDER_ID);
      dispatch('linkUserExternalProvider', { provider });
    },
    linkUserInMicrosoft({ dispatch }) {
      const provider = getAuthenticationProvider(MICROSOFT_PROVIDER_ID);
      dispatch('linkUserExternalProvider', { provider });
    },
    handleSignInLogout({ commit, dispatch, state }, payload) {
      /* Let's grab the claims and then we can use them in our authguard */
      console.debug('The authentication state changed.');
      if (payload) { // Login
        fb.auth.currentUser
          .getIdTokenResult()
          .then((token) => {
            console.debug('Got the ID Token Result');
            console.log(token.claims);
            commit('setUser', {
              claims: token.claims,
              id: payload.uid,
              name: payload.displayName,
              email: payload.email,
              photoUrl: payload.photoURL,
            });
            commit('setAuthenticationProviders');
          })
          .catch((error) => {
            commit('setLoading', false);
            commit('setError', error);
            console.error(error);
          })
          .finally(() => {
            const { user } = state;
            dispatch('sendAnalyticsUser', user);
            if (user.claims.alpha || user.claims.enabled) {
              dispatch('bindAll');
            } else {
              dispatch('bindClaims');
              console.log('No access. Do not get data');
            }
            dispatch('setupFrontChat');
          });
      }
    },
    async forceRelogin({ dispatch, state }) {
      await dispatch('updateClaims');
      const { user } = state;
      if (user.claims.alpha || user.claims.enabled) {
        await dispatch('bindAll');
      }
    },
    refreshIdToken({ commit, dispatch }) {
      console.log('refreshing id token');
      commit('setLoading', true);
      fb.auth.currentUser
        .getIdToken(true)
        .then((token) => {
          console.log(token);
          dispatch('updateClaims');
        })
        .catch((error) => {
          commit('setLoading', false);
          commit('setError', error);
          console.error(error);
        })
        .finally(() => {
          commit('setLoading', false);
        });
    },
    updateClaims({ commit, state }) {
      /* Let's generate a UID token and then set this to the user */
      const { user } = state;
      console.log('userclaims', user.claims);
      commit('setLoading', true);
      return fb.auth.currentUser
        .getIdTokenResult(true)
        .then((token) => {
          console.debug('Got the ID Token Result');
          console.log(token);
          console.log('those are the claims');
          user.claims = token.claims;
          console.log(user);
          commit('setUser', user);
          commit('setAuthenticationProviders');
        })
        .catch((error) => {
          commit('setLoading', false);
          commit('setError', error);
          console.error(error);
        })
        .finally(() => {
          commit('setLoading', false);
        });
    },
    getGeneratedAuthToken({ commit, state }) {
      /* Let's generate a UID token and then set this to the user */
      const { user } = state;
      console.log('GETTING GENERATED AUTH TOKEN FOR', user);
      fb.makeToken()
        .then((result) => {
          // Read result of the Cloud Function.
          user.token = result.data.token;
          console.log('GOT THE TOKEN', user.token);
          commit('setUser', user);
        });
    },
    async setupFrontChat({ state }) {
      const frontChatVerification = fb.functions.httpsCallable('callableFrontChatVerification');
      const hmac = await frontChatVerification();
      try {
        window.FrontChat('init', {
          chatId: '7d994b94a76e92e6946e12617d5c128b',
          useDefaultLauncher: true,
          email: state.user.email,
          userHash: hmac.data,
        });
      } catch (error) {
        console.error(`Front Chat failed to initialize: ${error}`);
      }
    },
    logout({ commit, dispatch }) {
      // Will trigger `handleSignInLogout` with value null;
      return fb.auth.signOut().then(() => {
        console.log("You've been logged out... but why?");
        router.push({ name: 'signin' }).catch(() => {});
        commit('setStatus', 'Signed out');
        commit('setUser', null);
        dispatch('unbindAll');
      });
    },
    finishLinkSignup({ commit }) {
      try {
        if (fb.auth.isSignInWithEmailLink(window.location.href)) {
          // Additional state parameters can also be passed via URL.
          // This can be used to continue the user's intended action before triggering
          // the sign-in operation.
          // Get the email if available. This should be available if the user completes
          // the flow on the same device where they started it.
          let email = window.localStorage.getItem('emailForSignIn');
          if (!email) {
            // User opened the link on a different device. To prevent session fixation
            // attacks, ask the user to provide the associated email again. For example:
            // eslint-disable-next-line no-alert
            email = window.prompt('Please provide your email for confirmation');
          }
          // The client SDK will parse the code from the link for you.
          fb.auth.signInWithEmailLink(email, window.location.href)
            .then((result) => {
              // Clear email from storage.
              window.localStorage.removeItem('emailForSignIn');
              if (!result.user) {
                throw Error('We were unable to sign you in.');
              }
            });
        } else {
          throw Error('Not a valid link.');
        }
      } catch (error) {
        // Some error occurred, you can inspect the code: error.code
        // Common errors could be invalid email and invalid or expired OTPs.
        commit('setLoading', false);
        commit('setError', error);
        console.error(error);
        this.$router.push({ name: 'signin' });
      }
    },
    signUserInEmailLink({ commit }, payload) {
      commit('setLoading', true);
      commit('clearError');
      const actionCodeSettings = {
        // URL you want to redirect back to. The domain (www.example.com) for this
        // URL must be whitelisted in the Firebase Console.
        url: `${window.location.protocol}//${window.location.host}/finishLinkSignup`,
        // This must be true.
        handleCodeInApp: true,
        iOS: {
          bundleId: 'io.galactic.ios',
        },
        android: {
          packageName: 'io.galactic.android',
          installApp: true,
          minimumVersion: '12',
        },
        dynamicLinkDomain: 'galacticio.page.link',
      };
      fb.auth.sendSignInLinkToEmail(payload.emailAddress, actionCodeSettings)
        .then(() => {
          window.localStorage.setItem('emailForSignIn', payload.emailAddress);
          commit('setLoading', false);
          commit('setStatus', 'Check your inbox for a login link.');
        })
        .catch((error) => {
          commit('setLoading', false);
          commit('setError', error);
          console.error(error);
        });
    },
  },
  getters: {
    user(state) {
      return state.user;
    },
  },
};
