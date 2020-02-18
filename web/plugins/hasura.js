import Vue from 'vue';
export default async ({ app: { $axios } }) => {
  Vue.prototype.$hasura = async (query, variables) => {
    return await $axios.$post('/gql', { query, variables });
  };
};
