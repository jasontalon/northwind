<template>
  <div class="mx-auto" style="max-width:550px;">
    <sign-in
      v-bind:p-username.sync="username"
      v-bind:p-password.sync="password"
    >
    </sign-in>
    <b-button block @click="this.signIn">Sign In</b-button>
    {{ feedback }}
  </div>
</template>

<script>
import SignIn from '~/components/SignIn';
import { mapState } from 'vuex';
export default {
  components: { SignIn },
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
      if (this.feedback.length == 0) this.$router.push('/');
    }
  }
};
</script>
