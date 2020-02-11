<template>
  <div class="mx-auto" style="max-width:550px;">
    <sign-in
      v-bind:p-username.sync="username"
      v-bind:p-password.sync="password"
    >
    </sign-in>
    <b-button block @click="this.signIn">Sign In</b-button>
  </div>
</template>

<script>
import SignIn from '~/components/SignIn';
export default {
  components: { SignIn },
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    async signIn() {
      console.log(this.username, this.password);
      await this.$store.dispatch('auth/signIn', {
        userId: this.username,
        password: this.password
      });
    }
  }
};
</script>
