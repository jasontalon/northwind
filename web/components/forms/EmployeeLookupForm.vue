<template>
  <div>
    <form-input
      type="text"
      label="First name"
      v-model="first_name"
    ></form-input>
    <form-input type="text" label="Last name" v-model="last_name"></form-input>
    <b-button @click="search" :disabled="isBusy">Search</b-button>
    <b-table
      no-local-sorting
      :items="items"
      :fields="fields"
      @sort-changed="sortingChanged"
      :busy.sync="isBusy"
    >
    </b-table>
    <b-form-select
      style="max-width:80px;"
      v-model="perPage"
      @input="search"
      :options="[10, 50, 100]"
    ></b-form-select>
    <b-pagination
      v-model="currentPage"
      :total-rows="itemCount"
      :per-page="perPage"
      aria-controls="my-table"
      @input="search"
    ></b-pagination>
  </div>
</template>

<script>
import FormInput from '~/components/FormInput';
export default {
  components: { FormInput },
  columns: [
    { key: 'employee_id', label: '#', sortable: true },
    { key: 'first_name', label: 'First name', sortable: true },
    { key: 'last_name', label: 'Last name', sortable: true }
  ],

  data() {
    return {
      first_name: '',
      last_name: '',

      fields: this.$options.columns,
      items: [],
      itemCount: 0,
      perPage: 10,
      currentPage: 1,
      order_by: {},
      isBusy: false
    };
  },
  computed: {
    hasFilters() {
      return (
        [this.first_name, this.last_name].filter(Boolean).join().length > 0
      );
    },
    where() {
      if (!this.hasFilters)
        return {
          employee_id: { _gt: 0 }
        };
      const _ = this.$_;

      const filters = _.pick(JSON.parse(JSON.stringify(this.$data)), [
          'first_name',
          'last_name'
        ]),
        _where = _.keys(filters).reduce((acc, filter) => {
          acc[filter] = {
            _ilike: `%${filters[filter]}%`
          };
          return acc;
        }, {});
      console.log(_where);
      return _where;
    }
  },

  methods: {
    async sortingChanged({ sortBy, sortDesc }) {
      this.order_by = { [sortBy]: sortDesc ? 'asc' : 'desc' };
      await this.search();
    },
    async search() {
      this.isBusy = true;
      //await new Promise(resolve => setTimeout(resolve, 1500));
      const query = `query ($offset : Int, $limit: Int, $where: employees_bool_exp! $order_by :[employees_order_by!]) {
                    employees_aggregate(where: $where) {
                      aggregate {
                        count
                      }
                    }
                    employees(offset: $offset, limit: $limit, order_by: $order_by, where: $where) {
                      employee_id
                      first_name
                      last_name
                    }
                  }
                  `,
        variables = {
          order_by: this.$_.isEmpty(this.order_by)
            ? { employee_id: 'desc' }
            : this.order_by,
          where: this.where,
          limit: this.perPage,
          offset: (this.currentPage - 1) * this.perPage
        };

      const {
        data: {
          employees = [],
          employees_aggregate: { aggregate: { count = 0 } = {} } = {}
        } = {},
        errors = null
      } = await this.$axios.$post('/gql', {
        query,
        variables
      });

      this.items = employees;
      this.itemCount = count;
      this.isBusy = false;
    }
  },
  mounted() {}
};
</script>
