<template>
  <div>
    <b-button :variant="variant" @click="showModal">
      <slot>{{ this.label }}</slot>
    </b-button>
    <b-modal centered :id="modalId" hide-footer>
      <template v-slot:modal-title>
        <slot name="title">
          Please Sign In!
        </slot>
      </template>
      <div>
        <div>
          <p>
            Before you create a record, we need you to sign in first!
          </p>
        </div>
        <div class="d-flex justify-content-center">
          <b-button
            class="mb-4 w-25"
            :to="'/signin?src=' + to"
            variant="primary"
            >Sign me in</b-button
          >
        </div>
        <div class="d-flex justify-content-end">
          <p>
            No account yet?
            <b-link :to="'/signup?src=' + to"
              >Let's sign up a new account!</b-link
            >
          </p>
        </div>
      </div></b-modal
    >
  </div>
</template>

<script>
export default {
  props: {
    variant: { type: String, default: 'primary' },
    to: {
      type: String,
      default: '/',
      required: true
    },
    label: {
      type: String,
      default: 'Button'
    }
  },
  methods: {
    showModal() {
      if (this.userRole == 'guest') this.$bvModal.show(this.modalId);
      else this.$router.push(this.to);
    }
  },
  data() {
    return { modalId: '' };
  },
  created() {
    this.modalId = this.$shortid();
  }
};
</script>
