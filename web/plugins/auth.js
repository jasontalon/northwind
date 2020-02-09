export default async ({ store }) => {
  //init cookie auth check
  store.dispatch('auth/checkAuth')
  console.log(store.getters['auth/user']);

  console.log('plugins/auth.js'); 
};
