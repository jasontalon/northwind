<template>
  <customer-form :key="this.id" create @save="save"></customer-form>
</template>

<script>
import CustomerForm from '~/components/customer/forms/CustomerForm';
export default {
  components: { CustomerForm },
  methods: {
    async save(customer) {
      await this.$store.dispatch('customer/save', customer);
      this.$router.push('/customers');
    }
  },
  data() {
    return {
      id: ''
    };
  },
  created() {
    this.id = this.$shortid().toUpperCase();
  }
};
</script>

<style></style>
