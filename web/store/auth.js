export const state = () => {
  return {
    userId: '',
    role: '',
    signUpFeedback: '',
    signInFeedback: '',
    accessToken: ''
  };
};

export const mutations = {
  setUser(state, { userId, role }) {
    state.userId = userId;
    state.role = role;
  },
  setSignUpFeedback(state, feedback) {
    state.signUpFeedback = feedback;
  },
  setSignInFeedback(state, feedback) {
    state.signInFeedback = feedback;
  },
  setAccessToken(state, accessToken) {
    state.accessToken = accessToken;
  }
};

const _signInAsGuest = async axios => {
  const { access_token } = await axios.$post('/api/auth/signInAsGuest');
  return access_token;
};

export const actions = {
  setCookieToken({ commit }, access_token) {
    commit('setAccessToken', access_token);
    this.app.$cookies.set('access_token', access_token, {
      maxAge: 3600 //1 hour
    });
  },
  async refreshToken({ dispatch }) {
    const response = await this.$axios.$post('/api/auth/token/refresh');
    if (response) dispatch('setCookieToken', response.access_token ?? '');
  },

  async signInAsGuest({ dispatch }) {
    dispatch('setCookieToken', await _signInAsGuest(this.$axios));
  },

  async validateUser({ commit }) {
    const user = await this.$axios.$get('/api/auth/profile');
    if (user) commit('setUser', user);
  },

  async checkAuth({ dispatch }) {
    try {
      if (!this.app.$cookies.get('access_token'))
        await dispatch('refreshToken');
    } catch (error) {
      await dispatch('signInAsGuest');
    }
  },

  async signIn({ commit, dispatch }, { username, password }) {
    try {
      const { access_token } = await this.$axios.$post('/api/auth/signIn', {
        username,
        password
      });

      dispatch('setCookieToken', access_token);
      commit('setSignInFeedback', '');
    } catch ({ response }) {
      const { data } = response;
      commit('setSignInFeedback', data);
    }
  },

  async signUp({ commit, dispatch }, { username, password }) {
    try {
      const { access_token } = await this.$axios.$post('/api/auth/signUp', {
        username,
        password
      });
      dispatch('setCookieToken', access_token);
      commit('setSignUpFeedback', '');
    } catch (error) {
      const {
        response: { data }
      } = error;
      commit('setSignUpFeedback', data);
    }
  },

  async signOut({ dispatch }) {
    await this.$axios.$post('/api/auth/token/expire');
    this.app.$cookies.removeAll();
    await dispatch('checkAuth');
  }
};
