export default function({ $axios, redirect, store, app }) {
  $axios.onRequest(config => {
    const accessToken = app.$cookies.get('access_token');

    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
  });
  $axios.interceptors.response.use(
    async response => {
      const {
          data: { errors = [] },
          config: { url }
        } = response,
        [error = {}] = errors,
        { extensions: { code = '' } = {} } = error;

      if (code.toLowerCase() == 'access-denied' && url == '/gql') {
        await store.dispatch('auth/refreshToken');
        await $axios.request(response.config);
      } else return response;
    },
    async error => {
      if (error.response.status != 401) throw error;

      if (
        error.response.config.url.toLowerCase() == '/api/auth/token/refresh'
      ) {
        await store.dispatch('auth/signInAsGuest');
        await store.dispatch('auth/validateUser');
      } else {
        await store.dispatch('auth/refreshToken');
      }

      return await $axios.request(error.config);
    }
  );
}
