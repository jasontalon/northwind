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
        v-for="{ employee_id, name } in results"
        :key="employee_id"
      >
        {{ name }}
      </option>
    </datalist>
  </b-form-group>
</template>

<script>
export default {
  props: {
    description: { type: String, default: '' },
    label: { type: String, default: 'Employee' },
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
      selectedEmployee: {}
    };
  },
  watch: {
    async searchTerm(val) {
      this.selectedEmployee = JSON.parse(JSON.stringify(this.results)).find(
        p => p.name == this.searchTerm
      );

      this.$emit('selected', this.selectedEmployee || {});
      if (!this.selectedEmployee) await this.search();
    }
  },
  computed: {
    feedback() {
      let feedback = '';
      if (!this.required || this.readonly) feedback = '';
      else if (!this.searchTerm) feedback = `${this.label} is required.`;
      else if (!this.selectedEmployee) feedback = `Invalid ${this.label}`;

      this.$emit('feedback', { label: this.label || '', message: feedback });
      return feedback;
    }
  },
  methods: {
    async search() {
      const query = `query ($search: String) { employees(limit: 10 where: {_or: [{first_name: {_ilike: $search}}, {last_name: {_ilike: $search}}]}) { employee_id first_name last_name }}`,
        variables = {
          search: `%${this.searchTerm}%`
        };

      const employees = this.$_.get(
        await this.$hasura(query, variables),
        'data.employees',
        []
      ).map(e => ({
        ...e,
        name: e.first_name + ' ' + e.last_name
      }));

      this.results = employees;
    }
  }
};
</script>
