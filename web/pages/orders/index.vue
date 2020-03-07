<template>
  <b-container>
    <h1>Orders</h1>
    <div class="d-flex justify-content-end">
      <action-button to="/orders/create">
        <template v-slot:default> <b-icon-plus /> Create New Order </template>
      </action-button>
    </div>
    <order-lookup-form show-on-load></order-lookup-form>
  </b-container>
</template>

<script>
import OrderLookupForm from '~/components/order/OrderLookupForm';

export default {
  components: {
    OrderLookupForm
  }
};
</script>
