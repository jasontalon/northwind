<template>
  <b-form-group
    :description="this.description"
    :label="this.label"
    :label-for="this.textId"
    :invalid-feedback="this.feedback"
    :state="this.feedback.length == 0"
  >
    <b-form-input
      :id="this.textId"
      type="text"
      :list="this.selectionId"
      v-model="searchTerm"
      :state="this.feedback.length == 0"
      debounce="500"
    ></b-form-input>

    <datalist :id="this.selectionId">
      <option
        class="d-block"
        v-for="{ product_id, product_name } in results"
        :key="product_id"
      >
        {{ product_name }}
      </option>
    </datalist>
  </b-form-group>
</template>

<script>
export default {
  props: {
    description: { type: String, default: '' },
    label: { type: String, default: 'Product' },
    required: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      results: [],
      selectionId: this.$shortid(),
      textId: this.$shortid(),
      searchTerm: this.value || '',
      selectedProduct: {}
    };
  },
  watch: {
    async searchTerm(val) {
      this.selectedProduct = JSON.parse(JSON.stringify(this.results)).find(
        p => p.name == this.searchTerm
      );

      this.$emit('selected', this.selectedProduct || {});
      if (!this.selectedProduct) await this.search();
    }
  },
  computed: {
    feedback() {
      let feedback = '';
      if (!this.required || this.readonly) feedback = '';
      else if (!this.searchTerm) feedback = `${this.label} is required.`;
      else if (!this.selectedProduct) feedback = `Invalid ${this.label}`;

      this.$emit('feedback', { key: this.label || '', message: feedback });
      return feedback;
    }
  },
  methods: {
    async search() {
      const query = `query ($search: String) { products(limit: 10 where: {_or: [{product_name: {_ilike: $search}}]}) { product_id, product_name }}`,
        variables = {
          search: `%${this.searchTerm}%`
        };

      const products = this.$_.get(
        await this.$hasura(query, variables),
        'data.products',
        []
      );

      this.results = products;
    }
  }
};
</script>
