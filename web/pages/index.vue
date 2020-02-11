<template>
  <div>
    <b-button @click="this.clickHandler">click me</b-button>
    <b-button @click="this.validateToken">validate token</b-button>
    <b-button @click="this.refreshToken">refresh token</b-button>
    <div>{{ this.user }}</div>
  </div>
</template>
<script>
export default {
  data() {
    return { user: {} };
  },
  methods: {
    async clickHandler() {
      console.log('clicking..');
      const data = await this.$axios.$get('/api/'); //ok
      console.log(data);
    },
    async validateToken() {
      this.user = await this.$axios.$get('/api/auth/profile');
    },
    async refreshToken() {
      await this.$axios.post('/api/auth/refreshToken');
    }
  }
};
</script>
