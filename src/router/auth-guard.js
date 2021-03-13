import { store } from '../store';

export default (to, from, next) => {
  const unauth = { name: 'signin' };
  // const home = { name: 'home' };

  let destination = to;

  if (store.getters.user) {
    /* if the route requires developer claim */

  } else {
    if (to.path !== '/signin') {
      window.localStorage.setItem('afterAuthRedirect', to.path);
    }
    destination = unauth;
  }

  /* if destination hasn't been changed, let's continue on as normal */
  if (destination === to) {
    next();
  } else {
    next(destination);
  }
};
