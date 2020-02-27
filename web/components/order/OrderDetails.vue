<template>
  <b-table show-empty :fields="fields" :items="items">
    <template v-slot:cell(actions)="">
      custom actions here.
    </template>
    <template v-slot:empty="">
      <b-button>Create new</b-button>
    </template>
  </b-table>
</template>

<script>
import ProductNameSelectInput from '~/components/order/ProductNameSelectInput';

export default {
  components: { ProductNameSelectInput },
  props: {
    value: {
      type: Array,
      defaut: []
    }
  },
  data() {
    return {
      fields: [
        { key: 'actions', label: '' },
        { key: 'product_id', label: 'Product' },
        'unit_price',
        'quantity',
        'discount'
      ],
      items: this.value
    };
  },
  methods: {
    add() {},
    remove() {}
  },
  mounted() {}
};
</script>
