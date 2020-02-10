export default function({ $axios, redirect, store, app }) {
  $axios.onRequest(config => {
    const accessToken = app.$cookies.get('access_token');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
  });

  $axios.interceptors.response.use(
    response => {
      return response;
    },
    async error => {
      if (error.response.config.url.toLowerCase() == '/api/auth/refreshtoken')
        return;
      try {
        app.$cookies.set(
          'access_token',
          (await $axios.$post('/api/auth/refreshToken')).access_token,
          { maxAge: 3600 }
        );
      } catch (err) {}
    }
  );
}
