<template>
  <div>
    <order-form
      :key="order.order_id"
      v-model="order"
      @save="onSave"
    ></order-form></div
></template>
<script>
import OrderForm from '~/components/order/OrderForm';
export default {
  components: {
    OrderForm
  },
  data() {
    return { order: {} };
  },
  methods: {
    async onSave(order) {
      const response = await this.$hasura(
        'query { orders(limit: 1, order_by: {order_id: desc}) { order_id } }'
      );

      const latestOrderId = this.$_.get(response, 'data.orders[0].order_id', 0);

      await this.$store.dispatch('order/save', {
        ...order,
        order_id: latestOrderId + 1
      });
      this.$router.push('/orders');
    }
  }
};
</script>
