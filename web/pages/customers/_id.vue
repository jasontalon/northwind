<template>
  <div>
     <b-alert v-if="customer.createdBy != userId" show variant="info">Read-only. You are not the owner of this record.</b-alert>
    <customer-form
      :key="customer.customer_id"
      update
      @save="save"
      v-model="customer"
    ></customer-form>
  </div>
</template>

<script>
import CustomerForm from '~/components/customer/forms/CustomerForm';
export default {
  components: { CustomerForm },
  data() {
    return { customer: {} };
  },
  methods: {
    async save(customer) {
      await this.$store.dispatch('customer/save', customer);
      this.$router.push('/customers');
    },
    async load(customer_id) {
      const query = `query { customers(where: {customer_id: {_eq: "${customer_id}"}}) { address city contact_name contact_title country phone postal_code region company_name customer_id createdBy } }`;

      this.customer = this.$_.get(
        await this.$hasura(query),
        'data.customers[0]',
        {}
      );
    }
  },
  async created() {
    await this.load(this.$route.params.id);
  }
};
</script>
