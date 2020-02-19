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
      :required="this.required"
      :state="this.feedback.length == 0"
      debounce="500"
    ></b-form-input>

    <datalist :id="this.selectionId">
      <option class="d-block" v-for="(title, index) in results" :key="index">
        {{ title }}
      </option>
    </datalist>
  </b-form-group>
</template>

<script>
export default {
  props: {
    description: { type: String, default: '' },
    label: { type: String, default: 'Title' },
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
      searchTerm: this.value,
      selectedTitle: ''
    };
  },
  watch: {
    async searchTerm(val) {
      const hasExactMatch =
        JSON.parse(JSON.stringify(this.results)).filter(
          p => p == this.searchTerm
        ).length > 0;
      this.$emit('input', this.searchTerm);
      
      if (!hasExactMatch && this.searchTerm.length > 3) await this.search();
    }
  },
  computed: {
    feedback() {
      let feedback = '';
      if (!this.required || this.readonly) feedback = '';
      else if (!this.searchTerm) feedback = `${this.label} is required.`;

      this.$emit('feedback', { label: this.label || '', message: feedback });
      return feedback;
    }
  },
  methods: {
    async search() {
      const query = `query ($search: String) { customers(limit: 10, distinct_on: contact_title, where: {contact_title: {_ilike: $search}}) { contact_title } employees(limit: 10, distinct_on:title, where : {title :{_ilike:$search}}) { title } }`,
        variables = {
          search: `%${this.searchTerm}%`
        };

      const {
        data: { customers = [], employees = [] }
      } = await this.$hasura(query, variables);

      const titles = this.$_.uniq([
        ...customers.map(c => c.contact_title),
        ...employees.map(e => e.title)
      ]).sort();
      this.results = titles;
    }
  }
};
</script>
