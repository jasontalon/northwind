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
      await this.$store.dispatch('order/save', order);
      this.$router.push('/orders');
    },
    async load(orderId) {
      const query = `query { orders(where: {order_id: {_eq: "${orderId}"}}) { customer { company_name } customer_id employee { first_name last_name } employee_id freight order_date order_details { order_id product_id quantity unit_price product { product_name quantity_per_unit } discount } order_id required_date ship_address ship_city ship_country ship_name ship_postal_code ship_region ship_via shipped_date shipper { company_name } createdBy } }`;

      const order = this.$_.get(await this.$hasura(query), 'data.orders[0]');
      this.order = {
        ...order,
        employee: {
          ...order.employee,
          name: order.employee.first_name + ' ' + order.employee.last_name
        }
      };
    }
  },
  async created() {
    await this.load(this.$route.params.id);
  }
};
</script>
