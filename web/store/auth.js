export const state = () => {
  return {};
};

const loginAsGuest = async axios => {
  const { access_token } = await axios.$post('/api/auth/signInAsGuest');
  return access_token;
};

const setCookieToken = (cookies, access_token) => {
  cookies.set('access_token', access_token, {
    maxAge: 3600
  });
};

export const actions = {
  async checkAuth(store) {
    const {
      app: { $cookies }
    } = this;
    if ($cookies.get('access_token')) {
      try {
        await this.$axios.$get('/api/auth/profile');
      } catch (err) {
        setCookieToken($cookies, await loginAsGuest(this.$axios));
      }
    } else {
      try {
        setCookieToken(
          $cookies,
          (await this.$axios.$post('/api/auth/refreshToken')).access_token
        );
      } catch (err) {
        setCookieToken($cookies, await loginAsGuest(this.$axios));
      }
    }
  }
};
