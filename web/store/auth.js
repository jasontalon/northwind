export const state = () => {
  return {
    userId: '',
    role: '',
    feedback: ''
  };
};

export const mutations = {
  setUser(state, { userId, role }) {
    state.userId = userId;
    state.role = role;
    console.log({ userId, role });
  },
  setFeedback(state, feedback) {
    state.feedback = feedback;
  }
};

const signInAsGuest = async axios => {
  const { access_token } = await axios.$post('/api/auth/signInAsGuest');
  return access_token;
};

const setCookieToken = (cookies, access_token) => {
  cookies.set('access_token', access_token, {
    maxAge: 3600
  });
};

export const actions = {
  async refreshToken(store) {
    setCookieToken(
      this.app.$cookies,
      (await this.$axios.$post('/api/auth/refreshToken')).access_token
    );
  },

  async signInAsGuest() {
    setCookieToken(this.app.$cookies, await signInAsGuest(this.$axios));
  },

  async validateUser({ commit }) {
    const user = await this.$axios.$get('/api/auth/profile');
    commit('setUser', user);
  },

  async checkAuth({ dispatch }) {
    if (this.app.$cookies.get('access_token')) {
      try {
        await dispatch('validateUser');
        return;
      } catch (err) {
        await dispatch('signInAsGuest');
      }
    } else {
      try {
        await dispatch('refreshToken');
      } catch (err) {
        await dispatch('signInAsGuest');
      }
    }
    await dispatch('validateUser');
  },

  async signIn(store, { userId, password }) {
    await this.$axios.$post('/api/auth/signIn', { userId, password });
  },

  async signUp(store, { username, password }) {
    try {
      const { access_token } = await this.$axios.$post('/api/auth/signUp', {
        username,
        password
      });
      setCookieToken(this.app.$cookies, access_token);
      store.commit('setFeedback', '');
    } catch (error) {
      const {
        response: { data }
      } = error;
      store.commit('setFeedback', data);
    }
  }
};
