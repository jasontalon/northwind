<template>
  <b-container class="mx-auto" style="max-width:550px;">
    <h1>Sign In</h1>
    <sign-in-form
      v-bind:p-username.sync="username"
      v-bind:p-password.sync="password"
    >
    </sign-in-form>
    <b-button block @click="this.signIn">Sign In</b-button>
    {{ feedback }}
  </b-container>
</template>

<script>
import SignInForm from '~/components/forms/SignInForm';
import { mapState } from 'vuex';
export default {
  components: { SignInForm },
  data() {
    return {
      username: '',
      password: ''
    };
  },
  computed: {
    ...mapState({ feedback: state => state.auth.signInFeedback })
  },
  methods: {
    async signIn() {
      await this.$store.dispatch('auth/signIn', {
        username: this.username,
        password: this.password
      });
      await this.$store.dispatch('auth/validateUser');

      const { src = '/' } = this.$route.query;
      console.log(src);
      if (this.feedback.length == 0) this.$router.push(src);
    }
  }
};
</script>
