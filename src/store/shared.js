import fb from '@/firebase';
/*
TODO:
  - stack errors and status
  - pop status off after a time
*/
export default {
  state: {
    error: null,
    fileUploadPercent: 0,
    expectedBindCount: 8,
    loading: false,
    status: null,
    bound: [],
    splashy: true,
  },
  mutations: {
    setStatus(state, payload) {
      state.status = payload;
    },
    clearStatus(state) {
      state.status = null;
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
    setError(state, payload) {
      if (typeof payload.message === 'undefined') {
        state.error = payload;
      } else {
        // error payload from auths are object
        // need to grab error.message
        state.error = payload.message;
      }
    },
    clearError(state) {
      state.error = null;
    },
    updateUploadProgress(state, progress) {
      state.fileUploadPercent = progress;
    },
    setSplashy(state, payload) {
      console.log('SETTING SPLASHY!!!', payload);
      state.splashy = payload;
    },
    addBound(state, payload) {
      console.log('setting bound for ', payload);
      state.bound.push(payload);
      if (state.bound.length >= state.expectedBindCount) {
        console.log(`setting splashy to false because state.bound is bigger than the expected bindings (${state.expectedBindCount})`);
        state.splashy = false;
      }
      console.log('new bound', state.bound);
    },
    clearBound(state) {
      console.log('CLEARING BOUND!!! BURN IT ALL DOWN!!!');
      state.bound = [];
      state.splashy = true;
    },
  },
  actions: {
    setError({ commit }, payload) {
      commit('setError', payload);
    },
    clearError({ commit }) {
      commit('clearError');
    },
    setStatus({ commit }, payload) {
      commit('setStatus', payload);
    },
    clearStatus({ commit }) {
      commit('clearStatus');
    },
    async uploadFile({ commit }, payload) {
      const destFileRef = fb.storageRef.child(payload.path);
      const uploadTask = destFileRef.put(payload.file);

      uploadTask.on('state_changed', (snapshot) => {
        const progress = Math.ceil((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        commit('updateUploadProgress', progress);
      });

      const snapshot = await uploadTask;
      const fileUrl = await snapshot.ref.getDownloadURL();

      // upload done, progress back to 0
      commit('updateUploadProgress', 0);

      return fileUrl;
    },
  },
  getters: {
    status(state) {
      return state.status;
    },
    loading(state) {
      return state.loading;
    },
    error(state) {
      return state.error;
    },
    splashy(state) {
      return state.splashy;
    },
    fileUploadPercent(state) {
      return state.fileUploadPercent;
    },
  },
};
