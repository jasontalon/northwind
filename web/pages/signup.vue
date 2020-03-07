<template>
  <div class="mx-auto" style="max-width:550px;">
    <h1>Sign Up</h1>
    <sign-in-form
      v-bind:p-username.sync="username"
      v-bind:p-password.sync="password"
    >
    </sign-in-form>
    <div>
      <b-form-group
        description=""
        label="Confirm Password"
        label-for="txtConfirmPassword"
        :invalid-feedback="this.confirmPasswordFeedback"
        :state="this.confirmPasswordFeedback.length == 0"
      >
        <b-form-input
          type="password"
          id="txtConfirmPassword"
          v-model="confirmPassword"
          :state="
            this.confirmPassword.length > 0 &&
              this.confirmPassword == this.password
          "
          trim
        ></b-form-input>
      </b-form-group>
    </div>
    <b-button
      block
      @click="this.signUp"
      :disabled="
        this.username.length == 0 ||
          this.password.length == 0 ||
          this.confirmPasswordFeedback.length > 0
      "
      >Sign Up</b-button
    >
    {{ feedback }}
  </div>
</template>

<script>
import SignInForm from '~/components/forms/SignInForm';
import { mapState } from 'vuex';
export default {
  components: { SignInForm },
  data() {
    return {
      username: '',
      password: '',
      confirmPassword: ''
    };
  },
  computed: {
    ...mapState({ feedback: state => state.auth.signUpFeedback }),
    confirmPasswordFeedback() {
      if (this.confirmPassword.length == 0) return 'Please confirm password.';
      if (this.confirmPassword != this.password) return 'Password not the same';
      return '';
    }
  },
  methods: {
    async signUp() {
      await this.$store.dispatch('auth/signUp', {
        username: this.username,
        password: this.password
      });
      await this.$store.dispatch('auth/validateUser');
      const { src = '/' } = this.$route.query;

      if (this.feedback.length == 0) this.$router.push(src);
    }
  }
};
</script>
