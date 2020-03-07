<template>
  <customer-form create @save="save"></customer-form>
</template>
<script>
import CustomerForm from '~/components/customer/forms/CustomerForm';
export default {
  components: { CustomerForm },
  methods: {
    async save(customer) {
      await this.$store.dispatch('customer/save', {...customer, customer_id: this.$shortid().toUpperCase()});
      this.$router.push('/customers');
    }
  },
  data() {
    return {
      id: ''
    };
  }
};
</script>