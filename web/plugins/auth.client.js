export default async ({ store }) => {
  //authentication listener
  store.watch(
    state => state.auth.accessToken,
    (upd, old) => {
      if (upd != old) console.log('access_token updated.');
    }
  );
  store.watch(
    state => state.auth.userId,
    (upd, old) => {
      if (upd != old) console.log(`userId has changed from '${old}' to '${upd}' `);
    }
  );
  await store.dispatch('auth/checkAuth');
};
