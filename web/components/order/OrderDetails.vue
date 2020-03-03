<template>
  <div>
    <b-button @click="addNewLine" v-if="this.items.length > 0"
      >Add another line</b-button
    >
    <b-table show-empty :fields="fields" :items="items">
      <template v-slot:cell(actions)="data">
        <b-button variant="link" @click="remove(data.item.key)"
          ><b-icon-trash-fill></b-icon-trash-fill
        ></b-button>
      </template>
      <template v-slot:empty="">
        <b-button @click="addNewLine" block>Add order line</b-button>
      </template>
      <template v-slot:cell(product_id)="data">
        <product-name-select-input
          label=""
          :key="data.item.key"
          v-model="data.item.product.product_name"
          required
          @selected="product => productChanged(product, data.item.key)"
        ></product-name-select-input>
      </template>
      <template v-slot:cell(unit_price)="data">
        <b-form-input
          required
          style="max-width:180px;min-width:80px;"
          type="number"
          v-model="data.item.unit_price"
          :state="data.item.unit_price > 0"
        ></b-form-input>
      </template>
      <template v-slot:cell(discount)="data">
        <b-form-input
          required
          style="max-width:140px;min-width:90px;"
          type="number"
          v-model="data.item.discount"
          :state="data.item.discount != ''"
        ></b-form-input>
      </template>
      <template v-slot:cell(quantity)="data">
        <b-form-input
          required
          style="max-width:140px;min-width:90px;"
          type="number"
          v-model="data.item.quantity"
          :state="data.item.quantity > 0"
        >
        </b-form-input>
        <template v-if="data.item.product_id > 0">{{
          data.item.product.quantity_per_unit
        }}</template>
      </template>
      <template v-slot:cell(ext_price)="data">
        {{ (data.item.quantity * data.item.unit_price) | currency }}
      </template>
    </b-table>
  </div>
</template>

<script>
import ProductNameSelectInput from '~/components/order/ProductNameSelectInput';
import { BIconTrashFill } from 'bootstrap-vue';
export default {
  components: { ProductNameSelectInput, BIconTrashFill },
  props: {
    value: {
      type: Array,
      defaut: []
    }
  },
  filters: {
    currency: function(value) {
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      });
      return formatter.format(value);
    }
  },
  data() {
    const _ = this.$_;
    const val = JSON.parse(JSON.stringify(this.value));
    const isNullOrEmpty = _.isNull(val) || _.isEmpty(val) || _.isUndefined(val);

    return {
      fields: [
        { key: 'actions', label: '' },
        { key: 'product_id', label: 'Product' },
        'unit_price',
        'quantity',
        { key: 'discount', label: 'Discount %' },
        { key: 'ext_price', label: 'Total' }
      ],
      items: isNullOrEmpty
        ? []
        : this.value.map(p => ({ ...p, key: this.$shortid() }))
    };
  },
  watch: {
    items: {
      handler: function(val, oldVal) {
        const _ = this.$_;
        const orderDetails = this.items.map(p =>
          _.omit(p, ['quantity_per_unit', 'feedback', 'product_name', 'key'])
        );
        this.$emit('input', orderDetails);
      },
      deep: true
    }
  },
  methods: {
    async productChanged(product, key) {
      const lineItem = this.items.find(p => p.key == key);
      const query = `query { products(where: {product_id: {_eq: "${product.product_id}"}}) { discontinued product_id product_name quantity_per_unit supplier_id reorder_level unit_price units_on_order units_in_stock } }`;
      const productDetails = this.$_.get(
        await this.$hasura(query),
        'data.products[0]'
      );
      if (!productDetails || !lineItem) return;
      lineItem.product_id = productDetails.product_id;
      lineItem.product = productDetails;
      lineItem.unit_price = productDetails.unit_price;
      lineItem.quantity = 0;
      lineItem.discount = 0;
    },
    add() {},
    remove(key) {
      this.items = this.items.filter(p => p.key != key);
    },
    addNewLine() {
      this.items.push({
        key: this.$shortid(),
        product_id: 0,
        product: {},
        unit_price: 0,
        quantity: 0,
        discount: 0,
        feedback: ''
      });
    }
  }
};
</script>
