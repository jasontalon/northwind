export default async ({ app }, inject) => {
  inject('hasura', async (query, variables) => {
    return await app.$axios.$post('/gql', { query, variables });
  });
};
