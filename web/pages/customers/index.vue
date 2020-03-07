<template>
  <b-container>
    <h1>Customers</h1>
    <div class="d-flex justify-content-end">
      <action-button to="/customers/create">
        <b-icon-plus />Create New Customer
      </action-button>
    </div>
    <customer-lookup-form show-on-load></customer-lookup-form>
  </b-container>
</template>
<script>
import CustomerLookupForm from '~/components/customer/forms/CustomerLookupForm';

export default {
  components: { CustomerLookupForm }
};
</script>
