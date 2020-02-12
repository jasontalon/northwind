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
      const data = await this.$axios.$get('/api/'); //ok
    },
    async validateToken() {
      this.user = await this.$axios.$get('/api/auth/profile');
    },
    async refreshToken() {
      this.$store.dispatch('auth/refreshToken');
    }
  }
};
</script>
