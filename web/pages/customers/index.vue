<template>
  <div>
    <h1>Customers</h1>
    <b-button to="/customers/create">Create</b-button>
    <customer-lookup-form show-on-load></customer-lookup-form>
  </div>
</template>

<script>
import CustomerLookupForm from '~/components/customer/forms/CustomerLookupForm';
export default {
  components: { CustomerLookupForm }
};
</script>

<style></style>
