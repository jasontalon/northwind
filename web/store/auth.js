export const state = () => {
  return {
    accessToken: ''
  };
};

export const mutations = {
  setAccessToken(state, val) {
    console.log({ state, val });
    state.accessToken = val;
  }
};

const loginAsGuest = async () => {
  const { access_token } = await this.$axios.$post('/api/auth/signInAsGuest');
  return access_token;
};
export const actions = {
  async checkAuth(store) {
    const {
      app: { $cookies }
    } = this;
    let access_token = $cookies.get('access_token');

    if (access_token) {
      try {
        await this.$axios.$get('/api/auth/profile');
      } catch (err) {
        access_token = await loginAsGuest();
      }
    } else {
      let refreshToken;
      try {
        refreshToken = await this.$axios.$post('/api/auth/refreshToken');
      } catch (err) {}

      access_token = !!refreshToken
        ? refreshToken.access_token
        : await loginAsGuest();
    }

    $cookies.set('access_token', access_token, {
      maxAge: 3600
    });
  }
};
