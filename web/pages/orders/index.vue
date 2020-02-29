<template>
  <div>
    <h1>Orders</h1>
    <order-lookup-form></order-lookup-form>
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
