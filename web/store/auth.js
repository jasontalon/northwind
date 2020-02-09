export const state = () => {
  return {};
};

export const mutations = {};

export const getters = {
  user: (state, c) => {
    console.log({ state, c });
    return 'hallo';
  }
};
export const actions = {
  checkAuth(store) {
    //console.log({ store, context: this });
    //this is where you check the cookies
    //if cookie auth = none, then login as guest.
  }
};
