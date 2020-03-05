<template>
  <div>
    <h1>Orders</h1>
    <b-button v-if="userRole != 'guest'" to="/orders/create">Create</b-button>
    <order-lookup-form show-on-load></order-lookup-form>
  </div>
</template>

<script>
import OrderLookupForm from '~/components/order/OrderLookupForm';
export default {
  components: {
    OrderLookupForm
  }
};
</script>
