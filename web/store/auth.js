export const state = () => {
  return {
    userId: '',
    role: '',
    signUpFeedback: '',
    signInFeedback: ''
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
  }
};

const signInAsGuest = async axios => {
  const { access_token } = await axios.$post('/api/auth/signInAsGuest');
  return access_token;
};

const setCookieToken = (cookies, access_token) => {
  cookies.set('access_token', access_token, {
    maxAge: 3600 //1 hour
  });
};

export const actions = {
  async refreshToken() {
    const response = await this.$axios.$post('/api/auth/token/refresh');
    if (response)
      setCookieToken(this.app.$cookies, response.access_token ?? '');
  },

  async signInAsGuest() {
    setCookieToken(this.app.$cookies, await signInAsGuest(this.$axios));
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

  async signIn(store, { username, password }) {
    try {
      const { access_token } = await this.$axios.$post('/api/auth/signIn', {
        username,
        password
      });

      setCookieToken(this.app.$cookies, access_token);
      store.commit('setSignInFeedback', '');
    } catch ({ response }) {
      const { data } = response;
      store.commit('setSignInFeedback', data);
    }
  },

  async signUp(store, { username, password }) {
    try {
      const { access_token } = await this.$axios.$post('/api/auth/signUp', {
        username,
        password
      });
      setCookieToken(this.app.$cookies, access_token);
      store.commit('setSignUpFeedback', '');
    } catch (error) {
      const {
        response: { data }
      } = error;
      store.commit('setSignUpFeedback', data);
    }
  },

  async signOut({ dispatch }) {
    await this.$axios.$post('/api/auth/token/expire');
    this.app.$cookies.removeAll();
    await dispatch('checkAuth');
  }
};
