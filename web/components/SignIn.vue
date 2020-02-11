<template>
  <div>
    <div>
      <b-form-group
        description=""
        label="Username"
        label-for="txtUsername"
        :invalid-feedback="this.usernameFeedback"
        :state="this.usernameFeedback.length == 0"
      >
        <b-form-input
          id="txtUsername"
          v-model="username"
          :state="this.usernameFeedback.length == 0"
          trim
        ></b-form-input>
      </b-form-group>
    </div>
    <div>
      <b-form-group
        description=""
        label="Password"
        label-for="txtPassword"
        :invalid-feedback="this.passwordFeedback"
        :state="this.passwordFeedback.length == 0"
      >
        <b-form-input
          type="password"
          id="txtPassword"
          v-model="password"
          :state="this.password.length > 0"
          trim
        ></b-form-input>
      </b-form-group>
    </div>
  </div>
</template>

<script>
export default {
  props: ['pUsername', 'pPassword'],
  data() {
    return {
      username: this.pUsername || '',
      password: this.pPassword || ''
    };
  },

  watch: {
    username: function(upd, old) {
      this.$emit('update:p-username', upd);
    },
    password: function(upd, old) {
      this.$emit('update:p-password', upd);
    }
  },
  computed: {
    usernameFeedback() {
      if (this.username.length == 0) return 'Enter username.';
      return '';
    },
    passwordFeedback() {
      if (this.password.length == 0) return 'Enter password.';
      return '';
    }
  }
};
</script>

<style></style>
