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
        v-for="{ customer_id, company_name } in results"
        :key="customer_id"
      >
        {{ company_name }}
      </option>
    </datalist>
  </b-form-group>
</template>

<script>
export default {
  props: {
    description: { type: String, default: '' },
    label: { type: String, default: 'Customer' },
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
      selectedCustomer: {}
    };
  },
  watch: {
    async searchTerm(val) {
      this.selectedCustomer = JSON.parse(JSON.stringify(this.results)).find(
        p => p.name == this.searchTerm
      );

      this.$emit('selected', this.selectedCustomer || {});
      if (!this.selectedCustomer) await this.search();
    }
  },
  computed: {
    feedback() {
      let feedback = '';
      if (!this.required || this.readonly) feedback = '';
      else if (!this.searchTerm) feedback = `${this.label} is required.`;
      else if (!this.selectedCustomer) feedback = `Invalid ${this.label}`;

      this.$emit('feedback', { key: this.label || '', message: feedback });
      return feedback;
    }
  },
  methods: {
    async search() {
      const query = `query ($search: String) { customers(limit: 10 where: {_or: [{company_name: {_ilike: $search}}]}) { customer_id, company_name }}`,
        variables = {
          search: `%${this.searchTerm}%`
        };

      const customers = this.$_.get(
        await this.$hasura(query, variables),
        'data.customers',
        []
      );

      this.results = customers;
    }
  }
};
</script>
